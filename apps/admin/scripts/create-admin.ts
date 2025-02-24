const { createClient } = require('@supabase/supabase-js');
const { config } = require('dotenv');
const { resolve } = require('path');

// Load environment variables from .env.local
config({ path: resolve(__dirname, "../.env.local") });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !serviceRoleKey) {
  console.error("Error: Missing Supabase environment variables");
  console.error("Required variables:");
  console.error("- NEXT_PUBLIC_SUPABASE_URL");
  console.error("- SUPABASE_SERVICE_ROLE_KEY (get this from your Supabase dashboard)");
  process.exit(1);
}

async function main() {
  const email = process.argv[2];
  const password = process.argv[3];

  if (!email || !password) {
    console.error("Usage: ts-node create-admin.ts <email> <password>");
    process.exit(1);
  }

  // Create a Supabase client with the service role key
  const supabase = createClient(supabaseUrl, serviceRoleKey, {
    auth: {
      autoRefreshToken: false,
      persistSession: false
    }
  });

  try {
    console.log("Creating admin user...");

    // Create user with admin role in raw_user_meta_data
    const { data: authData, error: signUpError } = await supabase.auth.admin.createUser({
      email,
      password,
      email_confirm: true,
      user_metadata: { role: 'admin' }
    });

    if (signUpError) throw signUpError;
    if (!authData.user) throw new Error("No user returned from sign up");

    console.log("User created successfully:", authData.user.id);

    // Update user metadata using the new function
    const { data: updateData, error: updateError } = await supabase.rpc(
      'update_admin_metadata',
      { "user_id": authData.user.id }
    );

    if (updateError) {
      console.error("Failed to update admin metadata:", updateError);
      throw updateError;
    }

    console.log("Updated user metadata:", updateData);

    // Verify the user data using the new function
    const { data: verifyData, error: verifyError } = await supabase.rpc(
      'verify_admin_status',
      { "user_id": authData.user.id }
    );

    if (verifyError) {
      console.error("Failed to verify admin status:", verifyError);
      throw verifyError;
    }

    console.log("Successfully created admin user!");
    console.log("Email:", email);
    console.log("User Data:", verifyData);

    if (!verifyData.is_admin) {
      console.warn("Warning: User was created but admin role verification failed!");
      process.exit(1);
    }

    console.log("Admin role verified successfully. You can now log in to the admin panel.");

  } catch (error) {
    console.error("Error creating admin user:", error);
    process.exit(1);
  }
}

main(); 
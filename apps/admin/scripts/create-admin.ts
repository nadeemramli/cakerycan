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

interface User {
  id: string;
  email: string;
  user_metadata: Record<string, any>;
}

async function checkAdminStatus(supabase: any, email: string) {
  console.log("Checking admin status for:", email);

  // Get user by email
  const { data: userData, error: userError } = await supabase.auth.admin.listUsers();
  
  if (userError) {
    console.error("Error fetching users:", userError);
    return false;
  }

  const user = userData.users.find((u: User) => u.email === email);
  
  if (!user) {
    console.error("User not found with email:", email);
    return false;
  }

  console.log("User found:", {
    id: user.id,
    email: user.email,
    metadata: user.user_metadata
  });

  // Verify admin status
  const { data: verifyData, error: verifyError } = await supabase.rpc(
    'verify_admin_status',
    { "user_id": user.id }
  );

  if (verifyError) {
    console.error("Failed to verify admin status:", verifyError);
    return false;
  }

  console.log("Admin verification result:", verifyData);
  return verifyData.is_admin;
}

async function main() {
  const isCheck = process.argv[2] === '--check';
  const email = isCheck ? process.argv[3] : process.argv[2];
  const password = isCheck ? null : process.argv[3];

  if (!email || (!isCheck && !password)) {
    console.error("Usage:");
    console.error("  To create admin: ts-node create-admin.ts <email> <password>");
    console.error("  To check status: ts-node create-admin.ts --check <email>");
    process.exit(1);
  }

  // Create a Supabase client with the service role key
  const supabase = createClient(supabaseUrl, serviceRoleKey, {
    auth: {
      autoRefreshToken: false,
      persistSession: false
    }
  });

  if (isCheck) {
    const isAdmin = await checkAdminStatus(supabase, email);
    if (isAdmin) {
      console.log("✅ User is confirmed as an admin");
    } else {
      console.log("❌ User is NOT an admin");
    }
    process.exit(isAdmin ? 0 : 1);
  }

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
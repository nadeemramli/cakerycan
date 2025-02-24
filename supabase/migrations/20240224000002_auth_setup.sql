-- Enable RLS on all tables (if not already enabled)
DO $$
BEGIN
    IF NOT EXISTS (
        SELECT 1
        FROM pg_tables
        WHERE schemaname = 'public'
        AND tablename = 'products'
        AND rowsecurity = true
    ) THEN
        ALTER TABLE products ENABLE ROW LEVEL SECURITY;
    END IF;

    IF NOT EXISTS (
        SELECT 1
        FROM pg_tables
        WHERE schemaname = 'public'
        AND tablename = 'ingredients'
        AND rowsecurity = true
    ) THEN
        ALTER TABLE ingredients ENABLE ROW LEVEL SECURITY;
    END IF;

    IF NOT EXISTS (
        SELECT 1
        FROM pg_tables
        WHERE schemaname = 'public'
        AND tablename = 'recipes'
        AND rowsecurity = true
    ) THEN
        ALTER TABLE recipes ENABLE ROW LEVEL SECURITY;
    END IF;

    IF NOT EXISTS (
        SELECT 1
        FROM pg_tables
        WHERE schemaname = 'public'
        AND tablename = 'inventory'
        AND rowsecurity = true
    ) THEN
        ALTER TABLE inventory ENABLE ROW LEVEL SECURITY;
    END IF;
END $$;

-- Drop existing policies if any
DROP POLICY IF EXISTS "Customers can view available products" ON products;
DROP POLICY IF EXISTS "Admins can manage products" ON products;
DROP POLICY IF EXISTS "Admins can manage ingredients" ON ingredients;
DROP POLICY IF EXISTS "Admins can manage recipes" ON recipes;
DROP POLICY IF EXISTS "Admins can manage inventory" ON inventory;

-- Create policies for products table
CREATE POLICY "Customers can view available products"
ON products
FOR SELECT
TO authenticated
USING (true);

CREATE POLICY "Admins can manage products"
ON products
FOR ALL
TO authenticated
USING (
    EXISTS (
        SELECT 1
        FROM auth.users
        WHERE id = auth.uid()
        AND raw_user_meta_data->>'role' = 'admin'
    )
);

-- Create policies for ingredients table
CREATE POLICY "Admins can manage ingredients"
ON ingredients
FOR ALL
TO authenticated
USING (
    EXISTS (
        SELECT 1
        FROM auth.users
        WHERE id = auth.uid()
        AND raw_user_meta_data->>'role' = 'admin'
    )
);

-- Create policies for recipes table
CREATE POLICY "Admins can manage recipes"
ON recipes
FOR ALL
TO authenticated
USING (
    EXISTS (
        SELECT 1
        FROM auth.users
        WHERE id = auth.uid()
        AND raw_user_meta_data->>'role' = 'admin'
    )
);

-- Create policies for inventory table
CREATE POLICY "Admins can manage inventory"
ON inventory
FOR ALL
TO authenticated
USING (
    EXISTS (
        SELECT 1
        FROM auth.users
        WHERE id = auth.uid()
        AND raw_user_meta_data->>'role' = 'admin'
    )
);

-- Create role enum if it doesn't exist
DO $$ 
BEGIN
    IF NOT EXISTS (
        SELECT 1 FROM pg_type 
        WHERE typname = 'auth_role'
    ) THEN
        CREATE TYPE auth_role AS ENUM ('admin', 'customer');
    END IF;
END $$;

-- Add role column to auth.users if it doesn't exist
DO $$ 
BEGIN
    IF NOT EXISTS (
        SELECT 1 FROM information_schema.columns 
        WHERE table_schema = 'auth' 
        AND table_name = 'users' 
        AND column_name = 'role'
    ) THEN
        ALTER TABLE auth.users ADD COLUMN role auth_role DEFAULT 'customer';
    END IF;
END $$;

-- Add metadata column if it doesn't exist
DO $$ 
BEGIN
    IF NOT EXISTS (
        SELECT 1 FROM information_schema.columns 
        WHERE table_schema = 'auth' 
        AND table_name = 'users' 
        AND column_name = 'metadata'
    ) THEN
        ALTER TABLE auth.users ADD COLUMN metadata jsonb DEFAULT '{}'::jsonb;
    END IF;
END $$;

-- Create helper functions for role management
CREATE OR REPLACE FUNCTION get_current_user_role()
RETURNS auth_role AS $$
BEGIN
    RETURN (
        SELECT role 
        FROM auth.users 
        WHERE id = auth.uid()
    );
END;
$$ LANGUAGE plpgsql
SECURITY DEFINER;

CREATE OR REPLACE FUNCTION is_admin()
RETURNS boolean AS $$
BEGIN
    RETURN (
        SELECT role = 'admin'
        FROM auth.users 
        WHERE id = auth.uid()
    );
END;
$$ LANGUAGE plpgsql
SECURITY DEFINER;

-- Create admin management functions
CREATE OR REPLACE FUNCTION set_user_role(user_id UUID, new_role auth_role)
RETURNS void AS $$
BEGIN
    -- Only allow admins to set roles
    IF NOT is_admin() THEN
        RAISE EXCEPTION 'Only administrators can modify user roles';
    END IF;

    UPDATE auth.users
    SET role = new_role
    WHERE id = user_id;
END;
$$ LANGUAGE plpgsql
SECURITY DEFINER;

-- Create admin user function (to be used only once during setup)
CREATE OR REPLACE FUNCTION create_admin_user(email text, password text)
RETURNS void AS $$
DECLARE
    new_user_id UUID;
BEGIN
    -- Insert the user
    INSERT INTO auth.users (
        email,
        encrypted_password,
        email_confirmed_at,
        role,
        raw_app_meta_data,
        raw_user_meta_data
    )
    VALUES (
        email,
        crypt(password, gen_salt('bf')),
        now(),
        'admin',
        '{"provider": "email", "providers": ["email"]}',
        '{}'
    )
    RETURNING id INTO new_user_id;

    -- Insert email identity
    INSERT INTO auth.identities (
        id,
        user_id,
        identity_data,
        provider,
        last_sign_in_at,
        created_at,
        updated_at
    )
    VALUES (
        new_user_id,
        new_user_id,
        jsonb_build_object('sub', new_user_id::text, 'email', email),
        'email',
        now(),
        now(),
        now()
    );
END;
$$ LANGUAGE plpgsql
SECURITY DEFINER;
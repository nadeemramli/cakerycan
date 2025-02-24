-- Admin functions and permissions
BEGIN;

-- Create the role type if it doesn't exist
DO $$ 
BEGIN
    IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'auth_role') THEN
        CREATE TYPE auth_role AS ENUM ('admin', 'customer');
    END IF;
END $$;

-- Add role column to auth.users if it doesn't exist
DO $$ 
BEGIN
    IF NOT EXISTS (
        SELECT 1 
        FROM information_schema.columns 
        WHERE table_schema = 'auth' 
        AND table_name = 'users' 
        AND column_name = 'role'
    ) THEN
        ALTER TABLE auth.users ADD COLUMN role auth_role DEFAULT 'customer';
    END IF;
END $$;

-- Function to execute SQL with service role and return results
CREATE OR REPLACE FUNCTION execute_sql_admin(sql text) 
RETURNS text 
LANGUAGE plpgsql
SECURITY DEFINER 
SET search_path = public
AS $$
DECLARE
    result text;
BEGIN
    EXECUTE sql INTO result;
    RETURN result;
END;
$$;

-- Function to check if user is admin
CREATE OR REPLACE FUNCTION is_admin() 
RETURNS boolean 
LANGUAGE plpgsql
SECURITY DEFINER 
SET search_path = public
AS $$
BEGIN
    RETURN EXISTS (
        SELECT 1
        FROM auth.users 
        WHERE id = auth.uid()
        AND raw_user_meta_data->>'role' = 'admin'
    );
END;
$$;

-- Update RLS policies
DO $$
BEGIN
    IF NOT EXISTS (
        SELECT 1
        FROM pg_tables
        WHERE schemaname = 'auth'
        AND tablename = 'users'
        AND rowsecurity = true
    ) THEN
        ALTER TABLE auth.users ENABLE ROW LEVEL SECURITY;
    END IF;
END $$;

-- Drop existing policies
DROP POLICY IF EXISTS "Allow users to view their own data" ON auth.users;
DROP POLICY IF EXISTS "Allow admins to view all users" ON auth.users;

-- Create new policies
CREATE POLICY "Allow users to view their own data"
    ON auth.users
    FOR SELECT
    USING (auth.uid() = id);

CREATE POLICY "Allow admins to view all users"
    ON auth.users
    FOR ALL
    USING (
        EXISTS (
            SELECT 1
            FROM auth.users
            WHERE id = auth.uid()
            AND raw_user_meta_data->>'role' = 'admin'
        )
    );

-- Set proper auth schema permissions using service_role
SET ROLE service_role;

-- Grant necessary permissions
DO $$
BEGIN
    -- Grant usage on auth schema
    GRANT USAGE ON SCHEMA auth TO authenticated;
    
    -- Grant specific permissions on auth.users
    GRANT SELECT ON auth.users TO authenticated;
    
    -- Grant execute on specific functions
    GRANT EXECUTE ON FUNCTION auth.uid() TO authenticated;
    GRANT EXECUTE ON FUNCTION auth.role() TO authenticated;
EXCEPTION
    WHEN insufficient_privilege THEN
        NULL;
END $$;

-- Reset role
RESET ROLE;

COMMIT;
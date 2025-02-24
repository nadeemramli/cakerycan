-- Admin role setup and management
BEGIN;

-- Create auth_role type if it doesn't exist
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

-- Create or replace admin role update function
CREATE OR REPLACE FUNCTION public.set_admin_role(user_id uuid) 
RETURNS void 
LANGUAGE plpgsql
SECURITY DEFINER 
SET search_path = public
AS $$
BEGIN
    IF NOT EXISTS (
        SELECT 1
        FROM auth.users
        WHERE id = auth.uid()
        AND raw_user_meta_data->>'role' = 'admin'
    ) THEN
        RAISE EXCEPTION 'Only administrators can set admin roles';
    END IF;

    UPDATE auth.users
    SET raw_user_meta_data = 
        CASE 
            WHEN raw_user_meta_data IS NULL THEN 
                jsonb_build_object('role', 'admin')
            ELSE 
                raw_user_meta_data || jsonb_build_object('role', 'admin')
        END
    WHERE id = user_id;
END;
$$;

-- Update RLS policies for auth.users
DROP POLICY IF EXISTS "admin_auth_select_policy" ON auth.users;
DROP POLICY IF EXISTS "admin_auth_update_policy" ON auth.users;

CREATE POLICY "admin_auth_select_policy" ON auth.users
    FOR SELECT
    USING (
        auth.uid() = id 
        OR EXISTS (
            SELECT 1
            FROM auth.users
            WHERE id = auth.uid()
            AND raw_user_meta_data->>'role' = 'admin'
        )
    );

CREATE POLICY "admin_auth_update_policy" ON auth.users
    FOR UPDATE
    USING (
        EXISTS (
            SELECT 1
            FROM auth.users
            WHERE id = auth.uid()
            AND raw_user_meta_data->>'role' = 'admin'
        )
    );

-- Grant necessary permissions to service role
GRANT USAGE ON SCHEMA public TO service_role;
GRANT EXECUTE ON FUNCTION public.set_admin_role TO service_role;

COMMIT;
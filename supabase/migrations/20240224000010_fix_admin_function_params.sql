-- Fix admin function parameters
BEGIN;

-- Drop previous functions
DROP FUNCTION IF EXISTS public.update_admin_metadata(uuid);
DROP FUNCTION IF EXISTS public.verify_admin_status(uuid);

-- Create admin update function with explicit parameter name
CREATE OR REPLACE FUNCTION public.update_admin_metadata("user_id" uuid DEFAULT auth.uid()) 
RETURNS jsonb 
LANGUAGE plpgsql
SECURITY DEFINER 
SET search_path = public
AS $$
DECLARE
    updated_user jsonb;
BEGIN
    -- Verify the function caller has permission
    IF NOT EXISTS (
        SELECT 1 FROM auth.users
        WHERE id = auth.uid()
        AND (
            raw_user_meta_data->>'role' = 'admin'
            OR id = "user_id" -- Allow users to update their own metadata
        )
    ) THEN
        RAISE EXCEPTION 'Unauthorized';
    END IF;

    UPDATE auth.users 
    SET raw_user_meta_data = jsonb_build_object('role', 'admin')
    WHERE id = "user_id"
    RETURNING jsonb_build_object(
        'id', id,
        'email', email,
        'metadata', raw_user_meta_data
    ) INTO updated_user;
    
    RETURN updated_user;
END;
$$;

-- Create verify function with explicit parameter name
CREATE OR REPLACE FUNCTION public.verify_admin_status("user_id" uuid DEFAULT auth.uid()) 
RETURNS jsonb 
LANGUAGE plpgsql
SECURITY DEFINER 
SET search_path = public
AS $$
DECLARE
    user_data jsonb;
BEGIN
    SELECT jsonb_build_object(
        'id', u.id,
        'email', u.email,
        'metadata', u.raw_user_meta_data,
        'is_admin', (u.raw_user_meta_data->>'role' = 'admin')
    )
    INTO user_data
    FROM auth.users u
    WHERE u.id = "user_id";
    
    RETURN user_data;
END;
$$;

-- Grant execute permissions
GRANT EXECUTE ON FUNCTION public.update_admin_metadata(uuid) TO authenticated;
GRANT EXECUTE ON FUNCTION public.verify_admin_status(uuid) TO authenticated;

-- Grant usage on auth schema
GRANT USAGE ON SCHEMA auth TO authenticated;
GRANT USAGE ON SCHEMA auth TO service_role;

COMMIT; 
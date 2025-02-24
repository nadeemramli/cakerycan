-- Fix admin function permissions
BEGIN;

-- Drop previous functions
DROP FUNCTION IF EXISTS public.update_admin_metadata(uuid);
DROP FUNCTION IF EXISTS public.verify_admin_status(uuid);

-- Create admin update function with service role check
CREATE OR REPLACE FUNCTION public.update_admin_metadata("user_id" uuid DEFAULT auth.uid()) 
RETURNS jsonb 
LANGUAGE plpgsql
SECURITY DEFINER 
SET search_path = public
AS $$
DECLARE
    updated_user jsonb;
    is_service_role boolean;
BEGIN
    -- Check if the request is coming from the service role
    is_service_role := (SELECT current_setting('request.jwt.claims', true)::jsonb->>'role' = 'service_role');

    -- Allow if service role or if user is admin
    IF NOT (
        is_service_role 
        OR EXISTS (
            SELECT 1 FROM auth.users
            WHERE id = auth.uid()
            AND raw_user_meta_data->>'role' = 'admin'
        )
    ) THEN
        RAISE EXCEPTION 'Unauthorized: Requires service role or admin privileges';
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

-- Create verify function with service role check
CREATE OR REPLACE FUNCTION public.verify_admin_status("user_id" uuid DEFAULT auth.uid()) 
RETURNS jsonb 
LANGUAGE plpgsql
SECURITY DEFINER 
SET search_path = public
AS $$
DECLARE
    user_data jsonb;
    is_service_role boolean;
BEGIN
    -- Check if the request is coming from the service role
    is_service_role := (SELECT current_setting('request.jwt.claims', true)::jsonb->>'role' = 'service_role');

    -- Allow if service role or if user is admin or checking their own status
    IF NOT (
        is_service_role 
        OR EXISTS (
            SELECT 1 FROM auth.users
            WHERE id = auth.uid()
            AND (
                raw_user_meta_data->>'role' = 'admin'
                OR id = "user_id"
            )
        )
    ) THEN
        RAISE EXCEPTION 'Unauthorized: Requires service role, admin privileges, or self-check';
    END IF;

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
GRANT EXECUTE ON FUNCTION public.update_admin_metadata(uuid) TO service_role;
GRANT EXECUTE ON FUNCTION public.verify_admin_status(uuid) TO service_role;

COMMIT; 
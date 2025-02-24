-- Simplify admin functions
BEGIN;

-- Drop previous function if exists
DROP FUNCTION IF EXISTS public.execute_sql_admin(text);

-- Create simpler admin update function
CREATE OR REPLACE FUNCTION public.update_admin_metadata(user_id uuid) 
RETURNS jsonb 
LANGUAGE plpgsql
SECURITY DEFINER 
SET search_path = public
AS $$
DECLARE
    updated_user jsonb;
BEGIN
    UPDATE auth.users 
    SET raw_user_meta_data = jsonb_build_object('role', 'admin')
    WHERE id = user_id
    RETURNING jsonb_build_object(
        'id', id,
        'email', email,
        'metadata', raw_user_meta_data
    ) INTO updated_user;
    
    RETURN updated_user;
END;
$$;

-- Create function to verify admin status
CREATE OR REPLACE FUNCTION public.verify_admin_status(user_id uuid) 
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
    WHERE u.id = user_id;
    
    RETURN user_data;
END;
$$;

-- Grant execute permissions
GRANT EXECUTE ON FUNCTION public.update_admin_metadata(uuid) TO authenticated;
GRANT EXECUTE ON FUNCTION public.verify_admin_status(uuid) TO authenticated;

COMMIT; 
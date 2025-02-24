-- Create auth wrapper schema and functions
BEGIN;

-- Create wrapper schema if not exists
CREATE SCHEMA IF NOT EXISTS auth_utils;

-- Ensure schema access
GRANT USAGE ON SCHEMA auth_utils TO authenticated;
GRANT USAGE ON SCHEMA auth_utils TO service_role;

-- Safely drop existing functions if they exist
DO $$ 
BEGIN
    IF EXISTS (
        SELECT 1 
        FROM information_schema.schemata 
        WHERE schema_name = 'auth_utils'
    ) THEN
        DROP FUNCTION IF EXISTS auth_utils.get_user_by_id(UUID);
        DROP FUNCTION IF EXISTS auth_utils.list_users();
    END IF;
END $$;

-- Create secure wrapper functions
CREATE FUNCTION auth_utils.get_user_by_id(user_id UUID)
RETURNS jsonb
SECURITY DEFINER
SET search_path = auth, pg_temp
LANGUAGE plpgsql
AS $$
DECLARE
    result jsonb;
BEGIN
    IF (auth.uid() = user_id) OR (public.is_admin()) THEN
        SELECT row_to_json(u)::jsonb INTO result 
        FROM auth.users u 
        WHERE id = user_id;
        RETURN result;
    END IF;
    RETURN NULL;
END;
$$;

CREATE FUNCTION auth_utils.list_users()
RETURNS TABLE (
    id uuid,
    email text,
    created_at timestamptz,
    last_sign_in_at timestamptz,
    raw_user_meta_data jsonb
)
SECURITY DEFINER
SET search_path = auth, pg_temp
LANGUAGE plpgsql
AS $$
BEGIN
    IF (public.is_admin()) THEN
        RETURN QUERY 
        SELECT 
            u.id,
            u.email,
            u.created_at,
            u.last_sign_in_at,
            u.raw_user_meta_data
        FROM auth.users u;
    END IF;
    RETURN;
END;
$$;

-- Grant execute permissions
GRANT EXECUTE ON FUNCTION auth_utils.get_user_by_id(UUID) TO authenticated;
GRANT EXECUTE ON FUNCTION auth_utils.list_users() TO authenticated;

COMMIT; 
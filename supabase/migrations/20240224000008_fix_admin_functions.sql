-- Fix admin functions
BEGIN;

-- Drop old execute_sql function if it exists
DROP FUNCTION IF EXISTS public.execute_sql(text);

-- Create new admin SQL execution function
CREATE OR REPLACE FUNCTION public.execute_sql_admin(sql text) 
RETURNS text 
LANGUAGE plpgsql
SECURITY DEFINER 
SET search_path = public
AS $$
DECLARE
    result text;
BEGIN
    -- Grant temporary permissions to execute the SQL
    SET LOCAL ROLE service_role;
    
    -- Execute the SQL and capture the result
    EXECUTE sql INTO result;
    
    -- Reset role and return result
    RESET ROLE;
    RETURN result;
END;
$$;

-- Grant execute permission on the new function
GRANT EXECUTE ON FUNCTION public.execute_sql_admin(text) TO authenticated;

-- Update is_admin function to be more robust
CREATE OR REPLACE FUNCTION public.is_admin() 
RETURNS boolean 
LANGUAGE plpgsql
SECURITY DEFINER 
SET search_path = public
AS $$
BEGIN
    -- First check raw_user_meta_data
    IF EXISTS (
        SELECT 1
        FROM auth.users 
        WHERE id = auth.uid()
        AND raw_user_meta_data->>'role' = 'admin'
    ) THEN
        RETURN true;
    END IF;

    -- Then check user_metadata as fallback
    IF EXISTS (
        SELECT 1
        FROM auth.users 
        WHERE id = auth.uid()
        AND (auth.jwt() ->> 'user_metadata')::jsonb->>'role' = 'admin'
    ) THEN
        RETURN true;
    END IF;

    RETURN false;
END;
$$;

-- Grant execute permission on is_admin function
GRANT EXECUTE ON FUNCTION public.is_admin() TO authenticated;

COMMIT; 
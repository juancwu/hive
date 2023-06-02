CREATE TABLE IF NOT EXISTS profiles  (
    id UUID DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL,
    nickname TEXT,
    profile_picture_url TEXT,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
    updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
    CONSTRAINT profiles_pk PRIMARY KEY (id),
    CONSTRAINT profiles_user_id_fk FOREIGN KEY (user_id) REFERENCES auth.users (id) ON DELETE CASCADE,
    UNIQUE (id, user_id)
);

ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;

CREATE POLICY enable_profiles_select_authenticated
ON profiles AS PERMISSIVE FOR SELECT
TO authenticated
USING (user_id = auth.uid());

CREATE POLICY enable_profiles_insert_authenticated
ON profiles AS PERMISSIVE FOR INSERT
TO authenticated
WITH CHECK (user_id = auth.uid());

CREATE POLICY enable_profiles_update_authenticated
ON profiles AS PERMISSIVE FOR UPDATE
TO authenticated
USING (user_id = auth.uid())
WITH CHECK (user_id = auth.uid());

CREATE OR REPLACE FUNCTION create_user_profile() RETURNS TRIGGER AS $$
BEGIN
    INSERT INTO public.profiles (user_id) VALUES (NEW.id);
    RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE TRIGGER create_profile_trigger
AFTER INSERT ON auth.users
FOR EACH ROW EXECUTE PROCEDURE create_user_profile();

-- sessions are not revoked after removing a user, so we need to do it manually
CREATE OR REPLACE FUNCTION delete_user_sessions() RETURNS TRIGGER AS $$
BEGIN
    DELETE FROM auth.sessions WHERE user_id = OLD.id;
    RETURN OLD;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE TRIGGER delete_sessions_trigger 
    AFTER DELETE ON auth.users
    FOR EACH ROW EXECUTE PROCEDURE delete_user_sessions();
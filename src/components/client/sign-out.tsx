'use client';

import { useSupabase } from '@/providers/supabase-provider';
import { Button } from '@/ui/client';
import { FC, useState } from 'react';

const SignOut: FC = () => {
  const [isLoading, setIsloading] = useState(false);
  const { supabase } = useSupabase();

  const handleSignOut = async () => {
    setIsloading(true);

    const { error } = await supabase.auth.signOut();

    if (error) {
      // TODO: handle error using notifications
      setIsloading(false);
    }
  };

  return (
    <Button onClick={handleSignOut} intent="gradient" disabled={isLoading}>
      Sign Out
    </Button>
  );
};

export default SignOut;

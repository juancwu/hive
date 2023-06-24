'use client';

import { useSupabase } from '@/providers/supabase-provider';
import { Button } from '@/ui/client/button';
import { FC, useState } from 'react';

export const SignOut: FC = () => {
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
    <Button onClick={handleSignOut} intent="secondary" disabled={isLoading}>
      Sign Out
    </Button>
  );
};

import { createServerActionClient } from '@supabase/auth-helpers-nextjs';
import { revalidatePath } from 'next/cache';
import { cookies } from 'next/headers';
import type { Database } from '@/lib/types/database.types';
import { Button } from '@/ui/server';

export default function SignOut() {
  const handleSignOut = async () => {
    'use server';
    const supabase = createServerActionClient<Database>({ cookies });
    await supabase.auth.signOut();
    revalidatePath('/auth');
  };

  return (
    <form action={handleSignOut}>
      <Button type="submit" intent="secondary">
        Sign Out
      </Button>
    </form>
  );
}

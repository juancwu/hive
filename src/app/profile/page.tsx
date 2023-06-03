import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import dayjs from 'dayjs';
import { SignOut } from '@/components/client';
import routes from '@/lib/routes';

export default async function ProfilePage() {
  const supabase = createServerComponentClient({ cookies });
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect(routes.auth);
  }

  // get profile from db
  const { data, error } = await supabase
    .from('profiles')
    .select('*')
    .eq('user_id', user.id);

  if (error || data.length < 1) {
    throw new Error('Profile not found');
  }

  const profile = data[0];
  const createdAt = dayjs(profile['created_at']).format('MMMM D, YYYY');
  const updatedAt = dayjs(profile['updated_at']).format('MMMM D, YYYY');

  return (
    <div className="flex flex-col gap-10">
      <h1>Profile</h1>
      <span>Profile ID: {profile['id']}</span>
      <span>User ID: {profile['user_id']}</span>
      <span>Nickname: {profile['nickname']}</span>
      <span>Created At: {createdAt}</span>
      <span>Updated At: {updatedAt}</span>
      {/* Could use server sign out component in the future when server actions are stable */}
      <SignOut />
    </div>
  );
}

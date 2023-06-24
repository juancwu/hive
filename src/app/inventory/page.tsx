import { Main, Header } from '@/ui/server';
import routes from '@/lib/routes';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { Inventory } from '@/app/inventory/server/inventory';

export default async function InventoryPage() {
  const supabase = createServerComponentClient({ cookies });
  const {
    error,
    data: { user },
  } = await supabase.auth.getUser();

  if (!user || error) {
    redirect(routes.auth);
  }

  // fetch data from database
  const { data } = await supabase.rpc('get_inventory', {
    user_id: user.id,
  });

  return (
    <>
      <Header>Inventory</Header>
      <Main>
        <Inventory data={data} />
      </Main>
    </>
  );
}

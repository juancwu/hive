import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import type { Database } from '@/lib/types/database.types';
import { HttpStatus, HttpStatusMessage } from '../enums/http-status';

export async function authorize() {
  const supabase = createRouteHandlerClient<Database>({ cookies });
  const {
    data: { session },
    error,
  } = await supabase.auth.getSession();

  let res: Response | null = null;
  if (error || !session) {
    res = new Response(
      JSON.stringify({
        message: 'Please authenticate.',
      }),
      {
        headers: {
          'Content-Type': 'applicate/json',
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Methods': 'POST',
          'Access-Control-Allow-Headers': 'Content-Type',
        },
        status: HttpStatus.Unauthorized,
        statusText: HttpStatusMessage.Unauthorized,
      }
    );
  }

  return {
    res,
    session,
    supabase,
  };
}

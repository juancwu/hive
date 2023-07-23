import { authorize } from '@/lib/helpers/route-auth';
import { HttpStatus, HttpStatusMessage } from '@/lib/enums/http-status';

export async function POST(request: Request) {
  const { res: AuthRes, session, supabase } = await authorize();
  if (AuthRes) return AuthRes;

  const data = await request.formData();

  console.log(data.get('datasheet'));

  const body = JSON.stringify({
    message: 'Received!',
    body: data.get('partName'),
  });
  const res = new Response(body, {
    headers: {
      'Content-Type': 'application/json',
      'Content-Length': body.length.toString(),
    },
    status: HttpStatus.Created,
  });
  return res;
}

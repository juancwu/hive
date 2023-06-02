import { SignOut } from '@/components/client';
import { Header, Main } from '@/ui/server';

export default function AuthErrorPage() {
  return (
    <>
      <Header>Session Error</Header>
      <Main>
        <div>
          <span>
            Oh this is not good. There seems to be problem with your session. Click sign
            out to retry.
          </span>
          <div className="my-8">
            <SignOut />
          </div>
        </div>
      </Main>
    </>
  );
}

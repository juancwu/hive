'use client';

import { useEffect, useState } from 'react';
import { z } from 'zod';
import { useSupabase } from '@/providers/supabase-provider';
import { TextInput } from '@/ui/client/text-input';
import { Button } from '@/ui/client/button';
import { Alert } from '@/ui/client/alert';

export default function Auth() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [isSignUp, setIsSignUp] = useState(false);
  const [isLoading, setIsloading] = useState(false);
  const [alertType, setAlertType] = useState<'success' | 'error'>('success');
  const [errorMessage, setErrorMessage] = useState('');
  const [showAlert, setShowAlert] = useState(false);

  const { supabase } = useSupabase();

  const isEmail = z
    .string()
    .nonempty('Empty email address')
    .email('Invalid email address');
  const isValidPassword = z
    .string()
    .min(8, 'Password must be at least 8 characters')
    .max(32, 'Password must be less than 32 characters')
    .refine(
      (value) => /[A-Z]/.test(value),
      'Password must contain at least one uppercase letter'
    )
    .refine(
      (value) => /[a-z]/.test(value),
      'Password must contain at least one lowercase letter'
    )
    .refine((value) => /[0-9]/.test(value), 'Password must contain at least one number')
    .refine(
      (value) => /[^A-Za-z0-9]/.test(value),
      'Password must contain at least one symbol'
    );

  useEffect(() => {
    setPassword('');
    setPasswordError('');
    setEmailError('');
    setEmail('');
  }, [isSignUp]);

  useEffect(() => {
    if (isSignUp) {
      const emailResult = isEmail.safeParse(email);
      if (!emailResult.success) {
        setEmailError(emailResult.error.issues[0].message);
      } else {
        setEmailError('');
      }
    }
  }, [email, isSignUp, isEmail]);

  useEffect(() => {
    if (isSignUp) {
      const passwordResult = isValidPassword.safeParse(password);
      if (!passwordResult.success) {
        setPasswordError(passwordResult.error.issues[0].message);
      } else {
        setPasswordError('');
      }
    }
  }, [password, isSignUp, isValidPassword]);

  const handleAuth = async () => {
    if (isLoading) return;

    const emailResult = isEmail.safeParse(email);
    const passwordResult = isValidPassword.safeParse(password);

    if (!emailResult.success) {
      setEmailError(emailResult.error.issues[0].message);
      return;
    }
    setEmailError('');

    if (!passwordResult.success && isSignUp) {
      setPasswordError(passwordResult.error.issues[0].message);
      return;
    }
    setPasswordError('');

    setIsloading(true);

    let res;
    if (isSignUp) {
      res = await supabase.auth.signUp({ email, password });
    } else {
      res = await supabase.auth.signInWithPassword({ email, password });
    }

    if (res.error) {
      setErrorMessage(res.error.message);
      setAlertType('error');
      setIsloading(false);
    } else {
      setAlertType('success');
    }
    setShowAlert(true);
  };

  return (
    <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8 relative">
      <Alert
        className="rounded-none sm:rounded-md absolute top-0 left-1/2 -translate-x-1/2 sm:mx-auto sm:max-w-sm"
        clearable
        onDismiss={() => setShowAlert(false)}
        text={
          alertType === 'success'
            ? 'Successfully signed in, redirecting...'
            : errorMessage
        }
        show={showAlert}
        type={alertType}
      />
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <header className="text-center w-full">
          <h1 className="text-4xl font-mont font-semibold leading-10">
            {isSignUp ? 'Sign Up' : 'Sign In'}
          </h1>
        </header>
        <main>
          <div className="my-4">
            <TextInput
              invalidMessage={emailError}
              invalid={!!emailError}
              hint={isSignUp ? '' : 'Enter the email you used when signing up ✍️'}
              autoFocus
              placeholder="Email"
              type="email"
              value={email}
              label="Email"
              onChange={(e) => {
                setEmail(e.target.value);
              }}
              onKeyDown={(e) => e.key === 'Enter' && handleAuth()}
              disabled={isLoading}
            />
          </div>
          <div className="my-4">
            <TextInput
              invalidMessage={passwordError}
              invalid={!!passwordError}
              hint={isSignUp ? '' : 'Your very secret password 🤫'}
              placeholder="Password"
              type="password"
              value={password}
              label="Password"
              onChange={(e) => {
                setPassword(e.target.value);
              }}
              onKeyDown={(e) => e.key === 'Enter' && handleAuth()}
              disabled={isLoading}
            />
          </div>
          <div className="flex items-center justify-center my-8 mx-0">
            <Button
              className="w-full"
              size="lg"
              onClick={handleAuth}
              disabled={isLoading}
            >
              {isSignUp ? 'Sign Up' : 'Sign In'}
            </Button>
          </div>
          <footer>
            <div className="flex items-center justify-center">
              <span className="font-noto text-sm text-neutral-50">
                {isSignUp ? 'Already have an account? ' : "Don't have an account? "}
                <span
                  className="font-noto text-sm link whitespace-nowrap"
                  onClick={() => setIsSignUp(!isSignUp)}
                >
                  {isSignUp ? `Sign In` : `Sign Up`}
                </span>
              </span>
            </div>
          </footer>
        </main>
      </div>
    </div>
  );
}

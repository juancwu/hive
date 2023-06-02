'use client';

import { useEffect, useState } from 'react';
import { z } from 'zod';
import { useSupabase } from '@/providers/supabase-provider';
import { TextInput, Button } from '@/ui/client';

export default function Auth() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [error, setError] = useState('');
  const [isSignUp, setIsSignUp] = useState(false);
  const [isLoading, setIsloading] = useState(false);

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
    setError('');
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

    if (!passwordResult.success && isSignUp) {
      setPasswordError(passwordResult.error.issues[0].message);
      return;
    }

    setIsloading(true);

    let res;
    if (isSignUp) {
      res = await supabase.auth.signUp({ email, password });
    } else {
      res = await supabase.auth.signInWithPassword({ email, password });
    }

    if (res.error) {
      setError(res.error.message);
      setIsloading(false);
    }
  };

  return (
    <div className="h-full flex items-center justify-center">
      <div className="min-w-[360px] max-w-[360px]">
        <header className="text-center w-full">
          <h1 className="text-4xl font-mont font-semibold leading-10">
            {isSignUp ? 'Sign Up' : 'Sign In'}
          </h1>
          {error && (
            <span className="font-noto block text-sm text-red-400 my-1">{error}</span>
          )}
        </header>
        <main>
          <div className="my-4">
            <TextInput
              autoFocus
              placeholder="Email"
              type="email"
              value={email}
              hasError={!!emailError}
              errorMessage={emailError}
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
              placeholder="Password"
              type="password"
              value={password}
              hasError={!!passwordError}
              errorMessage={passwordError}
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
              className="w-40 h-14"
              onClick={handleAuth}
              intent="gradient"
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
                  className="font-noto text-sm link"
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

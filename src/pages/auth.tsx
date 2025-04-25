import React, { useState, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { useSignIn, useSignUp } from '@clerk/clerk-react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useErrorHandler } from '@/hooks/use-error-handler';
import { ErrorCategory } from '@/lib/errors';

export default function AuthPage() {
  const [searchParams] = useSearchParams();
  const [isSignIn, setIsSignIn] = useState(searchParams.get('mode') !== 'signup');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [oauthLoading, setOAuthLoading] = useState<string | null>(null);
  
  const navigate = useNavigate();
  const { signIn, setActive: setSignInActive } = useSignIn();
  const { signUp, setActive: setSignUpActive } = useSignUp();
  const { handleError } = useErrorHandler({
    defaultCategory: ErrorCategory.AUTH
  });

  // Update mode when URL params change
  useEffect(() => {
    setIsSignIn(searchParams.get('mode') !== 'signup');
    // Clear form when switching modes
    setEmail('');
    setPassword('');
  }, [searchParams]);

  // Handle OAuth redirect cleanup
  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.visibilityState === 'visible' && oauthLoading) {
        // If we return to the page and OAuth was in progress, it was likely cancelled
        setOAuthLoading(null);
        // Use createAndHandleError for user-facing info/warning messages not tied to a caught error
        // Alternatively, could just let this be silent or use a non-error toast.
        // For now, let's comment this out as the original didn't show a toast here.
        // handleError(new Error('Authentication was cancelled')); // Was: setError('Authentication was cancelled');
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);
    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, [oauthLoading]);

  const handleOAuthSignIn = async (provider: 'oauth_github' | 'oauth_google') => {
    try {
      setOAuthLoading(provider);
      // setError(''); // Removed error state update

      if (!signIn) {
        throw new Error("Sign in is not initialized");
      }

      await signIn.authenticateWithRedirect({
        strategy: provider,
        redirectUrl: window.location.origin + '/auth/callback',
        redirectUrlComplete: '/',
      });
    } catch (err) {
      // Use error handler hook
      await handleError(err);
      setOAuthLoading(null);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // setError(''); // Removed error state update
    setIsLoading(true);

    try {
      if (isSignIn) {
        if (!signIn) {
          throw new Error("Sign in is not initialized");
        }
        const result = await signIn.create({
          identifier: email,
          password,
        });
        
        if (result.status === "complete") {
          await setSignInActive({ session: result.createdSessionId });
          navigate('/');
        } else {
          throw new Error("Something went wrong during sign in");
        }
      } else {
        if (!signUp) {
          throw new Error("Sign up is not initialized");
        }
        const result = await signUp.create({
          emailAddress: email,
          password,
        });

        if (result.status === "complete") {
          await setSignUpActive({ session: result.createdSessionId });
          navigate('/');
        } else {
          throw new Error("Something went wrong during sign up");
        }
      }
    } catch (err) {
      // Use error handler hook
      await handleError(err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex-1 flex items-center justify-center">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl text-center">
            {isSignIn ? 'Sign In' : 'Sign Up'}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4">
            <div className="grid gap-2">
              <Button
                variant="outline"
                type="button"
                disabled={!!oauthLoading}
                onClick={() => handleOAuthSignIn('oauth_github')}
                className="w-full"
              >
                <svg className="mr-2 h-4 w-4" viewBox="0 0 24 24">
                  <path fill="currentColor" d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385c.6.105.825-.255.825-.57c0-.285-.015-1.23-.015-2.235c-3.015.555-3.795-.735-4.035-1.41c-.135-.345-.72-1.41-1.23-1.695c-.42-.225-1.02-.78-.015-.795c.945-.015 1.62.87 1.845 1.23c1.08 1.815 2.805 1.305 3.495.99c.105-.78.42-1.305.765-1.605c-2.67-.3-5.46-1.335-5.46-5.925c0-1.305.465-2.385 1.23-3.225c-.12-.3-.54-1.53.12-3.18c0 0 1.005-.315 3.3 1.23c.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23c.66 1.65.24 2.88.12 3.18c.765.84 1.23 1.905 1.23 3.225c0 4.605-2.805 5.625-5.475 5.925c.435.375.81 1.095.81 2.22c0 1.605-.015 2.895-.015 3.3c0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z" />
                </svg>
                {oauthLoading === 'oauth_github' ? 'Loading...' : 'Continue with GitHub'}
              </Button>
              <Button
                variant="outline"
                type="button"
                disabled={!!oauthLoading}
                onClick={() => handleOAuthSignIn('oauth_google')}
                className="w-full"
              >
                <svg className="mr-2 h-4 w-4" viewBox="0 0 24 24">
                  <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                  <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                  <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                  <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                </svg>
                {oauthLoading === 'oauth_google' ? 'Loading...' : 'Continue with Google'}
              </Button>
            </div>
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t border-border" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-card px-2 text-muted-foreground">
                  Or continue with email
                </span>
              </div>
            </div>
            <form onSubmit={handleSubmit} className="grid gap-4">
              <div className="grid gap-2">
                <label htmlFor="email" className="text-sm font-medium leading-none text-foreground">
                  Email
                </label>
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  autoComplete="email"
                  required
                />
              </div>
              <div className="grid gap-2">
                <label htmlFor="password" className="text-sm font-medium leading-none text-foreground">
                  Password
                </label>
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  autoComplete={isSignIn ? "current-password" : "new-password"}
                  required
                />
              </div>
              <Button type="submit" disabled={isLoading}>
                {isLoading ? 'Loading...' : isSignIn ? 'Sign In' : 'Sign Up'}
              </Button>
            </form>
            <div className="text-center text-sm text-muted-foreground">
              {isSignIn ? "Don't have an account?" : "Already have an account?"}{' '}
              <Button
                variant="link"
                className="px-0"
                onClick={() => setIsSignIn(!isSignIn)}
              >
                {isSignIn ? 'Sign Up' : 'Sign In'}
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
} 
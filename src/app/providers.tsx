"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { createContext, useContext, useState, useEffect } from "react";
import { ThemeProvider } from "next-themes";
import { supabase } from "@/lib/supabase";
import { Session, AuthError, AuthChangeEvent } from "@supabase/supabase-js";

// Create a React Query client
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 60 * 1000, // 1 minute
      refetchOnWindowFocus: false,
    },
  },
});

// Theme context
type ThemeContextType = {
  isDarkMode: boolean;
  toggleDarkMode: () => void;
};

const ThemeContext = createContext<ThemeContextType>({
  isDarkMode: false,
  toggleDarkMode: () => {},
});

export const useTheme = () => useContext(ThemeContext);

// Auth context
type User = {
  id: string;
  email: string;
  role: "business" | "admin";
} | null;

type AuthContextType = {
  user: User;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (email: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
};

const AuthContext = createContext<AuthContextType>({
  user: null,
  loading: true,
  signIn: async () => {},
  signUp: async () => {},
  signOut: async () => {},
});

export const useAuth = () => useContext(AuthContext);

export function Providers({ children }: { children: React.ReactNode }) {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [user, setUser] = useState<User>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check active sessions and sets the user
    supabase.auth.getSession().then(({ data: { session } }: { data: { session: Session | null } }) => {
      if (session?.user) {
        setUser({
          id: session.user.id,
          email: session.user.email!,
          role: "business", // This should come from your user metadata
        });
      }
      setLoading(false);
    });

    // Listen for changes on auth state (sign in, sign out, etc.)
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event: AuthChangeEvent, session: Session | null) => {
        if (session?.user) {
          setUser({
            id: session.user.id,
            email: session.user.email!,
            role: "business", // This should come from your user metadata
          });
        } else {
          setUser(null);
        }
        setLoading(false);
      }
    );

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
  };

  const signIn = async (email: string, password: string) => {
    try {
      setLoading(true);
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      if (error) throw error;
      // User will be set by the auth state change listener
    } catch (error) {
      console.error("Error signing in:", error);
      throw error as AuthError;
    } finally {
      setLoading(false);
    }
  };

  const signUp = async (email: string, password: string) => {
    try {
      setLoading(true);
      const { error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            role: "business",
          },
        },
      });
      if (error) throw error;
      // User will be set by the auth state change listener
    } catch (error) {
      console.error("Error signing up:", error);
      throw error as AuthError;
    } finally {
      setLoading(false);
    }
  };

  const signOut = async () => {
    try {
      setLoading(true);
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
      // User will be set by the auth state change listener
    } catch (error) {
      console.error("Error signing out:", error);
      throw error as AuthError;
    } finally {
      setLoading(false);
    }
  };

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
        <ThemeContext.Provider value={{ isDarkMode, toggleDarkMode }}>
          <AuthContext.Provider value={{ user, loading, signIn, signUp, signOut }}>
            {children}
          </AuthContext.Provider>
        </ThemeContext.Provider>
      </ThemeProvider>
    </QueryClientProvider>
  );
}

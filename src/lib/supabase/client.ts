import { createBrowserClient } from '@supabase/ssr'

export function createClient() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
  const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

  // Return a mock client if env vars are not set
  if (!supabaseUrl || !supabaseKey) {
    console.warn('Supabase environment variables not configured. Auth features will be disabled.')
    return {
      auth: {
        getSession: () => Promise.resolve({ data: { session: null } }),
        getUser: () => Promise.resolve({ data: { user: null } }),
        signInWithPassword: () => Promise.resolve({ error: new Error('Supabase not configured') }),
        signUp: () => Promise.resolve({ error: new Error('Supabase not configured') }),
        signOut: () => Promise.resolve({ error: null }),
        onAuthStateChange: () => ({ data: { subscription: { unsubscribe: () => {} } } }),
      },
    } as ReturnType<typeof createBrowserClient>
  }

  return createBrowserClient(supabaseUrl, supabaseKey)
}

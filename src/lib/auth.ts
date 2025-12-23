import { useState, useCallback, useEffect } from 'react'

// ============================================================================
// Types - Compatible with Better Auth's user schema
// ============================================================================

export interface User {
  id: string
  name: string
  email: string
  image?: string | null
  emailVerified?: boolean
  createdAt?: Date
  updatedAt?: Date
}

export interface Session {
  user: User
  expiresAt: Date
}

export interface UpdateProfileData {
  name?: string
  email?: string
  image?: string | null
}

export interface AuthState {
  user: User | null
  session: Session | null
  isLoading: boolean
  isAuthenticated: boolean
}

export interface AuthActions {
  updateProfile: (data: UpdateProfileData) => Promise<void>
  logout: () => Promise<void>
}

export type UseAuthReturn = AuthState & AuthActions

const MOCK_USER: User = {
  id: 'user_mock_123',
  name: 'John Doe',
  email: 'john@example.com',
  image: null,
  emailVerified: true,
  createdAt: new Date('2024-01-01'),
  updatedAt: new Date(),
}

const MOCK_SESSION: Session = {
  user: MOCK_USER,
  expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 7 days
}

// Simulate network delay
const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms))

export function useAuth(): UseAuthReturn {
  const [user, setUser] = useState<User | null>(MOCK_USER)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    async function simulateDelay() {
      await delay(500)
      setIsLoading(false)
    }

    simulateDelay()
  }, [])

  const updateProfile = useCallback(async (data: UpdateProfileData) => {
    setIsLoading(true)
    try {
      // Mock API call - replace with real auth provider
      await delay(500)
      setUser((prev) =>
        prev
          ? {
              ...prev,
              ...data,
              updatedAt: new Date(),
            }
          : null,
      )
    } finally {
      setIsLoading(false)
    }
  }, [])

  const logout = useCallback(async () => {
    try {
      // Mock API call - replace with real auth provider
      await delay(500)
      setUser(null)
      // In real app: redirect to login, clear tokens, etc.
      console.log('[Auth] User logged out')
    } finally {
      setIsLoading(false)
    }
  }, [])

  return {
    user,
    session: user ? { user, expiresAt: MOCK_SESSION.expiresAt } : null,
    isLoading,
    isAuthenticated: !!user,
    updateProfile,
    logout,
  }
}

// ============================================================================
// Auth Context (Optional) - For app-wide auth state
// ============================================================================
// If you need auth state shared across components, create a context:
//
// import { createContext, useContext, ReactNode } from 'react'
//
// const AuthContext = createContext<UseAuthReturn | null>(null)
//
// export function AuthProvider({ children }: { children: ReactNode }) {
//   const auth = useAuth()
//   return <AuthContext.Provider value={auth}>{children}</AuthContext.Provider>
// }
//
// export function useAuthContext() {
//   const context = useContext(AuthContext)
//   if (!context) throw new Error('useAuthContext must be within AuthProvider')
//   return context
// }

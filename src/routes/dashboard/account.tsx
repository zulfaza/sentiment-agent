import { useState } from 'react'
import { createFileRoute } from '@tanstack/react-router'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Field, FieldLabel } from '@/components/ui/field'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog'
import { Skeleton } from '@/components/ui/skeleton'
import { useAuth } from '@/lib/auth'

export const Route = createFileRoute('/dashboard/account')({
  component: AccountPage,
})

function AccountPage() {
  const { user, isLoading, updateProfile, logout } = useAuth()

  // Loading state - show skeleton
  if (isLoading || !user) {
    return <AccountPageSkeleton />
  }

  // Pass user data as key to reset form state when user changes
  // React docs: "To reset state when a prop changes, use a key"
  return (
    <AccountForm
      key={user.id}
      initialName={user.name}
      initialEmail={user.email}
      onSave={updateProfile}
      onLogout={logout}
    />
  )
}

// Skeleton loading state
function AccountPageSkeleton() {
  return (
    <div className="h-full overflow-y-auto">
      <div className="border-b px-4 py-3 md:px-6">
        <Skeleton className="h-7 w-24" />
        <Skeleton className="mt-1 h-4 w-48" />
      </div>

      <div className="space-y-4 p-4 md:p-6">
        {/* Profile Section Skeleton */}
        <Card>
          <CardHeader>
            <Skeleton className="h-6 w-16" />
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Skeleton className="h-4 w-12" />
              <Skeleton className="h-10 w-full" />
            </div>
            <div className="space-y-2">
              <Skeleton className="h-4 w-12" />
              <Skeleton className="h-10 w-full" />
            </div>
            <Skeleton className="h-10 w-28" />
          </CardContent>
        </Card>

        {/* Logout Section Skeleton */}
        <Card>
          <CardHeader>
            <Skeleton className="h-6 w-16" />
          </CardHeader>
          <CardContent>
            <Skeleton className="mb-4 h-4 w-64" />
            <Skeleton className="h-10 w-20" />
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

interface AccountFormProps {
  initialName: string
  initialEmail: string
  onSave: (data: { name: string; email: string }) => Promise<void>
  onLogout: () => Promise<void>
}

// Separate form component - receives initial values as props
// No useEffect needed! State is initialized directly from props
// If user changes (different user.id), the key prop causes React to remount
function AccountForm({
  initialName,
  initialEmail,
  onSave,
  onLogout,
}: AccountFormProps) {
  const [name, setName] = useState(initialName)
  const [email, setEmail] = useState(initialEmail)
  const [isSaving, setIsSaving] = useState(false)
  const [isLoggingOut, setIsLoggingOut] = useState(false)

  async function handleSave() {
    setIsSaving(true)
    try {
      await onSave({ name, email })
    } finally {
      setIsSaving(false)
    }
  }

  async function handleLogout() {
    setIsLoggingOut(true)
    try {
      await onLogout()
      // In real app: router.navigate({ to: '/login' })
    } finally {
      setIsLoggingOut(false)
    }
  }

  return (
    <div className="h-full overflow-y-auto">
      <div className="border-b px-4 py-3 md:px-6">
        <h1 className="text-lg font-semibold">Account</h1>
        <p className="text-sm text-muted-foreground">
          Manage your account settings
        </p>
      </div>

      <div className="space-y-4 p-4 md:p-6">
        {/* Profile Section */}
        <Card>
          <CardHeader>
            <CardTitle>Profile</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <Field>
              <FieldLabel htmlFor="name">Name</FieldLabel>
              <Input
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Your name"
              />
            </Field>
            <Field>
              <FieldLabel htmlFor="email">Email</FieldLabel>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="your@email.com"
              />
            </Field>
            <Button onClick={handleSave} disabled={isSaving}>
              {isSaving ? 'Saving...' : 'Save Changes'}
            </Button>
          </CardContent>
        </Card>

        {/* Logout Section */}
        <Card>
          <CardHeader>
            <CardTitle>Logout</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="mb-4 text-sm text-muted-foreground">
              Sign out of your account on this device.
            </p>
            <AlertDialog>
              <AlertDialogTrigger
                render={<Button variant="destructive" />}
                disabled={isLoggingOut}
              >
                {isLoggingOut ? 'Logging out...' : 'Logout'}
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                  <AlertDialogDescription>
                    You will be signed out of your account.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction
                    variant="destructive"
                    onClick={handleLogout}
                  >
                    Logout
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

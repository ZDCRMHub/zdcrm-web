import { useState } from 'react'
import { useRequestPasswordReset } from '../api/postPasswordReset'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { AlertCircle } from 'lucide-react'

interface ResetPasswordStep1Props {
  onNext: (email: string) => void;
}

 function ResetPasswordStep1({ onNext }: ResetPasswordStep1Props) {
  const [email, setEmail] = useState('')
  const { mutate, isPending, isError, error } = useRequestPasswordReset()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    mutate({ email }, {
      onSuccess: () => onNext(email)
    })
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="email">Email</Label>
        <Input
          id="email"
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </div>
      {isError && (
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>
            {error instanceof Error ? error.message : 'An error occurred'}
          </AlertDescription>
        </Alert>
      )}
      <Button type="submit" className="w-full" disabled={isPending} size="inputButton">
        {isPending ? 'Sending...' : 'Send Reset Link'}
      </Button>
    </form>
  )
}

export { ResetPasswordStep1 }
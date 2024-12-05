import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { AlertCircle } from 'lucide-react'
import { useVerifyCode } from '../api/postPasswordReset'
import { formatAxiosErrorMessage } from '@/utils/errors'

interface ResetPasswordStep2Props {
  email: string;
  onNext: (otp: string) => void;
}

export function ResetPasswordStep2({ email, onNext }: ResetPasswordStep2Props) {
  const [otp, setotp] = useState('')
  const { mutate, isPending, isError, error } = useVerifyCode()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    mutate({ email, otp }, {
      onSuccess: () => onNext(otp)
    })
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="otp">Verification otp</Label>
        <Input
          id="otp"
          type="text"
          placeholder="Enter verification otp"
          value={otp}
          onChange={(e) => setotp(e.target.value)}
          required
        />
      </div>
      {isError && (
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>
            {error instanceof Error ? formatAxiosErrorMessage(error as any) || error.message : 'An error occurred'}
          </AlertDescription>
        </Alert>
      )}
      <Button type="submit" className="w-full" disabled={isPending} size="inputButton">
        {isPending ? 'Verifying...' : 'Verify otp'}
      </Button>
    </form>
  )
}


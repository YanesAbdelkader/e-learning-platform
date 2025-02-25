"use client"

import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { useToast } from "@/hooks/use-toast"

export function EmailVerification({ email, updateFormData, setIsEmailVerified, sendVerificationCode, verifyEmail }) {
  const [verificationCode, setVerificationCode] = useState("")
  const [isSendingCode, setIsSendingCode] = useState(false)
  const [isVerifying, setIsVerifying] = useState(false)
  const { toast } = useToast()

  const handleSendVerificationCode = async () => {
    if (!email) {
      toast({
        title: "Error",
        description: "Please enter your email address.",
        variant: "destructive",
      })
      return
    }

    setIsSendingCode(true)
    const formData = new FormData()
    formData.append("email", email)
    const result = await sendVerificationCode(null, formData)
    setIsSendingCode(false)

    if (result.success) {
      toast({
        title: "Verification code sent",
        description: result.message,
      })
    } else {
      toast({
        title: "Error",
        description: result.error,
        variant: "destructive",
      })
    }
  }

  const handleVerifyCode = async () => {
    setIsVerifying(true)
    const formData = new FormData()
    formData.append("email", email)
    formData.append("code", verificationCode)
    const result = await verifyEmail(null, formData)
    setIsVerifying(false)

    if (result.success) {
      toast({
        title: "Email verified",
        description: result.message,
      })
      setIsEmailVerified(true)
    } else {
      toast({
        title: "Error",
        description: result.error,
        variant: "destructive",
      })
    }
  }

  return (
    <div className="space-y-4">
      <div>
        <Label htmlFor="email">Email</Label>
        <Input
          id="email"
          type="email"
          value={email}
          onChange={(e) => updateFormData({ email: e.target.value })}
          required
        />
      </div>
      <Button type="button" onClick={handleSendVerificationCode} disabled={isSendingCode}>
        {isSendingCode ? "Sending..." : "Send Verification Code"}
      </Button>
      <div>
        <Label htmlFor="verificationCode">Verification Code</Label>
        <Input
          id="verificationCode"
          value={verificationCode}
          onChange={(e) => setVerificationCode(e.target.value)}
          required
        />
      </div>
      <Button type="button" onClick={handleVerifyCode} disabled={isVerifying}>
        {isVerifying ? "Verifying..." : "Verify"}
      </Button>
    </div>
  )
}


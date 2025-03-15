"use client"

import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { StepProps } from "../_components/signup-types"

interface PersonalInfoStepProps extends StepProps {
  passwordError: string
  setPasswordError: (error: string) => void
}

export default function PersonalInfoStep({
  formData,
  updateFormData,
  passwordError,
  setPasswordError,
}: PersonalInfoStepProps) {
  const validatePassword = (password: string, confirmPassword: string) => {
    if (password && confirmPassword) {
      if (password !== confirmPassword) {
        setPasswordError("Passwords do not match")
      } else if (password.length < 8) {
        setPasswordError("Password must be at least 8 characters")
      } else {
        setPasswordError("")
      }
    }
  }

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="name">First Name</Label>
          <Input
            id="name"
            placeholder="First Name"
            value={formData.name}
            onChange={(e) => updateFormData({ name: e.target.value })}
            required
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="lastname">Last Name</Label>
          <Input
            id="lastname"
            placeholder="Last Name"
            value={formData.lastname}
            onChange={(e) => updateFormData({ lastname: e.target.value })}
            required
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="password">Password</Label>
        <Input
          id="password"
          type="password"
          placeholder="Create a password (min. 8 characters)"
          value={formData.password}
          onChange={(e) => {
            const newPassword = e.target.value
            updateFormData({ password: newPassword })
            if (formData.confirmPassword) {
              validatePassword(newPassword, formData.confirmPassword)
            }
          }}
          required
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="confirmPassword">Confirm Password</Label>
        <Input
          id="confirmPassword"
          type="password"
          placeholder="Confirm your password"
          value={formData.confirmPassword}
          onChange={(e) => {
            const newConfirmPassword = e.target.value
            updateFormData({ confirmPassword: newConfirmPassword })
            if (formData.password) {
              validatePassword(formData.password, newConfirmPassword)
            }
          }}
          required
        />

        {passwordError && <p className="text-sm text-red-500">{passwordError}</p>}
      </div>
    </div>
  )
}


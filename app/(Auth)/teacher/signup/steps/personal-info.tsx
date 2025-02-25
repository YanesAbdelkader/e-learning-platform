import type React from "react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export function PersonalInfo({ formData, updateFormData }) {
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        updateFormData({ picture: reader.result as string })
      }
      reader.readAsDataURL(file)
    }
  }

  return (
    <div className="space-y-4">
      <div>
        <Label htmlFor="name">Name</Label>
        <Input
          id="name"
          name="name"
          value={formData.name}
          onChange={(e) => updateFormData({ name: e.target.value })}
          required
        />
      </div>
      <div>
        <Label htmlFor="lastname">Last Name</Label>
        <Input
          id="lastname"
          name="lastname"
          value={formData.lastname}
          onChange={(e) => updateFormData({ lastname: e.target.value })}
          required
        />
      </div>
      <div>
        <Label htmlFor="password">Password</Label>
        <Input
          id="password"
          name="password"
          type="password"
          value={formData.password}
          onChange={(e) => updateFormData({ password: e.target.value })}
          required
        />
      </div>
      <div>
        <Label htmlFor="picture">Profile Picture</Label>
        <Input id="picture" name="picture" type="file" accept="image/*" onChange={handleFileChange} required />
      </div>
    </div>
  )
}


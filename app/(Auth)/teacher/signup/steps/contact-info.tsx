import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export function ContactInfo({ formData, updateFormData }) {
  return (
    <div className="space-y-4">
      <div>
        <Label htmlFor="contactInfo">Contact Information</Label>
        <Input
          id="contactInfo"
          name="contactInfo"
          value={formData.contactInfo}
          onChange={(e) => updateFormData({ contactInfo: e.target.value })}
          required
        />
      </div>
    </div>
  )
}


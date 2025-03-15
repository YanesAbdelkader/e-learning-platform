"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card } from "@/components/ui/card"
import { Plus, Trash2, X } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import { StepProps } from "../_components/signup-types"

export default function ProfessionalInfoStep({ formData, updateFormData }: StepProps) {
  const [newSubject, setNewSubject] = useState("")
  const [newCertification, setNewCertification] = useState("")
  const { toast } = useToast()

  // Handle adding a subject
  const handleAddSubject = () => {
    if (newSubject && !formData.subjects.includes(newSubject)) {
      const updatedSubjects = [...formData.subjects, newSubject]
      updateFormData({ subjects: updatedSubjects })
      setNewSubject("")
      toast({
        title: "Subject added",
        description: `"${newSubject}" has been added to your subjects.`,
      })
    } else if (formData.subjects.includes(newSubject)) {
      toast({
        title: "Subject already exists",
        description: "This subject is already in your list.",
        variant: "destructive",
      })
    }
  }

  // Handle removing a subject
  const handleRemoveSubject = (index: number) => {
    const updatedSubjects = formData.subjects.filter((_, i) => i !== index)
    updateFormData({ subjects: updatedSubjects })
  }

  // Handle adding a certification
  const handleAddCertification = () => {
    if (newCertification && !formData.certifications.includes(newCertification)) {
      const updatedCertifications = [...formData.certifications, newCertification]
      updateFormData({ certifications: updatedCertifications })
      setNewCertification("")
      toast({
        title: "Certification added",
        description: `"${newCertification}" has been added to your certifications.`,
      })
    } else if (formData.certifications.includes(newCertification)) {
      toast({
        title: "Certification already exists",
        description: "This certification is already in your list.",
        variant: "destructive",
      })
    }
  }

  // Handle removing a certification
  const handleRemoveCertification = (index: number) => {
    const updatedCertifications = formData.certifications.filter((_, i) => i !== index)
    updateFormData({ certifications: updatedCertifications })
  }

  // Handle adding education
  const handleAddEducation = () => {
    const updatedEducation = [...formData.education, { year: "", place: "", certificate: "" }]
    updateFormData({ education: updatedEducation })
    toast({
      title: "Education entry added",
      description: "Please fill in the details for your education.",
    })
  }

  // Handle updating education
  const handleUpdateEducation = (index: number, field: string, value: string) => {
    const updatedEducation = [...formData.education]
    updatedEducation[index] = { ...updatedEducation[index], [field]: value }
    updateFormData({ education: updatedEducation })
  }

  // Handle removing education
  const handleRemoveEducation = (index: number) => {
    const updatedEducation = formData.education.filter((_, i) => i !== index)
    updateFormData({ education: updatedEducation })
  }

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <Label>Subjects You Teach</Label>
        <div className="flex space-x-2">
          <Input placeholder="Add a subject" value={newSubject} onChange={(e) => setNewSubject(e.target.value)} />
          <Button type="button" onClick={handleAddSubject} disabled={!newSubject}>
            <Plus className="h-4 w-4" />
          </Button>
        </div>

        <div className="flex flex-wrap gap-2 mt-2">
          {formData.subjects.map((subject, index) => (
            <div key={index} className="flex items-center bg-muted px-3 py-1 rounded-full">
              <span>{subject}</span>
              <Button
                type="button"
                variant="ghost"
                size="icon"
                className="h-6 w-6 ml-1"
                onClick={() => handleRemoveSubject(index)}
              >
                <X className="h-3 w-3" />
              </Button>
            </div>
          ))}
        </div>
      </div>

      <div className="space-y-2">
        <Label>Certifications</Label>
        <div className="flex space-x-2">
          <Input
            placeholder="Add a certification"
            value={newCertification}
            onChange={(e) => setNewCertification(e.target.value)}
          />
          <Button type="button" onClick={handleAddCertification} disabled={!newCertification}>
            <Plus className="h-4 w-4" />
          </Button>
        </div>

        <div className="flex flex-wrap gap-2 mt-2">
          {formData.certifications.map((cert, index) => (
            <div key={index} className="flex items-center bg-muted px-3 py-1 rounded-full">
              <span>{cert}</span>
              <Button
                type="button"
                variant="ghost"
                size="icon"
                className="h-6 w-6 ml-1"
                onClick={() => handleRemoveCertification(index)}
              >
                <X className="h-3 w-3" />
              </Button>
            </div>
          ))}
        </div>
      </div>

      <div className="space-y-2">
        <div className="flex justify-between items-center">
          <Label>Education</Label>
          <Button type="button" variant="outline" size="sm" onClick={handleAddEducation}>
            <Plus className="h-4 w-4 mr-1" /> Add Education
          </Button>
        </div>

        <div className="space-y-4">
          {formData.education.map((edu, index) => (
            <Card key={index} className="p-4 relative">
              <Button
                type="button"
                variant="destructive"
                size="icon"
                className="absolute top-2 right-2 h-6 w-6"
                onClick={() => handleRemoveEducation(index)}
              >
                <Trash2 className="h-4 w-4" />
              </Button>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
                <div className="space-y-2">
                  <Label htmlFor={`year-${index}`}>Year</Label>
                  <Input
                    id={`year-${index}`}
                    placeholder="Year"
                    value={edu.year}
                    onChange={(e) => handleUpdateEducation(index, "year", e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor={`place-${index}`}>Institution</Label>
                  <Input
                    id={`place-${index}`}
                    placeholder="Institution"
                    value={edu.place}
                    onChange={(e) => handleUpdateEducation(index, "place", e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor={`certificate-${index}`}>Degree/Certificate</Label>
                  <Input
                    id={`certificate-${index}`}
                    placeholder="Degree/Certificate"
                    value={edu.certificate}
                    onChange={(e) => handleUpdateEducation(index, "certificate", e.target.value)}
                  />
                </div>
              </div>
            </Card>
          ))}

          {formData.education.length === 0 && (
            <p className="text-sm text-muted-foreground">Add your educational background</p>
          )}
        </div>
      </div>
    </div>
  )
}


"use client"

import type React from "react"

import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"

export function EducationCertifications({ formData, updateFormData }) {
  const [education, setEducation] = useState(formData.education)
  const [certifications, setCertifications] = useState(formData.certifications)

  const handleAddEducation = () => {
    setEducation([...education, { year: "", place: "", certificate: "" }])
  }

  const handleEducationChange = (index: number, field: string, value: string) => {
    const newEducation = [...education]
    newEducation[index][field] = value
    setEducation(newEducation)
    updateFormData({ education: newEducation })
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (files) {
      const newCertifications = [...certifications]
      for (let i = 0; i < files.length; i++) {
        const reader = new FileReader()
        reader.onloadend = () => {
          newCertifications.push(reader.result as string)
          setCertifications(newCertifications)
          updateFormData({ certifications: newCertifications })
        }
        reader.readAsDataURL(files[i])
      }
    }
  }

  return (
    <div className="space-y-4">
      <div>
        <Label>Education</Label>
        {education.map((edu, index) => (
          <div key={index} className="flex space-x-2 mt-2">
            <Input
              placeholder="Year"
              value={edu.year}
              onChange={(e) => handleEducationChange(index, "year", e.target.value)}
            />
            <Input
              placeholder="Place"
              value={edu.place}
              onChange={(e) => handleEducationChange(index, "place", e.target.value)}
            />
            <Input
              placeholder="Certificate"
              value={edu.certificate}
              onChange={(e) => handleEducationChange(index, "certificate", e.target.value)}
            />
          </div>
        ))}
        <Button type="button" onClick={handleAddEducation} className="mt-2">
          Add Education
        </Button>
      </div>
      <div>
        <Label htmlFor="certifications">Certifications (PDF files)</Label>
        <Input
          id="certifications"
          name="certifications"
          type="file"
          accept=".pdf"
          multiple
          onChange={handleFileChange}
        />
      </div>
    </div>
  )
}


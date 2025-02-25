"use client"

import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"

export function AdditionalInfo({ formData, updateFormData }) {
  const [subjects, setSubjects] = useState(formData.subjects)
  const [links, setLinks] = useState(formData.links)

  const handleAddSubject = () => {
    setSubjects([...subjects, ""])
    updateFormData({ subjects: [...subjects, ""] })
  }

  const handleSubjectChange = (index: number, value: string) => {
    const newSubjects = [...subjects]
    newSubjects[index] = value
    setSubjects(newSubjects)
    updateFormData({ subjects: newSubjects })
  }

  const handleAddLink = () => {
    setLinks([...links, ""])
    updateFormData({ links: [...links, ""] })
  }

  const handleLinkChange = (index: number, value: string) => {
    const newLinks = [...links]
    newLinks[index] = value
    setLinks(newLinks)
    updateFormData({ links: newLinks })
  }

  return (
    <div className="space-y-4">
      <div>
        <Label>Subjects</Label>
        {subjects.map((subject, index) => (
          <Input
            key={index}
            value={subject}
            onChange={(e) => handleSubjectChange(index, e.target.value)}
            className="mt-2"
          />
        ))}
        <Button type="button" onClick={handleAddSubject} className="mt-2">
          Add Subject
        </Button>
      </div>
      <div>
        <Label>Website Profile Links</Label>
        {links.map((link, index) => (
          <Input key={index} value={link} onChange={(e) => handleLinkChange(index, e.target.value)} className="mt-2" />
        ))}
        <Button type="button" onClick={handleAddLink} className="mt-2">
          Add Link
        </Button>
      </div>
      <div>
        <Label htmlFor="bio">Bio</Label>
        <Textarea
          id="bio"
          name="bio"
          value={formData.bio}
          onChange={(e) => updateFormData({ bio: e.target.value })}
          rows={4}
        />
      </div>
    </div>
  )
}


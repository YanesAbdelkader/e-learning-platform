import { Briefcase } from "lucide-react"
import type { Education } from "../_types/teacher"

interface TeacherBioProps {
  bio: string
  education: Education[]
}

export default function TeacherBio({ bio, education }: TeacherBioProps) {
  return (
    <>
      <h3 className="text-lg font-semibold">About</h3>
      <div className="space-y-4 text-muted-foreground">
        {bio.split("\n").map((paragraph, index) => (
          <p key={index}>{paragraph}</p>
        ))}
      </div>

      {education.length > 0 && (
        <div className="pt-4">
          <h3 className="text-lg font-semibold mb-2">Education</h3>
          <ul className="space-y-2">
            {education.map((edu, index) => (
              <li key={index} className="flex items-start gap-2">
                <Briefcase className="w-5 h-5 text-muted-foreground mt-0.5" />
                <div>
                  <p className="font-medium">{edu.degree}</p>
                  <p className="text-sm text-muted-foreground">
                    {edu.institution}, {edu.year}
                  </p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}
    </>
  )
}


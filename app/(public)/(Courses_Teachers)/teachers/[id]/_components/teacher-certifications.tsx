import { Award } from "lucide-react"

interface TeacherCertificationsProps {
  certifications: string[]
}

export default function TeacherCertifications({ certifications }: TeacherCertificationsProps) {
  if (!certifications.length) {
    return (
      <div className="text-muted-foreground italic">
        No certifications listed.
      </div>
    )
  }

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold">Certifications</h3>
      <ul className="space-y-3">
        {certifications.map((certification, index) => (
          <li 
            key={index} 
            className="flex items-start gap-3"
          >
            <Award 
              className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" 
            />
            <span className="leading-relaxed">
              {certification}
            </span>
          </li>
        ))}
      </ul>
    </div>
  )
}
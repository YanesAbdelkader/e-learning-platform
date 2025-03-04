import { Award } from "lucide-react"

interface TeacherCertificationsProps {
  certifications: string[]
}

export default function TeacherCertifications({ certifications }: TeacherCertificationsProps) {
  if (!certifications.length) return <p>No certifications listed.</p>

  return (
    <>
      <h3 className="text-lg font-semibold">Certifications</h3>
      <ul className="space-y-3">
        {certifications.map((certification, index) => (
          <li key={index} className="flex items-center gap-2">
            <Award className="w-5 h-5 text-green-500" />
            <span>{certification}</span>
          </li>
        ))}
      </ul>
    </>
  )
}


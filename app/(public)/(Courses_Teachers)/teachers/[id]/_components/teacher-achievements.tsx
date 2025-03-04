import { Award, Briefcase } from "lucide-react"
import type { Achievement } from "../_types/teacher"

interface TeacherAchievementsProps {
  achievements: Achievement[]
}

export default function TeacherAchievements({ achievements }: TeacherAchievementsProps) {
  if (!achievements.length) return null

  return (
    <div className="bg-muted/50 rounded-lg p-4">
      <h2 className="text-xl font-semibold mb-4">Achievements</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {achievements.map((achievement, index) => (
          <div key={index} className="flex items-center gap-3">
            {achievement.type === "award" ? (
              <Award className="w-5 h-5 text-amber-500" />
            ) : (
              <Briefcase className="w-5 h-5 text-blue-500" />
            )}
            <span>{achievement.title}</span>
          </div>
        ))}
      </div>
    </div>
  )
}


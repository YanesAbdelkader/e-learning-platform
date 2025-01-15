import { Button } from '@/components/ui/button'

const skills = [
  'All Categories',
  'Development',
  'Business',
  'IT & Software',
  'Design',
  'Marketing',
  'Personal Development',
  'Photography',
]

export default function SkillsSection() {
  return (
    <div className="border-b dark:bg-gray-950">
      <div className="container mx-auto px-4 py-4 overflow-x-auto">
        <div className="flex gap-2">
          {skills.map((skill) => (
            <Button
              key={skill}
              variant="ghost"
              className="whitespace-nowrap"
            >
              {skill}
            </Button>
          ))}
        </div>
      </div>
    </div>
  )
}


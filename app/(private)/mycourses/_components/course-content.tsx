"use client"
import { Play, Check } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import Link from "next/link"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"

interface Lecture {
  title: string
  duration: string
  completed: boolean
}

interface Section {
  title: string
  lectures: Lecture[]
}

interface CourseContentProps {
  sections: Section[]
}

export function CourseContent({ sections }: CourseContentProps) {
  // Calculate total lectures and completed lectures
  const totalLectures = sections.reduce((acc, section) => acc + section.lectures.length, 0)
  const completedLectures = sections.reduce(
    (acc, section) => acc + section.lectures.filter((lecture) => lecture.completed).length,
    0,
  )

  // Calculate progress percentage
  const progressPercentage = Math.round((completedLectures / totalLectures) * 100)

  return (
    <div>
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
        <div>
          <h2 className="text-xl font-semibold">Course Content</h2>
          <p className="text-sm text-muted-foreground">
            {sections.length} sections • {totalLectures} lectures • {completedLectures} completed
          </p>
        </div>
        <div className="flex items-center gap-3">
          <div className="w-48">
            <div className="flex justify-between text-sm mb-1">
              <span>Progress</span>
              <span>{progressPercentage}%</span>
            </div>
            <Progress value={progressPercentage} className="h-2" />
          </div>
          <Button variant="outline" size="sm">
            Expand All
          </Button>
        </div>
      </div>

      <Accordion type="multiple" defaultValue={["section-0"]} className="border rounded-md">
        {sections.map((section, sectionIndex) => {
          // Calculate section progress
          const sectionCompletedLectures = section.lectures.filter((lecture) => lecture.completed).length
          const sectionProgressPercentage = Math.round((sectionCompletedLectures / section.lectures.length) * 100)

          return (
            <AccordionItem key={sectionIndex} value={`section-${sectionIndex}`} className="border-b last:border-0">
              <AccordionTrigger className="px-4 py-3 hover:no-underline hover:bg-muted/50">
                <div className="flex flex-col md:flex-row md:items-center justify-between w-full text-left gap-2">
                  <div>
                    <h3 className="font-medium">
                      Section {sectionIndex + 1}: {section.title}
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      {section.lectures.length} lectures • {sectionCompletedLectures} completed
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-20 h-1.5 bg-muted rounded-full overflow-hidden">
                      <div className="h-full bg-primary" style={{ width: `${sectionProgressPercentage}%` }} />
                    </div>
                    <span className="text-xs text-muted-foreground whitespace-nowrap">
                      {sectionProgressPercentage}%
                    </span>
                  </div>
                </div>
              </AccordionTrigger>
              <AccordionContent className="px-0 pt-0 pb-0">
                <ul className="divide-y">
                  {section.lectures.map((lecture, lectureIndex) => (
                    <li key={lectureIndex} className="flex items-center justify-between p-4 hover:bg-muted/50">
                      <div className="flex items-center gap-3">
                        {lecture.completed ? (
                          <div className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center">
                            <Check className="h-3.5 w-3.5 text-primary" />
                          </div>
                        ) : (
                          <div className="w-6 h-6 rounded-full border border-muted-foreground/30 flex items-center justify-center">
                            <Play className="h-3.5 w-3.5 text-muted-foreground" />
                          </div>
                        )}
                        <div>
                          <p className="font-medium">{lecture.title}</p>
                          <p className="text-xs text-muted-foreground">{lecture.duration}</p>
                        </div>
                      </div>
                      <div>
                        {lecture.completed ? (
                          <Button variant="ghost" size="sm" asChild>
                            <Link href="/course/1/watch">Rewatch</Link>
                          </Button>
                        ) : (
                          <Button variant="ghost" size="sm" asChild>
                            <Link href="/course/1/watch">Start</Link>
                          </Button>
                        )}
                      </div>
                    </li>
                  ))}
                </ul>
              </AccordionContent>
            </AccordionItem>
          )
        })}
      </Accordion>
    </div>
  )
}


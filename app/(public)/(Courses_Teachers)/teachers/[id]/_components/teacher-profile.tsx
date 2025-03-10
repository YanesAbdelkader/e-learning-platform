"use client"

import { useState, useEffect } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import TeacherHeader from "./teacher-header"
import TeacherAchievements from "./teacher-achievements"
import TeacherCourses from "./teacher-courses"
import TeacherBio from "./teacher-bio"
import TeacherCertifications from "./teacher-certifications"
import TeacherContact from "./teacher-contact"
import TeacherSidebar from "./teacher-sidebar"
import { Teacher } from "../_types/teacher"
import { getTeacherProfile } from "../_actions/get-teacher-profile"
import { followTeacher, unfollowTeacher } from "../_actions/follow-teacher"

export default function TeacherProfile({ teacherId }: { teacherId: string }) {
  const [teacher, setTeacher] = useState<Teacher | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [isFollowing, setIsFollowing] = useState(false)

  useEffect(() => {
    const loadTeacher = async () => {
      setIsLoading(true)
      try {
        const data = await getTeacherProfile(teacherId)
        setTeacher(data)
        setIsFollowing(data.isFollowing)
      } catch (error) {
        console.error("Failed to load teacher profile:", error)
      } finally {
        setIsLoading(false)
      }
    }

    loadTeacher()
  }, [teacherId])

  const handleFollowToggle = async () => {
    if (!teacher) return

    try {
      if (isFollowing) {
        await unfollowTeacher(teacher.id)
      } else {
        await followTeacher(teacher.id)
      }
      setIsFollowing(!isFollowing)
    } catch (error) {
      console.error("Failed to update follow status:", error)
    }
  }

  if (isLoading) {
    return <div className="container mx-auto px-4 py-8">Loading...</div>
  }

  if (!teacher) {
    return <div className="container mx-auto px-4 py-8">Teacher not found</div>
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Main Profile Section */}
        <div className="md:col-span-2 space-y-6">
          <TeacherHeader teacher={teacher} isFollowing={isFollowing} onFollowToggle={handleFollowToggle} />

          <TeacherAchievements achievements={teacher.achievements} />

          <Tabs defaultValue="courses">
            <TabsList className="grid grid-cols-4 w-full">
              <TabsTrigger value="courses">Courses</TabsTrigger>
              <TabsTrigger value="bio">Bio</TabsTrigger>
              <TabsTrigger value="certifications">Certifications</TabsTrigger>
              <TabsTrigger value="contact">Contact</TabsTrigger>
            </TabsList>

            <TabsContent value="courses" className="space-y-4 pt-4">
              <TeacherCourses courses={teacher.topCourses} totalCourses={teacher.courseCount} />
            </TabsContent>

            <TabsContent value="bio" className="space-y-4 pt-4">
              <TeacherBio bio={teacher.bio} education={teacher.education} />
            </TabsContent>

            <TabsContent value="certifications" className="space-y-4 pt-4">
              <TeacherCertifications certifications={teacher.certifications} />
            </TabsContent>

            <TabsContent value="contact" className="space-y-4 pt-4">
              <TeacherContact contactInfo={teacher.contactInfo} socialLinks={teacher.socialLinks} />
            </TabsContent>
          </Tabs>
        </div>

        {/* Sidebar */}
        <TeacherSidebar subjects={teacher.subjects} teacherId={teacher.id} />
      </div>
    </div>
  )
}


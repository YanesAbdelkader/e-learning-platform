import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import TeacherHeader from "./teacher-header";
import TeacherBio from "./teacher-bio";
import TeacherCertifications from "./teacher-certifications";
import TeacherContact from "./teacher-contact";
import TeacherSidebar from "./teacher-sidebar";
import { Course, Teacher } from "../_types/teacher";

interface TeacherProfileProps {
  teacher: Teacher;
  coursesData: Course[];
}

export default function TeacherProfile({
  teacher,
  coursesData,
}: TeacherProfileProps) {
  if (!teacher) {
    return (
      <div className="container mx-auto px-4 py-8 text-center">
        <div className="bg-muted p-4 rounded-lg inline-block">
          Teacher not found
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Main Profile Section */}
        <div className="md:col-span-2 space-y-6">
          <TeacherHeader teacher={teacher} />

          <Tabs defaultValue="bio" className="w-full">
            <TabsList className="grid w-full grid-cols-2 md:grid-cols-3">
              <TabsTrigger value="bio">Bio</TabsTrigger>
              <TabsTrigger value="certifications">Certifications</TabsTrigger>
              <TabsTrigger value="contact">Contact</TabsTrigger>
            </TabsList>

            <TabsContent value="bio" className="space-y-4 pt-4">
              <TeacherBio bio={teacher.bio} education={teacher.education} />
            </TabsContent>

            <TabsContent value="certifications" className="space-y-4 pt-4">
              <TeacherCertifications certifications={teacher.certifications} />
            </TabsContent>

            <TabsContent value="contact" className="space-y-4 pt-4">
              <TeacherContact
                contactInfo={teacher.contactInfo}
                socialLinks={teacher.socialLinks}
              />
            </TabsContent>
          </Tabs>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          <TeacherSidebar
            subjects={teacher.subjects}
            recommendedCourses={coursesData}
          />
        </div>
      </div>
    </div>
  );
}

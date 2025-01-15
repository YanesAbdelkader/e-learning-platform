import BestTeachers from "@/components/BestTeachers";
import CourseGrid from "@/components/CourseGrid";
import SkillsSection from "@/components/SkillsSection";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Award, BookOpen, Users, Zap } from "lucide-react";

export default function Home() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-purple-900 text-white">
        <div className="container mx-auto px-4 py-16">
          <div className="max-w-2xl mx-auto text-center space-y-6">
            <h1 className="text-4xl lg:text-6xl font-bold">
              Skills that drive you forward
            </h1>
            <p className="text-lg opacity-90">
              Build your future with the skills that matter most. Learn at your
              own pace with expert-led courses.
            </p>
            <Button
              size="lg"
              className="bg-white text-purple-900 hover:bg-gray-100"
            >
              Explore Courses
            </Button>
          </div>
        </div>
      </section>

      {/* Skills Categories */}
      <SkillsSection />

      {/* Featured Courses */}
      <section className="py-12 bg-gray-50 dark:bg-gray-950">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-8">Featured Courses</h2>
          <CourseGrid />
        </div>
      </section>

      {/* Best Teachers */}
      <section className="py-12 dark:bg-gray-900">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-8">Learn from the Best</h2>
          <BestTeachers />
        </div>
      </section>

      {/* Enhanced Description Section */}
      <section className="py-16 bg-gray-50 dark:bg-gray-950">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center space-y-6 mb-12">
            <h2 className="text-3xl font-bold">Why Choose Our Platform?</h2>
            <p className="text-lg text-gray-600 dark:text-white">
              Our e-learning platform offers a unique blend of expert
              instruction, cutting-edge courses, and a supportive learning
              community. Whether you&apos;re looking to advance your career,
              explore a new hobby, or gain valuable skills, we have the
              resources to help you succeed.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BookOpen className="w-5 h-5 text-purple-600" />
                  Expert Instructors
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  Learn from industry professionals and thought leaders in their
                  respective fields.
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Users className="w-5 h-5 text-purple-600" />
                  Diverse Course Catalog
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  Explore a wide range of subjects, from technology and business
                  to creative arts and personal development.
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Zap className="w-5 h-5 text-purple-600" />
                  Flexible Learning
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  Study at your own pace, anytime and anywhere, with our
                  mobile-friendly platform.
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Award className="w-5 h-5 text-purple-600" />
                  Certificates
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  Earn recognized certificates upon course completion to
                  showcase your new skills.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </div>
  );
}

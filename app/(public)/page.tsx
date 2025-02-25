import BestTeachers from "@/components/BestTeachers";
import CourseGrid from "@/components/CourseGrid";
import ProCarousel from "@/components/hero-carousel";
import SkillsSection from "@/components/SkillsSection";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Award, BookOpen, Users, Zap } from "lucide-react";

export default function Home() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <ProCarousel />

      {/* Skills Categories */}
      <section className="py-8">
        <div className="container mx-auto px-4">
          <SkillsSection />
        </div>
      </section>

      {/* Featured Courses */}
      <section className="py-12 bg-muted">
        <CourseGrid />
      </section>

      {/* Best Teachers */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-6">Learn from the Best</h2>
          <BestTeachers />
        </div>
      </section>

      {/* Why Choose Our Platform */}
      <section className="py-16 bg-muted">
        <div className="container mx-auto px-4 text-center max-w-3xl">
          <h2 className="text-3xl font-bold mb-4">Why Choose Our Platform?</h2>
          <p className="text-muted-foreground">
            Our e-learning platform offers a unique blend of expert instruction,
            cutting-edge courses, and a supportive learning community. Whether
            you&apos;re looking to advance your career, explore a new hobby, or
            gain valuable skills, we have the resources to help you succeed.
          </p>
        </div>

        {/* Feature Cards */}
        <div className="container mx-auto px-4 mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <Card key={index} className="shadow-md hover:shadow-lg dark:hover:shadow-gray-400 transition">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  {feature.icon}
                  {feature.title}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">{feature.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>
    </div>
  );
}

const features = [
  {
    title: "Expert Instructors",
    description:
      "Learn from industry professionals and thought leaders in their respective fields.",
    icon: <BookOpen className="w-5 h-5 text-primary" />,
  },
  {
    title: "Diverse Course Catalog",
    description:
      "Explore a wide range of subjects, from technology and business to creative arts.",
    icon: <Users className="w-5 h-5 text-primary" />,
  },
  {
    title: "Flexible Learning",
    description:
      "Study at your own pace, anytime and anywhere, with our mobile-friendly platform.",
    icon: <Zap className="w-5 h-5 text-primary" />,
  },
  {
    title: "Recognized Certificates",
    description:
      "Earn certificates upon course completion to showcase your skills.",
    icon: <Award className="w-5 h-5 text-primary" />,
  },
];

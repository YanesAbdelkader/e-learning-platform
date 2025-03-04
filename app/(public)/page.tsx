import BestTeachers from "@/components/BestTeachers";
import CourseGrid from "@/components/CourseGrid";
import ProCarousel from "@/components/hero-carousel";
import SkillsSection from "@/components/SkillsSection";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Award, BookOpen, Users, Zap } from "lucide-react";

const features = [
  {
    title: "Expert Instructors",
    description:
      "Learn from top professionals with real-world experience in their fields.",
    icon: <BookOpen className="w-6 h-6 text-primary" />,
  },
  {
    title: "Diverse Course Catalog",
    description:
      "Explore a vast selection of courses across multiple disciplines.",
    icon: <Users className="w-6 h-6 text-primary" />,
  },
  {
    title: "Flexible Learning",
    description:
      "Access courses anytime, anywhere, and learn at your own pace.",
    icon: <Zap className="w-6 h-6 text-primary" />,
  },
  {
    title: "Recognized Certificates",
    description:
      "Earn industry-recognized certificates to boost your career.",
    icon: <Award className="w-6 h-6 text-primary" />,
  },
];

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col gap-12">
      {/* Hero Section */}
      <ProCarousel />

      {/* Skills Categories */}
      <section className="container mx-auto px-6">
        <SkillsSection />
      </section>

      {/* Featured Courses */}
      <section className="bg-muted py-12 border-t border-border">
        <CourseGrid />
      </section>

      {/* Best Teachers */}
      <section className="container mx-auto px-6 text-left py-16">
        <h2 className="text-4xl font-bold text-primary mb-6">Learn from the Best</h2>
        <BestTeachers />
      </section>

      {/* Why Choose Our Platform */}
      <section className="py-20 bg-gradient-to-b from-muted/50 to-background text-foreground text-center">
        <div className="container mx-auto max-w-4xl px-6">
          <h2 className="text-4xl font-extrabold mb-6 text-primary">
            Why Choose Our Platform?
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Gain access to expert-led courses, interactive learning experiences, and a
            supportive community to help you succeed.
          </p>
        </div>

        {/* Feature Cards */}
        <div className="container mx-auto px-6 mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-8">
          {features.map((feature, index) => (
            <Card
              key={index}
              className="p-6 shadow-md border border-border hover:border-indigo-400 hover:shadow-xl transition duration-300 bg-card"
            >
              <CardHeader className="flex flex-col items-center text-center">
                <div className="text-primary text-5xl mb-4">{feature.icon}</div>
                <CardTitle className="text-xl font-semibold text-foreground">
                  {feature.title}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground text-sm text-center">
                  {feature.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>
    </div>
  );
}
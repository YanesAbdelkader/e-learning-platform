import { BookOpen, Globe, Clock, Award } from "lucide-react"

export default function Description() {
  return (
    <section className="py-16 px-4 overflow-hidden bg-gradient-to-b from-background to-muted">
      <div className="max-w-8xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold tracking-tight mb-4">About Our E-Learning Platform</h2>
          <div className="w-20 h-1 bg-primary mx-auto rounded-full mb-6"></div>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            Our e-learning platform is designed to provide high-quality education to learners worldwide. We offer a wide
            range of courses taught by expert instructors, allowing you to learn at your own pace and on your own
            schedule.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {/* Feature 1 */}
          <div className="bg-card rounded-lg p-10 border overflow-hidden transition-all duration-300 hover:shadow-lg hover:border-indigo-400 dark:hover:shadow-gray-400">
            <div className="flex justify-center mb-4">
              <div className="p-3 bg-primary/10 rounded-full">
                <BookOpen className="h-8 w-8 text-primary" />
              </div>
            </div>
            <h3 className="text-xl font-semibold text-center mb-2">Diverse Courses</h3>
            <p className="text-muted-foreground text-center">
              Access over 10,000 courses across various disciplines and skill levels.
            </p>
          </div>

          {/* Feature 2 */}
          <div className="bg-card rounded-lg p-10 border overflow-hidden transition-all duration-300 hover:shadow-lg hover:border-indigo-400 dark:hover:shadow-gray-400">
            <div className="flex justify-center mb-4">
              <div className="p-3 bg-primary/10 rounded-full">
                <Globe className="h-8 w-8 text-primary" />
              </div>
            </div>
            <h3 className="text-xl font-semibold text-center mb-2">Global Community</h3>
            <p className="text-muted-foreground text-center">
              Join millions of learners from over 190 countries around the world.
            </p>
          </div>

          {/* Feature 3 */}
          <div className="bg-card rounded-lg p-10 border overflow-hidden transition-all duration-300 hover:shadow-lg hover:border-indigo-400 dark:hover:shadow-gray-400">
            <div className="flex justify-center mb-4">
              <div className="p-3 bg-primary/10 rounded-full">
                <Clock className="h-8 w-8 text-primary" />
              </div>
            </div>
            <h3 className="text-xl font-semibold text-center mb-2">Learn at Your Pace</h3>
            <p className="text-muted-foreground text-center">
              Study on your schedule with lifetime access to purchased courses.
            </p>
          </div>

          {/* Feature 4 */}
          <div className="bg-card rounded-lg p-10 border overflow-hidden transition-all duration-300 hover:shadow-lg hover:border-indigo-400 dark:hover:shadow-gray-400">
            <div className="flex justify-center mb-4">
              <div className="p-3 bg-primary/10 rounded-full">
                <Award className="h-8 w-8 text-primary" />
              </div>
            </div>
            <h3 className="text-xl font-semibold text-center mb-2">Certified Learning</h3>
            <p className="text-muted-foreground text-center">
              Earn certificates recognized by leading industry employers.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}


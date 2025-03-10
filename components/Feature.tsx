import { features } from "@/data/homedata";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";

export default function Feature() {
  return (
    <section className="py-40 bg-gradient-to-b from-muted/50 to-background text-foreground text-center">
      <div className="container mx-auto max-w-4xl px-6">
        <h2 className="text-4xl font-extrabold mb-6 text-primary">
          Why Choose Our Platform?
        </h2>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          Gain access to expert-led courses, interactive learning experiences,
          and a supportive community to help you succeed.
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
  );
}

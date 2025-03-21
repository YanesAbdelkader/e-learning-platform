"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { features } from "./data/features";

export default function Feature() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 },
  };

  return (
    <section className="py-24 md:py-32 bg-gradient-to-b from-muted/50 to-background">
      <div className="container px-4 md:px-6">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-primary mb-4">
            Why Choose Our Platform?
          </h2>
          <p className="text-lg text-muted-foreground">
            Gain access to expert-led courses, interactive learning experiences,
            and a supportive community to help you succeed.
          </p>
        </div>

        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8"
        >
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <motion.div key={index} variants={item}>
                <Card
                  className={cn(
                    "h-full bg-card/50 overflow-hidden transition-all duration-300 hover:shadow-lg hover:border-indigo-400 dark:hover:shadow-gray-400",
                    hoveredIndex === index
                      ? "shadow-lg transform -translate-y-1"
                      : "shadow"
                  )}
                  onMouseEnter={() => setHoveredIndex(index)}
                  onMouseLeave={() => setHoveredIndex(null)}
                >
                  <CardHeader className="pb-2">
                    <div
                      className={cn(
                        "w-12 h-12 rounded-full flex items-center justify-center mb-4",
                        feature.color
                      )}
                    >
                      <Icon className="w-6 h-6" />
                    </div>
                    <CardTitle className="text-xl font-bold">
                      {feature.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">
                      {feature.description}
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}

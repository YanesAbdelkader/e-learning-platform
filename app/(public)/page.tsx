"use client";
import { useState } from "react";
import BestTeachers from "@/components/BestTeachers";
import CourseGrid from "@/components/CourseGrid";
import ProCarousel from "@/components/hero-carousel";
import Categories from "@/components/Categories";
import { categories, courses, teachers } from "@/data/homedata";
import Description from "@/components/Description";
import Feature from "@/components/Feature";

export default function Home() {
  const [selectedCategory, setSelectedCategory] = useState("All Categories");

  return (
    <div className="min-h-screen flex flex-col gap-12">
      {/* Hero Section */}
      <ProCarousel />

      {/* Skills Categories */}
      <section className="container mx-auto px-6">
        <Categories
          categories={categories}
          onSelectCategory={setSelectedCategory}
        />
      </section>

      <section className="bg-muted py-12 border-t border-border">
        <CourseGrid courses={courses} selectedCategory={selectedCategory} />
      </section>

      {/* Best Teachers */}
      <section className="container mx-auto px-6 text-left py-16">
        <h2 className="text-4xl font-bold text-primary mb-6">
          Learn from the Best
        </h2>
        <BestTeachers teachers={teachers} />
      </section>

      {/* Why Choose Our Platform */}
      <Feature/>
      {/* Why Choose Our Platform */}
      <Description />
    </div>
  );
}

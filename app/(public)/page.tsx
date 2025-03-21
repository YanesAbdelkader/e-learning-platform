"use client";
import { useState } from "react";
import ProCarousel from "@/components/home/pro-carousel";
import Categories from "@/components/home/categories";
import CourseGrid from "@/components/home/course-grid";
import { BestTeachers } from "@/components/home/best-teachers";
import Feature from "@/components/home/feature-section";
import Description from "@/components/home/description";

export default function Home() {
  const [selectedCategory, setSelectedCategory] = useState("All Categories");

  return (
    <div className="min-h-screen flex flex-col gap-12">
      {/* Hero Section */}
      <ProCarousel />
      {/* Skills Categories */}
      <section className="container mx-auto px-6">
        <Categories onSelectCategory={setSelectedCategory} />
      </section>

      <section className="bg-muted py-12 border-t border-border">
        <CourseGrid selectedCategory={selectedCategory} />
      </section>
      {/* Best Teachers */}
      <section className="container mx-auto px-6 text-left py-16">
        <BestTeachers />
      </section>
      {/* Why Choose Our Platform */}
      <Feature />
      {/* Why Choose Our Platform */}
      <Description />
    </div>
  );
}

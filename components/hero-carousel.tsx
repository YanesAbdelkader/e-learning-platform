"use client";

import * as React from "react";
import Autoplay from "embla-carousel-autoplay"
import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";

import img1 from "@/assets/p01.jpeg";
import img2 from "@/assets/p02.jpg";
import img3 from "@/assets/p03.jpg";

const carouselItems = [
  {
    title: "Master In-Demand Skills",
    description:
      "Gain the expertise you need with industry-relevant courses designed for your growth.",
    image: img1,
    color: "from-blue-600 to-indigo-600",
    textPosition: "left",
  },
  {
    title: "Learn from Industry Leaders",
    description:
      "Get insights from top professionals and apply their knowledge to advance your career.",
    image: img2,
    color: "from-purple-600 to-pink-600",
    textPosition: "left",
  },
  {
    title: "Flexible Learning Paths",
    description:
      "Personalize your learning experience to fit your lifestyle and career goals.",
    image: img3,
    color: "from-green-600 to-teal-600",
    textPosition: "right",
  },
];

export default function ProCarousel() {
  return (
    <section className="relative h-[75vh] w-full overflow-hidden bg-black text-white">
      <Carousel
        opts={{
          align: "start",
          loop: true,
        }}
        plugins={[
          Autoplay({
            delay: 5000,
          }),
        ]}
        className="h-full w-full"
      >
        <CarouselContent>
          {carouselItems.map((item, index) => (
            <CarouselItem key={index} className="h-[75vh] pl-0">
              <div className="relative h-full w-full">
                {/* Background Image */}
                <Image
                  src={item.image}
                  alt={item.title}
                  className="absolute inset-0 w-full h-full object-cover"
                  fill
                  priority
                />

                {/* Dark Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent z-10"></div>

                {/* Content */}
                <div
                  className={cn(
                    "absolute inset-0 flex items-center z-20",
                    item.textPosition === "left"
                      ? "justify-start pl-16 pr-6 text-left"
                      : "justify-end pr-16 pl-6 text-right",
                    "max-md:justify-center max-md:text-center max-md:px-6" // Mobile: Center text, add padding
                  )}
                >
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, ease: "easeOut" }}
                    className="max-w-3xl"
                  >
                    <h2 className="mb-2 text-xs sm:text-sm font-semibold uppercase tracking-wider text-gray-300">
                      Premium Learning Experience
                    </h2>
                    <h1 className="mb-4 text-3xl sm:text-4xl lg:text-5xl font-extrabold leading-tight">
                      {item.title}
                    </h1>
                    <p className="mb-6 text-sm sm:text-lg text-gray-300">
                      {item.description}
                    </p>

                    <div
                      className={cn(
                        "mt-4",
                        index === 2 ? "flex justify-end" : "", // Desktop: Align button to the right on p03
                        "max-md:justify-center" // Mobile: Center button
                      )}
                    >
                      <Link href="/courses">
                        <Button
                          variant="default"
                          size="lg"
                          className={cn(
                            "px-6 py-3 text-lg font-semibold text-white rounded-full shadow-lg hover:opacity-90 transition-all",
                            `bg-gradient-to-r ${item.color}`
                          )}
                        >
                          Explore Courses
                          <ArrowRight className="ml-2 h-5 w-5" />
                        </Button>
                      </Link>
                    </div>
                  </motion.div>
                </div>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>

        {/* Navigation Arrows */}
        <CarouselPrevious className="left-2 sm:left-6 bg-white/10 hover:bg-white/20 text-white border-none" />
        <CarouselNext className="right-2 sm:right-6 bg-white/10 hover:bg-white/20 text-white border-none" />
      </Carousel>
    </section>
  );
}

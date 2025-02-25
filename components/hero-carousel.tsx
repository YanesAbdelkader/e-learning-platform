"use client";
import * as React from "react";
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
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";

const carouselItems = [
  {
    title: "Master In-Demand Skills",
    description:
      "Unlock your potential with cutting-edge courses designed for the modern workforce.",
    image: "/placeholder.svg?height=600&width=800",
    color: "from-blue-600 to-indigo-600",
  },
  {
    title: "Learn from Industry Leaders",
    description:
      "Gain insights from top professionals and apply their expertise to your career.",
    image: "/placeholder.svg?height=600&width=800",
    color: "from-purple-600 to-pink-600",
  },
  {
    title: "Flexible Learning Paths",
    description:
      "Customize your education journey to fit your goals and schedule.",
    image: "/placeholder.svg?height=600&width=800",
    color: "from-green-600 to-teal-600",
  },
];

export default function ProCarousel() {
  const [, setCurrentSlide] = React.useState(0);

  return (
    <section className="relative h-[70vh] w-full overflow-hidden bg-gray-800 text-white border-none">
      <Carousel
        opts={{
          align: "start",
          loop: true,
        }}
        className="h-full w-full"
        setApi={(api) => {
          api?.on("select", () => {
            setCurrentSlide(api.selectedScrollSnap());
          });
        }}
      >
        <CarouselContent>
          {carouselItems.map((item, index) => (
            <CarouselItem key={index} className="h-[70vh] pl-0">
              <div className="relative h-full w-full">
                <div className="absolute inset-0 bg-black opacity-50 z-10"></div>
                <Image
                  src={item.image || "/placeholder.svg"}
                  alt=""
                  className="absolute inset-0 object-cover"
                  fill
                />
                <Card className="absolute inset-0 flex items-center bg-transparent border-none z-20">
                  <CardContent className="container mx-auto px-4">
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      transition={{ duration: 0.5 }}
                      className="max-w-3xl"
                    >
                      <h2 className="mb-2 text-sm font-bold uppercase tracking-wider text-gray-400">
                        Featured Course
                      </h2>
                      <h1 className="mb-4 text-4xl font-bold leading-tight sm:text-5xl lg:text-6xl">
                        {item.title}
                      </h1>
                      <p className="mb-8 text-xl text-gray-300">
                        {item.description}
                      </p>
                      <Link href={"/courses"} className="flex items-center">
                        <Button
                          variant="outline"
                          size="lg"
                          className={cn(
                            "bg-gradient-to-r text-white border-none",
                            item.color
                          )}
                        >
                          Explore Courses
                          <ArrowRight className="ml-2 h-5 w-5" />
                        </Button>
                      </Link>
                    </motion.div>
                  </CardContent>
                </Card>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="left-4 bg-white/5 hover:bg-white/20 text-white border-none" />
        <CarouselNext className="right-4 bg-white/5 hover:bg-white/20 text-white border-none" />
      </Carousel>
    </section>
  );
}

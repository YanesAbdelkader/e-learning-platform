"use client";

import * as React from "react";
import Autoplay from "embla-carousel-autoplay";
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
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
import { carouselItems } from "./data/carousel-data";
import { EmblaCarouselType } from "embla-carousel";

export default function ProCarousel() {
  const [api, setApi] = React.useState<EmblaCarouselType>();
  const [current, setCurrent] = React.useState(0);
  const [isHovering, setIsHovering] = React.useState(false);

  React.useEffect(() => {
    if (!api) return;

    const onSelect = () => {
      setCurrent(api.selectedScrollSnap());
    };

    api.on("select", onSelect);
    api.on("reInit", onSelect);

    return () => {
      api.off("select", onSelect);
      api.off("reInit", onSelect);
    };
  }, [api]);

  const handleMouseEnter = React.useCallback(() => {
    setIsHovering(true);
  }, []);

  const handleMouseLeave = React.useCallback(() => {
    setIsHovering(false);
  }, []);

  const scrollTo = React.useCallback(
    (index: number) => {
      if (api) api.scrollTo(index);
    },
    [api]
  );

  return (
    <section
      className="relative h-[75vh] w-full overflow-hidden bg-black text-white"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      aria-label="Featured content carousel"
    >
      <Carousel
        setApi={setApi}
        opts={{
          align: "start",
          loop: true,
        }}
        plugins={[
          Autoplay({
            delay: 5000,
            stopOnInteraction: false,
            stopOnMouseEnter: true,
          }),
        ]}
        className="h-full w-full"
      >
        <CarouselContent>
          {carouselItems.map((item, index) => (
            <CarouselItem key={item.id} className="h-[75vh] pl-0">
              <div className="relative h-full w-full group">
                <Image
                  src={item.imageSrc || "/placeholder.svg"}
                  alt=""
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 scale-[1.02] group-hover:scale-[1.05]"
                  fill
                  priority={index === 0}
                  quality={90}
                  sizes="100vw"
                  aria-hidden="true"
                />

                <div
                  className={cn(
                    "absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-black/20 z-10",
                    item.textPosition === "left"
                      ? "bg-gradient-to-r from-black/70 via-black/40 to-transparent"
                      : item.textPosition === "right"
                      ? "bg-gradient-to-l from-black/70 via-black/40 to-transparent"
                      : ""
                  )}
                ></div>

                <div
                  className={cn(
                    "absolute inset-0 flex items-center z-20",
                    item.textPosition === "left"
                      ? "justify-start pl-8 md:pl-16 pr-6 text-left"
                      : item.textPosition === "right"
                      ? "justify-end pr-8 md:pr-16 pl-6 text-right"
                      : "justify-center px-6 text-center",
                    "max-md:px-6 max-md:text-center"
                  )}
                >
                  <AnimatePresence mode="wait">
                    {current === index && (
                      <motion.div
                        key={`content-${item.id}`}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{
                          duration: 0.7,
                          ease: [0.22, 1, 0.36, 1],
                          staggerChildren: 0.1,
                        }}
                        className="max-w-3xl"
                      >
                        <motion.h2
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.5, delay: 0.1 }}
                          className="mb-2 text-xs sm:text-sm font-semibold uppercase tracking-wider text-gray-300"
                        >
                          {item.tag || "Premium Learning Experience"}
                        </motion.h2>
                        <motion.h1
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.5, delay: 0.2 }}
                          className="mb-4 text-3xl sm:text-4xl lg:text-5xl font-extrabold leading-tight"
                        >
                          {item.title}
                        </motion.h1>
                        <motion.p
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.5, delay: 0.3 }}
                          className="mb-6 text-sm sm:text-lg text-gray-300 max-w-xl"
                        >
                          {item.description}
                        </motion.p>

                        <motion.div
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.5, delay: 0.4 }}
                          className={cn(
                            "mt-6",
                            item.textPosition === "right"
                              ? "flex justify-end"
                              : item.textPosition === "center"
                              ? "flex justify-center"
                              : "",
                            "max-md:flex max-md:justify-center"
                          )}
                        >
                          <Link href={item.ctaLink || "/courses"}>
                            <Button
                              variant="default"
                              size="lg"
                              className={cn(
                                "px-6 py-6 text-base font-semibold text-white rounded-full shadow-lg transition-all duration-300",
                                `bg-gradient-to-r ${item.color}`,
                                "hover:shadow-xl hover:scale-105 active:scale-95"
                              )}
                            >
                              {item.ctaText || "Explore Courses"}
                              <ArrowRight className="ml-2 h-5 w-5" />
                            </Button>
                          </Link>
                        </motion.div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>

        <CarouselPrevious
          className="left-4 sm:left-8 bg-white/10 hover:bg-white/20 text-white border-none h-10 w-10 rounded-full shadow-lg transition-all duration-300 hover:scale-110 focus:ring-2 focus:ring-white/50"
          aria-label="Previous slide"
        >
          <ChevronLeft className="h-6 w-6" />
        </CarouselPrevious>
        <CarouselNext
          className="right-4 sm:right-8 bg-white/10 hover:bg-white/20 text-white border-none h-10 w-10 rounded-full shadow-lg transition-all duration-300 hover:scale-110 focus:ring-2 focus:ring-white/50"
          aria-label="Next slide"
        >
          <ChevronRight className="h-6 w-6" />
        </CarouselNext>

        <div className="absolute bottom-6 left-0 right-0 z-30 flex justify-center gap-2">
          {carouselItems.map((item, index) => (
            <button
              key={`indicator-${item.id}`}
              onClick={() => scrollTo(index)}
              aria-label={`Go to slide ${index + 1}`}
              aria-current={current === index ? "true" : "false"}
              className={cn(
                "h-1.5 rounded-full transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-white",
                current === index
                  ? "w-8 bg-white"
                  : "w-3 bg-white/40 hover:bg-white/60"
              )}
            />
          ))}
        </div>

        <div className="absolute bottom-0 left-0 right-0 z-20 h-1 bg-white/20">
          <motion.div
            className="h-full bg-white"
            initial={{ width: "0%" }}
            animate={{
              width: isHovering ? "100%" : "0%",
              transition: {
                duration: isHovering ? 0 : 5,
                ease: "linear",
              },
            }}
            key={current}
          />
        </div>
      </Carousel>
    </section>
  );
}

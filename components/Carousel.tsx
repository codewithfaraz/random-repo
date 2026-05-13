"use client";

import React, { useCallback, useEffect, useRef, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface CarouselProps {
  children: React.ReactNode;
  /** Options passed to Embla */
  opts?: Parameters<typeof useEmblaCarousel>[0];
  /** Show navigation arrows? Default: true */
  arrows?: boolean;
  /** Show dot indicators? Default: true */
  dots?: boolean;
  /** Arrow class name for positioning */
  className?: string;
}

export function Carousel({
  children,
  opts = { loop: true, align: "start" },
  arrows = true,
  dots = true,
  className = "",
}: CarouselProps) {
  const [emblaRef, emblaApi] = useEmblaCarousel(opts);
  const [prevBtnDisabled, setPrevBtnDisabled] = useState(true);
  const [nextBtnDisabled, setNextBtnDisabled] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [scrollSnaps, setScrollSnaps] = useState<number[]>([]);

  const [autoplayInterval, setAutoplayInterval] = useState<NodeJS.Timeout | null>(null);

  const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi]);
  const scrollTo = useCallback((index: number) => emblaApi?.scrollTo(index), [emblaApi]);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
    setPrevBtnDisabled(!emblaApi.canScrollPrev());
    setNextBtnDisabled(!emblaApi.canScrollNext());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    onSelect();
    setScrollSnaps(emblaApi.scrollSnapList());
    emblaApi.on("select", onSelect);
    emblaApi.on("reInit", onSelect);
    return () => {
      emblaApi.off("select", onSelect);
      emblaApi.off("reInit", onSelect);
    };
  }, [emblaApi, onSelect]);

  // Autoplay
  useEffect(() => {
    if (autoplayInterval) return;
    const interval = setInterval(() => {
      if (emblaApi) emblaApi.scrollNext();
    }, 5000);
    // @ts-ignore
    setAutoplayInterval(interval);
    return () => clearInterval(interval);
  }, [emblaApi]);

  // Pause autoplay on hover/focus
  const handleMouseEnter = useCallback(() => {
    if (autoplayInterval) {
      clearInterval(autoplayInterval);
      setAutoplayInterval(null);
    }
  }, [autoplayInterval]);

  // Restart autoplay on mouse leave
  const handleMouseLeave = useCallback(() => {
    if (!autoplayInterval && emblaApi) {
      const interval = setInterval(() => emblaApi.scrollNext(), 5000);
      // @ts-ignore
      setAutoplayInterval(interval);
    }
  }, [autoplayInterval, emblaApi]);

  return (
    <div
      className={`relative overflow-hidden ${className}`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onFocus={handleMouseEnter}
      onBlur={handleMouseLeave}
    >
      <div ref={emblaRef} className="flex">
        {children}
      </div>

      {/* Navigation Arrows */}
      {arrows && (
        <>
          <button
            onClick={scrollPrev}
            disabled={prevBtnDisabled}
            className="absolute left-2 top-1/2 -translate-y-1/2 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-black/40 backdrop-blur-sm text-white transition-all hover:bg-violet-500/50 disabled:opacity-30 disabled:cursor-not-allowed"
            aria-label="Previous"
          >
            <ChevronLeft size={20} />
          </button>
          <button
            onClick={scrollNext}
            disabled={nextBtnDisabled}
            className="absolute right-2 top-1/2 -translate-y-1/2 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-black/40 backdrop-blur-sm text-white transition-all hover:bg-violet-500/50 disabled:opacity-30 disabled:cursor-not-allowed"
            aria-label="Next"
          >
            <ChevronRight size={20} />
          </button>
        </>
      )}

      {/* Dot Indicators */}
      {dots && scrollSnaps.length > 1 && (
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-10 flex gap-2">
          {scrollSnaps.map((_, index) => (
            <button
              key={index}
              onClick={() => scrollTo(index)}
              className={`h-2 w-2 rounded-full transition-all duration-300 ${
                index === selectedIndex ? "bg-violet-400 w-6" : "bg-white/30 hover:bg-white/50"
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      )}
    </div>
  );
}
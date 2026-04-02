"use client";

import { motion } from "framer-motion";
import { Star, Quote, ChevronLeft, ChevronRight } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import OpeningStyle from "@/components/animations/openingstyle";
import { SectionTitle } from "@/components/homepage/SmallComponents";
import { Card } from "@/components/animations/container";

/* ================= TYPES ================= */

interface Testimonial {
  id: number;
  name: string;
  avatar: string;
  country: string;
  flag: string;
  rating: number;
  text: string;
  earnings: string;
  date: string;
  verified: boolean;
}

interface Props {
  data?: any;
  translations?: any;
  countryName?: string;
}

/* ================= COMPONENT ================= */

export default function TestimonialSection({
  data = {},
  translations = {},
  countryName = "",
}: Props) {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [showLeftArrow, setShowLeftArrow] = useState(false);
  const [showRightArrow, setShowRightArrow] = useState(true);

  /* ================= HELPERS ================= */

  function replaceCountry(text?: string) {
    if (!text) return "";
    return text.replace(/\{country\}/g, countryName);
  }

  function getText(
    dataValue?: string,
    translationValue?: string,
    fallback: string = ""
  ) {
    return dataValue || translationValue || fallback;
  }

  /* ================= TESTIMONIAL DATA ================= */

  const testimonials: Testimonial[] =
    data.testimonials ||
    translations.testimonials ||
    [];

  /* ================= SCROLL ================= */

  const handleScroll = () => {
    if (scrollContainerRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } =
        scrollContainerRef.current;

      setShowLeftArrow(scrollLeft > 10);
      setShowRightArrow(scrollLeft < scrollWidth - clientWidth - 10);
    }
  };

  useEffect(() => {
    handleScroll();
  }, [testimonials]);

  const scroll = (direction: "left" | "right") => {
    if (scrollContainerRef.current) {
      const scrollAmount = 400;

      scrollContainerRef.current.scrollTo({
        left:
          scrollContainerRef.current.scrollLeft +
          (direction === "left" ? -scrollAmount : scrollAmount),
        behavior: "smooth",
      });
    }
  };

  const renderStars = (rating: number) =>
    Array.from({ length: 5 }).map((_, i) => (
      <Star
        key={i}
        size={16}
        className={
          i < rating
            ? "text-yellow-400 fill-yellow-400"
            : "text-gray-300 dark:text-gray-600"
        }
      />
    ));

  /* ================= RENDER ================= */

  return (
    <OpeningStyle delay={0.12}>
      <section className="max-w-7xl mx-auto px-6 py-20">
        {/* HEADER */}
        <div className="text-center mb-12">
          <SectionTitle
            icon="💬"
            text={replaceCountry(
              getText(
                data.title,
                translations.title,
                "What Our Users Say"
              )
            )}
          />

          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto mt-4">
            {replaceCountry(
              getText(
                data.description,
                translations.description,
                "Join thousands of users earning daily in {country}"
              )
            )}
          </p>
        </div>

        {/* SCROLL */}
        {testimonials.length > 0 ? (
          <div className="relative group">
            {showLeftArrow && (
              <button
                onClick={() => scroll("left")}
                className="absolute left-0 top-1/2 -translate-y-1/2 z-10"
              >
                <ChevronLeft />
              </button>
            )}

            {showRightArrow && (
              <button
                onClick={() => scroll("right")}
                className="absolute right-0 top-1/2 -translate-y-1/2 z-10"
              >
                <ChevronRight />
              </button>
            )}

            <div
              ref={scrollContainerRef}
              onScroll={handleScroll}
              className="flex overflow-x-auto gap-6 pb-8 snap-x snap-mandatory scroll-smooth"
            >
              {testimonials.map((t: Testimonial, i: number) => (
                <motion.div
                  key={t.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.05 }}
                  className="flex-none w-[350px] snap-start"
                >
                  <Card>
                    <div className="flex justify-between items-center">
                      <h3 className="font-semibold">{t.name}</h3>
                      <span>{t.flag}</span>
                    </div>

                    <div className="flex mt-2">{renderStars(t.rating)}</div>

                    <Quote className="my-3 opacity-50" />

                    <p className="text-sm text-gray-600 dark:text-gray-300">
                      {replaceCountry(t.text)}
                    </p>

                    <div className="flex justify-between mt-4 text-sm text-gray-500">
                      <span>{t.earnings}</span>
                      <span>{t.date}</span>
                    </div>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        ) : (
          <p className="text-center text-gray-500">
            No testimonials available.
          </p>
        )}

        {/* STATS */}
        <div className="mt-12 text-center">
          <p>
            {replaceCountry(
              getText(
                data.statsText,
                translations.statsText,
                "Trusted by thousands in {country}"
              )
            )}
          </p>
        </div>
      </section>
    </OpeningStyle>
  );
}

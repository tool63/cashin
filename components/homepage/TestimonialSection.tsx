// components/homepage/TestimonialSection.tsx
"use client";

import { motion } from "framer-motion";
import { Star, Quote, ChevronLeft, ChevronRight } from "lucide-react";
import { useRef, useState } from "react";
import OpeningStyle from "@/components/animations/openingstyle";
import { SectionTitle } from "@/components/homepage/SmallComponents";
import { Card } from "@/components/animations/container";

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

export default function TestimonialSection() {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [showLeftArrow, setShowLeftArrow] = useState(false);
  const [showRightArrow, setShowRightArrow] = useState(true);

  const testimonials: Testimonial[] = [
    {
      id: 1,
      name: "Sarah Johnson",
      avatar: "👩",
      country: "United States",
      flag: "🇺🇸",
      rating: 5,
      text: "I've tried many earning platforms, but this one is by far the best. I make around $300-400 per month just by completing surveys and small tasks in my free time. Withdrawals are instant and customer support is always helpful. The variety of tasks keeps things interesting and I love that I can work on my own schedule.",
      earnings: "$3,450+ earned",
      date: "Member since 2023",
      verified: true
    },
    {
      id: 2,
      name: "Michael Chen",
      avatar: "👨",
      country: "Canada",
      flag: "🇨🇦",
      rating: 5,
      text: "The app install offers are incredibly easy and pay well. I've earned over $500 in just two months. The platform is user-friendly and the payment system is reliable. Highly recommended for anyone looking to make extra cash. The referral program is also generous - I've already brought 3 friends on board!",
      earnings: "$2,800+ earned",
      date: "Member since 2024",
      verified: true
    },
    {
      id: 3,
      name: "Emma Williams",
      avatar: "👩",
      country: "United Kingdom",
      flag: "🇬🇧",
      rating: 5,
      text: "As a student, this platform has been a lifesaver. I earn enough to cover my weekly expenses by completing tasks between classes. The mobile app works great and I can earn while commuting. The support team is always quick to respond whenever I have questions.",
      earnings: "$1,890+ earned",
      date: "Member since 2024",
      verified: true
    },
    {
      id: 4,
      name: "Carlos Rodriguez",
      avatar: "👨",
      country: "Spain",
      flag: "🇪🇸",
      rating: 4,
      text: "Great platform with consistent earning opportunities. The video watching tasks are my favorite - easy and quick. Would love to see more high-paying surveys in my region, but overall very satisfied. Payments always arrive on time and the minimum withdrawal is very reasonable.",
      earnings: "$2,100+ earned",
      date: "Member since 2023",
      verified: true
    },
    {
      id: 5,
      name: "Priya Patel",
      avatar: "👩",
      country: "India",
      flag: "🇮🇳",
      rating: 5,
      text: "Finally a platform that actually pays! I've withdrawn over $1,000 in the past 6 months. The crypto withdrawal option is a nice touch. Support team is responsive and helpful whenever I have questions. I've recommended this to all my friends and family.",
      earnings: "$4,200+ earned",
      date: "Member since 2022",
      verified: true
    },
    {
      id: 6,
      name: "Thomas Meyer",
      avatar: "👨",
      country: "Germany",
      flag: "🇩🇪",
      rating: 5,
      text: "The gaming offers are fantastic. I love playing games and earning at the same time. Have earned enough to buy a new gaming headset. The platform is legit and payments always arrive on time. The daily bonuses keep me coming back every day.",
      earnings: "$2,750+ earned",
      date: "Member since 2023",
      verified: true
    },
    {
      id: 7,
      name: "Sophie Dubois",
      avatar: "👩",
      country: "France",
      flag: "🇫🇷",
      rating: 5,
      text: "Je adore cette plateforme! The survey selection is great and they always have high-paying options. I've been able to earn extra income while working from home. The interface is intuitive and easy to navigate. Highly recommended for French speakers!",
      earnings: "$1,950+ earned",
      date: "Member since 2023",
      verified: true
    },
    {
      id: 8,
      name: "James Wilson",
      avatar: "👨",
      country: "Australia",
      flag: "🇦🇺",
      rating: 4,
      text: "Solid platform with good earning potential. The offerwall has plenty of options and the payouts are fair. Would like to see more local offers for Australia, but still very satisfied. The customer service is excellent and always resolves issues quickly.",
      earnings: "$3,100+ earned",
      date: "Member since 2023",
      verified: true
    },
    {
      id: 9,
      name: "Yuki Tanaka",
      avatar: "👩",
      country: "Japan",
      flag: "🇯🇵",
      rating: 5,
      text: "とても素晴らしいプラットフォームです！ The micro tasks are perfect for earning during breaks. I've been able to save up for a vacation thanks to this site. The payment system is reliable and withdrawals are processed quickly. Highly recommended!",
      earnings: "$2,300+ earned",
      date: "Member since 2024",
      verified: true
    },
    {
      id: 10,
      name: "Lucas Silva",
      avatar: "👨",
      country: "Brazil",
      flag: "🇧🇷",
      rating: 5,
      text: "Plataforma incrível! I've earned enough to pay for my monthly internet bill just by completing tasks in my spare time. The sign-up bonus was generous and the referral program helps me earn even more. Best decision I've made this year!",
      earnings: "$1,600+ earned",
      date: "Member since 2024",
      verified: true
    }
  ];

  // Handle scroll to check arrow visibility
  const handleScroll = () => {
    if (scrollContainerRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current;
      setShowLeftArrow(scrollLeft > 0);
      setShowRightArrow(scrollLeft < scrollWidth - clientWidth - 10);
    }
  };

  // Scroll functions
  const scroll = (direction: 'left' | 'right') => {
    if (scrollContainerRef.current) {
      const scrollAmount = 400; // Adjust based on card width
      const newScrollLeft = scrollContainerRef.current.scrollLeft + (direction === 'left' ? -scrollAmount : scrollAmount);
      scrollContainerRef.current.scrollTo({
        left: newScrollLeft,
        behavior: 'smooth'
      });
    }
  };

  // Render stars based on rating
  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }).map((_, i) => (
      <Star
        key={i}
        size={16}
        className={i < rating ? "text-yellow-400 fill-yellow-400" : "text-gray-300 dark:text-gray-600"}
      />
    ));
  };

  return (
    <OpeningStyle delay={0.12}>
      <section className="max-w-7xl mx-auto px-6 py-20">
        {/* Section Heading */}
        <div className="text-center mb-12">
          <SectionTitle icon="💬" text="What Our Users Say" />
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto mt-4 leading-relaxed">
            Join 2.5M+ happy users who are earning real money every day
          </p>
        </div>

        {/* Horizontal Scroll Container */}
        <div className="relative group">
          {/* Left Scroll Button */}
          {showLeftArrow && (
            <button
              onClick={() => scroll('left')}
              className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 z-10 bg-white dark:bg-gray-800 rounded-full p-3 shadow-xl hover:shadow-2xl transition-all duration-300 border border-gray-200 dark:border-white/10 hover:scale-110"
              aria-label="Scroll left"
            >
              <ChevronLeft className="w-5 h-5 text-gray-700 dark:text-gray-300" />
            </button>
          )}

          {/* Right Scroll Button */}
          {showRightArrow && (
            <button
              onClick={() => scroll('right')}
              className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 z-10 bg-white dark:bg-gray-800 rounded-full p-3 shadow-xl hover:shadow-2xl transition-all duration-300 border border-gray-200 dark:border-white/10 hover:scale-110"
              aria-label="Scroll right"
            >
              <ChevronRight className="w-5 h-5 text-gray-700 dark:text-gray-300" />
            </button>
          )}

          {/* Scrollable Testimonials */}
          <div
            ref={scrollContainerRef}
            onScroll={handleScroll}
            className="flex overflow-x-auto gap-6 pb-8 scrollbar-hide snap-x snap-mandatory"
            style={{
              scrollbarWidth: 'none',
              msOverflowStyle: 'none',
              WebkitOverflowScrolling: 'touch'
            }}
          >
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={testimonial.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: index * 0.05 }}
                className="flex-none w-full sm:w-[450px] snap-start"
              >
                <Card className="h-full hover:border-blue-500/40 transition-all duration-300">
                  {/* Header with user info */}
                  <div className="flex items-start gap-4 mb-4">
                    <div className="relative">
                      <div className="text-5xl">{testimonial.avatar}</div>
                      {testimonial.verified && (
                        <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-blue-500 rounded-full flex items-center justify-center text-white text-xs">
                          ✓
                        </div>
                      )}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <h3 className="font-bold text-gray-900 dark:text-white text-lg">
                          {testimonial.name}
                        </h3>
                        <span className="text-2xl">{testimonial.flag}</span>
                      </div>
                      <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                        {testimonial.country}
                      </p>
                      <div className="flex gap-0.5">
                        {renderStars(testimonial.rating)}
                      </div>
                    </div>
                  </div>

                  {/* Quote icon */}
                  <Quote className="w-6 h-6 text-gray-300 dark:text-gray-700 mb-2" />

                  {/* Testimonial text */}
                  <p className="text-gray-700 dark:text-gray-300 mb-4 line-clamp-4 leading-relaxed">
                    "{testimonial.text}"
                  </p>

                  {/* Footer with earnings and date */}
                  <div className="flex items-center justify-between mt-auto pt-4 border-t border-gray-100 dark:border-gray-800">
                    <span className="text-sm font-semibold text-green-600 dark:text-green-400">
                      {testimonial.earnings}
                    </span>
                    <span className="text-xs text-gray-500 dark:text-gray-500">
                      {testimonial.date}
                    </span>
                  </div>

                  {/* Verified badge for mobile */}
                  {testimonial.verified && (
                    <div className="mt-3 md:hidden">
                      <span className="text-xs bg-blue-100 dark:bg-blue-500/10 text-blue-600 dark:text-blue-400 px-2 py-1 rounded-full">
                        Verified User
                      </span>
                    </div>
                  )}
                </Card>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Scroll Indicator Dots */}
        <div className="flex justify-center gap-2 mt-6 md:hidden">
          {testimonials.map((_, index) => (
            <button
              key={index}
              onClick={() => {
                if (scrollContainerRef.current) {
                  const cardWidth = 450; // Match card width
                  scrollContainerRef.current.scrollTo({
                    left: index * (cardWidth + 24), // 24 is gap
                    behavior: 'smooth'
                  });
                }
              }}
              className={`w-2 h-2 rounded-full transition-all duration-300 ${
                index === 0 ? 'w-6 bg-blue-500' : 'bg-gray-300 dark:bg-gray-600'
              }`}
            />
          ))}
        </div>

        {/* Stats Summary */}
        <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="text-center p-4">
            <div className="text-2xl font-bold text-yellow-500">4.8/5</div>
            <div className="text-sm text-gray-600 dark:text-gray-400">Average Rating</div>
          </div>
          <div className="text-center p-4">
            <div className="text-2xl font-bold text-green-500">15k+</div>
            <div className="text-sm text-gray-600 dark:text-gray-400">Verified Reviews</div>
          </div>
          <div className="text-center p-4">
            <div className="text-2xl font-bold text-blue-500">96%</div>
            <div className="text-sm text-gray-600 dark:text-gray-400">Would Recommend</div>
          </div>
          <div className="text-center p-4">
            <div className="text-2xl font-bold text-purple-500">50+</div>
            <div className="text-sm text-gray-600 dark:text-gray-400">Countries</div>
          </div>
        </div>

        {/* Trust Indicators */}
        <div className="mt-8 flex flex-wrap justify-center gap-8 text-sm text-gray-600 dark:text-gray-400">
          <div className="flex items-center gap-2">
            <span className="text-green-500">✓</span> Verified Reviews
          </div>
          <div className="flex items-center gap-2">
            <span className="text-green-500">✓</span> Real Users
          </div>
          <div className="flex items-center gap-2">
            <span className="text-green-500">✓</span> Updated Weekly
          </div>
          <div className="flex items-center gap-2">
            <span className="text-green-500">✓</span> Trustpilot Verified
          </div>
        </div>
      </section>

      {/* Add custom CSS for hiding scrollbar */}
      <style jsx>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </OpeningStyle>
  );
}

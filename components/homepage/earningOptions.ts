// components/homepage/earningOptions.ts
import {
  Zap,
  Smartphone,
  Gamepad,
  Video,
  Cpu,
  CheckCircle,
  Puzzle,
  Clipboard,
  Film,
  Tool,
  Gift,
  Flask,
  Mail,
  Globe,
  Star,
  RefreshCcw,
  Trophy,
  CreditCard,
} from "lucide-react";
import { ComponentType, SVGProps } from "react";

/**
 * Type for a single earning option: [icon component, title, slug]
 */
export type EarningOption = [icon: ComponentType<SVGProps<SVGSVGElement>>, title: string, slug: string];

/**
 * Static array of earning options using lucide-react icons
 */
export const earningOptions: EarningOption[] = [
  [Zap, "Surveys", "/surveys"],
  [Smartphone, "App Installs", "/app-installs"],
  [Gamepad, "Playing Games", "/play-games"],
  [Video, "Watching Videos", "/watch-videos"],
  [Cpu, "Mining Rewards", "/mining-rewards"],
  [CheckCircle, "Completing Offers", "/complete-offers"],
  [Puzzle, "Offerwall", "/offerwall"],
  [Clipboard, "Surveywall", "/surveywall"],
  [Film, "Watching Ads", "/watch-ads"],
  [Tool, "Micro Tasks", "/micro-tasks"],
  [Gift, "Free Trials", "/complete-free-trials"],
  [Flask, "Testing Products", "/test-products"],
  [Mail, "Reading Emails", "/read-emails"],
  [Globe, "Visiting Websites", "/visit-websites"],
  [Star, "Review Tasks", "/review-tasks"],
  [RefreshCcw, "Spinning Wheel", "/spinning-wheel"],
  [Trophy, "Loyalty", "/loyalty"],
  [CreditCard, "Vouchers", "/vouchers"],
];

/**
 * Helper function to get earning options dynamically
 * Useful for filtering, translations, or future API integration
 */
export const getEarningOptions = (): EarningOption[] => [...earningOptions];

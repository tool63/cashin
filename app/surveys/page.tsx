"use client";

import Link from "next/link";
import { motion } from "framer-motion";

const surveys = [
  { title: "App Usage Survey", reward: "$2", duration: "5 mins" },
  { title: "Shopping Habits Survey", reward: "$3", duration: "7 mins" },
  { title: "Social Media Survey", reward: "$1.5", duration: "4 mins" },
];

export default function SurveysPage() {
  return (
    <div className="w-full min-h-screen bg-gray-50 text-gray-900">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-indigo-500 to-purple-600 text-white py-20 px-6 text-center">
        <motion.h1 
          initial={{ opacity: 0, y: -20 }} 
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-4xl md:text-6xl font-bold mb-4"
        >
          Earn Rewards by Taking Surveys
        </motion.h1>
        <p className="text-lg md:text-2xl mb-8">
          Share your opinions and earn points or cash easily.
        </p>
        <Link href="#active-surveys" className="bg-white text-indigo-600 font-semibold px-6 py-3 rounded-lg shadow hover:bg-gray-100 transition">
          View Surveys
        </Link>
      </section>

      {/* Why Take Surveys */}
      <section className="py-16 px-6 md:px-20">
        <h2 className="text-3xl font-bold text-center mb-12">Why Take Surveys?</h2>
        <div className="grid md:grid-cols-3 gap-8 text-center">
          <div className="p-6 bg-white rounded-lg shadow hover:shadow-lg transition">
            <h3 className="text-xl font-semibold mb-2">Earn Rewards</h3>
            <p>Get points or cash for every survey you complete.</p>
          </div>
          <div className="p-6 bg-white rounded-lg shadow hover:shadow-lg transition">
            <h3 className="text-xl font-semibold mb-2">Flexible & Easy</h3>
            <p>Complete surveys anytime, anywhere from your device.</p>
          </div>
          <div className="p-6 bg-white rounded-lg shadow hover:shadow-lg transition">
            <h3 className="text-xl font-semibold mb-2">Share Your Opinion</h3>
            <p>Your feedback helps shape products and services you love.</p>
          </div>
        </div>
      </section>

      {/* Active Surveys */}
      <section id="active-surveys" className="py-16 px-6 md:px-20 bg-gray-100">
        <h2 className="text-3xl font-bold text-center mb-12">Active Surveys</h2>
        <div className="grid md:grid-cols-3 gap-8">
          {surveys.map((survey, idx) => (
            <motion.div 
              key={idx} 
              className="bg-white rounded-lg shadow p-6 hover:shadow-lg transition"
              whileHover={{ scale: 1.03 }}
            >
              <h3 className="text-xl font-semibold mb-2">{survey.title}</h3>
              <p className="mb-2">Reward: <span className="font-bold">{survey.reward}</span></p>
              <p className="mb-4">Duration: {survey.duration}</p>
              <Link href="#" className="block text-center bg-indigo-600 text-white py-2 rounded-lg hover:bg-indigo-700 transition">
                Take Survey
              </Link>
            </motion.div>
          ))}
        </div>
      </section>

      {/* How It Works */}
      <section className="py-16 px-6 md:px-20">
        <h2 className="text-3xl font-bold text-center mb-12">How It Works</h2>
        <div className="grid md:grid-cols-3 gap-8 text-center">
          <div className="p-6 bg-white rounded-lg shadow hover:shadow-lg transition">
            <h3 className="text-xl font-semibold mb-2">1. Sign Up</h3>
            <p>Create an account to start earning.</p>
          </div>
          <div className="p-6 bg-white rounded-lg shadow hover:shadow-lg transition">
            <h3 className="text-xl font-semibold mb-2">2. Complete Surveys</h3>
            <p>Choose surveys that interest you and share your opinion.</p>
          </div>
          <div className="p-6 bg-white rounded-lg shadow hover:shadow-lg transition">
            <h3 className="text-xl font-semibold mb-2">3. Earn Rewards</h3>
            <p>Get points, cash, or gift cards instantly.</p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-indigo-600 text-white text-center py-16 px-6">
        <h2 className="text-3xl font-bold mb-4">Start Earning Today!</h2>
        <p className="mb-8">Sign up now and unlock exciting surveys near you.</p>
        <Link href="#" className="bg-white text-indigo-600 font-semibold px-6 py-3 rounded-lg shadow hover:bg-gray-100 transition">
          Join Now
        </Link>
      </section>
    </div>
  );
}

"use client";

import Navbar from "../components/Navbar";
import HeroSection from "../components/HeroSection";
import AboutSection from "../components/AboutSection";
import WorkSection from "../components/WorkSection";
import ServicesSection from "../components/ServicesSection";
import TestimonialSection from "../components/TestimonialSection";
import SkillsBar from "../components/SkillsBar";
import GeminiChatbot from "../components/GeminiChatbot";

export default function Home() {
  return (
    <>
      <Navbar />
      <HeroSection />
      <AboutSection />
      <WorkSection />
      <ServicesSection />
      <TestimonialSection />
      <SkillsBar />
      <GeminiChatbot /> {/* Tambahkan GeminiChatbot di sini untuk pengujian */}
    </>
  );
}

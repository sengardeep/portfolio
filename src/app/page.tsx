"use client";

import { HeroSection } from "@/components/sections/HeroSection";
import { EducationExperience } from "@/components/sections/EducationExperience";
import { EngineeringSnapshot } from "@/components/sections/EngineeringSnapshot";
import { CPDashboard } from "@/components/sections/CPDashboard";
import { Certifications } from "@/components/sections/Certifications";
import { CoreSkills } from "@/components/sections/CoreSkills";
import { GithubAnalytics } from "@/components/sections/GithubAnalytics";
import { FeaturedProjects } from "@/components/sections/FeaturedProjects";
import { Footer } from "@/components/layout/Footer";
import { Spotlight } from "@/components/ui/Spotlight";
import { InteractiveBackground } from "@/components/ui/InteractiveBackground";
import { Preloader } from "@/components/ui/Preloader";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";

function Divider() {
  return (
    <div className="max-w-3xl mx-auto w-full px-4">
      <div className="border-t border-border/20" />
    </div>
  );
}

let hasBootedSession = false;

export default function Home() {
  const [booted, setBooted] = useState(hasBootedSession);

  useEffect(() => {
    try {
      if (sessionStorage.getItem("deepraj_portfolio_booted") === "true") {
        hasBootedSession = true;
        setBooted(true);
      }
    } catch (e) {}

    // Reset scroll position on initial load
    window.scrollTo({ top: 0, left: 0, behavior: "instant" });
  }, []);

  const handleBootComplete = () => {
    hasBootedSession = true;
    try {
      sessionStorage.setItem("deepraj_portfolio_booted", "true");
    } catch (e) {}
    setBooted(true);
    // Explicitly guarantee user stays anchored at top hero/intro section
    window.scrollTo({ top: 0, left: 0, behavior: "instant" });
  };

  return (
    <>
      {!booted && <Preloader onComplete={handleBootComplete} />}

      <div className="flex flex-col min-h-screen bg-background text-foreground relative overflow-hidden transition-colors duration-300">
        <Spotlight />
        <InteractiveBackground />

        {booted && (
          <motion.div
            initial={hasBootedSession ? false : { opacity: 0, y: 30, scale: 0.98, filter: "blur(6px)" }}
            animate={{ opacity: 1, y: 0, scale: 1, filter: "blur(0px)" }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col w-full"
          >
            <HeroSection />
            <Divider />
            <EducationExperience />
            <Divider />
            <EngineeringSnapshot />
            <Divider />
            <CPDashboard />
            <Divider />
            <CoreSkills />
            <Divider />
            <GithubAnalytics />
            <Divider />
            <FeaturedProjects />
            <Divider />
            <Certifications />
            <Divider />
            <Footer />
          </motion.div>
        )}
      </div>
    </>
  );
}

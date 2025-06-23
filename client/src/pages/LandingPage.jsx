
import React, { useEffect } from "react";
import Navbar from "@/components/LandingPage/Navbar";
import Hero from "@/components/LandingPage/Hero";
import WhyBotlySection from "@/components/LandingPage/WhyBotlySection";
import SpecsSection from "@/components/LandingPage/SpecsSection";
import DetailsSection from "@/components/LandingPage/DetailsSection";
import ImageShowcaseSection from "@/components/LandingPage/ImageShowcaseSection";
import Features from "@/components/LandingPage/Features";
import Testimonials from "@/components/LandingPage/Testimonials";
import Newsletter from "@/components/LandingPage/Newsletter";
import MadeByHumans from "@/components/LandingPage/MadeByHumans";
import Footer from "@/components/LandingPage/Footer";

const Index = () => {
  // Initialize intersection observer to detect when elements enter viewport
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("animate-fade-in");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 }
    );
    
    const elements = document.querySelectorAll(".animate-on-scroll");
    elements.forEach((el) => observer.observe(el));
    
    return () => {
      elements.forEach((el) => observer.unobserve(el));
    };
  }, []);

  useEffect(() => {
    // This helps ensure smooth scrolling for the anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function (e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href')?.substring(1);
        if (!targetId) return;
        
        const targetElement = document.getElementById(targetId);
        if (!targetElement) return;
        
        // Increased offset to account for mobile nav
        const offset = window.innerWidth < 768 ? 100 : 80;
        
        window.scrollTo({
          top: targetElement.offsetTop - offset,
          behavior: 'smooth'
        });
      });
    });
  }, []);

  return (
    <div className="min-h-screen">
      <Navbar />
      <main className="space-y-4 sm:space-y-8">
        <Hero />
        <WhyBotlySection />
        <SpecsSection />
        <DetailsSection />
        <ImageShowcaseSection />
        <Features />
        <Testimonials />
        <Newsletter />
        <MadeByHumans />
      </main>
      <Footer />
    </div>
  );
};

export default Index;

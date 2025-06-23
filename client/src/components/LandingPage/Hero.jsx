import React, { useEffect, useRef, useState } from "react";
import { ArrowRight } from "lucide-react";
import LottieAnimation from "./LottieAnimation";

const Hero = () => {
  const containerRef = useRef(null);
  const imageRef = useRef(null);
  const [lottieData, setLottieData] = useState(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  useEffect(() => {
    fetch("/loop-header.lottie")
      .then((res) => res.json())
      .then((data) => setLottieData(data))
      .catch((err) => console.error("Error loading Lottie:", err));
  }, []);

  useEffect(() => {
    if (isMobile) return;
    const handleMouseMove = (e) => {
      if (!containerRef.current || !imageRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;
      imageRef.current.style.transform = `perspective(1000px) rotateY(${x * 2.5}deg) rotateX(${-y * 2.5}deg) scale3d(1.02, 1.02, 1.02)`;
    };
    const handleMouseLeave = () => {
      if (imageRef.current) {
        imageRef.current.style.transform = `perspective(1000px) rotateY(0deg) rotateX(0deg) scale3d(1,1,1)`;
      }
    };
    const container = containerRef.current;
    container?.addEventListener("mousemove", handleMouseMove);
    container?.addEventListener("mouseleave", handleMouseLeave);
    return () => {
      container?.removeEventListener("mousemove", handleMouseMove);
      container?.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, [isMobile]);

  useEffect(() => {
    if (isMobile) return;
    const handleScroll = () => {
      const scrollY = window.scrollY;
      document.querySelectorAll(".parallax").forEach((el) => {
        const speed = parseFloat(el.dataset.speed || "0.1");
        el.style.setProperty("--parallax-y", `${-scrollY * speed}px`);
      });
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isMobile]);

  return (
    <section
      id="hero"
      className="relative overflow-hidden bg-cover"
      style={{
        backgroundImage: 'url("/Header-background.webp")',
        backgroundPosition: "center 50%",
        padding: isMobile ? "100px 12px 40px" : "120px 20px 60px",
      }}
    >
      <div className="absolute -top-[10%] -right-[5%] w-1/2 h-[70%] bg-orange-gradient opacity-20 blur-3xl rounded-full"></div>

      <div
        className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
        ref={containerRef}
      >
        <div className="flex flex-wrap gap-12 items-center justify-between w-full">
          {/* Text Section */}
          <div className="flex-1 min-w-[300px]">
            <div
              className="orange-chip mb-3 sm:mb-6 opacity-0 animate-fade-in"
              style={{ animationDelay: "0.1s" }}
            >
              <span className="inline-flex items-center justify-center w-5 h-5 rounded-full bg-orange-500 text-white mr-2">
                01
              </span>
              <span>No-Code Solution</span>
            </div>

            <h1
              className="section-title text-3xl sm:text-4xl lg:text-5xl xl:text-6xl leading-tight opacity-0 animate-fade-in"
              style={{ animationDelay: "0.3s" }}
            >
              Botly: Where AI
              <br className="hidden sm:inline" />
              Meets Conversation
            </h1>

            <p
              className="section-subtitle mt-3 sm:mt-6 mb-4 sm:mb-8 leading-relaxed opacity-0 animate-fade-in text-gray-950 font-normal text-base sm:text-lg text-left"
              style={{ animationDelay: "0.5s" }}
            >
              From Vision to Conversation — Powered by Botly.
            </p>

            <div
              className="flex flex-col sm:flex-row gap-4 opacity-0 animate-fade-in"
              style={{ animationDelay: "0.7s" }}
            >
              <a
                href="#get-access"
                className="flex items-center justify-center group w-full sm:w-auto text-center"
                style={{
                  backgroundColor: "#FE5C02",
                  borderRadius: "1440px",
                  boxSizing: "border-box",
                  color: "#FFFFFF",
                  cursor: "pointer",
                  fontSize: "14px",
                  lineHeight: "20px",
                  padding: "16px 24px",
                  border: "1px solid white",
                }}
              >
                Create Your Bot
                <ArrowRight className="ml-2 w-4 h-4 transition-transform group-hover:translate-x-1" />
              </a>
            </div>
          </div>

          {/* Lottie/Image Section */}
          <div className="flex-1 min-w-[300px] relative mt-6 lg:mt-0">
            {lottieData ? (
              <div
                className="relative z-10 animate-fade-in"
                style={{ animationDelay: "0.9s" }}
              >
                <LottieAnimation
                  animationPath={lottieData}
                  className="w-full h-auto max-w-lg mx-auto"
                  loop={true}
                  autoplay={true}
                />
              </div>
            ) : (
              <>
                <div className="absolute inset-0 bg-dark-900 rounded-2xl sm:rounded-3xl -z-10 shadow-xl"></div>
                <div className="relative transition-all duration-500 ease-out overflow-hidden rounded-2xl sm:rounded-3xl shadow-2xl">
                  <img
                    ref={imageRef}
                    src="/hero.png"
                    alt="Botly Chatbot Platform"
                    className="w-full h-auto object-cover transition-transform duration-500 ease-out"
                    style={{ transformStyle: "preserve-3d" }}
                  />
                  <div
                    className="absolute inset-0"
                    style={{
                      backgroundImage: 'url("/hero.png")',
                      backgroundSize: "cover",
                      backgroundPosition: "center",
                      mixBlendMode: "overlay",
                      opacity: 0.5,
                    }}
                  ></div>
                </div>
              </>
            )}
          </div>
        </div>
      </div>

      <div
        className="hidden lg:block absolute bottom-0 left-1/4 w-64 h-64 bg-orange-100/30 rounded-full blur-3xl -z-10 parallax"
        data-speed="0.05"
      ></div>
    </section>
  );
};

export default Hero;

import React, { useState, useEffect, useCallback } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useMembers } from "../context/MembersContext";

const HeroSlider: React.FC = () => {
  const { bannerImages } = useMembers();
  const [current, setCurrent] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const goTo = useCallback(
    (index: number) => {
      if (isTransitioning) return;
      setIsTransitioning(true);
      setCurrent((index + bannerImages.length) % bannerImages.length);
      setTimeout(() => setIsTransitioning(false), 600);
    },
    [bannerImages.length, isTransitioning]
  );

  useEffect(() => {
    const timer = setInterval(() => {
      goTo(current + 1);
    }, 5000);
    return () => clearInterval(timer);
  }, [current, goTo]);

  if (!bannerImages.length) return null;

  return (
    <div className="relative w-full h-[60vh] sm:h-[70vh] lg:h-[85vh] overflow-hidden bg-emerald-900">
      {bannerImages.map((img, i) => (
        <div
          key={img.id}
          className={`absolute inset-0 transition-opacity duration-700 ${
            i === current ? "opacity-100 z-10" : "opacity-0 z-0"
          }`}
        >
          <img
            src={img.url}
            alt={img.label}
            className="w-full h-full object-cover"
            onError={(e) => {
              (e.target as HTMLImageElement).src =
                "https://via.placeholder.com/1920x1080/065f46/ffffff?text=Jasdan+Memon+Jamat";
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/20 to-black/60" />
          <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4">
            <div className="bg-black/30 backdrop-blur-sm rounded-2xl px-6 py-8 sm:px-10 sm:py-10 max-w-3xl mx-auto border border-white/20">
              <p className="text-yellow-400 text-sm sm:text-base font-medium tracking-widest mb-2 uppercase">
                بسم الله الرحمن الرحيم
              </p>
              <h1 className="text-white text-3xl sm:text-4xl lg:text-5xl font-bold mb-3 drop-shadow-lg">
                Jasdan Memon Jamat
              </h1>
              <p className="text-emerald-200 text-base sm:text-lg font-light mb-4">
                جسدن میمن جماعت
              </p>
              <p className="text-white/90 text-sm sm:text-base mb-2 italic">
                "{img.label}"
              </p>
              <div className="w-16 h-0.5 bg-yellow-400 mx-auto mt-4" />
            </div>
          </div>
        </div>
      ))}

      {/* Arrows */}
      <button
        onClick={() => goTo(current - 1)}
        className="absolute left-3 sm:left-5 top-1/2 -translate-y-1/2 z-20 w-10 h-10 sm:w-12 sm:h-12 bg-black/40 hover:bg-black/60 text-white rounded-full flex items-center justify-center backdrop-blur-sm transition-all border border-white/20"
      >
        <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6" />
      </button>
      <button
        onClick={() => goTo(current + 1)}
        className="absolute right-3 sm:right-5 top-1/2 -translate-y-1/2 z-20 w-10 h-10 sm:w-12 sm:h-12 bg-black/40 hover:bg-black/60 text-white rounded-full flex items-center justify-center backdrop-blur-sm transition-all border border-white/20"
      >
        <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6" />
      </button>

      {/* Dots */}
      <div className="absolute bottom-5 left-1/2 -translate-x-1/2 z-20 flex gap-2">
        {bannerImages.map((_, i) => (
          <button
            key={i}
            onClick={() => goTo(i)}
            className={`rounded-full transition-all duration-300 ${
              i === current
                ? "w-8 h-2.5 bg-yellow-400"
                : "w-2.5 h-2.5 bg-white/50 hover:bg-white/80"
            }`}
          />
        ))}
      </div>
    </div>
  );
};

export default HeroSlider;

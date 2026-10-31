"use client";

import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import anime from "animejs";

export default function EditorialAnimation() {
  const containerRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const ruleRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    // GSAP high-contrast fade and slide
    const ctx = gsap.context(() => {
      gsap.fromTo(
        headlineRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 1.2, ease: "power3.out" },
      );
    }, containerRef);

    // Anime.js hairline width expansion
    if (ruleRef.current) {
      anime({
        targets: ruleRef.current,
        width: ["0%", "100%"],
        duration: 1400,
        easing: "easeInOutQuad",
        delay: 300,
      });
    }

    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className="my-8 text-center">
      <h3
        ref={headlineRef}
        className="font-serif text-3xl font-light tracking-wide text-monochrome-pureWhite sm:text-4xl"
      >
        Haute Horlogerie & Editorial Curations
      </h3>
      <div
        ref={ruleRef}
        className="mx-auto mt-4 h-[1px] bg-wine-light"
        style={{ width: "0%" }}
      />
    </div>
  );
}

"use client";
import { Environment } from "@react-three/drei";
import React, { useRef } from "react";
import { Group } from "three";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// ------------------ Imports Personnels------------------------------------
import FloatingCan from "@/components/FloatingCan";
import { useMediaQuery } from "@/hooks/useMediaQuery";

gsap.registerPlugin(useGSAP, ScrollTrigger);

export default function Scene() {
  const canRef = useRef<Group>(null);

  const bgColors = ["#FFA6B5", "#E9CFF6", "#CBEF9A"];

  const isMediumScreen = useMediaQuery(
    "(max-width: 1023px)and (min-width: 431px)",
    true,
  );
  const isSmallScreen = useMediaQuery("(max-width: 430px)", true);

  useGSAP(
    () => {
      if (!canRef.current) return;

      const sections = gsap.utils.toArray(".alternating-section");

      const scrollTl = gsap.timeline({
        scrollTrigger: {
          trigger: ".alternating-text-view",
          endTrigger: ".alternating-text-container",
          start: "top top",
          end: "bottom bottom",
          scrub: true,
          pin: true,
        },
      });

      if (isSmallScreen) {
        sections.forEach((_, index) => {
          if (!canRef.current) return;
          if (index === 0) return;
          scrollTl
            .to(
              canRef.current.rotation,
              {
                y: Math.PI * 2,
              },
              0,
            )
            .to(
              ".alternating-text-container",
              {
                backgroundColor: gsap.utils.wrap(bgColors, index),
              },
              0,
            );
        });
      } else {
        sections.forEach((_, index) => {
          if (!canRef.current) return;
          if (index === 0) return;

          const isOdd = index % 2 !== 0;

          scrollTl
            .to(canRef.current.position, {
              x: isMediumScreen ? (isOdd ? "-0.8" : "0.8") : isOdd ? "-1" : "1",
              ease: "circ.inOut",
              delay: 0.8,
              duration: 12,
            })
            .to(canRef.current.rotation, {
              y: Math.PI * 2,
              duration: 25,
              scrub: true,
            })
            .to(".alternating-text-container", {
              backgroundColor: gsap.utils.wrap(bgColors, index),
            });
        });
      }
    },
    { dependencies: [isMediumScreen, isSmallScreen] },
  );

  return (
    <group
      ref={canRef}
      scale={isSmallScreen ? 0.6 : isMediumScreen ? 0.8 : 1}
      position-x={isMediumScreen ? 0.5 : isSmallScreen ? 0 : 1}
      position-y={isSmallScreen ? 0.8 : 0}
    >
      {isMediumScreen}
      <FloatingCan flavor="fraise" />
      <Environment files="/hdr/lobby.hdr" environmentIntensity={1.5} />
    </group>
  );
}

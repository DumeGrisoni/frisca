"use client";
import * as THREE from "three";
import React, { useRef } from "react";
import {
  Cloud,
  Clouds,
  Environment,
  //   OrbitControls,
  Text,
} from "@react-three/drei";
import { Content } from "@prismicio/client";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// ------------------ Imports Personnels------------------------------------
import FloatingCan from "@/components/FloatingCan";
import { useMediaQuery } from "@/hooks/useMediaQuery";

type SkyDiveProps = {
  sentence: string | null;
  flavor: Content.SkyDiveSliceDefaultPrimary["flavor"];
};

gsap.registerPlugin(useGSAP, ScrollTrigger);

export default function Scene({ sentence, flavor }: SkyDiveProps) {
  const groupRef = useRef<THREE.Group>(null);
  const canRef = useRef<THREE.Group>(null);
  const cloud1Ref = useRef<THREE.Group>(null);
  const cloud2Ref = useRef<THREE.Group>(null);
  const cloudsRef = useRef<THREE.Group>(null);
  const wordsRef = useRef<THREE.Group>(null);

  const isMediumScreen = useMediaQuery("(max-width: 1023px)", true);
  const isSmallScreen = useMediaQuery("(max-width: 430px)", true);

  const ANGLE = 75 * (Math.PI / 180);

  // ------------------ GSAP ANIMATIONS------------------------------------
  useGSAP(() => {
    if (
      !groupRef.current ||
      !wordsRef.current ||
      !canRef.current ||
      !cloudsRef.current ||
      !cloud1Ref.current ||
      !cloud2Ref.current
    )
      return;

    // INITIAL POSITION
    gsap.set(
      cloudsRef.current.position,
      isMediumScreen ? { z: 5 } : isSmallScreen ? { z: 10 } : { z: 0 },
    );

    gsap.set(canRef.current.position, {
      ...getXYPositions(-4),
    });

    gsap.set(
      wordsRef.current.children.map((word) => word.position),
      {
        ...getXYPositions(7),
        z: 2,
      },
    );

    // SPINNING CAN
    gsap.to(canRef.current.rotation, {
      y: Math.PI * 2,
      duration: 1.7,
      repeat: -1,
      ease: "none",
    });

    //INIFINITE CLOUD MOVEMENT
    const DISTANCE = 15;
    const DURATION = isMediumScreen ? 10 : 6;

    gsap.set([cloudsRef.current.position, cloud1Ref.current.position], {
      ...getXYPositions(DISTANCE),
    });
    gsap.set([cloudsRef.current.position, cloud2Ref.current.position], {
      ...getXYPositions(DISTANCE),
    });

    gsap.to(cloud1Ref.current.position, {
      y: `+=${getYPosition(DISTANCE * 3)}`,
      x: `+=${getXPosition(DISTANCE * -3)}`,
      ease: "none",
      repeat: -1,
      duration: DURATION,
    });
    gsap.to(cloud2Ref.current.position, {
      y: `+=${getYPosition(DISTANCE * 3)}`,
      x: `+=${getXPosition(DISTANCE * -3)}`,
      ease: "none",
      repeat: -1,
      delay: DURATION / 2,
      duration: DURATION,
    });

    const scrollTl = gsap.timeline({
      scrollTrigger: {
        trigger: ".skydive",
        pin: true,
        start: "top top",
        end: "+=2000",
        scrub: 1.5,
      },
    });

    scrollTl
      .to("body", {
        backgroundColor: "#c0f0f5",
        overwrite: "auto",
        duration: 0.1,
      })
      .to(
        cloudsRef.current.position,
        {
          z: 0,
          duration: 0.3,
        },
        0,
      )
      .to(canRef.current.position, {
        x: 0,
        y: 0,
        duration: 0.3,
        ease: "back.out(1.7)",
      })
      .to(
        wordsRef.current.children.map((word) => word.position),
        {
          keyframes: [
            {
              x: 0,
              y: 0,
              z: -1,
            },
            {
              ...getXYPositions(-7),
              z: -7,
            },
          ],
          stagger: 0.3,
        },
        0,
      )
      .to(canRef.current.position, {
        ...getXYPositions(4),
        duration: 0.5,
        ease: "back.in(1.7)",
      })
      .to(cloudsRef.current.position, { z: 7, duration: 0.5 });
  });

  // ------------------ FONCTIONS------------------------------------

  const getXPosition = (distance: number) => {
    return Math.cos(ANGLE) * distance;
  };
  const getYPosition = (distance: number) => {
    return Math.sin(ANGLE) * distance;
  };

  const getXYPositions = (distance: number) => ({
    x: getXPosition(distance),
    y: getYPosition(-1 * distance),
  });

  return (
    <group ref={groupRef}>
      <group rotation={[0, 0, 0.5]}>
        <FloatingCan
          ref={canRef}
          flavor={flavor}
          rotationIntensity={0}
          floatIntensity={3}
          floatSpeed={3}
        >
          <pointLight intensity={30} color={"yellow"} decay={0.6} />
        </FloatingCan>
      </group>

      {/* CLOUDS */}
      <Clouds ref={cloudsRef}>
        <Cloud ref={cloud1Ref} bounds={[10, 10, 2]} />
        <Cloud ref={cloud2Ref} bounds={[10, 10, 2]} />
      </Clouds>

      {/* WORDS */}
      <group ref={wordsRef}>
        {sentence && <ThreeText sentence={sentence} color={"green"} />}
      </group>

      {/* <OrbitControls /> */}
      {/* LIGHT */}
      <ambientLight intensity={2} color={"#9DDEFA"} />
      <Environment files="/hdr/field.hdr" environmentIntensity={1.5} />
    </group>
  );
}

function ThreeText({
  sentence,
  color = "white",
}: {
  sentence: string;
  color?: string;
}) {
  const words = sentence.toUpperCase().split(" ");

  const material = new THREE.MeshLambertMaterial();

  const isDesktop = useMediaQuery("(min-width: 950px)", true);
  const isMobile = useMediaQuery("(max-width: 950px)", true);

  const scale = isDesktop ? 1 : isMobile ? 0.25 : 0.4;

  return words.map((word: string, index: number) => (
    <Text
      key={`${index}-${word}`}
      scale={scale}
      color={color}
      material={material}
      font="/fonts/Alpino-Variable.woff"
      fontWeight={700}
      anchorX={"center"}
      anchorY={"middle"}
      characters="ABCDEFGHIJKLMNOPQRSTUVWXYZ!,.?"
    >
      {word}
    </Text>
  ));
}

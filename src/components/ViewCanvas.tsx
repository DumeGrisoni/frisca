"use client";
import { Canvas } from "@react-three/fiber";
import React, { Suspense } from "react";
import { View } from "@react-three/drei";
import dynamic from "next/dynamic";

// ------------------ Imports Personnels------------------------------------
export default function ViewCanvas() {
  const Loader = dynamic(
    () => import("@react-three/drei").then((mod) => mod.Loader),
    { ssr: false },
  );
  return (
    <>
      <Canvas
        style={{
          position: "fixed",
          top: 0,
          left: "50%",
          transform: "translateX(-50%)",
          overflow: "hidden",
          pointerEvents: "none",
          zIndex: 30,
        }}
        shadows
        dpr={[1, 1.5]}
        gl={{ antialias: true }}
        camera={{
          fov: 30,
        }}
      >
        <Suspense fallback={null}>
          <View.Port />
        </Suspense>
      </Canvas>
      <Loader />
    </>
  );
}

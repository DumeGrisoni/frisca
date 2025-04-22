"use client";
import { FC, useRef, useState } from "react";
import { Content } from "@prismicio/client";
import {
  PrismicRichText,
  PrismicText,
  SliceComponentProps,
} from "@prismicio/react";
import { Center, Environment, View } from "@react-three/drei";
import { ArrowIcon } from "./ArrowIcon";
import clsx from "clsx";
import { Group } from "three";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

// ------------------ Imports Personnels------------------------------------
import { SodaCanProps } from "@/components/SodaCan";
import FloatingCan from "@/components/FloatingCan";
import { WavyCircles } from "./WavyCircles";

gsap.registerPlugin(useGSAP);

const SPIN_ON_CHANGE = 8;

const FLAVORS: {
  flavor: SodaCanProps["flavor"];
  color: string;
  name: string;
}[] = [
  { flavor: "cerise", color: "#710523", name: "Cerise noire" },
  { flavor: "raisin", color: "#572981", name: "Raisin" },
  { flavor: "citron", color: "#164405", name: "Citron - Cédrat" },
  {
    flavor: "fraise",
    color: "#690B3D",
    name: "Limonade Fraise",
  },
  { flavor: "pasteque", color: "#4B7002", name: "Pasteque" },
];

/**
 * Props for `Carousel`.
 */
export type CarouselProps = SliceComponentProps<Content.CarouselSlice>;

/**
 * Component for "Carousel" Slices.
 */
const Carousel: FC<CarouselProps> = ({ slice }) => {
  const [currentFlavor, setCurrentFlavor] = useState(0);

  const sodaCanRef = useRef<Group>(null);

  const changeFlavor = (index: number) => {
    if (!sodaCanRef.current) return;
    const nextIndex = (index + FLAVORS.length) % FLAVORS.length;

    const tl = gsap.timeline();

    tl.to(
      sodaCanRef.current.rotation,
      {
        y:
          index > currentFlavor
            ? `-=${Math.PI * 2 * SPIN_ON_CHANGE}`
            : `+=${Math.PI * 2 * SPIN_ON_CHANGE}`,
        ease: "power2.inOut",
        duration: 1,
      },
      0,
    )
      .to(
        ".background, .wavy-circles-outer, .wavy-circles-inner",
        {
          backgroundColor: FLAVORS[nextIndex].color,
          fill: FLAVORS[nextIndex].color,
          ease: "power2.inOut",
          duration: 1,
        },
        0,
      )
      .to("text-wrapper", {
        dureation: 2,
        y: -10,
        opacity: 0,
      })
      .to({}, { onStart: () => setCurrentFlavor(nextIndex) }, 0.5)
      .to(
        "text-wrapper",
        {
          duration: 0.2,
          y: 0,
          opacity: 1,
        },
        0.7,
      );
  };

  return (
    <section
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      className="carousel grid-rows-[auto, 4fr, auto] relative grid min-h-screen justify-center overflow-hidden bg-white py-12 text-white md:px-20"
    >
      <div className="background pointer-events-none absolute inset-0 bg-[#710523] opacity-50" />

      <WavyCircles className="pointer-events-none absolute inset-0 left-1/2 top-1/2 h-[100vmin] -translate-x-1/2 -translate-y-1/2 text-[#710523] md:h-[80vmin] lg:h-[120vmin]" />

      <h2 className="relative text-center text-5xl font-bold">
        <PrismicText field={slice.primary.heading} />
      </h2>
      <div className="grid grid-cols-[auto,auto,auto] items-center">
        {/* LEFT */}
        <ArrowButton
          direction="left"
          onClick={() => changeFlavor(currentFlavor + 1)}
          label="Saveur précedente"
        />
        {/* CAN */}
        <View className="aspect-square h-[70vmin] min-h-40">
          <Center position={[0, 0, 1.5]}>
            <FloatingCan
              ref={sodaCanRef}
              floatIntensity={0.3}
              rotationIntensity={0.5}
              flavor={FLAVORS[currentFlavor].flavor}
            />
          </Center>
          <Environment
            files="hdr/lobby.hdr"
            environmentIntensity={0.6}
            environmentRotation={[0, 3, 0]}
          />
          <directionalLight intensity={6} position={[0, 1, 1]} />
        </View>
        {/* RIGHT  */}
        <ArrowButton
          direction="right"
          onClick={() => changeFlavor(currentFlavor - 1)}
          label="Saveur suivante"
        />
      </div>

      <div className="text-area relative mx-auto text-center">
        <div className="text-wrapper text-4xl font-medium">
          <p>{FLAVORS[currentFlavor].name}</p>
        </div>
        <div className="mt-2 text-2xl font-normal opacity-90">
          <PrismicRichText field={slice.primary.price_copy} />
        </div>
      </div>
    </section>
  );
};

export default Carousel;

type ArrowButtonProps = {
  direction?: "left" | "right";
  label: string;
  onClick?: () => void;
};
function ArrowButton({
  direction = "right",
  label,
  onClick,
}: ArrowButtonProps) {
  return (
    <button
      className="z-20 size-12 rounded-full border-2 border-white bg-white/10 p-3 opacity-85 ring-white focus:outline-none focus-visible:opacity-100 focus-visible:ring-4 md:size-16 lg:size-20"
      onClick={onClick}
    >
      <span className="sr-only">{label}</span>
      <ArrowIcon className={clsx(direction === "right" && "-scale-x-100")} />
    </button>
  );
}

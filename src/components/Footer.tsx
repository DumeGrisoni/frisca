import React from "react";
import { FriscaLogo } from "./FriscaLogo";
import CircleText from "./CircleText";

export default function Footer() {
  return (
    <footer className="bg-[#fee832] text-[#fe6334]">
      <div className="relative mx-auto flex w-full max-w-4xl justify-center px-4 py-8">
        <FriscaLogo />
        <div className="absolute right-24 top-0 size-28 origin-center -translate-y-14 md:size-48 md:-translate-y-28">
          <CircleText />
        </div>
      </div>
      <p className="relative z-10 text-center font-bold">
        Par Grisoni Dominique - DevWeb
      </p>
    </footer>
  );
}

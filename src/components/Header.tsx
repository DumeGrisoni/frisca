import React from "react";
import FriscaLogo from "@/components/FriscaLogo";

export default function Header() {
  return (
    <header className="-mb-28 flex justify-center py-4">
      <FriscaLogo fill="#075985" className="z-10 h-20" />
    </header>
  );
}

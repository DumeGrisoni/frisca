"use client";
import { FC } from "react";
import { asText, Content } from "@prismicio/client";
import { PrismicRichText, SliceComponentProps } from "@prismicio/react";
import { Bounded } from "@/components/Bounded";
import clsx from "clsx";
import { View } from "@react-three/drei";
import Scene from "./Scene";

/**
 * Props for `AlternatingText`.
 */
export type AlternatingTextProps =
  SliceComponentProps<Content.AlternatingTextSlice>;

/**
 * Component for "AlternatingText" Slices.
 */
const AlternatingText: FC<AlternatingTextProps> = ({ slice }) => {
  return (
    <Bounded
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      className="alternating-text-container relative bg-yellow-300 text-sky-950"
    >
      <div>
        <div className="relative z-[100] grid">
          {/* VIEW */}
          <View className="alternating-text-view absolute left-0 top-0 h-screen w-full overflow-x-hidden pb-12">
            <Scene />
          </View>

          {slice.primary.textgroup.map((item, index) => (
            <div
              key={asText(item.heading)}
              className="alternating-section grid min-h-screen place-items-center gap-x-12 md:grid-cols-2"
            >
              <div
                className={clsx(
                  index % 2 === 0 ? "col-start-1" : "md:col-start-2",

                  "mt-[50%] rounded-lg px-4 py-10 pb-6 backdrop-blur-lg max-md:bg-white/30 md:mt-0",
                )}
              >
                <div className="text-balance text-center text-4xl font-bold md:text-6xl lg:text-left">
                  <PrismicRichText field={item.heading} />
                </div>

                <div className="mt-4 h-auto px-10 text-center text-lg md:px-0 md:text-xl">
                  <PrismicRichText field={item.body} />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Bounded>
  );
};

export default AlternatingText;

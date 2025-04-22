import { FC } from "react";
import { Content } from "@prismicio/client";
import { SliceComponentProps } from "@prismicio/react";

/**
 * Props for `BigTextSmile`.
 */
export type BigTextSmileProps = SliceComponentProps<Content.BigTextSmileSlice>;

/**
 * Component for "BigTextSmile" Slices.
 */
const BigTextSmile: FC<BigTextSmileProps> = ({ slice }) => {
  return (
    <section
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      className="min-h-[80%] w-screen overflow-hidden bg-[#FE6334] text-[#Fee832]"
    >
      <h2 className="grid w-full place-items-center gap-[3vw] py-10 text-center font-black uppercase leading-[.7]">
        <div className="text-[34vw]">Soda</div>
        <div className="grid items-center gap-[3vw] text-[34vw] md:flex md:text-[13vw]">
          <span className="inline-block">qui</span>
          <span className="inline-block max-md:text-[30vw]">vous</span>
          <span className="inline-block max-md:text-[30vw]">fait</span>
        </div>
        <div className="text-[22vw]">Sourire</div>
      </h2>
    </section>
  );
};

export default BigTextSmile;

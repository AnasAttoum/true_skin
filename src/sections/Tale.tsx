import { useInView } from "react-intersection-observer";
import Title from "../components/Title";
import { useEffect } from "react";

export default function Tale() {
  const { ref: title, entry: titleEntry, inView: titleInView } = useInView();
  const { ref: image, entry: imageEntry, inView: imageInView } = useInView();

  useEffect(() => {
    if (titleInView && titleEntry) {
      (titleEntry.target as HTMLElement).style.animation =
        "toLeftAnimation 1s 1.5s forwards";
    }
    if (imageInView && imageEntry) {
      (imageEntry.target as HTMLElement).style.animation =
        "opacityAnimation 1s 1s forwards";
    }
  }, [titleInView, titleEntry, imageInView, imageEntry]);

  return (
    <>
      <Title title="The Tale of True Skin" />

      <div className="flex flex-col lg:flex-row lg:justify-evenly lg:items-center gap-5 p-5">
        <div
          className="max-lg:flex max-lg:justify-center opacity-0"
          ref={image}
        >
          <img
            src="/images/RIMAN Aqua Protection Sunscreen.jpeg"
            alt="True Skin"
            style={{ borderRadius: "30% 70% / 50% 50%" }}
          />
        </div>
        <div className="text-justify text-lg lg:text-2xl max-lg:p-5 w-full lg:w-1/3 bg-[--secondary] p-5 rounded-lg opacity-0" ref={title}>
          Our tale began with a passion for natural beauty and a commitment to
          creating effective, ethical skincare. Inspired by [mention
          inspiration, e.g., ancestral remedies, a personal journey], we
          handcraft each product with love and care, using only the finest
          ingredients.
        </div>
      </div>
    </>
  );
}

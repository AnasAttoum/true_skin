import { useEffect } from "react";
import { useInView } from "react-intersection-observer";
import { Link } from "react-router-dom";
import Title from "../components/Title";

export default function Home() {
  const { ref: title, entry: titleEntry, inView: titleInView } = useInView();
  const { ref: image, entry: imageEntry, inView: imageInView } = useInView();

  useEffect(() => {
    if (titleInView && titleEntry) {
      (titleEntry.target as HTMLElement).style.animation =
        "toRightAnimation 1s 1.5s forwards";
    }
    if (imageInView && imageEntry) {
      (imageEntry.target as HTMLElement).style.animation =
        "opacityAnimation 1s .5s forwards";
    }
  }, [titleInView, titleEntry, imageInView, imageEntry]);

  return (
    <>
      <div className="flex flex-col lg:flex-row justify-between bg-[--primary] pt-5">
        <div
          className="flex flex-col justify-center items-center gap-10 text-white lg:w-1/2 opacity-0"
          ref={title}
        >
          <div className="text-3xl sm:text-6xl font-extrabold">
            Healthy skin,
            <p
              style={{
                WebkitTextStroke: "2px white",
                WebkitTextFillColor: "transparent",
              }}
            >
              Happy you.
            </p>
          </div>
          <div className="text-lg sm:text-2xl text-center px-10">
            True Skin is here to help you achieve your best skin yet. We make
            skincare fun, easy, and effective. Explore our products and find
            your perfect match!
          </div>
          <Link
            to={"/products"}
            className="bg-white text-[--primary] text-lg font-bold p-3 rounded-md cursor-pointer"
          >
            Explore
          </Link>
        </div>
        <div
          className="max-lg:flex max-lg:justify-center opacity-0"
          ref={image}
        >
          <img src="/images/background.png" alt="True Skin" />
        </div>
      </div>

      <Title title="Popular Products"/>
    </>
  );
}

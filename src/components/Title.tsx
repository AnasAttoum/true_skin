import { useEffect } from "react";
import { useInView } from "react-intersection-observer";

export default function Title({ title }: { title: string }) {

  const { ref, entry, inView } = useInView();

  useEffect(()=>{
    if(inView && entry){
      (entry.target as HTMLElement).style.animation =
        "toRightAnimation 1s .5s forwards";
    }
  },[entry,inView])

  return (
    <div
      className="relative text-center text-[--primary] text-3xl sm:text-4xl font-extrabold mt-10 p-5 opacity-0 title"
      style={{
        fontFamily: "Dancing Script, cursive",
        fontWeight: "700",
        fontStyle: "normal",
      }}
      ref={ref}
    >
      {title}
    </div>
  );
}

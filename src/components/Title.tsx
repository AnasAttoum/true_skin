export default function Title({ title }: { title: string }) {
  return (
    <div
      className="relative text-center text-[--primary] text-3xl sm:text-4xl font-extrabold p-5 title"
      style={{
        fontFamily: "Dancing Script, cursive",
        fontWeight: "700",
        fontStyle: "normal",
      }}
    >
      {title}
    </div>
  );
}

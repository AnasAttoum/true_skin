import { Link, Outlet } from "react-router-dom";
import { links } from "../constants/data";
import Footer from "./Footer";

export default function Header() {
  return (
    <>
      <div className="flex items-center justify-between text-white bg-[--primary] py-5 px-5 sm:px-10">
        <div className="flex items-center sm:gap-1 text-2xl">
          <svg className="max-sm:hidden" xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 48 48"><g fill="none" stroke="white" strokeLinecap="round" strokeLinejoin="round" strokeWidth={4}><path fill="white" d="M13 19a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v19s0 6-6 6h-8c-6 0-6-6-6-6z"></path><path d="M18 12h10v5H18zm0 0V9c0-3 3-5 6-5h11s-7 2-7 6v2"></path></g></svg>
          <div>
            True
          <span
            style={{
              fontFamily: "Dancing Script, cursive",
              fontWeight: "400",
              fontStyle: "normal",
            }}
          >
            Skin
          </span>
          </div>
        </div>

        <div className="flex gap-5">
          {links.map(({ name, url }) => {
            return <Link to={url} key={name}>{name}</Link>;
          })}
        </div>
      </div>

      <Outlet />

      <Footer />
    </>
  );
}
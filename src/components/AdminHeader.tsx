import { Link, Outlet, useNavigate } from "react-router-dom";
import Footer from "./Footer";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../lib/store";
import DeleteDialog from "./DeleteDialog";
import { logOut } from "../lib/slices/userSlice";

export default function AdminHeader() {

  const { isLogged, isAdmin } = useSelector((state: RootState) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [openLogOutModal, setOpenLogOutModal] = useState(false);
  const handleOpenLogOutModal = () => {
    setOpenLogOutModal(true);
  };
  const handleCloseLogOutModal = () => setOpenLogOutModal(false);
  const handleLogOut = () => {
    dispatch(logOut());
    handleCloseLogOutModal();
  };

  useEffect(()=>{
    const user : {isLogged:boolean, isAdmin:boolean} = JSON.parse(localStorage.getItem('user')||"{}")
    if(!user.isLogged || !user.isAdmin)
      navigate('/login')
  },[isLogged, isAdmin, navigate])

  return (
    <>
      <div className="flex items-center justify-between text-white bg-[--primary] py-5 px-5 sm:px-10">
        <Link to={"/dashboard"} className="flex items-center sm:gap-1 text-2xl">
          <svg
            className="max-sm:hidden"
            xmlns="http://www.w3.org/2000/svg"
            width="1em"
            height="1em"
            viewBox="0 0 48 48"
          >
            <g
              fill="none"
              stroke="white"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={4}
            >
              <path
                fill="white"
                d="M13 19a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v19s0 6-6 6h-8c-6 0-6-6-6-6z"
              ></path>
              <path d="M18 12h10v5H18zm0 0V9c0-3 3-5 6-5h11s-7 2-7 6v2"></path>
            </g>
          </svg>
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
        </Link>

        <div className="flex items-center gap-3">
          <Link to={"/dashboard"}>Products</Link>

          <svg
            className="cursor-pointer max-sm:hidden"
            onClick={handleOpenLogOutModal}
            xmlns="http://www.w3.org/2000/svg"
            width="2em"
            height="2em"
            viewBox="0 0 24 24"
          >
            <g
              fill="none"
              stroke="white"
              strokeLinecap="round"
              strokeWidth={1.5}
            >
              <path
                strokeLinejoin="round"
                d="M10 12h10m0 0l-3-3m3 3l-3 3"
              ></path>
              <path d="M4 12a8 8 0 0 1 8-8m0 16a7.99 7.99 0 0 1-6.245-3"></path>
            </g>
          </svg>
        </div>
      </div>

      <DeleteDialog
        open={openLogOutModal}
        handleClose={handleCloseLogOutModal}
        handleAgree={handleLogOut}
        text="Are you sure that you want to logout?"
      />

      <Outlet />

      <Footer />
    </>
  );
}
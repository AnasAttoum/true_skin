import { Link, Outlet } from "react-router-dom";
import Badge, { BadgeProps } from "@mui/material/Badge";
import { styled } from "@mui/material/styles";
import IconButton from "@mui/material/IconButton";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import {
  Drawer,
  Box,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import { links } from "../constants/data";
import Footer from "./Footer";
import { useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../lib/store";

const StyledBadge = styled(Badge)<BadgeProps>(({ theme }) => ({
  "& .MuiBadge-badge": {
    right: -3,
    top: 13,
    border: `2px solid ${theme.palette.background.paper}`,
    padding: "0 4px",
  },
}));

export default function Header() {

  const cart = useSelector((state:RootState)=>state.cart)
  const [open, setOpen] = useState(false);
  const toggleDrawer = (newOpen: boolean) => () => {
    setOpen(newOpen);
  };

  return (
    <>
      <div className="flex items-center justify-between text-white bg-[--primary] py-5 px-5 sm:px-10">
        <Link to={"/products"} className="flex items-center sm:gap-1 text-2xl">
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

        <div className="hidden sm:flex gap-5">
          {links.map(({ name, url }) => {
            return (
              <Link to={url} key={name}>
                {name}
              </Link>
            );
          })}
        </div>

        <div className="flex items-center gap-5">
          <Link to={'/cart'}>
            <IconButton aria-label="cart">
              <StyledBadge badgeContent={cart.length} sx={{ color: "#fff" }}>
                <ShoppingCartIcon sx={{ color: "#fff" }} />
              </StyledBadge>
            </IconButton>
          </Link>

          <svg
            className="inline-block sm:hidden cursor-pointer"
            onClick={toggleDrawer(true)}
            xmlns="http://www.w3.org/2000/svg"
            width="2em"
            height="2em"
            viewBox="0 0 32 32"
          >
            <path
              fill="none"
              stroke="#fff"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M5 8h22M5 16h22M5 24h22"
            ></path>
          </svg>
        </div>
      </div>

      <Drawer anchor={"right"} open={open} onClose={toggleDrawer(false)}>
        <Box role="presentation" onClick={toggleDrawer(false)}>
          <div className="flex gap-3 justify-center items-center m-5 px-10">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="1.5em"
              height="1.5em"
              viewBox="0 0 48 48"
            >
              <g
                fill="none"
                stroke="var(--primary)"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={4}
              >
                <path
                  fill="var(--primary)"
                  d="M13 19a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v19s0 6-6 6h-8c-6 0-6-6-6-6z"
                ></path>
                <path d="M18 12h10v5H18zm0 0V9c0-3 3-5 6-5h11s-7 2-7 6v2"></path>
              </g>
            </svg>
            <div className="text-2xl text-[--primary] font-bold">
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
          </div>

          <List>
            {links.map(({ name, url }, index) => (
              <Link to={url} key={index}>
                <ListItem key={name} disablePadding>
                  <ListItemButton>
                    <ListItemIcon>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="1.5em"
                        height="1.5em"
                        viewBox="0 0 50 50"
                      >
                        <g
                          fill="none"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={4}
                        >
                          <path
                            stroke="#353b55"
                            d="M9.375 40.625a7.375 7.375 0 0 1 0-10.417L14.583 25A7.375 7.375 0 0 1 25 25a7.375 7.375 0 0 1 0 10.417l-5.208 5.208a7.375 7.375 0 0 1-10.417 0m27.083-16.667l5.209-5.208a7.375 7.375 0 0 0 0-10.417v0a7.375 7.375 0 0 0-10.417 0l-5.208 5.209a7.375 7.375 0 0 0 0 10.416v0a7.375 7.375 0 0 0 10.416 0"
                          ></path>
                          <path
                            stroke="#344054"
                            d="m20.833 29.167l8.334-8.334"
                          ></path>
                        </g>
                      </svg>
                    </ListItemIcon>
                    <ListItemText primary={name} />
                  </ListItemButton>
                </ListItem>
              </Link>
            ))}
          </List>
        </Box>
      </Drawer>

      <Outlet />

      <Footer />
    </>
  );
}
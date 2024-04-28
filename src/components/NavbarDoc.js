// import React from "react";
import icon from "../Images/Logo_Name.png";
import { useNavigate } from "react-router-dom";
import React, { useState, useEffect } from "react";

import {
  Navbar,
  MobileNav,
  Typography,
  Button,
  Menu,
  MenuHandler,
  MenuList,
  MenuItem,
  Avatar,
  Card,
  IconButton,
} from "@material-tailwind/react";
import {
  UserCircleIcon,
  ChevronDownIcon,
  InboxArrowDownIcon,
  LifebuoyIcon,
  PowerIcon,
} from "@heroicons/react/24/solid";

const profileMenuItems = [
  {
    label: "My Profile",
    icon: UserCircleIcon,
    redirect: "/sup/profile",
  },
  {
    label: "Inbox",
    icon: InboxArrowDownIcon,
    redirect: "/sup/inbox",
  },
  {
    label: "Help",
    icon: LifebuoyIcon,
    redirect: "/sup/help",
  },
];

function ProfileMenu(props) {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  

  // const closeMenu = () => setIsMenuOpen(false);

  return (
    <Menu open={isMenuOpen} handler={setIsMenuOpen} placement="bottom-start">
      <MenuHandler className="mr-4 -mt-4">
        <Button
          variant="text"
          color="blue-gray"
          className="flex items-center gap-1 rounded-full py-0.5 pr-2 pl-0.5 lg:ml-auto relative -right-4"
        >
          <Avatar
            variant="circular"
            size="sm"
            alt="tania andrew"
            className="border border-gray-900 p-0.5"
            src="https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1480&q=80"
          />
          <ChevronDownIcon
            strokeWidth={2.5}
            className={`h-3 w-3 transition-transform ${
              isMenuOpen ? "rotate-180" : ""
            }`}
          />
        </Button>
      </MenuHandler>
      <MenuList className="p-1">
        {profileMenuItems.map(({ label, icon, redirect }, key) => {
          // const isLastItem = key === profileMenuItems.length - 1;
          return (
            <Typography as="a" href={redirect}>
              <MenuItem
                key={label}
                // className={`flex items-center gap-2 rounded ${isLastItem
                // ? "hover:bg-red-500/10 focus:bg-red-500/10 active:bg-red-500/10"
                //   : ""
                //   }`}
                className="flex items-center gap-2 rounded"
              >
                {React.createElement(icon, {
                  className: `h-4 w-4`,
                  strokeWidth: 2,
                })}
                <Typography
                  as="span"
                  variant="small"
                  className="font-normal"
                  color="inherit"
                >
                  {label}
                </Typography>
              </MenuItem>
            </Typography>
          );
        })}
        <MenuItem
          key="Sign Out"
          onClick={props.logOut}
          className="flex items-center gap-2 rounded hover:bg-red-500/10 focus:bg-red-500/10 active:bg-red-500/10"
        >
          {React.createElement(PowerIcon, {
            className: `h-4 w-4 text-red-500`,
            strokeWidth: 2,
          })}
          <Typography
            as="span"
            variant="small"
            className="font-normal"
            color="red"
          >
            Sign Out
          </Typography>
        </MenuItem>
      </MenuList>
    </Menu>
  );
}

const NavbarDoc = (props) => {
  const navigate = useNavigate();
  const [docName, setDocName] = React.useState("Rohit Shekhawat");
  const loginPatientHandler = () => {
    navigate("/fw/loginPatientPage");
  };
  const registerPatientHandler = () => {
    navigate("/fw/registerPatientPage");
  };

  useEffect(() => {
    // get doc name from backend
  }, []);
  async function logOut() {
    try {
      props.setBackground("brightness(0.01)");
      props.setLoad(true);
      const url = "http://localhost:8082/auth/logout"
      const key = "Bearer " + props.jwtToken;
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          token: key,
        }),
      }).then((res) => res.json());

      if (response === true) {
        props.setBackground("");
        props.setLoad(false);
        localStorage.clear();
        navigate("/", { replace: true });
      } else {
        props.handleAlert("danger", "Some Error Occurred1!");
      }
    } catch {
      props.setBackground("");
      props.setLoad(false);
      props.handleAlert("danger", "Some Error Occurred!");
    }
  }

  return (
    <nav class="bg-gray-200 shadow shadow-gray-300 w-100 md:px-auto">
      <div class="md:h-16 h-28 container flex items-center justify-between flex-wrap md:flex-nowrap">
        <div class="flex items-center gap-4">
          <div>
            <span
              className="headerSpan"
              style={{ width: "10.2rem", top: "1.2px", left: "0.8rem" }}
            >
              {/* <span className='headerSpan1'>
              <img className='headerImg' alt="" aria-hidden="true" src={icon}/>
            </span> */}
              <img alt="logo" src={icon} class="cursor-pointer headerImg" />
            </span>
          </div>
        </div>
        <div class="text-gray-500 order-3 w-full md:w-auto md:order-2 ml-96">
          <ul class="flex font-semibold justify-between">
            {/* <!-- Active Link = text-indigo-500 */}
            {/* Inactive Link = hover:text-indigo-500 --> */}
            <li
              class={
                props.page === "dashboard"
                  ? "md:px-4 md:py-2 text-indigo-500"
                  : "md:px-4 md:py-2 hover:text-indigo-400"
              }
            >
              <a href="/doc/dashboard">Dashboard</a>
            </li>
            <li
              class={
                props.page === "doctors"
                  ? "md:px-4 md:py-2 text-indigo-500"
                  : "md:px-4 md:py-2 hover:text-indigo-400"
              }
            >
              <a href="/doc/viewAllPatients">View All Patients</a>
            </li>
            <li
              class={
                props.page === "doctors"
                  ? "md:px-4 md:py-2 text-indigo-500"
                  : "md:px-4 md:py-2 hover:text-indigo-400"
              }
            >
              <a href="/doc/contact">Contact Us</a>
            </li>
            <li
              class={
                props.page === "workers"
                  ? "md:px-4 md:py-2 text-indigo-500"
                  : "md:px-4 md:py-2 hover:text-indigo-400"
              }
            >
              {/* <a href="/admin/fieldworkers">Field Workers</a> */}
            </li>
            {/* <li class="md:px-4 md:py-2 hover:text-indigo-400"><a href="#">Contact</a></li> */}
          </ul>
        </div>
        <div class="order-2 md:order-3">
          <div
            className="flex absolute justify-between  items-center"
            style={{ top: "0.7rem", right: "0.8rem" }}
          >
            <h5 class="block font-sans text-2xl antialiased font-semibold leading-snug tracking-normal -mt-4 mr-4 text-gray-700">
              Hi, Dr. {docName}
            </h5>
            <ProfileMenu logOut={logOut} />
          </div>
        </div>
      </div>
    </nav>
  );
};

export default NavbarDoc;

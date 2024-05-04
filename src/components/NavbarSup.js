import React from "react";
import { Link, useNavigate } from "react-router-dom";
import icon from "../Images/Logo_Name.png";
import '../styles/NavBar.css'
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
  PowerIcon
} from "@heroicons/react/24/solid";

// profile menu component
const profileMenuItems = [
  {
    label: "My Profile",
    icon: UserCircleIcon,
    redirect: "/sup/profile"
  },
  {
    label: "Inbox",
    icon: InboxArrowDownIcon,
    redirect: "/sup/inbox"
  },
  {
    label: "Help",
    icon: LifebuoyIcon,
    redirect: "/sup/help"
  }
];

function ProfileMenu(props) {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  // const closeMenu = () => setIsMenuOpen(false);

  return (
    <Menu open={isMenuOpen} handler={setIsMenuOpen} placement="bottom-end">
      <MenuHandler>
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
            className={`h-3 w-3 transition-transform ${isMenuOpen ? "rotate-180" : ""
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
                //   ? "hover:bg-red-500/10 focus:bg-red-500/10 active:bg-red-500/10"
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

// nav list menu
const navListMenuItems = [
  {
    title: "Region",
    redirect: "/sup/monitor/region"
  },
  {
    title: "Field Worker",
    redirect: "/sup/monitor/fw"
  }
];

function NavListMenu(props) {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  const renderItems = navListMenuItems.map(({ title, redirect }) => (
    <Link to={redirect} key={title}>
      <MenuItem>
        <Typography variant="h7" color="blue-gray" className="mb-1 font-semibold">
          {title}
        </Typography>
      </MenuItem>
    </Link>
  ));

  return (
    <React.Fragment>
      <Menu allowHover open={isMenuOpen} handler={setIsMenuOpen}>
        <MenuHandler>
          <Typography variant="medium" className={props.page === "supervisors" ? "font-semibold  md:py-2 text-indigo-500" : " md:py-2 hover:text-indigo-400 font-medium"}>
            <MenuItem className="hidden items-center gap-2 font-semibold lg:flex lg:rounded-full hover:text-indigo-400">
              Monitor{" "}
              <ChevronDownIcon
                strokeWidth={2}
                className={`h-3 w-3 transition-transform ${isMenuOpen ? "rotate-180" : ""
                  }`}
              />
            </MenuItem>
          </Typography>
        </MenuHandler>
        <MenuList className="hidden w-fit overflow-visible flex flex-col border-0">
          <ul className="flex w-full flex-col border-0">
            {renderItems}
          </ul>
        </MenuList>
      </Menu>
    </React.Fragment>
  );
}

// // nav list component
// const navListItems = [
//   {
//     label: "View Your Field Workers",
//     redirect: "/sup/viewFW",
//     page: "viewFW"
//   },
//   {
//     label: "Transfer Field Worker",
//     redirect: "/sup/transFW",
//     page: "transFW"
//   },
//   {
//     label: "Contact Us",
//     redirect: "/sup/Contact",
//     page: "contact"
//   }
// ];

// function NavList(props) {
//   return (
//     <ul className="ml-20 mt-2 mb-4 flex flex-row gap-2 lg:mb-0 lg:mt-0 lg:items-center" style={{ width: "64rem", justifyContent: "space-around" }}>
//       <Typography
//         key="Dashboard"
//         as="a"
//         href="/sup/dashboard"
//         variant="medium"
//         className="font-medium"
//       >
//         <MenuItem className="hidden items-center gap-2 font-medium text-blue-gray-900 lg:flex lg:rounded-full">
//           <span className={props.page === "dashboard" ? "font-semibold  md:py-2 text-indigo-500 m-auto" : " md:py-2 hover:text-indigo-400 m-auto font-medium"}>Dashboard</span>
//         </MenuItem>
//       </Typography>
//       <NavListMenu page={props.page} />
//       {navListItems.map(({ label, redirect, page }, key) => (
//         <Typography
//           key={label}
//           as="a"
//           href={redirect}
//           variant="medium"
//           // color="gray"
//           className="font-medium"
//         >
//           <MenuItem className="flex items-center gap-2 lg:rounded-full">
//             <span className={props.page === page ? "font-semibold  md:py-2 text-indigo-500 m-auto" : "md:py-2 hover:text-indigo-400 m-auto font-medium"}> {label}</span>
//           </MenuItem>
//         </Typography>
//       ))}
//     </ul>
//   );
// }

const NavbarSup = (props) => {
  const navigate = useNavigate();
  function addSuperVisorHandler() {
    navigate("/sup/addFieldWorker");
  }

  async function logOut() {
    try {
      props.setBackground("brightness(0.01)");
      props.setLoad(true);
      const url = "http://localhost:8082/auth/logout"
      const key = "Bearer " + props.jwtToken;
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          token: key
        })
      }).then((res) => res.json());

      if (response === true) {
        props.setBackground("");
        props.setLoad(false);
        localStorage.clear();
        navigate("/", { replace: true });
      }
      else {
        props.handleAlert("danger", "Some Error Occurred1!");
      }
    }
    catch {
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
              <img alt="logo" src={icon} class="cursor-pointer headerImg" />
            </span>
          </div>
        </div>
        <div class="text-gray-500 order-3 w-full md:w-auto md:order-2" style={{width: "47rem"}}>
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
              <Link to="/sup/dashboard" className="relative" style={{top: "0.4rem"}}>Dashboard</Link>
            </li>
            <NavListMenu page={props.page} />
            <li
              class={
                props.page === "viewFW"
                  ? "md:px-4 md:py-2 text-indigo-500"
                  : "md:px-4 md:py-2 hover:text-indigo-400"
              }
            >
              <Link to="/sup/viewFW" className="relative" style={{top: "0.4rem"}}>Field Workers</Link>
            </li>
            <li
              class={
                props.page === "transFW"
                  ? "md:px-4 md:py-2 text-indigo-500"
                  : "md:px-4 md:py-2 hover:text-indigo-400"
              }
            >
              <Link to="/sup/transFW" className="relative" style={{top: "0.4rem"}}>Transfer Field Worker</Link>
            </li>
            <li
              class={
                props.page === "contact"
                  ? "md:px-4 md:py-2 text-indigo-500"
                  : "md:px-4 md:py-2 hover:text-indigo-400"
              }
            >
              <Link to="/sup/contact" className="relative" style={{top: "0.4rem"}}>Contact</Link>
            </li>
          </ul>
        </div>
        <div class="order-2 md:order-3">
          <div
            className="flex absolute justify-between  items-center"
            style={{ top: "0.7rem", right: "0.8rem" }}
          >
            <button
              class="px-4 py-2 bg-indigo-500 hover:bg-indigo-600 text-gray-50 rounded-xl flex items-center gap-2"
              onClick={addSuperVisorHandler}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-5 w-5"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fill-rule="evenodd"
                  d="M3 3a1 1 0 011 1v12a1 1 0 11-2 0V4a1 1 0 011-1zm7.707 3.293a1 1 0 010 1.414L9.414 9H17a1 1 0 110 2H9.414l1.293 1.293a1 1 0 01-1.414 1.414l-3-3a1 1 0 010-1.414l3-3a1 1 0 011.414 0z"
                  clip-rule="evenodd"
                />
              </svg>
              <span class="font-semibold">Add Field Worker</span>
            </button>
            <ProfileMenu logOut={logOut} />
          </div>
        </div>
      </div>
    </nav>
  );
};

export default NavbarSup;

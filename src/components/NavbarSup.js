import React from "react";
import { useNavigate } from "react-router-dom";
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
  CubeTransparentIcon,
  UserCircleIcon,
  CodeBracketSquareIcon,
  Square3Stack3DIcon,
  ChevronDownIcon,
  Cog6ToothIcon,
  InboxArrowDownIcon,
  LifebuoyIcon,
  PowerIcon,
  RocketLaunchIcon,
  Bars2Icon,
} from "@heroicons/react/24/solid";

// profile menu component
const profileMenuItems = [
  {
    label: "My Profile",
    icon: UserCircleIcon,
  },
  {
    label: "Edit Profile",
    icon: Cog6ToothIcon,
  },
  {
    label: "Inbox",
    icon: InboxArrowDownIcon,
  },
  {
    label: "Help",
    icon: LifebuoyIcon,
  },
  {
    label: "Sign Out",
    icon: PowerIcon,
  },
];

function ProfileMenu() {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  const closeMenu = () => setIsMenuOpen(false);

  return (
    <Menu open={isMenuOpen} handler={setIsMenuOpen} placement="bottom-end">
      <MenuHandler>
        <Button
          variant="text"
          color="blue-gray"
          className="flex items-center gap-1 rounded-full py-0.5 pr-2 pl-0.5 lg:ml-auto"
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
        {profileMenuItems.map(({ label, icon }, key) => {
          const isLastItem = key === profileMenuItems.length - 1;
          return (
            <MenuItem
              key={label}
              onClick={closeMenu}
              className={`flex items-center gap-2 rounded ${isLastItem
                ? "hover:bg-red-500/10 focus:bg-red-500/10 active:bg-red-500/10"
                : ""
                }`}
            >
              {React.createElement(icon, {
                className: `h-4 w-4 ${isLastItem ? "text-red-500" : ""}`,
                strokeWidth: 2,
              })}
              <Typography
                as="span"
                variant="small"
                className="font-normal"
                color={isLastItem ? "red" : "inherit"}
              >
                {label}
              </Typography>
            </MenuItem>
          );
        })}
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
    <a href={redirect} key={title}>
      <MenuItem>
        <Typography variant="h7" color="blue-gray" className="mb-1 font-semibold">
          {title}
        </Typography>
      </MenuItem>
    </a>
  ));

  return (
    <React.Fragment>
      <Menu allowHover open={isMenuOpen} handler={setIsMenuOpen}>
        <MenuHandler>
          <Typography variant="medium" className={props.page === "supervisors" ? "font-semibold  md:py-2 text-indigo-500" : " md:py-2 hover:text-indigo-400 font-medium"}>
            <MenuItem className="hidden items-center gap-2 font-medium text-blue-gray-900 lg:flex lg:rounded-full hover:text-indigo-400">
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

// nav list component
const navListItems = [
  {
    label: "View Your Field Workers",
    redirect: "/sup/viewFW",
    page: "viewFW"
  },
  {
    label: "Transfer Field Worker",
    redirect: "/sup/transFW",
    page: "transFW"
  },
  {
    label: "Contact Us",
    redirect: "/sup/Contact",
    page: "contact"
  }
];

function NavList(props) {
  return (
    <ul className="ml-20 mt-2 mb-4 flex flex-row gap-2 lg:mb-0 lg:mt-0 lg:items-center" style={{ width: "64rem", justifyContent: "space-around" }}>
      <Typography
        key="Dashboard"
        as="a"
        href="/sup/dashboard"
        variant="medium"
        className="font-medium"
      >
        <MenuItem className="hidden items-center gap-2 font-medium text-blue-gray-900 lg:flex lg:rounded-full">
          <span className={props.page === "dashboard" ? "font-semibold  md:py-2 text-indigo-500 m-auto" : " md:py-2 hover:text-indigo-400 m-auto font-medium"}>Dashboard</span>
        </MenuItem>
      </Typography>
      <NavListMenu page={props.page} />
      {navListItems.map(({ label, redirect, page }, key) => (
        <Typography
          key={label}
          as="a"
          href={redirect}
          variant="medium"
          // color="gray"
          className="font-medium"
        >
          <MenuItem className="flex items-center gap-2 lg:rounded-full">
            <span className={props.page === page ? "font-semibold  md:py-2 text-indigo-500 m-auto" : "md:py-2 hover:text-indigo-400 m-auto font-medium"}> {label}</span>
          </MenuItem>
        </Typography>
      ))}
    </ul>
  );
}

// const NavbarSup = (props) => {
//   const navigate = useNavigate();
//   function addSuperVisorHandler() {
//     navigate("/sup/addFieldWorker");
//   }

//   function logOut() {
//     localStorage.clear();
//     navigate("/", { replace: true });
//   }

//   return (
//     <nav class="sticky top-0 z-10 bg-gray-200 shadow shadow-gray-300 w-100 px-8 md:px-auto">
//       <div class="md:h-16 h-28 flex items-center justify-between flex-wrap md:flex-nowrap">
//       <div>
//           <span
//             className="headerSpan"
//             style={{ width: "10.2rem", top: "1.2px" }}
//           >
//             {/* <span className='headerSpan1'>
//               <img className='headerImg' alt="" aria-hidden="true" src={icon}/>
//             </span> */}
//             <img alt="logo" src={icon} class="cursor-pointer headerImg" />
//           </span>
//         </div>
//         <div
//           class="text-gray-500 order-3 w-full md:w-auto md:order-2 "
//           style={{ marginLeft: "7rem" }}
//         >
//           <ul class="flex font-semibold justify-between ">
//             {/* <!-- Active Link = text-indigo-500 */}
//             {/* Inactive Link = hover:text-indigo-500 --> */}
//             <li
//               class={
//                 props.page === "dashboard"
//                   ? "md:pr-20 md:py-2 text-indigo-500 m-auto"
//                   : "md:pr-20 md:py-2 hover:text-indigo-400 m-auto"
//               }
//             >
//               <a href="/sup/dashboard">Dashboard</a>
//             </li>
//             <div className="dropdown dropdown-hover">
//               <li
//                 class={
//                   props.page === "supervisors"
//                     ? "md:pr-20 md:py-2 text-indigo-500 m-auto"
//                     : "md:px-4 md:py-2 hover:text-indigo-400 m-auto"
//                 }
//               >
//                 Monitor
//               </li>
//               <ul
//                 tabIndex={0}
//                 className="dropdown-content z-[1] menu p-2 shadow bg-base-350 rounded-box w-52"
//               >
//                 <li>
//                   <a>Region</a>
//                 </li>
//                 <li>
//                   <a>Field Workers</a>
//                 </li>
//               </ul>
//             </div>
//             <li
//               class={
//                 props.page === "viewFW"
//                   ? "md:pr-20 md:py-2 text-indigo-500 m-auto"
//                   : "md:pr-20 md:py-2 hover:text-indigo-400 m-auto"
//               }
//             >
//               <a href="/sup/viewFW">View Your FWs</a>
//             </li>
//             <li
//               class={
//                 props.page === "transFW"
//                   ? "md:pr-20 md:py-2 text-indigo-500 m-auto"
//                   : "md:pr-20 md:py-2 hover:text-indigo-400 m-auto"
//               }
//             >
//               <a href="/sup/transferFW">Transfer FW</a>
//             </li>

//             <li
//               class={
//                 props.page === "doctors"
//                   ? "md:pr-20 md:py-2 text-indigo-500 m-auto"
//                   : "md:pr-20 md:py-2 hover:text-indigo-400 m-auto"
//               }
//             >
//               <a href="/admin/doctors">Contact Us</a>
//             </li>
//             {/* <li class={props.page === "workers" ? "md:px-4 md:py-2 text-indigo-500" : "md:px-4 md:py-2 hover:text-indigo-400"}>
//               <a href="/admin/fieldworkers">Field Workers</a>
//             </li> */}
//             {/* <li class="md:px-4 md:py-2 hover:text-indigo-400"><a href="#">Contact</a></li> */}
//           </ul>
//         </div>
//         <div class="order-2 md:order-3">
//           <div className="flex">
//             <button
//               class="px-4 py-2 bg-indigo-500 hover:bg-indigo-600 text-gray-50 rounded-xl flex items-center gap-2"
//               onClick={addSuperVisorHandler}
//             >
//               {/* <!-- Heroicons - Login Solid --> */}
//               <svg
//                 xmlns="http://www.w3.org/2000/svg"
//                 class="h-5 w-5"
//                 viewBox="0 0 20 20"
//                 fill="currentColor"
//               >
//                 <path
//                   fill-rule="evenodd"
//                   d="M3 3a1 1 0 011 1v12a1 1 0 11-2 0V4a1 1 0 011-1zm7.707 3.293a1 1 0 010 1.414L9.414 9H17a1 1 0 110 2H9.414l1.293 1.293a1 1 0 01-1.414 1.414l-3-3a1 1 0 010-1.414l3-3a1 1 0 011.414 0z"
//                   clip-rule="evenodd"
//                 />
//               </svg>
//               <span class="font-semibold">Add Field Worker</span>
//             </button>
//             <button
//               class="px-4 py-2 bg-red-500 hover:bg-red-600 text-gray-50 rounded-xl"
//               style={{ marginLeft: 10 }}
//               onClick={logOut}
//             >
//               {/* <!-- Heroicons - Login Solid --> */}
//               {/* <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"> */}
//               {/* <path fill-rule="evenodd" d="M3 3a1 1 0 011 1v12a1 1 0 11-2 0V4a1 1 0 011-1zm7.707 3.293a1 1 0 010 1.414L9.414 9H17a1 1 0 110 2H9.414l1.293 1.293a1 1 0 01-1.414 1.414l-3-3a1 1 0 010-1.414l3-3a1 1 0 011.414 0z" clip-rule="evenodd" /> */}
//               {/* </svg> */}
//               <span class="font-semibold">Log Out</span>
//               {/* <span>Set Questionnaire</span> */}
//             </button>
//           </div>
//         </div>
//       </div>
//     </nav>
//   );
// };

const NavbarSup = (props) => {
  const [isNavOpen, setIsNavOpen] = React.useState(false);

  const toggleIsNavOpen = () => setIsNavOpen((cur) => !cur);

  const navigate = useNavigate();
  function addSuperVisorHandler() {
    navigate("/sup/addFieldWorker");
  }

  function logOut() {
    localStorage.clear();
    navigate("/", { replace: true });
  }

  React.useEffect(() => {
    window.addEventListener(
      "resize",
      () => window.innerWidth >= 960 && setIsNavOpen(false),
    );
  }, []);

  return (
    <Navbar className="sticky top-0 z-10 bg-white shadow shadow-gray-300 px-8 md:px-auto max-w-max">
      <div className="relative mx-auto flex items-center justify-between text-blue-gray-900">
        <div>
          <span
            className="headerSpan"
            style={{ width: "10.2rem", top: "1.2px" }}
          >
            <img alt="logo" src={icon} class="cursor-pointer headerImg" />
          </span>
        </div>
        <div className="hidden lg:block">
          <NavList page={props.page} />
        </div>
        {/* <IconButton
          size="sm"
          color="blue-gray"
          variant="text"
          onClick={toggleIsNavOpen}
          className="ml-auto mr-2 lg:hidden"
        >
          <Bars2Icon className="h-6 w-6" />
        </IconButton> */}

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
        <ProfileMenu />
      </div>
      <MobileNav open={isNavOpen} className="overflow-scroll">
        <NavList />
      </MobileNav>
    </Navbar>
  );
}

export default NavbarSup;

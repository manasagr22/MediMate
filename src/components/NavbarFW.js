import React from "react";
import icon from "../Images/Logo_Name.png";
import { useNavigate } from "react-router-dom";
const NavbarFW = (props) => {
  const navigate = useNavigate();
  function addSuperVisorHandler() {
    navigate("/admin/addsupervisor");
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
        <div class="text-gray-500 order-3 w-full md:w-auto md:order-2">
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
              <a href="/admin">Dashboard</a>
            </li>
            <li
              class={
                props.page === "supervisors"
                  ? "md:px-4 md:py-2 text-indigo-500"
                  : "md:px-4 md:py-2 hover:text-indigo-400"
              }
            >
              <a href="/admin/supervisors">Supervisor</a>
            </li>
            <li
              class={
                props.page === "doctors"
                  ? "md:px-4 md:py-2 text-indigo-500"
                  : "md:px-4 md:py-2 hover:text-indigo-400"
              }
            >
              <a href="/admin/doctors">Doctor</a>
            </li>
            <li
              class={
                props.page === "workers"
                  ? "md:px-4 md:py-2 text-indigo-500"
                  : "md:px-4 md:py-2 hover:text-indigo-400"
              }
            >
              <a href="/admin/fieldworkers">Field Workers</a>
            </li>
            {/* <li class="md:px-4 md:py-2 hover:text-indigo-400"><a href="#">Contact</a></li> */}
          </ul>
        </div>
        <div class="order-2 md:order-3">
          <div className="flex absolute justify-between items-center" style={{top: "0.7rem", right: "0.8rem"}}>
            <button class="px-4 py-2 bg-indigo-500 hover:bg-indigo-600 text-gray-50 rounded-xl flex items-center gap-2">
              <span>Take Survey</span>
            </button>
            <button><span class="material-symbols-outlined" style={{marginLeft: "0.5rem", marginTop: "0.2rem"}}>notifications</span></button>
            <button><span class="material-symbols-outlined" style={{marginLeft: "0.5rem", marginTop: "0.2rem"}}>person</span></button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default NavbarFW;

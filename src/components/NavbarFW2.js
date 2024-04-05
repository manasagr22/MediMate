import React from "react";
import icon from "../Images/Logo_Name.png";
import { useNavigate } from "react-router-dom";
const NavbarFW2 = (props) => {
  const navigate = useNavigate();
  const takeHandler = () => {
    navigate("/fw/questionnaire");
  };
  const viewHandler = () => {
    navigate("/fw/viewquestionnaire");
  };
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
              <a href="/fw/dashboard">Dashboard</a>
            </li>
            <li
              class={
                props.page === "supervisors"
                  ? "md:px-4 md:py-2 text-indigo-500"
                  : "md:px-4 md:py-2 hover:text-indigo-400"
              }
            >
              <a href="/fw/supervisors">Supervisor</a>
            </li>
            <li
              class={
                props.page === "doctors"
                  ? "md:px-4 md:py-2 text-indigo-500"
                  : "md:px-4 md:py-2 hover:text-indigo-400"
              }
            >
              <a href="/fw/contact">Contact Us</a>
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
            <button
              class="px-6 py-2 min-w-[120px] text-center text-white bg-violet-600 border border-violet-600 rounded active:text-violet-500 hover:bg-transparent hover:text-violet-600 focus:outline-none focus:ring"
              style={{ marginRight: "1rem" }} onClick={takeHandler}
            >
              Take Questionnaire
            </button>
            <button
              class="text-indigo-700 border border-indigo-600 py-2 px-3 rounded inline-flex items-center" onClick={viewHandler}
            >
              View Questionnaire
              <svg
                fill="none"
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                viewBox="0 0 24 24"
                class="w-6 h-6 ml-2"
              >
                <path d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
              </svg>
            </button>

            <button>
              <span
                class="material-symbols-outlined"
                style={{ marginLeft: "0.5rem", marginTop: "0.2rem" }}
              >
                notifications
              </span>
            </button>
            <button>
              <span
                class="material-symbols-outlined"
                style={{ marginLeft: "0.5rem", marginTop: "0.2rem" }}
              >
                person
              </span>
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default NavbarFW2;

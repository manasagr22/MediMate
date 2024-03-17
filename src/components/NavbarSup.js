import React from "react";
import { useNavigate } from "react-router-dom";
const NavbarSup = (props) => {
  const navigate = useNavigate();
  function addSuperVisorHandler (){
    console.log("hell")
    navigate("/sup/addFieldWorker");
  }

  function logOut() {
    localStorage.clear();
    navigate("/", {replace: true});
  }

  return (
    <nav class="bg-gray-200 shadow shadow-gray-300 w-100 px-8 md:px-auto">
      <div class="md:h-16 h-28 flex items-center justify-between flex-wrap md:flex-nowrap">
        {/* <!-- Logo --> */}
        <div class="text-indigo-500 md:order-1">
          {/* <!-- Heroicon - Chip Outline --> */}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-10 w-10"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z"
            />
          </svg>
        </div>
        <div class="text-gray-500 order-3 w-full md:w-auto md:order-2 " style={{marginLeft: 550}}>
          <ul class="flex font-semibold justify-between ">
            {/* <!-- Active Link = text-indigo-500 */}
            {/* Inactive Link = hover:text-indigo-500 --> */}
            <li class={props.page === "dashboard" ? "md:px-20 md:py-2 text-indigo-500" : "md:px-20 md:py-2 hover:text-indigo-400"}>
              <a href="/supervisor/dashboard">Dashboard</a>
            </li>
            <div className="dropdown dropdown-hover">
            <li class={props.page === "supervisors" ? "md:px-20 md:py-2 text-indigo-500" : "md:px-4 md:py-2 hover:text-indigo-400"}>Monitor</li>
  <ul tabIndex={0} className="dropdown-content z-[1] menu p-2 shadow bg-base-350 rounded-box w-52">
    <li><a>Region</a></li>
    <li><a>Field Workers</a></li>
  </ul>
</div>
            <li class={props.page === "doctors" ? "md:px-20 md:py-2 text-indigo-500" : "md:px-20 md:py-2 hover:text-indigo-400"}>
              <a href="/admin/doctors">Contact Us</a>
            </li>
            {/* <li class={props.page === "workers" ? "md:px-4 md:py-2 text-indigo-500" : "md:px-4 md:py-2 hover:text-indigo-400"}>
              <a href="/admin/fieldworkers">Field Workers</a>
            </li> */}
            {/* <li class="md:px-4 md:py-2 hover:text-indigo-400"><a href="#">Contact</a></li> */}
          </ul>
        </div>
        <div class="order-2 md:order-3">
          <div className="flex">
            <button class="px-4 py-2 bg-indigo-500 hover:bg-indigo-600 text-gray-50 rounded-xl flex items-center gap-2" onClick={addSuperVisorHandler}>
              {/* <!-- Heroicons - Login Solid --> */}
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
            <button
              class="px-4 py-2 bg-red-500 hover:bg-red-600 text-gray-50 rounded-xl"
              style={{ marginLeft: 10 }}
              onClick={logOut}
            >
              {/* <!-- Heroicons - Login Solid --> */}
              {/* <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"> */}
              {/* <path fill-rule="evenodd" d="M3 3a1 1 0 011 1v12a1 1 0 11-2 0V4a1 1 0 011-1zm7.707 3.293a1 1 0 010 1.414L9.414 9H17a1 1 0 110 2H9.414l1.293 1.293a1 1 0 01-1.414 1.414l-3-3a1 1 0 010-1.414l3-3a1 1 0 011.414 0z" clip-rule="evenodd" /> */}
              {/* </svg> */}
              <span class="font-semibold">Log Out</span>
              {/* <span>Set Questionnaire</span> */}
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default NavbarSup;

import React from "react";
import AddSuperVisor from "./AddSuperVisor";
import { useNavigate } from "react-router-dom";
import SuperVisorCard from "../../components/SuperVisorCard";
const SeeSuperVisor = () => {
    const navigate = useNavigate();
    const addSuperVisorHandler = () => {
        navigate("/admin/addsupervisor");
    }
  return (
    <div>
      <nav class="bg-gray-200 shadow shadow-gray-300 w-100 px-8 md:px-auto">
        <div class="md:h-16 h-28 mx-auto md:px-4 container flex items-center justify-between flex-wrap md:flex-nowrap">
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
          <div class="text-gray-500 order-3 w-full md:w-auto md:order-2">
            <ul class="flex font-semibold justify-between">
              {/* <!-- Active Link = text-indigo-500 */}
              {/* Inactive Link = hover:text-indigo-500 --> */}
              <li class="md:px-4 md:py-2 hover:text-indigo-400">
                <a href="/admin">Dashboard</a>
              </li>
              <li class="md:px-4 md:py-2 text-indigo-500">
                <a href="/admin/supervisors">Supervisor</a>
              </li>
              <li class="md:px-4 md:py-2 hover:text-indigo-400">
                <a href="#">Doctor</a>
              </li>
              <li class="md:px-4 md:py-2 hover:text-indigo-400">
                <a href="#">Field Workers</a>
              </li>
              {/* <li class="md:px-4 md:py-2 hover:text-indigo-400"><a href="#">Contact</a></li> */}
            </ul>
          </div>
          <div class="order-2 md:order-3">
            <div className="flex">
              <button class="px-4 py-2 bg-indigo-500 hover:bg-indigo-600 text-gray-50 rounded-xl flex items-center gap-2">
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
                <span>Set Questionnaire</span>
              </button>
              <button onClick={addSuperVisorHandler}
                class="px-4 py-2 bg-red-500 hover:bg-red-600 text-gray-50 rounded-xl"
                style={{ marginLeft: 10 }}
              >
                {/* <!-- Heroicons - Login Solid --> */}
                {/* <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"> */}
                {/* <path fill-rule="evenodd" d="M3 3a1 1 0 011 1v12a1 1 0 11-2 0V4a1 1 0 011-1zm7.707 3.293a1 1 0 010 1.414L9.414 9H17a1 1 0 110 2H9.414l1.293 1.293a1 1 0 01-1.414 1.414l-3-3a1 1 0 010-1.414l3-3a1 1 0 011.414 0z" clip-rule="evenodd" /> */}
                {/* </svg> */}
                <span>Add Supervisor</span>
                {/* <span>Set Questionnaire</span> */}
              </button>
            </div>
          </div>
        </div>
      </nav>
      <div className="flex justify-center" style={{ marginTop: 20 }}>
        <div class="w-72">
          <div class="relative w-full min-w-[200px] h-10">
            <input
              class="peer w-full h-full  text-blue-gray-700 font-sans font-normal outline outline-0 focus:outline-0 disabled:bg-blue-gray-50 disabled:border-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 border focus:border-2 border-t-transparent focus:border-t-transparent text-sm px-3 py-2.5 rounded-[7px] border-blue-gray-200 focus:border-gray-900"
              placeholder=" "
            />
            <label class="flex w-full h-full select-none pointer-events-none absolute left-0 font-normal !overflow-visible truncate peer-placeholder-shown:text-blue-gray-500 leading-tight peer-focus:leading-tight peer-disabled:text-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500 transition-all -top-1.5 peer-placeholder-shown:text-sm text-[11px] peer-focus:text-[11px] before:content[' '] before:block before:box-border before:w-2.5 before:h-1.5 before:mt-[6.5px] before:mr-1 peer-placeholder-shown:before:border-transparent before:rounded-tl-md before:border-t peer-focus:before:border-t-2 before:border-l peer-focus:before:border-l-2 before:pointer-events-none before:transition-all peer-disabled:before:border-transparent after:content[' '] after:block after:flex-grow after:box-border after:w-2.5 after:h-1.5 after:mt-[6.5px] after:ml-1 peer-placeholder-shown:after:border-transparent after:rounded-tr-md after:border-t peer-focus:after:border-t-2 after:border-r peer-focus:after:border-r-2 after:pointer-events-none after:transition-all peer-disabled:after:border-transparent peer-placeholder-shown:leading-[3.75] text-gray-500 peer-focus:text-gray-900 before:border-blue-gray-200 peer-focus:before:!border-gray-900 after:border-blue-gray-200 peer-focus:after:!border-gray-900">
              State
            </label>
          </div>
        </div>
        <div class="w-72" style={{ marginLeft: 15 }}>
          <div class="relative w-full min-w-[200px] h-10">
            <input
              class="peer w-full h-full  text-blue-gray-700 font-sans font-normal outline outline-0 focus:outline-0 disabled:bg-blue-gray-50 disabled:border-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 border focus:border-2 border-t-transparent focus:border-t-transparent text-sm px-3 py-2.5 rounded-[7px] border-blue-gray-200 focus:border-gray-900"
              placeholder=" "
            />
            <label class="flex w-full h-full select-none pointer-events-none absolute left-0 font-normal !overflow-visible truncate peer-placeholder-shown:text-blue-gray-500 leading-tight peer-focus:leading-tight peer-disabled:text-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500 transition-all -top-1.5 peer-placeholder-shown:text-sm text-[11px] peer-focus:text-[11px] before:content[' '] before:block before:box-border before:w-2.5 before:h-1.5 before:mt-[6.5px] before:mr-1 peer-placeholder-shown:before:border-transparent before:rounded-tl-md before:border-t peer-focus:before:border-t-2 before:border-l peer-focus:before:border-l-2 before:pointer-events-none before:transition-all peer-disabled:before:border-transparent after:content[' '] after:block after:flex-grow after:box-border after:w-2.5 after:h-1.5 after:mt-[6.5px] after:ml-1 peer-placeholder-shown:after:border-transparent after:rounded-tr-md after:border-t peer-focus:after:border-t-2 after:border-r peer-focus:after:border-r-2 after:pointer-events-none after:transition-all peer-disabled:after:border-transparent peer-placeholder-shown:leading-[3.75] text-gray-500 peer-focus:text-gray-900 before:border-blue-gray-200 peer-focus:before:!border-gray-900 after:border-blue-gray-200 peer-focus:after:!border-gray-900">
              District
            </label>
          </div>
        </div>
        <button type="button" class="py-3 px-4 inline-flex items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent bg-blue-100 text-blue-800 hover:bg-blue-200 disabled:opacity-50 disabled:pointer-events-none dark:hover:bg-blue-900 dark:text-blue-400 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600" style={{marginLeft: 15}}>
  SEARCH<svg fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" viewBox="0 0 24 24" class="w-4 h-4"><path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
</button>
      </div>

      {/* <AddSuperVisor /> */}
      <div className="flex flex-wrap gap-12" style={{marginTop: 20}}>
          <SuperVisorCard />
          <SuperVisorCard />
          <SuperVisorCard />
          <SuperVisorCard />
          <SuperVisorCard />
          <SuperVisorCard />
          <SuperVisorCard />
          <SuperVisorCard />
      </div>
    </div>
  );
};

export default SeeSuperVisor;

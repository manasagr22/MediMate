import React from 'react'
import { Link } from "react-router-dom";

export default function LoginPop(props) {

    return (
        <div class="absolute z-10 h-max top-0 bottom-0 right-0 left-0 m-auto max-w-sm p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-6 dark:bg-gray-800 dark:border-gray-700" style={{ width: "22rem" }} id='loginPop'>
            <div className='absolute right-0 top-0' style={{ color: "red" }}><button onClick={() => props.closeButton("")}><span class="material-symbols-outlined" style={{ fontSize: "1.8rem", fontWeight: "600" }}>
                close
            </span></button>
            </div>
            <h5 class="mb-3 text-base font-semibold text-gray-900 md:text-xl dark:text-white">
                Login as
            </h5>
            {/* <p class="text-sm font-normal text-gray-500 dark:text-gray-400">Connect with one of our available wallet providers or create a new one.</p> */}
            <ul class="my-4 space-y-3">
                <li>
                    <Link to="/login" class="flex items-center p-3 text-base font-bold text-gray-900 rounded-lg bg-gray-100 hover:bg-blue-600 group hover:shadow hover:text-white dark:bg-gray-600 dark:hover:bg-gray-500 dark:text-white" onClick={() => props.closeButton("admin")}>
                        <span class="material-symbols-outlined">
                            shield_person
                        </span>
                        <span class="flex-1 ms-3 whitespace-nowrap">Administrator</span>
                        {/* <span class="inline-flex items-center justify-center px-2 py-0.5 ms-3 text-xs font-medium text-gray-500 bg-gray-200 rounded dark:bg-gray-700 dark:text-gray-400">Popular</span> */}
                    </Link>
                </li>
                <li>
                    <Link to="/login" class="flex items-center p-3 text-base font-bold text-gray-900 rounded-lg bg-gray-100 hover:bg-blue-600 group hover:shadow hover:text-white dark:bg-gray-600 dark:hover:bg-gray-500 dark:text-white" onClick={() => props.closeButton("supervisor")}>
                        <span class="material-symbols-outlined">
                            supervisor_account
                        </span>
                        <span class="flex-1 ms-3 whitespace-nowrap">Supervisor</span>
                    </Link>
                </li>
                <li>
                    <Link to="/login" class="flex items-center p-3 text-base font-bold text-gray-900 rounded-lg bg-gray-100 hover:bg-blue-600 group hover:shadow hover:text-white dark:bg-gray-600 dark:hover:bg-gray-500 dark:text-white" onClick={() => props.closeButton("doctor")}>
                        <span class="material-symbols-outlined">
                            medication
                        </span>
                        <span class="flex-1 ms-3 whitespace-nowrap">Doctor</span>
                    </Link>
                </li>
                <li>
                    <Link to="/login" class="flex items-center p-3 text-base font-bold text-gray-900 rounded-lg bg-gray-100 hover:bg-blue-600 group hover:shadow hover:text-white dark:bg-gray-600 dark:hover:bg-gray-500 dark:text-white" onClick={() => props.closeButton("worker")}>
                        <span class="material-symbols-outlined">
                            badge
                        </span>
                        <span class="flex-1 ms-3 whitespace-nowrap">Field Worker</span>
                    </Link>
                </li>
                <li>
                    <Link to="/login" class="flex items-center p-3 text-base font-bold text-gray-900 rounded-lg bg-gray-100 hover:bg-blue-600 group hover:shadow hover:text-white dark:bg-gray-600 dark:hover:bg-gray-500 dark:text-white" onClick={() => props.closeButton("patient")}>
                        <span class="material-symbols-outlined">
                            personal_injury
                        </span>
                        <span class="flex-1 ms-3 whitespace-nowrap">Patient</span>
                    </Link>
                </li>
            </ul>
            {/* <div>
<a href="#" class="inline-flex items-center text-xs font-normal text-gray-500 hover:underline dark:text-gray-400">
<svg class="w-3 h-3 me-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
<path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7.529 7.988a2.502 2.502 0 0 1 5 .191A2.441 2.441 0 0 1 10 10.582V12m-.01 3.008H10M19 10a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"/>
</svg>
Why do I need to connect with my wallet?</a>
</div> */}
        </div>
    )
}

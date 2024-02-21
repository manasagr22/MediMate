import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import '../styles/SupervisorSignUp.css'

export default function SupervisorSignUp() {

    const navigate = useNavigate();
    const cur_date = new Date().toJSON().slice(0, 10);
    var current_date = cur_date.split("-").reverse()
    current_date = current_date[1] + "/" + current_date[0] + "/" + current_date[2];
    const [calOpen, setCalOpen] = useState(false);
    const [value, setValue] = useState(current_date);
    const label_encode = { "Jan": 1, "Feb": 2, "Mar": 3, "Apr": 4, "May": 5, "Jun": 6, "Jul": 7, "Aug": 8, "Sep": 9, "Oct": 10, "Nov": 11, "Dec": 12 }


    function showPassword() {
        let password = document.getElementById("pass");
        let pass = document.getElementById("showPass");     //<span>

        if (pass.innerText === "visibility") {
            pass.innerText = "visibility_off";
            password.type = "text";
            password.placeholder = "12345678"
        }
        else {
            pass.innerText = "visibility";
            password.type = "password";
            password.placeholder = "••••••••"
        }
    }

    function showConfirmPassword() {
        let confirm_password = document.getElementById("confirm_password");
        let pass = document.getElementById("showConfirmPass");     //<span>

        if (pass.innerText === "visibility") {
            pass.innerText = "visibility_off";
            confirm_password.type = "text";
            confirm_password.placeholder = "12345678"
        }
        else {
            pass.innerText = "visibility";
            confirm_password.type = "password";
            confirm_password.placeholder = "••••••••"
        }
    }

    const handleChange = (newValue) => {
        const arr = (newValue["$d"]).toString().split(" ");
        setValue(label_encode[arr[1]] + "/" + arr[2] + "/" + arr[3]);
    }

    function registerPage() {
        navigate('/supervisor', true)
    }

    return (
        <div class="p-10 space-y-4 md:space-y-6 sm:p-10" id='supervisorSignUp' style={{ height: "inherit", width: "34rem", opacity: "0" }}>
            <h1 class="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                Enter your Details
            </h1>
            <form class="space-y-4 md:space-y-6" action="#">
                <div class="grid gap-6 mb-6 md:grid-cols-2">
                    <div>
                        <label for="first_name" class="block text-sm w-fit font-medium text-gray-900 dark:text-white">First name</label>
                        <input type="text" id="first_name" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="John" required />
                    </div>
                    <div>
                        <label for="last_name" class="block text-sm w-fit font-medium text-gray-900 dark:text-white">Last name</label>
                        <input type="text" id="last_name" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Doe" required />
                    </div>
                    <div>
                        <label for="phone" class="block text-sm w-fit font-medium text-gray-900 dark:text-white">Date of Birth</label>
                        {/* <div id="dateRangeDropdown" class="z-10 bg-white divide-y divide-gray-100 rounded-lg shadow w-80 lg:w-56 dark:bg-gray-700 dark:divide-gray-600"> */}
                            {/* <div class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" id="dateRangeDropdown" aria-labelledby="dateRangeButton"> */}
                                <div date-rangepicker datepicker-autohide class="flex items-center bg-gray-50 text-gray-900 text-sm rounded-lg block w-full">
                                    <div class="relative max-w-sm ">
                                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                                            <DatePicker onChange={(newValue) => handleChange(newValue)} />
                                        </LocalizationProvider>
                                    </div>
                                </div>
                                {/* </div> */}
                    </div>

                    <div>
                        <label for="phone" class="block text-sm w-fit font-medium text-gray-900 dark:text-white">Phone number</label>
                        <input type="tel" id="phone" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="9871253009" pattern="[0-9]{3}-[0-9]{2}-[0-9]{3}" required />
                    </div>
                    <div>
                        <label for="pass" class="block text-sm w-fit font-medium text-gray-900 dark:text-white">Password</label>
                        <div className='flex'>
                            <input type="password" name="pass" id="pass" placeholder="••••••••" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required="" style={{ paddingRight: "2.4rem", marginRight: "-2rem" }} />
                            <button onClick={showPassword}><span class="material-symbols-outlined relative" id='showPass' style={{ top: "0.2rem" }}>
                                visibility
                            </span></button>
                        </div>
                    </div>
                    <div>
                        <label for="confirm_password" class="block text-sm w-fit font-medium text-gray-900 dark:text-white">Confirm Password</label>
                        <div className='flex'>
                            <input type="password" name="confirm_password" id="confirm_password" placeholder="••••••••" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required="" style={{ paddingRight: "2.4rem", marginRight: "-2rem" }} />
                            <button onClick={showConfirmPassword}><span class="material-symbols-outlined relative" id='showConfirmPass' style={{ top: "0.2rem" }}>
                                visibility
                            </span></button>
                        </div>
                    </div>
                </div>
                <div class="flex items-start">
                    <div class="flex items-center h-5">
                        <input id="terms" aria-describedby="terms" type="checkbox" class="w-4 h-4 border border-gray-400 rounded bg-gray-100 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800" required="" />
                    </div>
                    <div class="ml-3 text-sm">
                        <label for="terms" class="font-light text-gray-900 dark:text-gray-300">I accept the <a class="font-medium text-blue-600 hover:underline dark:text-primary-500" href="#">Terms and Conditions</a></label>
                    </div>
                </div>
                <button type="button" class="w-full text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 font-semibold rounded-lg text-base px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800" onClick={registerPage}>Register</button>
            </form>
        </div>
    )
}

import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import '../styles/SupervisorSignUp.css'
import dayjs from 'dayjs';

export default function SupervisorSignUp(props) {

    const email = JSON.parse(localStorage.getItem("email"));

    const navigate = useNavigate();
    const cur_date = new Date().toJSON().slice(0, 10);
    var current_date = cur_date.split("-").reverse()
    current_date = current_date[1] + "-" + current_date[0] + "-" + current_date[2];
    const [calOpen, setCalOpen] = useState(false);
    const [value, setValue] = useState(dayjs(current_date));
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
        setValue(dayjs(label_encode[arr[1]] + "-" + arr[2] + "-" + arr[3]));
    }

    async function registerPage(e) {
        e.preventDefault();
        const first_name = document.getElementById("first_name").value;
        const last_name = document.getElementById("last_name").value;
        const phone = document.getElementById("phone").value;
        const pass = document.getElementById("pass").value;
        const confirm_password = document.getElementById("confirm_password").value;
        const email = JSON.parse(localStorage.getItem("email"))
        const url1 = "http://localhost:8081/supervisor/modifyDetails"
        const url2 = "http://localhost:8081/fw/modifyDetails"

        if (pass !== confirm_password)
            props.handleAlert("danger", "Passwords do not Match")
        else {

            props.setBackground("brightness(0.01)");
            props.setLoad(true);

            try {
                const key = "Bearer " + props.jwtToken;
                const result = await fetch(props.loginActiveUser === 'supervisor' ? url1 : props.loginActiveUser === 'worker' ? url2 : "", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": key
                    },
                    body: JSON.stringify({
                        email: email,
                        password: pass,
                        firstName: first_name,
                        lastName: last_name,
                        dob: value,
                        phone: phone
                    }),
                }).then((res) => res.json());
                props.setBackground("");
                props.setLoad(false);
                if (result === true) {
                    props.handleAlert("success", "Registration Successful!!!");
                    props.loginActiveUser === 'supervisor' ? navigate('/sup/dashboard', { replace: true }) : navigate('/fw/dashboard', { replace: true });
                }
                else {
                    props.handleAlert("danger", "Some Error Occurred");
                }
            }
            catch {
                props.handleAlert("danger", "Some Error Occurred");
            }
        }
    }

    return (
        <div class="p-10 space-y-4 md:space-y-6 sm:p-10" id='supervisorSignUp' style={{ height: "inherit", width: "34rem", opacity: "0" }}>
            <h1 class="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                Enter your Details
            </h1>
            <form class="space-y-4 md:space-y-6" autoComplete='off' onSubmit={(e) => registerPage(e)}>
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
                        <label for="dob" class="block text-sm w-fit font-medium text-gray-900 dark:text-white">Date of Birth</label>
                        {/* <div id="dateRangeDropdown" class="z-10 bg-white divide-y divide-gray-100 rounded-lg shadow w-80 lg:w-56 dark:bg-gray-700 dark:divide-gray-600"> */}
                        {/* <div class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" id="dateRangeDropdown" aria-labelledby="dateRangeButton"> */}
                        <div date-rangepicker datepicker-autohide class="flex items-center bg-gray-50 text-gray-900 text-sm rounded-lg block w-full">
                            <div class="relative max-w-sm ">
                                <LocalizationProvider dateAdapter={AdapterDayjs}>
                                    <DatePicker onChange={(newValue) => handleChange(newValue)} value={value}/>
                                </LocalizationProvider>
                            </div>
                        </div>
                        {/* </div> */}
                    </div>

                    <div>
                        <label for="phone" class="block text-sm w-fit font-medium text-gray-900 dark:text-white">Phone number</label>
                        <input type="text" id="phone" autoComplete='false' class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="9871253009" pattern="[0-9]{10}" required />
                    </div>
                    <div>
                        <label for="pass" class="block text-sm w-fit font-medium text-gray-900 dark:text-white">Password</label>
                        <div className='flex'>
                            <input type="password" autoComplete='false' name="pass" id="pass" placeholder="••••••••" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required style={{ paddingRight: "2.4rem", marginRight: "-2rem" }} />
                            <button onClick={showPassword}><span class="material-symbols-outlined relative" id='showPass' style={{ top: "0.2rem" }}>
                                visibility
                            </span></button>
                        </div>
                    </div>
                    <div>
                        <label for="confirm_password" class="block text-sm w-fit font-medium text-gray-900 dark:text-white">Confirm Password</label>
                        <div className='flex'>
                            <input type="password" name="confirm_password" id="confirm_password" placeholder="••••••••" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required style={{ paddingRight: "2.4rem", marginRight: "-2rem" }} />
                            <button onClick={showConfirmPassword}><span class="material-symbols-outlined relative" id='showConfirmPass' style={{ top: "0.2rem" }}>
                                visibility
                            </span></button>
                        </div>
                    </div>
                </div>
                <div class="flex items-start">
                    <div class="flex items-center h-5">
                        <input id="terms" aria-describedby="terms" type="checkbox" class="w-4 h-4 border border-gray-400 rounded bg-gray-100 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800" required />
                    </div>
                    <div class="ml-3 text-sm">
                        <label for="terms" class="font-light text-gray-900 dark:text-gray-300">I accept the <a class="font-medium text-blue-600 hover:underline dark:text-primary-500" href="#">Terms and Conditions</a></label>
                    </div>
                </div>
                <button type="submit" class="w-full text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 font-semibold rounded-lg text-base px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">Register</button>
            </form>
        </div>
    )
}

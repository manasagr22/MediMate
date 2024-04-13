import React from "react";
import NavbarAd from "../../components/NavbarAd";
import SuperVisorCard from "../../components/SuperVisorCard";
import { useNavigate } from "react-router-dom";
// import from "@mui/material/colors"

const AddSuperVisor = (props) => {
    const navigate = useNavigate();
    props.checkToken();

    async function registerSup() {
        const email = document.getElementById("email").value;
        const location = document.getElementById("location").value
        console.log(email, location)
        const url = "http://localhost:8081/admin/regSup";
        const sup = "SUPERVISOR"

        props.setBackground("brightness(0.01)");
        props.setLoad(true);

        try {
                    const key = "Bearer " + props.jwtToken
                    console.log("hello " + key)
                    const result1 = await fetch(url, {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json",
                            "Authorization": key
                        },
                        body: JSON.stringify({
                            district: {
                                name: location
                            },
                            user:{
                                email: email,
                                role: {
                                    name: sup
                                }
                            }
                        }),

                    }).then((res) => res.json());
                    props.setBackground("");
                    props.setLoad(false);

                    props.handleAlert("success", "User Credentials have been sent to registered email");

                }
                catch {
                    props.setBackground("");
                    props.setLoad(false);
                    props.handleAlert("danger", "Error Registering Supervisor");
                }
    }

    return (<div style={{ backgroundColor: "#f5f5f5", height: window.innerHeight }}>
        <NavbarAd />
        {/* Register Page */}
        <div class="bg-gray-100 py-6 flex flex-col justify-center sm:py-12" style={{ height: window.innerHeight - 64 }}>
            <div class="relative py-3 sm:max-w-xl sm:mx-auto">
                <div
                    class="absolute inset-0 bg-gradient-to-r from-blue-300 to-blue-600 shadow-lg transform -skew-y-6 sm:skew-y-0 sm:-rotate-6 sm:rounded-3xl">
                </div>
                <div class="relative px-4 py-10 bg-white shadow-lg sm:rounded-3xl sm:p-20">
                    <div class="max-w-md mx-auto">
                        <div>
                            <h1 class="text-2xl font-semibold">Enter SuperVisor Details</h1>
                        </div>
                        <div class="divide-y divide-gray-200">
                            <div class="py-8 text-base leading-6 space-y-4 text-gray-700 sm:text-lg sm:leading-">
                                {/* <div class="relative">
                                    <input autocomplete="off" id="email" name="email" type="text" class="peer placeholder-transparent h-10 w-full border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:borer-rose-600" placeholder="Email address" />
                                    <label for="email" class="absolute left-0 -top-3.5 text-gray-600 text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-440 peer-placeholder-shown:top-2 transition-all peer-focus:-top-5 peer-focus:text-gray-600 peer-focus:text-sm">Email Address</label>
                                </div>
                                <div class="relative">
                                    <input autocomplete="off" id="password" name="password" type="password" class="peer placeholder-transparent h-10 w-full border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:borer-rose-600" placeholder="Password" />
                                    <label for="password" class="absolute left-0 -top-3.5 text-gray-600 text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-440 peer-placeholder-shown:top-2 transition-all peer-focus:-top-5 peer-focus:text-gray-600 peer-focus:text-sm">Password</label>
                                </div> */}
                                <div>
                        <label for="email" class="block text-sm w-fit font-medium text-gray-900 dark:text-white">Email Address</label>
                        <input type="text" id="email" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="abc@gmail.com" required />
                    </div>
                    <div>
                        <label for="state" class="block text-sm w-fit font-medium text-gray-900 dark:text-white">State</label>
                        <select id="state" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
    <option selected>Choose a state</option>
    <option value="US">United States</option>
    <option value="CA">Canada</option>
    <option value="FR">France</option>
    <option value="DE">Germany</option>
  </select>
                    </div>
                    <div>
                        <label for="location" class="block text-sm w-fit font-medium text-gray-900 dark:text-white">District</label>
                        <select id="location" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
    <option selected>Choose a district</option>
    <option value="US">United States</option>
    <option value="CA">Canada</option>
    <option value="FR">France</option>
    <option value="DE">Germany</option>
  </select>
                    </div>
                                <div class="relative">
                                    <button class="bg-blue-500 text-white rounded-md px-2 py-1" onClick={registerSup}>Register</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        
    </div>)
}

export default AddSuperVisor;
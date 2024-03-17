import React from "react";
import NavbarAd from "../../components/NavbarAd";
import SuperVisorCard from "../../components/SuperVisorCard";
import { useNavigate } from "react-router-dom";
import NavbarSup from "../../components/NavbarSup";
// import from "@mui/material/colors"

const AddFieldWorker = (props) => {
    const navigate = useNavigate();
    if(props.jwtToken === null) {
        const jwt = JSON.parse(localStorage.getItem("/"));
        if(jwt === "")
            navigate('/', true);
        else {
            props.setJwtToken(props.decryptData());
        }
    }
    else {
        // console.log(props.jwtToken)
    }

    async function registerFW() {
        const email = document.getElementById("email").value;
        const location = document.getElementById("location").value
        const url1 = "http://localhost:8081/supervisor/regFW";
        const url2 = "http://localhost:8081/supervisor/supId";
        const sup = "FIELDWORKER"

        props.setBackground("brightness(0.01)");
        props.setLoad(true);

        try {
            const key = "Bearer " + props.jwtToken
            console.log(key)
            const result = await fetch(url2, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": key
                }
            }).then((res) => res.json());

            const result1 = await fetch(url1, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": key
                },
                body: JSON.stringify({
                    sup_id: result,
                    area: location,
                    user: {
                        email: email,
                        role: {
                            name: sup
                        }
                    }
                }),

            }).then((res) => res.json());
            props.setBackground("");
            props.setLoad(false);
            if (result1 === null)
                props.handleAlert("fail", "Error Registering Field Worker");
            else
                props.handleAlert("success", "User Credentials have been sent to registered email");

        }
        catch {
            props.setBackground("");
            props.setLoad(false);
            props.handleAlert("fail", "Error Registering Field Worker");
        }
    }

    return (<div style={{ backgroundColor: "#f5f5f5", height: window.innerHeight }}>
        <NavbarSup />
        {/* Register Page */}
        <div class="bg-gray-100 flex flex-col justify-center" style={{ height: window.innerHeight - 64 }}>
            <div class="relative py-3 sm:max-w-xl sm:mx-auto">
                <div
                    class="absolute inset-0 bg-gradient-to-r from-blue-300 to-blue-600 shadow-lg transform -skew-y-6 sm:skew-y-0 sm:-rotate-6 sm:rounded-3xl">
                </div>
                <div class="relative px-4 py-10 bg-white shadow-lg sm:rounded-3xl sm:p-20">
                    <div class="max-w-md mx-auto">
                        <div>
                            <h1 class="text-2xl font-semibold">Enter Field Worker Details</h1>
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
                                    <label for="location" class="block text-sm w-fit font-medium text-gray-900 dark:text-white">Location</label>
                                    <input type="text" id="location" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Bangalore" required />
                                </div>
                                <div class="relative">
                                    <button class="bg-blue-500 text-white rounded-md px-2 py-1" onClick={registerFW}>Register</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>


    </div>)
}

export default AddFieldWorker;
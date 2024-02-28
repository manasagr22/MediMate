import React, { useEffect, useState } from 'react'
import '../styles/Login.css';
import doctor from '../Images/doctor-removebg-preview.png'
import { Link, useNavigate } from 'react-router-dom';
import SupervisorSignUp from './SupervisorSignUp';
import OtpPage from './OtpPage';

export default function Login(props) {

    const navigate = useNavigate();
    const [supervisorActive, setSupervisorActive] = useState(false)
    const [otpActive, setOtpActive] = useState(false)


    const loginActiveUser = JSON.parse(localStorage.getItem("loginActiveUser"))

    useEffect(() => {
        if (supervisorActive) {
            let supervisor = document.getElementById("supervisorSignUp");
            supervisor.style.opacity = "1"
        }
    }, [supervisorActive])

    useEffect(() => {
        if (otpActive) {
            let otpId = document.getElementById("otpId");
            otpId.style.opacity = "1"
        }
    }, [otpActive])

    useEffect(() => {

        if (props.jwtToken !== null) {
            props.setBackground("");
            props.setLoad(false);

            // const fetchData = async () => {
            //     try {
            //         // console.log(props.jwtToken)
            //         const key = "Bearer " + props.jwtToken
            //         console.log("hello " + key)
            //         const result1 = await fetch("http://localhost:8081/admin/current-admin", {
            //             method: "GET",
            //             headers: {
            //                 "Content-Type": "application/json",
            //                 "Authorization": key
            //             },

            //         }).then((res) => res.json());

            //         console.log(result1.email)

            //     }
            //     catch {
            //         console.log("Error 1!!!");
            //     }
            // }

            // fetchData();

            if(loginActiveUser === 'admin')
                navigate('/admin', true);
        }
    }, [props.jwtToken])

    async function signIn() {
        console.log(loginActiveUser)
        const email = document.getElementById("email").value;
        const password = document.getElementById("password").value;

        const url = "http://localhost:8081/auth/login"

        props.setBackground("brightness(0.01)");
        props.setLoad(true);

        if (loginActiveUser === "admin") {

            //Backend....

            try {
                const result = await fetch(url, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        // "Authorization": "Bearer "+props.jwtToken
                    },
                    body: JSON.stringify({
                        email: email,
                        password: password
                    }),
                }).then((res) => res.json());

                if (result.role === "ADMIN") {
                    props.setJwtToken(result.jwtToken);
                }

            }
            catch {
                console.log("Error!!!");
                props.setBackground("");
                props.setLoad(false);
            }
        }
        else if (loginActiveUser === "supervisor") {
            let contain = document.getElementById("contain");
            contain.style.transform = `translate3d(-34rem, 0px, 0px)`;
            contain.style.transition = "transform 500ms ease 0s";
            let signInId = document.getElementById("signInId");
            signInId.style.opacity = "0";
            setOtpActive(true)

        }
        else if (loginActiveUser === "doctor") {

        }
        else if (loginActiveUser === "worker") {
            navigate('/field-worker')
        }
        else if (loginActiveUser === "patient") {

        }
    }

    return (
        <div className='w-full h-full gradientColor absolute'>
            <div className="flex absolute z-1 h-max top-0 bottom-0 right-0 left-0 m-auto bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700" style={{ width: "68rem", height: "32rem", top: "68.8333px", backgroundColor: "#ffffff", borderColor: "#ffffff", borderWidth: "0.2rem" }}>
                <div className='relative h-full gradientColor' id='imgContainer'>
                    <img className='absolute top-0 bottom-0 right-20 left-0 m-auto' src={doctor} alt=''></img>
                </div>
                <div className='absolute h-full' id='loginPageContainer'>
                    <div className='relative flex' id='contain' style={{ width: `${3 * 34}rem`, transform: `translate3d(0, 0px, 0px)` }}>
                        <div class="p-16 space-y-4 md:space-y-6 sm:p-16" id='signInId' style={{ height: "inherit", width: "34rem", opacity: "1" }}>
                            <h1 class="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                                Sign in to your account
                            </h1>
                            <form class="space-y-4 md:space-y-6" action="#">
                                <label for="email" class="block text-base w-fit font-medium text-gray-900 dark:text-white" style={{ fontWeight: "550" }}>Your email</label>
                                <div class="flex" style={{ marginTop: "0.5rem" }}>
                                    <span class="inline-flex items-center px-3 text-sm text-gray-900 bg-gray-200 border border-e-0 border-gray-300 rounded-s-md dark:bg-gray-600 dark:text-gray-400 dark:border-gray-600">
                                        <span class="material-symbols-outlined">
                                            mail
                                        </span>
                                    </span>
                                    <input type="email" name="email" id="email" class="rounded-none rounded-e-lg bg-gray-50 border border-gray-300 text-gray-900 focus:ring-blue-500 focus:border-blue-500 block flex-1 min-w-0 w-full text-sm p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="name@company.com" required="" />
                                </div>

                                <label for="password" class="block text-base w-fit font-medium text-gray-900 dark:text-white" style={{ fontWeight: "550" }}>Password</label>
                                <div class="flex" style={{ marginTop: "0.5rem" }}>
                                    <span class="inline-flex items-center px-3 text-sm text-gray-900 bg-gray-200 border border-e-0 border-gray-300 rounded-s-md dark:bg-gray-600 dark:text-gray-400 dark:border-gray-600">
                                        <span class="material-symbols-outlined">
                                            encrypted
                                        </span>
                                    </span>
                                    <input type="password" name="password" id="password" placeholder="••••••••" class="rounded-none rounded-e-lg bg-gray-50 border border-gray-300 text-gray-900 focus:ring-blue-500 focus:border-blue-500 block flex-1 min-w-0 w-full text-sm p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required="" />
                                </div>


                                <div class="flex items-center justify-between">
                                    <div class="flex items-start">
                                        <div class="flex items-center h-5">
                                            <input id="remember" aria-describedby="remember" type="checkbox" class="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800" required="" />
                                        </div>
                                        <div class="ml-3 text-sm">
                                            <label for="remember" class="text-gray-600 dark:text-gray-300">Remember me</label>
                                        </div>
                                    </div>
                                    <Link to="#" class="text-blue-600 text-sm font-semibold text-primary-600 hover:underline dark:text-primary-500">Forgot password?</Link>
                                </div>
                                <button type="button" class="w-full text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 font-semibold rounded-lg text-base px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800" onClick={signIn}>Sign in</button>
                            </form>
                        </div>

                        {otpActive ? <OtpPage setSupervisorActive={setSupervisorActive} /> : undefined}
                        {supervisorActive ? <SupervisorSignUp /> : undefined}
                    </div>
                </div>
            </div>
        </div>
    )
}

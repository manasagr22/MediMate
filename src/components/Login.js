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
    const [OTP, setOTP] = useState(null);
    const [adminLogin, setAdminLogin] = useState(false);
    const [hospLogin, setHospLogin] = useState(false);
    const [docLogin, setDocLogin] = useState(false);
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
            const sendOTP = async () => {
                // const otp = (Math.floor(1000 + Math.random() * 9000)).toString();
                try {
                    const key = "Bearer " + props.jwtToken
                    console.log(key)
                    const email = JSON.parse(localStorage.getItem("email"));
                    console.log(email);
                    const url1 = "http://localhost:8082/supervisor/sendOtp"
                    const url2 = "http://localhost:8082/fw/sendOtp"
                    console.log("hello1 " + key)
                    console.log(loginActiveUser)
                    const result1 = await fetch(loginActiveUser === 'supervisor' ? url1 : loginActiveUser === 'worker' ? url2 : "", {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json",
                            "Authorization": key
                        },
                        body: JSON.stringify({
                            email: email,
                        }),
                        // mode: 'no-cors'

                    }).then((res) => res.json());
                    // console.log(result1)
                    if (result1 === false) {
                        props.handleAlert("danger", "Some Error Occurred while sending OTP!");
                    }
                    else {
                        props.handleAlert("success", "OTP sent successfully!");
                    }
                }
                catch (error) {
                    // console.log(error);
                    props.handleAlert("danger", "Some Error Occurred while sending OTP!");
                }
            }

            sendOTP();
        }
    }, [otpActive])

    useEffect(() => {

        if (props.jwtToken !== null) {
            props.encryptData(props.jwtToken);
            if (loginActiveUser === 'admin' && adminLogin) {
                props.setBackground("");
                props.setLoad(false);
                navigate('/admin', { replace: true });
            }
            else if (loginActiveUser === 'hospital' && hospLogin) {
                navigate('/hospital/dashboard', { replace: true })
            }
            else if(loginActiveUser === 'doctor' && docLogin){
                props.setBackground("");
                props.setLoad(false);
                navigate('/doc/dashboard', {replace: true});
            }
        }
    }, [props.jwtToken])

    async function signIn() {
        // console.log(loginActiveUser)
        const email = document.getElementById("email").value;
        localStorage.setItem("email", JSON.stringify(email));
        const password = document.getElementById("password").value;

        const url = "http://localhost:8082/auth/login"

        props.setBackground("brightness(0.01)");
        props.setLoad(true);

        try {
            const result = await fetch(url, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    email: email,
                    password: password
                }),
            }).then((res) => res.json());

            if (loginActiveUser === "admin") {
                if (result.role === "ADMIN") {
                    try {
                        const state = await fetch(`http://localhost:8082/admin/getState`, {
                            method: "GET",
                            headers: {
                                "Content-Type": "application/json",
                                "Authorization": "Bearer " + result.jwtToken
                            }
                        }).then((res) => res.json());
                        props.setBackground("");
                        props.setLoad(false);
                        props.setStateList(state)
                    } catch {
                        ;
                    }
                    props.handleAlert("success", "Login Successful!!!");
                    props.setJwtToken(result.jwtToken);
                    setAdminLogin(true)
                }
                else {
                    props.setBackground("");
                    props.setLoad(false);
                    props.handleAlert("danger", "Invalid Login!");
                }
            }
            else if (loginActiveUser === "hospital") {
                if (result.role === "HOSPITAL") {
                    props.handleAlert("success", "Login Successful!!!");
                    props.setJwtToken(result.jwtToken);
                    setHospLogin(true);
                }
                else {
                    props.setBackground("");
                    props.setLoad(false);
                    props.handleAlert("danger", "Invalid Login!");
                }
            }
            else if (loginActiveUser === "supervisor") {
                props.setBackground("");
                props.setLoad(false);
                if (result.role === "SUPERVISOR") {
                    props.handleAlert("success", "Login Successful!!!");
                    props.setJwtToken(result.jwtToken);
                    let contain = document.getElementById("contain");
                    contain.style.transform = `translate3d(-34rem, 0px, 0px)`;
                    contain.style.transition = "transform 500ms ease 0s";
                    let signInId = document.getElementById("signInId");
                    signInId.style.opacity = "0";
                    setOtpActive(true)
                }
                else {
                    props.handleAlert("danger", "Invalid Login!");
                }
            }
            else if (loginActiveUser === "doctor") {
                props.setBackground("");
                props.setLoad(false);
                if (result.role === "DOCTOR") {
                    props.handleAlert("success", "Login Successful!!!");
                    props.setJwtToken(result.jwtToken);
                    setDocLogin(true);
                }
                else {
                    props.handleAlert("danger", "Invalid Login!");
                }
            }
            else if (loginActiveUser === "worker") {
                // navigate('/field-worker')
                props.setBackground("");
                props.setLoad(false);
                if (result.role === "FIELDWORKER") {
                    props.handleAlert("success", "Login Successful!!!");
                    props.setJwtToken(result.jwtToken);
                    let contain = document.getElementById("contain");
                    contain.style.transform = `translate3d(-34rem, 0px, 0px)`;
                    contain.style.transition = "transform 500ms ease 0s";
                    let signInId = document.getElementById("signInId");
                    signInId.style.opacity = "0";
                    setOtpActive(true)
                }
                else {
                    props.handleAlert("danger", "Invalid Login!");

                }
            }
            else if (loginActiveUser === "patient") {
                props.setBackground("");
                props.setLoad(false);
                if (result.role === 'PATIENT') {
                    props.handleAlert("success", "Login Successful!!!");
                }
                else {
                    props.handleAlert("danger", "Invalid Login!");

                }
            }
        }
        catch {
            props.handleAlert("danger", "Some Error Occurred!");
            props.setBackground("");
            props.setLoad(false);
        }
    }

    return (
        <div className='w-full h-full gradientColor absolute' style={{ overflow: "hidden" }}>
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

                        {otpActive ? <OtpPage setSupervisorActive={setSupervisorActive} jwtToken={props.jwtToken} setBackground={props.setBackground} setLoad={props.setLoad} handleAlert={props.handleAlert} loginActiveUser={loginActiveUser} /> : undefined}
                        {supervisorActive ? <SupervisorSignUp encryptDataIDB={props.encryptDataIDB} decryptDataIDB={props.decryptDataIDB} jwtToken={props.jwtToken} setBackground={props.setBackground} setLoad={props.setLoad} handleAlert={props.handleAlert} loginActiveUser={loginActiveUser} /> : undefined}
                    </div>
                </div>
            </div>
        </div>
    )
}

import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import SpinnerVerify from './SpinnerVerify';

export default function OtpPage(props) {
    const navigate = useNavigate();
    const [reSendActive, setReSendActive] = useState(false)

    const email = (JSON.parse(localStorage.getItem("email"))).slice(0, 7);

    const reSendOTP = async () => {
        // const otp = (Math.floor(1000 + Math.random() * 9000)).toString();
        try {
            setReSendActive(true)
            const key = "Bearer " + props.jwtToken
            const email = JSON.parse(localStorage.getItem("email"));
            // console.log("hello " + key)
            const url1 = "http://localhost:8081/supervisor/sendOtp"
            const url2 = "http://localhost:8081/fw/sendOtp"
            // console.log("hello1 " + key)
            const result1 = await fetch(props.loginActiveUser === 'supervisor' ? url1 : props.loginActiveUser === 'worker' ? url2 : "", {
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
            setReSendActive(false)
            if (result1.status === "false") {
                props.handleAlert("danger", "Some Error Occurred while sending OTP!");
            }
            else {
                props.handleAlert("success", "OTP sent successfully!");
            }
        }
        catch {
            setReSendActive(false)
            props.handleAlert("danger", "Some Error Occurred while sending OTP!");
        }
    }

    function otpEnter(value) {
        const input1 = document.getElementById("1");
        const input2 = document.getElementById("2");
        const input3 = document.getElementById("3");
        const input4 = document.getElementById("4");
        if (value === "1") {
            if (input1.value !== "") {
                input1.blur();
                input2.focus();
            }
        }
        else if (value === "2") {
            input2.blur()
            if (input2.value === "")
                input1.focus();
            else
                input3.focus();
        }
        else if (value === "3") {
            input3.blur();
            if (input3.value === "")
                input2.focus();
            else
                input4.focus();
        }
        else if (value === "4") {
            input4.blur();
            if (input4.value === "")
                input3.focus();
        }
    }

    async function verifyAccount() {
        let otpId = document.getElementById("otpId");
        const input1 = document.getElementById("1").value;
        const input2 = document.getElementById("2").value;
        const input3 = document.getElementById("3").value;
        const input4 = document.getElementById("4").value;

        const user_otp = (input1 + input2 + input3 + input4);
        // console.log(user_otp)
        // console.log(props.OTP)
        try {
            const key = "Bearer " + props.jwtToken
            const email = JSON.parse(localStorage.getItem("email"));
            const url1 = "http://localhost:8081/supervisor/verifyOtp"
            const url2 = "http://localhost:8081/fw/verifyOtp"
            console.log("hello1 " + key)
            const result1 = await fetch(props.loginActiveUser === 'supervisor' ? url1 : props.loginActiveUser === 'worker' ? url2 : "", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": key
                },
                body: JSON.stringify({
                    email: email,
                    otp_num: user_otp
                }),
                // mode: 'no-cors'

            }).then((res) => res.json());
            if (result1 === false) {
                props.handleAlert("danger", "Incorrect OTP");
            }
            else {
                props.handleAlert("success", "OTP Verified!");

                try {
                    // console.log("hello " + key)
                    // console.log(user_otp)
                    const url3 = "http://localhost:8081/supervisor/dob"
                    const url4 = "http://localhost:8081/fw/dob"
                    const result2 = await fetch(props.loginActiveUser === 'supervisor' ? url3 : props.loginActiveUser === 'worker' ? url4 : "", {
                        method: "GET",
                        headers: {
                            "Content-Type": "application/json",
                            "Authorization": key
                        }
                        // mode: 'no-cors'

                    }).then((res) => res.json());
                    console.log("hello")

                    console.log(result2)

                    if(result2 === false) {
                        otpId.style.opacity = "0";
                        props.setSupervisorActive(true);
                    let contain = document.getElementById("contain");
                    contain.style.transform = `translate3d(-68rem, 0px, 0px)`;
                    contain.style.transition = "transform 500ms ease 0s";
                    }
                    else {
                        navigate('/fw/dashboard', {replace: true});
                    }
                }
                catch {
                    props.handleAlert("danger", "Some Error Occurred1!");
                }
            }
        }
        catch {
            props.handleAlert("danger", "Some Error Occurred!");
        }
        // if (user_otp === props.OTP) {
        //     props.handleAlert("success", "OTP Verified!");
        //     otpId.style.opacity = "0";
        //     props.setSupervisorActive(true);
        //     let contain = document.getElementById("contain");
        //     contain.style.transform = `translate3d(-68rem, 0px, 0px)`;
        //     contain.style.transition = "transform 500ms ease 0s";
        // }
        // else {
        //     props.handleAlert("danger", "Incorrect OTP!");
        // }
    }

    return (
        <div class="p-16 space-y-4 md:space-y-6 sm:p-16" id='otpId' style={{ height: "inherit", width: "34rem", opacity: "0" }}>
            <h1 class="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                Email Verification
            </h1>
            <div class="relative flex flex-row text-sm font-medium text-gray-400" style={{ left: "1.5rem", marginTop: "0rem" }}>
                <p>We have sent a code to your email {email}**@gmail.com</p>
            </div>

            <div style={{ marginTop: "4rem" }}>
                <form action="" method="post">
                    <div class="flex flex-col space-y-16">
                        <div class="flex flex-row items-center justify-between mx-auto w-full max-w-xs">
                            <div class="w-16 h-16 ">
                                <input class="w-full h-full flex flex-col items-center justify-center text-center px-5 outline-none rounded-xl border border-gray-400 text-lg bg-white focus:bg-gray-50 focus:ring-1 ring-blue-700" type="text" maxLength={1} name="" id="1" onChange={() => otpEnter("1")} />
                            </div>
                            <div class="w-16 h-16 ">
                                <input class="w-full h-full flex flex-col items-center justify-center text-center px-5 outline-none rounded-xl border border-gray-400 text-lg bg-white focus:bg-gray-50 focus:ring-1 ring-blue-700" type="text" maxLength={1} name="" id="2" onChange={() => otpEnter("2")} />
                            </div>
                            <div class="w-16 h-16 ">
                                <input class="w-full h-full flex flex-col items-center justify-center text-center px-5 outline-none rounded-xl border border-gray-400 text-lg bg-white focus:bg-gray-50 focus:ring-1 ring-blue-700" type="text" maxLength={1} name="" id="3" onChange={() => otpEnter("3")} />
                            </div>
                            <div class="w-16 h-16 ">
                                <input class="w-full h-full flex flex-col items-center justify-center text-center px-5 outline-none rounded-xl border border-gray-400 text-lg bg-white focus:bg-gray-50 focus:ring-1 ring-blue-700" type="text" maxLength={1} name="" id="4" onChange={() => otpEnter("4")} />
                            </div>
                        </div>

                        <div class="flex flex-col space-y-5">
                            <button type="button" class="w-full text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 font-semibold rounded-lg text-base px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800" onClick={verifyAccount}>Verify Account</button>
                            <div class="flex flex-row items-center justify-center text-center text-sm font-medium space-x-1 text-gray-500">
                                <p>Didn't receive code?</p> <button type="button" class="flex flex-row items-center text-blue-600" onClick={reSendOTP}>Resend</button>
                                {reSendActive ? <SpinnerVerify/> : undefined}
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    )
}

import React from "react";
import NavbarAd from "../../components/NavbarAd";
import SuperVisorCard from "../../components/SuperVisorCard";
import { useNavigate } from "react-router-dom";
import NavbarSup from "../../components/NavbarSup";
import '../Admin/AddSup.css'
import {
    Input, Select, Option
} from "@material-tailwind/react";
import { useState } from "react";
import { useEffect } from "react";

const AddFieldWorker = (props) => {
    const navigate = useNavigate();

    const [state, setState] = useState(0);
    const [subDistrictList, setSubDistrictList] = useState([]);
    const [district, setDistrict] = useState(null);
    const [subDistrict, setSubDistrict] = useState(null);


    useEffect(() => {
        if (props.jwtToken === null) {
            const jwt = JSON.parse(localStorage.getItem("/"));
            if (jwt === "" || jwt === null) navigate("/", { replace: true });
            else {
                props.setJwtToken(props.decryptData());
            }
        }
        else {
            // console.log(props.jwtToken)
        }
        setState(null);
    }, [props.jwtToken]);


    useEffect(() => {
        async function getDistrict() {
            if (state !== null && state !== 0) {
                try {
                    const url = new URL("http://localhost:8082");
                    url.pathname = '/supervisor/getSupDistrict';
                    // url.searchParams.set('state', state);
                    const dis = await fetch(url, {
                        method: "GET",
                        headers: {
                            "Content-Type": "application/json",
                            "Authorization": "Bearer " + props.jwtToken
                        }
                    }).then(res => res.json());
                    setDistrict(dis.district);
                }
                catch (error) {
                    props.handleAlert("danger", "Some Error Occurred!")
                }
            }
            else if((state === null && props.jwtToken !== null) || (state === 0 && props.jwtToken !== null)) {
                try {
                    // const url = new URL("http://localhost:8082");
                    const url = 'http://localhost:8082/supervisor/getSupState';
                    const key = "Bearer " + props.jwtToken;
                    console.log(key)
                    const dis = await fetch(url, {
                        method: "GET",
                        headers: {
                            "Content-Type": "application/json",
                            "Authorization": key
                        }
                    }).then((res) => res.json());
                    setState(dis.state);
                }
                catch (error) {
                    console.log(error);
                    props.handleAlert("danger", "Some Error Occurred!")
                }
            }
        }
        getDistrict();
    }, [state])

    useEffect(() => {
        async function getSubDistrict() {
            if (district !== null) {
                try {
                    const url = new URL("http://localhost:8082");
                    url.pathname = '/supervisor/getSubDistrict';
                    url.searchParams.set('state', state);
                    url.searchParams.set('district', district);
                    const dis = await fetch(url, {
                        method: "GET",
                        headers: {
                            "Content-Type": "application/json",
                            "Authorization": "Bearer " + props.jwtToken
                        }
                    }).then(res => res.json());
                    setSubDistrictList(dis);
                }
                catch (error) {
                    props.handleAlert("danger", "Some Error Occurred!")
                }
            }
        }
        getSubDistrict();
    }, [district])

    async function registerFW(e) {
        e.preventDefault();
        const email = document.getElementById("email").value;
        const url1 = "http://localhost:8082/supervisor/regFW";
        const sup = "FIELDWORKER"

        props.setBackground("brightness(0.01)");
        props.setLoad(true);

        try {
            const key = "Bearer " + props.jwtToken
            const result1 = await fetch(url1, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": key
                },
                body: JSON.stringify({
                    area: subDistrict,
                    district: district,
                    user: {
                        email: email,
                        role: {
                            name: sup
                        }
                    },
                    state: state
                }),

            }).then((res) => res.json());
            props.setBackground("");
            props.setLoad(false);
            if (result1 === null)
                props.handleAlert("danger", "Error Registering Field Worker");
            else
                props.handleAlert("success", "User Credentials have been sent to registered email");

        }
        catch {
            props.setBackground("");
            props.setLoad(false);
            props.handleAlert("danger", "Error Registering Field Worker");
        }
    }

    return (<div style={{ backgroundColor: "#f5f5f5", height: window.innerHeight }}>
        <NavbarSup checkToken={props.checkToken} setJwtToken={props.setJwtToken} jwtToken={props.jwtToken} decryptData={props.decryptData} handleAlert={props.handleAlert} setBackground={props.setBackground} setLoad={props.setLoad}/>
        {/* Register Page */}
        <div class="bg-gray-100 py-6 flex flex-col justify-center sm:py-12" style={{ height: window.innerHeight - 87 }}>
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
                                <form className="mt-0 pt-4 addSupClass" autoComplete="off" onSubmit={(e) => registerFW(e)}>
                                    <div className="mb-6">
                                        <Input id="email" color="blue" label="Email Address" required />
                                    </div>
                                    <div className="mb-6">
                                        <Input color="blue" label="State" value={state} required/>
                                    </div>
                                    <div className="mb-6">
                                    <Input color="blue" label="District" value={district} required/>
                                    </div>
                                    <div>
                                        <Select id="subDistrictId" color="blue" label="Sub Division" labelProps={{
                                            className: "text-blue-gray-600"
                                        }}
                                            onChange={(val) => setSubDistrict(val)}
                                            required>
                                            {subDistrictList.map((dist, index) => {
                                                return (
                                                    <Option key={dist} value={dist}>{dist}</Option>
                                                )
                                            })}
                                        </Select>
                                    </div>
                                    <div class="relative mt-6">
                                        <button class="bg-blue-500 text-white rounded-md px-2 py-1">Register</button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>


    </div>)
}

export default AddFieldWorker;
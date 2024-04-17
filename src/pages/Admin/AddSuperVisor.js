import React from "react";
import NavbarAd from "../../components/NavbarAd";
import SuperVisorCard from "../../components/SuperVisorCard";
import { useNavigate } from "react-router-dom";
import './AddSup.css'
import {
    Input, Select, Option
} from "@material-tailwind/react";
import { useState } from "react";
import { useEffect } from "react";
// import from "@mui/material/colors"

const AddSuperVisor = (props) => {
    const navigate = useNavigate();

    const [state, setState] = useState(null);
    const [districtList, setDistrictList] = useState([]);
    const [district, setDistrict] = useState(null);

    if (props.jwtToken === null) {
        const jwt = JSON.parse(localStorage.getItem("/"));
        if (jwt === "" || jwt === null) navigate("/", { replace: true });
        else {
          props.setJwtToken(props.decryptData());
        }
    }

    useEffect(() => {
        async function getDistrict() {
            if (state !== null) {
                try {
                    const url = new URL("http://localhost:8081");
                    url.pathname = '/admin/getDistrict';
                    url.searchParams.set('state', state);
                    const dis = await fetch(url, {
                        method: "GET",
                        headers: {
                            "Content-Type": "application/json",
                            "Authorization": "Bearer " + props.jwtToken
                        }
                    }).then(res => res.json());
                    setDistrictList(dis);
                }
                catch (error) {
                    props.handleAlert("danger", "Some Error Occurred!")
                }
            }
        }
        getDistrict();
    }, [state])

    useEffect(() => {
        getStateList();
    }, [props.stateList])

    useEffect(() => {
        if(props.jwtToken !== null)
            getStateList();
    }, [props.jwtToken])

    async function getStateList() {
        try {
        if (props.stateList.length === 0 && props.jwtToken !== null) {
            const state1 = await fetch("http://localhost:8081/admin/getState", {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": "Bearer " + props.jwtToken
                }
            }).then((res) => res.json());
            props.setStateList(state1)
        }
    }
    catch {
        ;
    }
    }

    async function registerSup(e) {
        e.preventDefault();
        const email = document.getElementById("email").value;
        const url = "http://localhost:8081/admin/regSup";
        const sup = "SUPERVISOR"

        props.setBackground("brightness(0.01)");
        props.setLoad(true);

        try {
            const key = "Bearer " + props.jwtToken
            // console.log("hello " + key)
            // console.log(state);
            const result1 = await fetch(url, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": key
                },
                body: JSON.stringify({
                    district: {
                        name: district
                    },
                    state: state,
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
                                <form className="mt-0 pt-4 addSupClass" autoComplete="off" onSubmit={(e) => registerSup(e)}>
                                    <div className="mb-6">
                                        <Input id="email" color="blue" label="Email Address" required />
                                    </div>
                                    <div className="mb-6">
                                        <Select id="stateId" color="blue" label="State" labelProps={{
                                            className: "text-blue-gray-600"
                                        }}
                                            onChange={(val) => setState(val)}
                                            required>
                                            {props.stateList.map((state1, index) => {
                                                return (
                                                    <Option key={state1} value={state1}>{state1}</Option>
                                                )
                                            })}
                                        </Select>
                                    </div>
                                    <div>
                                        <Select id="districtId" color="blue" label="District" labelProps={{
                                            className: "text-blue-gray-600"
                                        }}
                                            onChange={(val) => setDistrict(val)}
                                            required>
                                            {districtList.map((dist, index) => {
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

export default AddSuperVisor;
import NavbarAd from '../../components/NavbarAd'
import React, { useEffect, useState } from 'react'
import '../../styles/Questionnaire.css';
// import doctor from '../Images/doctor-removebg-preview.png'
import { Link, useNavigate } from 'react-router-dom';
import TextField from '@mui/material/TextField';
import { Box } from '@mui/material';
import { Input } from "@material-tailwind/react";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
// import SupervisorSignUp from './SupervisorSignUp';
// import OtpPage from './OtpPage';

export default function Questionnaire(props) {
    const navigate = useNavigate();
    const [supervisorActive, setSupervisorActive] = useState(false)
    const [otpActive, setOtpActive] = useState(false)
    const [OTP, setOTP] = useState(null);
    const [categoryNo, setCategory] = useState(1);
    const [type, setType] = useState("mcq");
    const [preview, setPreview] = useState("Show");
    const [options_list, setOptionsList] = useState(['', '', '', '']);
    const [object, setObject] = useState(null);
    const loginActiveUser = JSON.parse(localStorage.getItem("loginActiveUser"))

    props.checkToken();

    useEffect(() => {
        for (let i = 1; i <= 3; i++) {
            let ele = document.getElementById(`${i}`);
            if (i == categoryNo) {
                ele.className =
                    "w-full relative inline-flex items-center justify-center p-4 overflow-hidden text-lg font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-green-400 to-blue-600 group-hover:from-green-400 group-hover:to-blue-600 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-green-200 dark:focus:ring-green-800 buttonClass";
                ele.style.fontWeight = "700";
            }
            else {
                ele.className = "inline-block text-lg w-full p-4 bg-gray-150 hover:bg-gray-100 focus:outline-none dark:bg-gray-700 dark:hover:bg-gray-600 buttonClass"
                ele.style.fontWeight = "500";
            }
        }
        if (categoryNo === 1)
            setType("mcq");
        else if (categoryNo === 2)
            setType("descriptive");
        else
            setType("range")
    }, [categoryNo]);

    useEffect(() => {
        const fetchData = async () => {
            if (object !== null) {
                if (object.question !== "") {
                    // console.log(object)
                    const key = "Bearer " + props.jwtToken;
                    const url3 = 'http://localhost:8081/admin/setQ';
                    // console.log("object: ", object);

                    try {
                        const result3 = await fetch(url3, {
                            method: "POST",
                            headers: {
                                "Content-Type": "application/json",
                                "Authorization": key
                            },
                            body: object
                        }).then((res) => res.json());

                        if (result3 === true) {
                            props.handleAlert("success", "Question Added!");
                            document.getElementById("message").value = "";
                            setOptionsList(['', '', '', ''])
                            const elements = document.getElementsByClassName("inputClass")
                            for (let i = 0; i < elements.length; i++) {
                                elements[i].value = "";
                                elements[i].style.borderTopColor = "gray"
                            }
                            setObject(null);
                        } else {
                            props.handleAlert("danger", "Unable to add Question!");
                        }
                    } catch {
                        props.handleAlert("danger", "Error adding question");
                    } finally {
                        props.setBackground("");
                        props.setLoad(false);
                    }
                }
            }
        };

        fetchData();
    }, [object])

    async function addQuestion2(ques, key, id) {
        if (type === 'mcq') {
            const elements = document.getElementsByClassName("inputClass")
            let list = [];
            for (let i = 0; i < elements.length; i++) {
                // console.log(elements[i].value)
                list.push(elements[i].value);
            }
            if (list.length !== 0) {
                setObject(JSON.stringify({
                    type: type,
                    question: ques,
                    optA: list[0],
                    optB: list[1],
                    optC: list[2],
                    optD: list[3],
                    qnId: id
                }))
            }
            else {
                setObject(JSON.stringify({
                    type: type,
                    question: ques,
                    optA: options_list[0],
                    optB: options_list[1],
                    optC: options_list[2],
                    optD: options_list[3],
                    qnId: id
                }))
            }
        }
        else {
            setObject(JSON.stringify({
                type: type,
                question: ques,
                qnId: id
            }))
        }
    }


    async function addQuestion() {
        const key = "Bearer " + props.jwtToken

        // console.log(key);
        const ques = document.getElementById("message").value;
        if (ques !== "") {
            const adminPara = "adminQuestionnaire"
            const url1 = new URL('http://localhost:8081');

            if (loginActiveUser === "admin") {
                url1.pathname = '/admin/getQn';
                url1.searchParams.set('name', adminPara);
            }

            props.setBackground("brightness(0.01)");
            props.setLoad(true);

            try {
                const result = await fetch(url1, {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": key
                    },
                }).then((res) => res.json());
                // props.handleAlert("success", "Login Successful!!!");

                if (loginActiveUser === 'admin') {
                    if (result == -1) {
                        const url2 = 'http://localhost:8081/admin/setQn';
                        const result1 = await fetch(url2, {
                            method: "POST",
                            headers: {
                                "Content-Type": "application/json",
                                "Authorization": key
                            },
                            body: adminPara,
                        }).then((res) => res.json());

                        if (result1 === false) {
                            props.handleAlert("danger", "Unable to Add Question")
                        }
                        else {
                            const result2 = await fetch(url1, {
                                method: "GET",
                                headers: {
                                    "Content-Type": "application/json",
                                    "Authorization": key
                                },
                            }).then((res) => res.json());
                            addQuestion2(ques, key, result2);
                        }
                    }
                    else {
                        addQuestion2(ques, key, result);
                    }
                }
                else if (loginActiveUser === 'doctor') {
                    const url2 = 'http://localhost:8081/doctor/setQn';
                }
            }
            catch {
                props.handleAlert("danger", "Some Error Occurred!");
                props.setBackground("");
                props.setLoad(false);
            }
        }
    }

    useEffect(() => {
        let ques = document.getElementById("message")
        if (preview === "Show") {
            ques.disabled = false;
            if (categoryNo === 1) {
                const elements = document.getElementsByClassName("inputClass")
                for (let i = 0; i < options_list.length; i++) {
                    elements[i].value = options_list[i];
                    if (elements[i].value !== "") {
                        elements[i].style.borderTopColor = "";
                        const labelElements = document.getElementsByClassName("labelClass")
                        labelElements[i].style.borderTopColor = "gray"
                    }
                }
            }
        }
        else {
            ques.disabled = true;
        }
    }, [preview])

    function changePreview() {
        if (preview === "Show") {
            if (categoryNo === 1) {
                const elements = document.getElementsByClassName("inputClass")
                let list = [];
                for (let i = 0; i < elements.length; i++) {
                    list.push(elements[i].value);
                }
                setOptionsList(list);
            }
            setPreview("Hide")
        }
        else {
            setPreview("Show")
        }
    }

    function inputClass(isFocus, id) {
        const elements = document.getElementsByClassName("inputClass")
        if (isFocus)
            elements[id - 1].style.borderColor = "";
        else {
            elements[id - 1].style.borderColor = "gray";
            if (elements[id - 1].value !== "") {
                elements[id - 1].style.borderTopColor = "";
                const labelElements = document.getElementsByClassName("labelClass")
                labelElements[id - 1].style.borderTopColor = "gray"
            }
        }
    }

    return (
        <>
            <div className='w-full h-full absolute' style={{ overflow: "hidden" }}>
                <NavbarAd checkToken={props.checkToken} page={""} setJwtToken={props.setJwtToken} jwtToken={props.jwtToken} decryptData={props.decryptData} handleAlert={props.handleAlert} setBackground={props.setBackground} setLoad={props.setLoad}/>
                <div className="flex absolute z-1 h-max top-0 bottom-0 right-0 left-0 m-auto bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700" style={{ width: "58rem", height: "32rem", top: "68.8333px", backgroundColor: "#ffffff", borderColor: "#ffffff", borderWidth: "0.2rem", flexDirection: "column" }}>
                    <div style={{ width: "-webkit-fill-available" }}>
                        <ul
                            class="hidden text-sm font-medium text-center text-gray-500 divide-x divide-gray-200 rounded-lg sm:flex dark:divide-gray-600 dark:text-gray-400 rtl:divide-x-reverse"
                            id="fullWidthTab"
                            data-tabs-toggle="#fullWidthTabContent"
                            role="tablist"
                        >
                            <li class="w-full">
                                <button
                                    id="1"
                                    data-tabs-target="#cat1"
                                    type="button"
                                    role="tab"
                                    aria-controls="cat1"
                                    aria-selected="true"
                                    class="w-full relative inline-flex items-center justify-center p-4 overflow-hidden text-lg font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-green-400 to-blue-600 group-hover:from-green-400 group-hover:to-blue-600 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-green-200 dark:focus:ring-green-800 buttonClass"
                                    onClick={() => setCategory(1)}
                                >
                                    Objective
                                </button>
                            </li>
                            <li class="w-full">
                                <button
                                    id="2"
                                    data-tabs-target="#cat2"
                                    type="button"
                                    role="tab"
                                    aria-controls="cat2"
                                    aria-selected="false"
                                    class="inline-block text-lg w-full p-4 bg-gray-150 hover:bg-gray-100 focus:outline-none dark:bg-gray-700 dark:hover:bg-gray-600 buttonClass"
                                    onClick={() => setCategory(2)}
                                >
                                    Descriptive
                                </button>
                            </li>
                            <li class="w-full">
                                <button
                                    id="3"
                                    data-tabs-target="#cat3"
                                    type="button"
                                    role="tab"
                                    aria-controls="cat3"
                                    aria-selected="false"
                                    class="inline-block text-lg w-full p-4 rounded-se-lg bg-gray-150 hover:bg-gray-100 focus:outline-none dark:bg-gray-700 dark:hover:bg-gray-600 buttonClass"
                                    onClick={() => setCategory(3)}
                                >
                                    Scale (1 - 10)
                                </button>
                            </li>
                        </ul>
                    </div>

                    <Box
                        component="form"
                        sx={{
                            m: 1, width: "52rem",
                            marginLeft: "auto",
                            marginRight: "auto",
                            marginTop: "2rem"
                        }}
                        noValidate
                        autoComplete="off"
                    >
                        <div className='flex' style={{ flexDirection: "column" }}>
                            <div>
                                <label for="message" class="flex block mb-2 text-sm font-medium text-gray-900 dark:text-white" style={{ fontWeight: "550" }}>Question</label>
                                <textarea id="message" rows="3" class="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Enter your question here..."></textarea>

                                {preview === "Show" && categoryNo === 1 ? <div className='flex flex-column mt-5'>
                                    <div className="w-72 mr-2">
                                        <div class="relative w-full min-w-[200px] h-10">
                                            <input
                                                style={{ borderColor: "gray" }}
                                                class="inputClass peer w-full h-full border-1 bg-transparent text-blue-gray-700 font-sans font-normal outline outline-0 focus:outline-0 transition-all border focus:border-2 border-t-transparent focus:border-t-transparent text-sm px-3 py-2.5 rounded-[7px] border-blue-gray-200 focus:border-blue-600"
                                                placeholder=" " onFocus={() => inputClass(true, 1)} onBlur={() => inputClass(false, 1)} /><label
                                                    class="labelClass flex w-full h-full select-none pointer-events-none absolute left-0 font-normal !overflow-visible truncate peer-placeholder-shown:text-blue-gray-500 leading-tight peer-focus:leading-tight peer-disabled:text-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500 transition-all -top-1.5 peer-placeholder-shown:text-sm text-[11px] peer-focus:text-[11px] before:content[' '] before:block before:box-border before:w-2.5 before:h-1.5 before:mt-[6.5px] before:mr-1 peer-placeholder-shown:before:border-transparent before:rounded-tl-md before:border-t peer-focus:before:border-t-2 before:border-l peer-focus:before:border-l-2 before:pointer-events-none before:transition-all peer-disabled:before:border-transparent before:border-t-1  after:content[' '] after:block after:flex-grow after:box-border after:w-2.5 after:h-1.5 after:mt-[6.5px] after:ml-1 peer-placeholder-shown:after:border-transparent after:rounded-tr-md after:border-t peer-focus:after:border-t-2 after:border-r peer-focus:after:border-r-2 after:pointer-events-none after:transition-all peer-disabled:after:border-transparent peer-placeholder-shown:leading-[3.75] text-gray-500 peer-focus:text-gray-900 before:border-gray-500 peer-focus:before:!border-blue-600 after:border-gray-500 peer-focus:after:!border-blue-600">Option A
                                            </label>
                                        </div>
                                    </div>
                                    <div className="w-72 mr-2">
                                        <div class="relative w-full min-w-[200px] h-10">
                                            <input
                                                style={{ borderColor: "gray" }}
                                                class="inputClass peer w-full h-full border-1 bg-transparent text-blue-gray-700 font-sans font-normal outline outline-0 focus:outline-0 transition-all border focus:border-2 border-t-transparent focus:border-t-transparent text-sm px-3 py-2.5 rounded-[7px] border-blue-gray-200 focus:border-blue-600"
                                                placeholder=" " onFocus={() => inputClass(true, 2)} onBlur={() => inputClass(false, 2)} /><label
                                                    class="labelClass flex w-full h-full select-none pointer-events-none absolute left-0 font-normal !overflow-visible truncate peer-placeholder-shown:text-blue-gray-500 leading-tight peer-focus:leading-tight peer-disabled:text-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500 transition-all -top-1.5 peer-placeholder-shown:text-sm text-[11px] peer-focus:text-[11px] before:content[' '] before:block before:box-border before:w-2.5 before:h-1.5 before:mt-[6.5px] before:mr-1 peer-placeholder-shown:before:border-transparent before:rounded-tl-md before:border-t peer-focus:before:border-t-2 before:border-l peer-focus:before:border-l-2 before:pointer-events-none before:transition-all peer-disabled:before:border-transparent before:border-t-1  after:content[' '] after:block after:flex-grow after:box-border after:w-2.5 after:h-1.5 after:mt-[6.5px] after:ml-1 peer-placeholder-shown:after:border-transparent after:rounded-tr-md after:border-t peer-focus:after:border-t-2 after:border-r peer-focus:after:border-r-2 after:pointer-events-none after:transition-all peer-disabled:after:border-transparent peer-placeholder-shown:leading-[3.75] text-gray-500 peer-focus:text-gray-900 before:border-gray-500 peer-focus:before:!border-blue-600 after:border-gray-500 peer-focus:after:!border-blue-600">Option B
                                            </label>
                                        </div>
                                    </div>
                                    <div className="w-72 mr-2">
                                        <div class="relative w-full min-w-[200px] h-10">
                                            <input
                                                style={{ borderColor: "gray" }}
                                                class="inputClass peer w-full h-full border-1 bg-transparent text-blue-gray-700 font-sans font-normal outline outline-0 focus:outline-0 transition-all border focus:border-2 border-t-transparent focus:border-t-transparent text-sm px-3 py-2.5 rounded-[7px] border-blue-gray-200 focus:border-blue-600"
                                                placeholder=" " onFocus={() => inputClass(true, 3)} onBlur={() => inputClass(false, 3)} /><label
                                                    class="labelClass flex w-full h-full select-none pointer-events-none absolute left-0 font-normal !overflow-visible truncate peer-placeholder-shown:text-blue-gray-500 leading-tight peer-focus:leading-tight peer-disabled:text-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500 transition-all -top-1.5 peer-placeholder-shown:text-sm text-[11px] peer-focus:text-[11px] before:content[' '] before:block before:box-border before:w-2.5 before:h-1.5 before:mt-[6.5px] before:mr-1 peer-placeholder-shown:before:border-transparent before:rounded-tl-md before:border-t peer-focus:before:border-t-2 before:border-l peer-focus:before:border-l-2 before:pointer-events-none before:transition-all peer-disabled:before:border-transparent before:border-t-1  after:content[' '] after:block after:flex-grow after:box-border after:w-2.5 after:h-1.5 after:mt-[6.5px] after:ml-1 peer-placeholder-shown:after:border-transparent after:rounded-tr-md after:border-t peer-focus:after:border-t-2 after:border-r peer-focus:after:border-r-2 after:pointer-events-none after:transition-all peer-disabled:after:border-transparent peer-placeholder-shown:leading-[3.75] text-gray-500 peer-focus:text-gray-900 before:border-gray-500 peer-focus:before:!border-blue-600 after:border-gray-500 peer-focus:after:!border-blue-600">Option C
                                            </label>
                                        </div>
                                    </div>
                                    <div className="w-72">
                                        <div class="relative w-full min-w-[200px] h-10">
                                            <input
                                                style={{ borderColor: "gray" }}
                                                class="inputClass peer w-full h-full border-1 bg-transparent text-blue-gray-700 font-sans font-normal outline outline-0 focus:outline-0 transition-all border focus:border-2 border-t-transparent focus:border-t-transparent text-sm px-3 py-2.5 rounded-[7px] border-blue-gray-200 focus:border-blue-600"
                                                placeholder=" " onFocus={() => inputClass(true, 4)} onBlur={() => inputClass(false, 4)} /><label
                                                    class="labelClass flex w-full h-full select-none pointer-events-none absolute left-0 font-normal !overflow-visible truncate peer-placeholder-shown:text-blue-gray-500 leading-tight peer-focus:leading-tight peer-disabled:text-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500 transition-all -top-1.5 peer-placeholder-shown:text-sm text-[11px] peer-focus:text-[11px] before:content[' '] before:block before:box-border before:w-2.5 before:h-1.5 before:mt-[6.5px] before:mr-1 peer-placeholder-shown:before:border-transparent before:rounded-tl-md before:border-t peer-focus:before:border-t-2 before:border-l peer-focus:before:border-l-2 before:pointer-events-none before:transition-all peer-disabled:before:border-transparent before:border-t-1  after:content[' '] after:block after:flex-grow after:box-border after:w-2.5 after:h-1.5 after:mt-[6.5px] after:ml-1 peer-placeholder-shown:after:border-transparent after:rounded-tr-md after:border-t peer-focus:after:border-t-2 after:border-r peer-focus:after:border-r-2 after:pointer-events-none after:transition-all peer-disabled:after:border-transparent peer-placeholder-shown:leading-[3.75] text-gray-500 peer-focus:text-gray-900 before:border-gray-500 peer-focus:before:!border-blue-600 after:border-gray-500 peer-focus:after:!border-blue-600">Option D
                                            </label>
                                        </div>
                                    </div>
                                </div> : undefined}

                                <div className='flex text-blue-700'>
                                    <button type="button" class="items-center text-blue-700 block ml-auto" style={{ fontWeight: "550" }} onClick={changePreview}>{preview} Preview{preview === "Show" ? <ExpandMoreIcon sx={{ position: "relative", bottom: "0.1rem" }} /> : <ExpandLessIcon sx={{ position: "relative", bottom: "0.1rem" }} />}</button>
                                </div>
                            </div>

                            {preview === "Hide" ? categoryNo === 1 ? <>
                                <ul class="w-48 text-sm font-medium text-gray-900 bg-white dark:bg-gray-700 dark:border-gray-600 dark:text-white">
                                    {options_list[0] !== "" ? <li class="w-full dark:border-gray-600">
                                        <div class="flex items-center ps-3">
                                            <input id="list-radio-a" type="radio" value="" name="list-radio" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500" />
                                            <label for="list-radio-a" class="flex w-full py-3 ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">{options_list[0]}</label>
                                        </div>
                                    </li> : undefined}
                                    {options_list[1] !== "" ? <li class="w-full dark:border-gray-600">
                                        <div class="flex items-center ps-3">
                                            <input id="list-radio-b" type="radio" value="" name="list-radio" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500" />
                                            <label for="list-radio-b" class="flex w-full py-3 ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">{options_list[1]}</label>
                                        </div>
                                    </li> : undefined}
                                    {options_list[2] !== "" ? <li class="w-full dark:border-gray-600">
                                        <div class="flex items-center ps-3">
                                            <input id="list-radio-c" type="radio" value="" name="list-radio" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500" />
                                            <label for="list-radio-c" class="flex w-full py-3 ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">{options_list[2]}</label>
                                        </div>
                                    </li> : undefined}
                                    {options_list[3] !== "" ? <li class="w-full dark:border-gray-600">
                                        <div class="flex items-center ps-3">
                                            <input id="list-radio-d" type="radio" value="" name="list-radio" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500" />
                                            <label for="list-radio-d" class="flex w-full py-3 ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">{options_list[3]}</label>
                                        </div>
                                    </li> : undefined}
                                </ul></> : categoryNo === 2 ? <div className='mt-5'>
                                    <label for="message1" class="flex block mb-2 text-sm font-medium text-gray-900 dark:text-white" style={{ fontWeight: "550" }}>Answer</label>
                                    <textarea id="message1" rows="4" disabled class="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Enter your Answer here..."></textarea>
                                </div> : categoryNo === 3 ? <div className='w-full mt-5'>
                                    <ul
                                        class="hidden text-sm font-medium text-center text-gray-500 divide-x divide-gray-200 rounded-lg sm:flex dark:divide-gray-600 dark:text-gray-400 rtl:divide-x-reverse"
                                        id="fullWidthTab"
                                        data-tabs-toggle="#fullWidthTabContent"
                                        role="tablist"
                                        style={{ borderWidth: "1.5px", borderColor: "gray" }}
                                    >
                                        <li class="w-full">
                                            <button
                                                id="score_1"
                                                data-tabs-target="#cat1"
                                                type="button"
                                                role="tab"
                                                aria-controls="cat1"
                                                aria-selected="true"
                                                style={{ borderTopRightRadius: "0", borderBottomRightRadius: "0" }}
                                                class="inline-block rounded-lg text-lg w-full p-4 bg-gray-150 hover:bg-gray-200 focus:outline-none dark:bg-gray-700 dark:hover:bg-gray-600 buttonClass"
                                            >
                                                1
                                            </button>
                                        </li>
                                        <li class="w-full">
                                            <button
                                                id="score_2"
                                                data-tabs-target="#cat2"
                                                type="button"
                                                role="tab"
                                                aria-controls="cat2"
                                                aria-selected="false"
                                                class="inline-block text-lg w-full p-4 bg-gray-150 hover:bg-gray-200 focus:outline-none dark:bg-gray-700 dark:hover:bg-gray-600 buttonClass"
                                            >
                                                2
                                            </button>
                                        </li>
                                        <li class="w-full">
                                            <button
                                                id="score_3"
                                                data-tabs-target="#cat3"
                                                type="button"
                                                role="tab"
                                                aria-controls="cat3"
                                                aria-selected="false"
                                                class="inline-block text-lg w-full p-4 bg-gray-150 hover:bg-gray-200 focus:outline-none dark:bg-gray-700 dark:hover:bg-gray-600 buttonClass"
                                            >
                                                3
                                            </button>
                                        </li>
                                        <li class="w-full">
                                            <button
                                                id="score_4"
                                                data-tabs-target="#cat3"
                                                type="button"
                                                role="tab"
                                                aria-controls="cat3"
                                                aria-selected="false"
                                                class="inline-block text-lg w-full p-4 bg-gray-150 hover:bg-gray-200 focus:outline-none dark:bg-gray-700 dark:hover:bg-gray-600 buttonClass"
                                            >
                                                4
                                            </button>
                                        </li>
                                        <li class="w-full">
                                            <button
                                                id="score_5"
                                                data-tabs-target="#cat3"
                                                type="button"
                                                role="tab"
                                                aria-controls="cat3"
                                                aria-selected="false"
                                                class="inline-block text-lg w-full p-4 bg-gray-150 hover:bg-gray-200 focus:outline-none dark:bg-gray-700 dark:hover:bg-gray-600 buttonClass"
                                            >
                                                5
                                            </button>
                                        </li>
                                        <li class="w-full">
                                            <button
                                                id="score_6"
                                                data-tabs-target="#cat3"
                                                type="button"
                                                role="tab"
                                                aria-controls="cat3"
                                                aria-selected="false"
                                                class="inline-block text-lg w-full p-4 bg-gray-150 hover:bg-gray-200 focus:outline-none dark:bg-gray-700 dark:hover:bg-gray-600 buttonClass"
                                            >
                                                6
                                            </button>
                                        </li>
                                        <li class="w-full">
                                            <button
                                                id="score_7"
                                                data-tabs-target="#cat3"
                                                type="button"
                                                role="tab"
                                                aria-controls="cat3"
                                                aria-selected="false"
                                                class="inline-block text-lg w-full p-4 bg-gray-150 hover:bg-gray-200 focus:outline-none dark:bg-gray-700 dark:hover:bg-gray-600 buttonClass"
                                            >
                                                7
                                            </button>
                                        </li>
                                        <li class="w-full">
                                            <button
                                                id="score_8"
                                                data-tabs-target="#cat3"
                                                type="button"
                                                role="tab"
                                                aria-controls="cat3"
                                                aria-selected="false"
                                                class="inline-block text-lg w-full p-4 bg-gray-150 hover:bg-gray-200 focus:outline-none dark:bg-gray-700 dark:hover:bg-gray-600 buttonClass"
                                            >
                                                8
                                            </button>
                                        </li>
                                        <li class="w-full">
                                            <button
                                                id="score_9"
                                                data-tabs-target="#cat3"
                                                type="button"
                                                role="tab"
                                                aria-controls="cat3"
                                                aria-selected="false"
                                                class="inline-block text-lg w-full p-4 bg-gray-150 hover:bg-gray-200 focus:outline-none dark:bg-gray-700 dark:hover:bg-gray-600 buttonClass"
                                            >
                                                9
                                            </button>
                                        </li>
                                        <li class="w-full">
                                            <button
                                                id="score_10"
                                                data-tabs-target="#cat3"
                                                type="button"
                                                role="tab"
                                                aria-controls="cat3"
                                                aria-selected="false"
                                                style={{ borderTopLeftRadius: "0", borderBottomLeftRadius: "0" }}
                                                class="inline-block text-lg w-full p-4 rounded-lg bg-gray-150 hover:bg-gray-200 focus:outline-none dark:bg-gray-700 dark:hover:bg-gray-600 buttonClass"
                                            >
                                                10
                                            </button>
                                        </li>
                                    </ul>
                                </div> : undefined : undefined}
                        </div>
                        <button type="button" class="mt-5 text-white bg-gradient-to-r from-cyan-500 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2" onClick={addQuestion}>Add Question</button>
                    </Box>
                </div>
            </div>
        </>
    )
}

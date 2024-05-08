import { Box } from '@mui/material';
import React, { useEffect, useState } from 'react'

export default function Questionnaire(props) {
    const [currQInd, setCurrentQInd] = useState(0);
    const [active, setActive] = useState(true);
    const [questionList, setQuestionList] = useState(props.data);
    const [currCategory, setCurrentCategory] = useState("mcq");

    const nextQuestion = () => {
        if (currQInd < questionList.length - 1) {
            setCurrentQInd(currQInd + 1);
        } else {
            alert("No more questions!");
        }
    };

    const prevQuestion = () => {
        if (currQInd >= 0) {
            setCurrentQInd(currQInd - 1);
        } else {
            alert("No more questions!");
        }
    };

    useEffect(() => {
        if (currQInd !== null) {
            setCurrentCategory(questionList[currQInd].type);
        }
    }, [currQInd]);
    return (
        // <div className="w-full h-full absolute" style={{ overflow: "hidden" }}>
            <div
                className="flex absolute z-1 h-max top-0 bottom-0 right-0 left-0 w-fit bg-white border border-gray-200 rounded-lg shadow-2xl dark:bg-gray-800 dark:border-gray-700 pb-10"
                style={{
                    width: "54rem",
                    backgroundColor: "#ffffff",
                    borderColor: "#ffffff",
                    borderWidth: "0.2rem",
                    flexDirection: "column",
                    margin: "auto",
                    marginTop: "auto",
                    boxShadow: "0 0 30px rgba(0, 0, 0, 0.5)",
                }}
            >
                <div className='absolute right-0 top-0' style={{ color: "red" }}><button onClick={() => {
                    props.setRecordSelect(null)
                }}><span class="material-symbols-outlined" style={{ fontSize: "1.8rem", fontWeight: "600" }}>
                        close
                    </span></button>
                </div>

                <div>
                    <ul
                        class="hidden text-sm font-medium text-center text-gray-500 divide-x divide-gray-200 rounded-lg sm:flex dark:divide-gray-600 dark:text-gray-400 rtl:divide-x-reverse"
                        id="fullWidthTab"
                        data-tabs-toggle="#fullWidthTabContent"
                        role="tablist"
                    >
                        <li class="w-full">
                            <div
                                id="1"
                                data-tabs-target="#cat1"
                                type="button"
                                role="tab"
                                aria-controls="cat1"
                                aria-selected="true"
                                class={
                                    currCategory === "mcq"
                                        ? "w-full relative inline-flex items-center justify-center p-4 overflow-hidden text-lg font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-green-400 to-blue-600 group-hover:from-green-400 group-hover:to-blue-600 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-green-200 dark:focus:ring-green-800 buttonClass"
                                        : "inline-block text-lg w-full p-4 bg-gray-150 hover:bg-gray-100 focus:outline-none dark:bg-gray-700 dark:hover:bg-gray-600 buttonClass"
                                }
                            >
                                Objective
                            </div>
                        </li>

                        <li class="w-full">
                            <div
                                id="2"
                                data-tabs-target="#cat3"
                                type="button"
                                role="tab"
                                aria-controls="cat3"
                                aria-selected="false"
                                class={
                                    currCategory === "range"
                                        ? "w-full relative inline-flex items-center justify-center p-4 overflow-hidden text-lg font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-green-400 to-blue-600 group-hover:from-green-400 group-hover:to-blue-600 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-green-200 dark:focus:ring-green-800 buttonClass"
                                        : "inline-block text-lg w-full p-4 bg-gray-150 hover:bg-gray-100 focus:outline-none dark:bg-gray-700 dark:hover:bg-gray-600 buttonClass"
                                }
                            >
                                Scale (1 - 10)
                            </div>
                        </li>
                        <li class="w-full">
                            <div
                                id="3"
                                data-tabs-target="#cat2"
                                type="button"
                                role="tab"
                                aria-controls="cat2"
                                aria-selected="false"
                                class={
                                    currCategory === "descriptive"
                                        ? "w-full relative inline-flex items-center justify-center p-4 overflow-hidden text-lg font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-green-400 to-blue-600 group-hover:from-green-400 group-hover:to-blue-600 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-green-200 dark:focus:ring-green-800 buttonClass"
                                        : "inline-block text-lg w-full p-4 bg-gray-150 hover:bg-gray-100 focus:outline-none dark:bg-gray-700 dark:hover:bg-gray-600 buttonClass"
                                }
                            >
                                Descriptive
                            </div>
                        </li>
                    </ul>
                </div>

                <Box
                    component="form"
                    sx={{
                        m: 1,
                        width: "52rem",
                        marginLeft: "auto",
                        marginRight: "auto",
                        marginTop: "2rem",
                    }}
                    noValidate
                    autoComplete="off"
                >

                    {/* MAIN QUESTION */}
                    <div className="flex" style={{ flexDirection: "column" }}>
                        <label
                            for="message"
                            class="flex block mb-2 mx-4 text-xl font-medium text-gray-900 dark:text-white"
                            style={{ fontWeight: "550" }}
                        >
                            {" "}
                            {currQInd + 1 + ") "}
                            {questionList[currQInd].question}
                        </label>


                        {currCategory === "mcq" ? (
                            <>
                                <ul class="w-48 text-sm font-medium text-gray-900 bg-white dark:bg-gray-700 dark:border-gray-600 dark:text-white mt-5">
                                    <li class="w-full dark:border-gray-600">
                                        <div class="flex items-center ps-3">
                                            <input
                                                id="list-radio-a"
                                                type="radio"
                                                value=""
                                                name="list-radio"
                                                checked={questionList[currQInd].answer === "A" ? true : false}
                                                class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-50"
                                            />
                                            <label
                                                for="list-radio-a"
                                                class=" flex px-2 w-full py-3 text-lg font-medium text-gray-900 dark:text-gray-300"
                                            >
                                                {questionList[currQInd].A}
                                            </label>
                                        </div>
                                    </li>
                                    <li class="w-full dark:border-gray-600">
                                        <div class="flex items-center ps-3">
                                            <input
                                                id="list-radio-b"
                                                type="radio"
                                                value=""
                                                name="list-radio"
                                                checked={questionList[currQInd].answer === "B" ? true : false}
                                                class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
                                            />
                                            <label
                                                for="list-radio-b"
                                                class=" flex px-2 w-full py-3 text-lg font-medium text-gray-900 dark:text-gray-300"
                                            >
                                                {questionList[currQInd].B}
                                            </label>
                                        </div>
                                    </li>
                                    <li class="w-full dark:border-gray-600">
                                        <div class="flex items-center ps-3">
                                            <input
                                                id="list-radio-c"
                                                type="radio"
                                                value=""
                                                name="list-radio"
                                                checked={questionList[currQInd].answer === "C" ? true : false}
                                                class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
                                            />
                                            <label
                                                for="list-radio-c"
                                                class="flex px-2 w-full py-3 text-lg font-medium text-gray-900 dark:text-gray-300"
                                            >
                                                {questionList[currQInd].C}
                                            </label>
                                        </div>
                                    </li>
                                    <li class="w-full dark:border-gray-600">
                                        <div class="flex items-center ps-3">
                                            <input
                                                id="list-radio-d"
                                                type="radio"
                                                value=""
                                                name="list-radio"
                                                checked={questionList[currQInd].answer === "D" ? true : false}
                                                class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
                                            />
                                            <label
                                                for="list-radio-d"
                                                class="flex px-2 w-full py-3 text-lg font-medium text-gray-900 dark:text-gray-300"
                                            >
                                                {questionList[currQInd].D}
                                            </label>
                                        </div>
                                    </li>
                                </ul>
                            </>
                        ) : currCategory === "descriptive" ? (
                            <div className="mt-5">
                                <audio controls>
                                    <source src={`data:audio/wav;base64,${questionList[currQInd].answer}`} type="audio/wav" />
                                </audio>
                            </div>
                        ) : currCategory === "range" ? (
                            <div className="w-full mt-5">
                                <ul
                                    class="hidden text-sm font-medium text-center text-gray-500 divide-x divide-gray-200 rounded-lg sm:flex dark:divide-gray-600 dark:text-gray-400 rtl:divide-x-reverse"
                                    id="fullWidthTab"
                                    data-tabs-toggle="#fullWidthTabContent"
                                    role="tablist"
                                    style={{ borderWidth: "1.5px", borderColor: "gray" }}
                                >
                                    {Array.from({ length: 10 }, (_, index) => index + 1).map((ele, index) => (
                                        <li class="w-full" key={index}>
                                        <button
                                            type="button"
                                            style={{
                                                borderTopRightRadius: "0",
                                                borderBottomRightRadius: "0",
                                            }}
                                            class={questionList[currQInd].answer.toString() === ele.toString() ? "inline-block text-lg w-full p-4 bg-gray-400 focus:outline-none buttonClass" : "inline-block rounded-lg text-lg w-full p-4 bg-gray-150 focus:outline-none buttonClass"}
                                        >
                                            {ele}
                                        </button>
                                    </li>
                                    ))}
                                </ul>
                            </div>
                        ) : undefined}
                    </div>
                </Box>

                {currQInd === questionList.length - 1 ? (
                    <div className="ml-auto flex flex-col justify-center items-end">
                        <button
                            className="px-5 py-2.5 font-semibold bg-blue-50 hover:bg-blue-100 hover:text-blue-600 text-blue-500 rounded-lg text-sm mr-10"
                            onClick={prevQuestion}
                        >
                            Prev Question
                        </button>{" "}
                        <p className='' style={{color: "red", fontSize: "10"}}>This is the end of Questionnaire</p>
                    </div>
                ) : (
                    <div className="flex inline-flex items-center justify-center mt-7">
                        {currQInd > 0 ? (
                            <button
                                className="px-5 py-2.5 font-semibold bg-blue-50 hover:bg-blue-100 hover:text-blue-600 text-blue-500 rounded-lg text-sm mr-10"
                                onClick={prevQuestion}
                            >
                                Prev Question
                            </button>
                        ) : undefined}

                        <button
                            className="inline-flex items-center justify-center px-4 py-2 text-base font-semibold leading-6 text-white whitespace-no-wrap bg-blue-600 border border-blue-700 rounded-md shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 "
                            data-rounded="rounded-md"
                            data-primary="blue-600"
                            data-primary-reset="{}"
                            onClick={nextQuestion}
                        >
                            Next Question
                        </button>
                    </div>
                )}
            </div>
        // </div>
    )
}

import { Box } from '@mui/material';
import React, { useState } from 'react'

export default function DoctorQuestionnaire(props) {
    const [currCategory, setCurrentCategory] = useState("descriptive");
    const [questionList, setQuestionList] = useState(props.data);
    return (
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
            <div className='absolute right-0 top-0' style={{ color: "red", zIndex: 1 }}><button onClick={() => {
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
                            data-tabs-target="#cat2"
                            type="button"
                            role="tab"
                            aria-controls="cat2"
                            aria-selected="false"
                            class="w-full relative inline-flex items-center justify-center p-4 overflow-hidden text-lg font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-green-400 to-blue-600 group-hover:from-green-400 group-hover:to-blue-600 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-green-200 dark:focus:ring-green-800 buttonClass"
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
                        {1 + ") "}
                        {questionList.question}
                    </label>


                    <div className="mt-5">
                        <audio controls>
                            <source src={`data:audio/wav;base64,${questionList.answer}`} type="audio/wav" />
                        </audio>
                    </div>
                </div>
            </Box>
        </div>
    )
}

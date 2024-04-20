import React from "react";
// import Navbar from '../../components/Navbar'
import NavbarFW2 from "../../components/NavbarFW2";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useEffect } from "react";
import { Box } from "@mui/material";
const QuestionnairePatient = (props) => {
  const loginActiveUser = JSON.parse(localStorage.getItem("loginActiveUser"))
  const [active, setActive] = useState(false);
  
  props.checkToken();
  
  const [questionList, setQuestionList] = useState(null);
  const navigate = useNavigate();
  const [currQInd, setCurrentQInd] = useState(null);
  // const url1 = new URL('http://localhost:8081');
  // take it from backend

  // populate question list from backend

  // works as implement one time on mount
  useEffect(() => {
    const fetchData = async () => {
      if (questionList === null && !active && props.jwtToken !== null) {
        try {
          const url_get_qn = new URL('http:localhost:8081');
          if (loginActiveUser === "worker") {
            url_get_qn.pathname = '/fw/getAllQ';
            url_get_qn.searchParams.set('name', 'adminQuestionnaire');
            console.log(url_get_qn);
          }
          const key = "Bearer " + props.jwtToken;
          console.log(key)
          const result = await fetch(url_get_qn, {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              "Authorization": key
            },
          }).then((res) => res.json());
          console.log(result);
          setQuestionList(result); // Assuming data is an array of question objects
        } catch (error) {
          console.error('Error fetching data:', error);
        }
      }
      else if(props.jwtToken !== null) {
        setActive(true);
        setCurrentQInd(0);
      }
    }

    fetchData();
  }, [questionList, props.jwtToken]);

  const [currCategory, setCurrentCategory] = useState("mcq");
  console.log(questionList);
  // integration from backend
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

  const submitForm = () => {
    props.handleAlert("success", "Response Submitted!")
  }

  useEffect(() => {
    if(currQInd !== null) {
      setCurrentCategory(questionList[currQInd].type);
    }
  }, [currQInd]);

  return (
    <div>
      <NavbarFW2 checkToken={props.checkToken} setJwtToken={props.setJwtToken} jwtToken={props.jwtToken} decryptData={props.decryptData} handleAlert={props.handleAlert} setBackground={props.setBackground} setLoad={props.setLoad} />
      {active ? <h2 class="mb-2 mt-10 text-4xl font-semibold leading-tight text-primary">
        Questionnaire
      </h2> : undefined}

      {active ? <div className="w-full h-full absolute" style={{ overflow: "hidden" }}>
        <div
          className="flex absolute z-1 h-fit w-fit top-0 bottom-0 right-0 left-0 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 pb-10"
          style={{
            width: "58rem",
            backgroundColor: "#ffffff",
            borderColor: "#ffffff",
            borderWidth: "0.2rem",
            flexDirection: "column",
            margin: "auto",
            marginTop: "1rem",
          }}
        >
          <div style={{}}>
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
                          class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-50"
                        />
                        <label
                          for="list-radio-a"
                          class=" flex px-2 w-full py-3 text-lg font-medium text-gray-900 dark:text-gray-300"
                        >
                          {questionList[currQInd].option1}
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
                          class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
                        />
                        <label
                          for="list-radio-b"
                          class=" flex px-2 w-full py-3 text-lg font-medium text-gray-900 dark:text-gray-300"
                        >
                          {questionList[currQInd].option2}
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
                          class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
                        />
                        <label
                          for="list-radio-c"
                          class="flex px-2 w-full py-3 text-lg font-medium text-gray-900 dark:text-gray-300"
                        >
                          {questionList[currQInd].option3}
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
                          class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
                        />
                        <label
                          for="list-radio-d"
                          class="flex px-2 w-full py-3 text-lg font-medium text-gray-900 dark:text-gray-300"
                        >
                          {questionList[currQInd].option4}
                        </label>
                      </div>
                    </li>
                  </ul>
                </>
              ) : currCategory === "descriptive" ? (
                <div className="mt-5">
                  <label
                    for="message1"
                    class="flex block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    style={{ fontWeight: "550" }}
                  >
                    Answer
                  </label>
                  <textarea
                    id="message1"
                    rows="4"

                    class="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="Enter your Answer here..."
                  ></textarea>
                  {/* {document.getElementById("message1").disabled = false}; */}
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
                    <li class="w-full">
                      <button
                        id="score_1"
                        data-tabs-target="#cat1"
                        type="button"
                        role="tab"
                        aria-controls="cat1"
                        aria-selected="true"
                        style={{
                          borderTopRightRadius: "0",
                          borderBottomRightRadius: "0",
                        }}
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
                        style={{
                          borderTopLeftRadius: "0",
                          borderBottomLeftRadius: "0",
                        }}
                        class="inline-block text-lg w-full p-4 rounded-lg bg-gray-150 hover:bg-gray-200 focus:outline-none dark:bg-gray-700 dark:hover:bg-gray-600 buttonClass"
                      >
                        10
                      </button>
                    </li>
                  </ul>
                </div>
              ) : undefined}
            </div>
          </Box>

          {currQInd === questionList.length - 1 ? (
            <div className="ml-auto">
              <button
                className="px-5 py-2.5 font-semibold bg-blue-50 hover:bg-blue-100 hover:text-blue-600 text-blue-500 rounded-lg text-sm mr-10"
                onClick={prevQuestion}
              >
                Prev Question
              </button>
              <button
                class="flex-end inline-flex items-center justify-center py-3 mb-2 text-lg text-white bg-green-500 rounded-md hover:bg-green-400 w-32 mt-5 ml-auto mr-10"
                data-primary="green-400"
                data-rounded="rounded-2xl"
                data-primary-reset="{}"
                onClick={submitForm}>
                Submit
                <svg
                  class="w-4 h-4 ml-1"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fill-rule="evenodd"
                    d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                    clip-rule="evenodd"
                  ></path>
                </svg>
              </button>{" "}

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
      </div> : undefined}
    </div>
  );
};

export default QuestionnairePatient;

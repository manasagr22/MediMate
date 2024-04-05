import React from "react";
// import Navbar from '../../components/Navbar'
import NavbarFW from "../../components/NavbarFW";
import { useNavigate } from "react-router-dom";
import SupervisorSignUp from "../../components/SupervisorSignUp";
import { useState } from "react";
const RegisterPatient = (props) => {
  const toggleHandler = () => {
    setToggleState(!toggleState);
    if (toggleState) {
      setToggleTxt("Disable FW Assistance");
    } else {
      setToggleTxt("Enable FW Assistance");
    }
  };

  

  const navigate = useNavigate();
  if (props.jwtToken === null) {
    const jwt = JSON.parse(localStorage.getItem("/"));
    if (jwt === "" || jwt === null) navigate("/", { replace: true });
    else {
      props.setJwtToken(props.decryptData());
    }
  } else {
    // console.log(props.jwtToken)
  }

  const registerHandler = () => {
        navigate("/fw/questionnaire", { replace: true });
  }

  const [toggleState, setToggleState] = useState(true);
  const [toggleTxt, setToggleTxt] = useState("Enable FW Assistance");

  return (
    <div>
      <NavbarFW page={"dashboard"} />
      {/* <h1>Graphs</h1> */}
      {/* patients details:
            Name done
            Age done
            DOB done
            Mob No. if any
            aabha id
            email if any
            password if any
             */}
      <h2
        className="text-4xl font-bold text-neutral-950"
        style={{ marginTop: "1rem" }}
      >
        Register the Patient
      </h2>


      <div
        class="flex items-center justify-center p-4"
        style={{ marginTop: 1 }}
        onClick={toggleHandler}
      >
        <input
          type="checkbox"
          id="hs-medium-switch"
          class="relative w-[3.25rem] h-7 p-px bg-gray-100 border-transparent text-transparent rounded-full cursor-pointer transition-colors ease-in-out duration-200 focus:ring-blue-600 disabled:opacity-50 disabled:pointer-events-none checked:bg-none checked:text-blue-600 checked:border-blue-600 focus:checked:border-blue-600 dark:bg-gray-800 dark:border-gray-700 dark:checked:bg-blue-500 dark:checked:border-blue-500 dark:focus:ring-offset-gray-600

  before:inline-block before:size-6 before:bg-white checked:before:bg-blue-200 before:translate-x-0 checked:before:translate-x-full before:rounded-full before:shadow before:transform before:ring-0 before:transition before:ease-in-out before:duration-200 dark:before:bg-gray-400 dark:checked:before:bg-blue-200"
        />
        <label
          for="hs-medium-switch"
          class="text-lg text-gray-500 ms-3 dark:text-gray-400"
        >
          {toggleTxt}
        </label>
      </div>

      <div className="flex items-center justify-center" style={{}}>
        {/* <!-- Author: FormBold Team --> */}
        <div class="mx-auto w-full max-w-[550px] bg-white p-6 rounded-lg">
          <form>
            <div class="-mx-3 flex flex-wrap">
              <div class="w-full px-3 sm:w-1/2">
                <div class="mb-5">
                  <label
                    for="fName"
                    class="mb-3 block text-base font-medium text-[#07074D]"
                  >
                    First Name
                  </label>
                  <input
                    type="text"
                    name="fName"
                    id="fName"
                    placeholder="First Name"
                    class="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                  />
                </div>
              </div>
              <div class="w-full px-3 sm:w-1/2">
                <div class="mb-5">
                  <label
                    for="lName"
                    class="mb-3 block text-base font-medium text-[#07074D]"
                  >
                    Last Name
                  </label>
                  <input
                    type="text"
                    name="lName"
                    id="lName"
                    placeholder="Last Name"
                    class="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                  />
                </div>
              </div>
            </div>
            <div class="-mx-3 flex flex-wrap">
              <div class="w-full px-3 sm:w-1/2">
                <div class="mb-5">
                  <label
                    for="fName"
                    class="mb-3 block text-base font-medium text-[#07074D]"
                  >
                    Age
                  </label>
                  <input
                    type="number"
                    name="fName"
                    id="fName"
                    placeholder=""
                    class="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                  />
                </div>
              </div>
              <div class="w-full px-3 sm:w-1/2">
                <div class="mb-5">
                  <label
                    for="lName"
                    class="mb-3 block text-base font-medium text-[#07074D]"
                  >
                    AABHA ID
                  </label>
                  <input
                    type="text"
                    name="lName"
                    id="lName"
                    placeholder="1234567890"
                    class="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                  />
                </div>
              </div>
            </div>

            <div class="-mx-3 flex">
              <div class="w-full px-3">
                <div class="mb-5">
                  <label
                    for="date"
                    class="mb-3 block text-base font-medium text-[#07074D]"
                  >
                    Date of Birth
                  </label>
                  <input
                    type="date"
                    name="date"
                    id="date"
                    class="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                  />
                </div>
              </div>

            {toggleState ? <div class="w-full px-3">
                <div class="mb-5">
                  <label
                    for="time"
                    class="mb-3 block text-base font-medium text-[#07074D]"
                  >
                    Email ID
                  </label>
                  <input
                    type="text"
                    name="time"
                    id="time"
                    class="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                    placeholder="abc@gmail.com"
                  />
                </div>
              </div> : undefined}
              
            </div>

            <div>
              {toggleState ? 
                <div class="-mx-3 flex">
                  <div class="w-full px-3">
                    <div class="mb-5">
                      <label
                        for="date"
                        class="mb-3 block text-base font-medium text-[#07074D]"
                      >
                        Mobile Number
                      </label>
                      <input
                        type="text"
                        name="date"
                        id="date"
                        class="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                      />
                    </div>
                  </div>
                  <div class="w-full px-3">
                    <div class="mb-5">
                      <label
                        for="time"
                        class="mb-3 block text-base font-medium text-[#07074D]"
                      >
                        Password
                      </label>
                      <input
                        type="password"
                        name="time"
                        id="time"
                        class="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                        placeholder="&#9679"
                      />
                    </div>
                  </div>
                </div>
               : undefined}
            </div>

            <div>
              <button class="hover:shadow-form rounded-md bg-[#6A64F1] py-3 px-8 text-center text-base font-semibold text-white outline-none" onClick={registerHandler}>
                Register Patient
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default RegisterPatient;

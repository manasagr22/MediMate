import React, { useEffect } from "react";
// import Navbar from '../../components/Navbar'
import NavbarFW from "../../components/NavbarFW";
import { useNavigate } from "react-router-dom";
import {
  Input, Select, Option, Menu,
  MenuHandler,
  Popover,
  PopoverHandler,
  PopoverContent,
  Button,
} from "@material-tailwind/react";
import { useCountries } from "use-react-countries";
import { format } from "date-fns";
import { DayPicker } from "react-day-picker";
import { ChevronRightIcon, ChevronLeftIcon } from "@heroicons/react/24/outline";
import { useState } from "react";
import './RegisterPatient.css'
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
  const { countries } = useCountries();
  const { name, flags, countryCallingCode } = countries[221];
  const [date, setDate] = useState(null);
  // if (props.jwtToken === null) {
  //   const jwt = JSON.parse(localStorage.getItem("/"));
  //   if (jwt === "" || jwt === null) navigate("/", { replace: true });
  //   else {
  //     props.setJwtToken(props.decryptData());
  //   }
  // } else {
  //   // console.log(props.jwtToken)
  // }

  function showPassword() {
    let password = document.getElementById("pass");
    let pass = document.getElementById("showPass");     //<span>

    if (pass.innerText === "visibility") {
      pass.innerText = "visibility_off";
      password.type = "text";
      password.placeholder = "12345678"
    }
    else {
      pass.innerText = "visibility";
      password.type = "password";
      password.placeholder = "••••••••"
    }
  }

  function showConfirmPassword() {
    let confirm_password = document.getElementById("confirm_password");
    let pass = document.getElementById("showConfirmPass");     //<span>

    if (pass.innerText === "visibility") {
      pass.innerText = "visibility_off";
      confirm_password.type = "text";
      confirm_password.placeholder = "12345678"
    }
    else {
      pass.innerText = "visibility";
      confirm_password.type = "password";
      confirm_password.placeholder = "••••••••"
    }
  }

  const registerHandler = async () => {
    // also register patient in the backend
    // do a post request
    const firstName = document.getElementById('fName').value;
    const lastName = document.getElementById('lName').value;
    const age = document.getElementById('age').value.toString();
    const aabhaId = document.getElementById('aabhaId').value;
    const dob = document.getElementById('dob').value.toString();
    const subDivision = document.getElementById('subdiv').value;
    const district = document.getElementById('district').value;
    const address = document.getElementById('address').value;
    const gender = document.getElementById('gender').value;
    let email = "";
    let mobileNumber = "";

    if (!toggleState) {
      email = document.getElementById('emailId').value;
      mobileNumber = document.getElementById('mobno').value;
    }

    const data = {
      aabha: aabhaId,
      firstName: firstName,
      lastName: lastName,
      address: address,
      gender: gender,
      age: age,
      dob: dob,
      assist: toggleState,
      email: email,
      phone: mobileNumber,
      subDivision: subDivision,
      district: district,
      role: {
        name: "PATIENT"
      }
    }
    console.log(data);

    try {
      const url = "http://localhost:8081/fw/regPatient";
      const key = "Bearer " + props.jwtToken;
      console.log("hello " + key)
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          "Content-Type": "application/json",
          "Authorization": key

          // //       // Add any other headers if needed
        },
        body: JSON.stringify({
          aabha: aabhaId,
          firstName: firstName,
          lastName: lastName,
          address: address,
          gender: gender,
          dob: dob,
          assist: toggleState,
          email: email,
          phone: mobileNumber,
          subDivision: subDivision,
          district: district,
          role: {
            name: "PATIENT"
          }
        }),
      }).then((res) => res.json());

      // Redirect or handle success response
      console.log(response)


      //   props.handleAlert("success", "User Credentials have been sent to registered email");
      // navigate("/fw/dashboard", { replace: true });
      navigate("/fw/questionnaire", { replace: true });
    } catch (error) {
      console.log("Error    " + error);
      // Handle error, show error message to the user, etc.
    }

  }

  const [toggleState, setToggleState] = useState(false);
  const [toggleTxt, setToggleTxt] = useState("Enable FW Assistance");

  function inputClass(isFocus, id) {
    const elements = document.getElementsByClassName("inputClass")
    const labelElements = document.getElementsByClassName("labelClass")
    if (isFocus) {
      elements[id - 1].style.borderColor = "";
      labelElements[id - 1].style.borderTopColor = ""
    }
    else {
      elements[id - 1].style.borderColor = "gray";
      if (elements[id - 1].value !== "") {
        elements[id - 1].style.borderTopColor = "";
        labelElements[id - 1].style.borderTopColor = "gray"
      }
    }
  }

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
        className="flex items-center justify-center p-4"
        style={{ marginTop: 1 }}
        onClick={toggleHandler}
      >
        <input
          type="checkbox"
          id="hs-medium-switch"
          className="relative w-[3.25rem] h-7 p-px bg-gray-100 border-transparent text-transparent rounded-full cursor-pointer transition-colors ease-in-out duration-200 focus:ring-blue-600 disabled:opacity-50 disabled:pointer-events-none checked:bg-none checked:text-blue-600 checked:border-blue-600 focus:checked:border-blue-600 dark:bg-gray-800 dark:border-gray-700 dark:checked:bg-blue-500 dark:checked:border-blue-500 dark:focus:ring-offset-gray-600

  before:inline-block before:size-6 before:bg-white checked:before:bg-blue-200 before:translate-x-0 checked:before:translate-x-full before:rounded-full before:shadow before:transform before:ring-0 before:transition before:ease-in-out before:duration-200 dark:before:bg-gray-400 dark:checked:before:bg-blue-200"
        />
        <label
          className="text-lg text-gray-500 ms-3 dark:text-gray-400"
        >
          {toggleTxt}
        </label>
      </div>

      <div className="flex items-center justify-center" style={{}}>
        {/* <!-- Author: FormBold Team --> */}
        <div className="mx-auto w-full max-w-[550px] bg-white p-6 rounded-lg">
          <form className="mt-4">
            <div class="grid gap-6 mb-6 md:grid-cols-2">
              <div>
                <Input className="inputClass" color="blue" label="First Name" required />
              </div>
              <div>
                <Input className="inputClass" color="blue" label="Last Name" required />
              </div>
              <div>
                <Select className="inputClass" color="blue" label="Gender" labelProps={{
                  className: "text-blue-gray-600"
                }} required>
                  <Option>Male</Option>
                  <Option>Female</Option>
                </Select>
              </div>
              <div className="relative flex">
                <Menu placement="bottom-start">
                  <MenuHandler>
                    <Button
                      ripple={false}
                      variant="text"
                      color="blue-gray"
                      className="flex h-10 items-center gap-2 rounded-r-none border border-r-0 border-blue-gray-200 bg-blue-gray-500/10 pl-3"
                    >
                      <img
                        src={flags.svg}
                        alt={name}
                        className="h-4 w-4 rounded-full object-cover"
                      />
                      {countryCallingCode}
                    </Button>
                  </MenuHandler>
                </Menu>
                <Input type="tel" className="inputClass rounded-l-none !border-t-blue-gray-200  focus:!border-t-blue-500 focus:!border placeholder:!opacity-100" color="blue" placeholder="Mobile Number" labelProps={{
                  className: "before:content-none after:content-none",
                }} containerProps={{
                  className: "min-w-min"
                }} />
              </div>
              <div>
                <Input className="inputClass" color="blue" label="Email Address" required />
              </div>
              <div>
                <Input className="inputClass" color="blue" label="AABHA ID" required />
              </div>
              <div>
                <Select className="inputClass" color="blue" label="District" labelProps={{
                  className: "text-blue-gray-600"
                }} required>
                  <Option>Indore</Option>
                </Select>
              </div>
              <div>
                <Select className="inputClass" color="blue" label="Sub Division" labelProps={{
                  className: "text-blue-gray-600"
                }} required>
                  <Option>Mhow</Option>
                </Select>
              </div>
              <div>
                <Popover placement="bottom">
                  <PopoverHandler>
                    <Input
                      color="blue"
                      label="Date of Birth"
                      onChange={() => null}
                      value={date ? format(date, "PPP") : ""}
                    />
                  </PopoverHandler>
                  <PopoverContent>
                    <DayPicker
                      mode="single"
                      selected={date}
                      onSelect={setDate}
                      showOutsideDays
                      className="border-0"
                      classNames={{
                        caption: "flex justify-center py-2 mb-4 relative items-center",
                        caption_label: "text-sm font-medium text-gray-900",
                        nav: "flex items-center",
                        nav_button:
                          "h-6 w-6 bg-transparent hover:bg-blue-gray-50 p-1 rounded-md transition-colors duration-300",
                        nav_button_previous: "absolute left-1.5",
                        nav_button_next: "absolute right-1.5",
                        table: "w-full border-collapse",
                        head_row: "flex font-medium text-gray-900",
                        head_cell: "m-0.5 w-9 font-normal text-sm",
                        row: "flex w-full mt-2",
                        cell: "text-gray-600 rounded-md h-9 w-9 text-center text-sm p-0 m-0.5 relative [&:has([aria-selected].day-range-end)]:rounded-r-md [&:has([aria-selected].day-outside)]:bg-gray-900/20 [&:has([aria-selected].day-outside)]:text-white [&:has([aria-selected])]:bg-gray-900/50 first:[&:has([aria-selected])]:rounded-l-md last:[&:has([aria-selected])]:rounded-r-md focus-within:relative focus-within:z-20",
                        day: "h-9 w-9 p-0 font-normal",
                        day_range_end: "day-range-end",
                        day_selected:
                          "rounded-md bg-gray-900 text-white hover:bg-gray-900 hover:text-white focus:bg-gray-900 focus:text-white",
                        day_today: "rounded-md bg-gray-200 text-gray-900",
                        day_outside:
                          "day-outside text-gray-500 opacity-50 aria-selected:bg-gray-500 aria-selected:text-gray-900 aria-selected:bg-opacity-10",
                        day_disabled: "text-gray-500 opacity-50",
                        day_hidden: "invisible",
                      }}
                      components={{
                        IconLeft: ({ ...props }) => (
                          <ChevronLeftIcon {...props} className="h-4 w-4 stroke-2" />
                        ),
                        IconRight: ({ ...props }) => (
                          <ChevronRightIcon {...props} className="h-4 w-4 stroke-2" />
                        ),
                      }}
                    />
                  </PopoverContent>
                </Popover>
              </div>
              <div>
                <Input type="number" className="inputClass" color="blue" label="Age" />
              </div>
              <div className="flex">
                <Input color="blue" type="password" className="inputClass pr-9" label="Password" containerProps={{
                  style: { minWidth: "-webkit-fill-available" }
                }} />
                <button style={{ position: "relative", right: "2rem" }} onClick={showPassword}><span class="material-symbols-outlined relative" id='showPass' style={{ top: "0.2rem" }}>
                  visibility
                </span></button>
              </div>
              <div className="flex">
                <Input color="blue" type="password" className="inputClass pr-9" label="Confirm Password" containerProps={{
                  style: { minWidth: "-webkit-fill-available" }
                }} />
                <button style={{ position: "relative", right: "2rem" }} onClick={showConfirmPassword}><span class="material-symbols-outlined relative" id='showConfirmPass' style={{ top: "0.2rem" }}>
                  visibility
                </span></button>
              </div>
            </div>

            <div class="flex items-start mb-6">
              <div class="flex items-center h-5">
                <input id="remember" type="checkbox" value="" class="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-blue-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-blue-600 dark:ring-offset-gray-800" required />
              </div>
              <label for="remember" class="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">I agree with the <a href="#" class="text-blue-600 hover:underline dark:text-blue-500">terms and conditions</a>.</label>
            </div>
            <button type="submit" class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Submit</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default RegisterPatient;

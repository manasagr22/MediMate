import React, { useEffect } from "react";
// import Navbar from '../../components/Navbar'
import NavbarFW from "../../components/NavbarFW";
import { useNavigate } from "react-router-dom";
import Avatar from '@mui/material/Avatar';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import {
  Input, Select, Option, Menu,
  MenuHandler,
  Popover,
  PopoverHandler,
  PopoverContent,
  Button,
  Checkbox,
  Typography,
  Textarea
} from "@material-tailwind/react";
import { useCountries } from "use-react-countries";
import { format } from "date-fns";
// import { DayPicker } from "react-day-picker";
import { ChevronRightIcon, ChevronLeftIcon } from "@heroicons/react/24/outline";
import { useState } from "react";
import './RegisterPatient.css'
import dayjs from 'dayjs';
const RegisterPatient = (props) => {

  const [toggleState, setToggleState] = useState(false);
  const [toggleTxt, setToggleTxt] = useState("Enable FW Assistance");
  const [age, setAge] = useState(null);

  const toggleHandler = () => {
    setToggleState(!toggleState);
  };

  useEffect(() => {
    if (toggleState) {
      setToggleTxt("Disable FW Assistance");
    } else {
      setToggleTxt("Enable FW Assistance");
    }
  }, [toggleState]);



  const navigate = useNavigate();
  const { countries } = useCountries();
  const { name, flags, countryCallingCode } = countries[221];
  const [gender, setGender] = React.useState("Male");
  const [district, setDistrict] = React.useState("Indore");
  const [subDiv, setSubDiv] = React.useState("Mhow");
  const cur_date = new Date().toJSON().slice(0, 10);
  var current_date = cur_date.split("-").reverse()
  current_date = current_date[1] + "-" + current_date[0] + "-" + current_date[2];
  const [date, setDate] = useState(dayjs(current_date));
  if (props.jwtToken === null) {
    const jwt = JSON.parse(localStorage.getItem("/"));
    if (jwt === "" || jwt === null) navigate("/", { replace: true });
    else {
      props.setJwtToken(props.decryptData());
    }
  } else {
    // console.log(props.jwtToken)
  }

  useEffect(() => {
    if (date === null)
      setAge(null);
    else {
      var cur_date = new Date().toJSON().slice(0, 10);
      const currentDateArray = cur_date.split("-").reverse()
      let dob = new Date(date['$d']);
      const dobYear = dob.getFullYear();
      const dobMonth = dob.getMonth() + 1; // Months are zero-based, so add 1
      const dobDay = dob.getDate();

      // Convert date components to numbers
      const currentYear = parseInt(currentDateArray[2]);
      const currentMonth = parseInt(currentDateArray[1]);
      const currentDay = parseInt(currentDateArray[0]);

      // Calculate age
      let age = currentYear - dobYear;
      if (currentMonth < dobMonth || (currentMonth === dobMonth && currentDay < dobDay)) {
        age--; // Adjust age if birth month or day hasn't occurred yet in the current year
      }
      if (age < 0)
        age = 0;
      setAge(age);
    }
  }, [date])

  // function showPassword() {
  //   let password = document.getElementById("password");
  //   let pass = document.getElementById("showPass");     //<span>

  //   if (pass.innerText === "visibility") {
  //     pass.innerText = "visibility_off";
  //     password.type = "text";
  //     password.placeholder = "12345678"
  //   }
  //   else {
  //     pass.innerText = "visibility";
  //     password.type = "password";
  //     password.placeholder = "••••••••"
  //   }
  // }

  // function showConfirmPassword() {
  //   let confirm_password = document.getElementById("confirmPassword");
  //   let pass = document.getElementById("showConfirmPass");     //<span>

  //   if (pass.innerText === "visibility") {
  //     pass.innerText = "visibility_off";
  //     confirm_password.type = "text";
  //     confirm_password.placeholder = "12345678"
  //   }
  //   else {
  //     pass.innerText = "visibility";
  //     confirm_password.type = "password";
  //     confirm_password.placeholder = "••••••••"
  //   }
  // }

  const registerHandler = async (e) => {
    e.preventDefault();

    const firstName = document.getElementById('fName').value;
    const lastName = document.getElementById('lName').value;
    const age = document.getElementById('age').value.toString();
    const aabhaId = document.getElementById('aabhaId').value;
    const address = document.getElementById('address').value;
    let email = "";
    let mobileNumber = "";
    // let pass = "";
    // let confirm_password = "";

    if (!toggleState) {
      email = document.getElementById('emailId').value;
      mobileNumber = document.getElementById('mobno').value;
      // pass = document.getElementById("password").value;
      // confirm_password = document.getElementById("confirmPassword").value;
    }
    // else {
    //   // pass = "1234";
    //   // confirm_password = "1234"
    // }

    const data = {
      aabha: aabhaId,
      firstName: firstName,
      lastName: lastName,
      address: address,
      gender: gender,
      age: age,
      dob: date,
      assist: toggleState,
      email: email,
      phone: mobileNumber,
      subDivision: subDiv,
      district: district,
      role: {
        name: "PATIENT"
      }
    }
    // console.log(data);
    // if (pass !== confirm_password)
    //   props.handleAlert("danger", "Passwords do not Match")
    // else {

    props.setBackground("brightness(0.01)");
    props.setLoad(true);

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
          dob: date,
          assist: toggleState,
          email: email,
          phone: mobileNumber,
          subDivision: subDiv,
          district: district,
          role: {
            name: "PATIENT"
          }
        }),
      }).then((res) => res.json());

      // Redirect or handle success response
      console.log(response)
      props.setBackground("");
    props.setLoad(false);
      if(response === true) {
        props.handleAlert("success", "User Credentials have been sent to registered email");
        navigate("/fw/loggedInPatient", { replace: true });
      }
      else {
        props.handleAlert("danger", "Some Error Occurred!");
      // navigate("/fw/dashboard", { replace: true });
      }

      


      //   props.handleAlert("success", "User Credentials have been sent to registered email");
      // navigate("/fw/dashboard", { replace: true });
      // navigate("/fw/loginPatientPage", { replace: true });
    } catch (error) {
      props.setBackground("");
    props.setLoad(false);
    props.handleAlert("danger", "Some Error Occurred!");
      // Handle error, show error message to the user, etc.
    }
    // }

  }

  return (
    <div>
      <NavbarFW checkToken={props.checkToken} page={"dashboard"} setJwtToken={props.setJwtToken} jwtToken={props.jwtToken} decryptData={props.decryptData} handleAlert={props.handleAlert} setBackground={props.setBackground} setLoad={props.setLoad}/>
      <div className="flex items-center justify-center bg-white" style={{ flexDirection: "column", overflow: "hidden" }}>
        <div className="mx-auto w-full max-w-[550px] bg-white p-6 rounded-lg mt-0" style={{ boxSizing: "content-box" }}>
          <div className="flex" style={{ flexDirection: "column" }}>
            {/* <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar> */}
            <Typography component="h1" variant="h3">
              Register the Patient
            </Typography>
            {/* <h2
        className="text-4xl font-bold text-neutral-950"
        style={{ marginTop: "1rem" }}
      >
        
      </h2> */}
            <div
              className="flex items-center justify-center p-4"
              style={{ marginTop: 1 }}
            >
              <Checkbox
                ripple={false}
                onClick={toggleHandler}
                className="h-8 w-8 rounded-full border-gray-900/20 bg-gray-900/10 transition-all hover:scale-105 hover:before:opacity-0"
              />
              <Typography color="blue-gray" className="font-medium">
                {toggleTxt}
              </Typography>
            </div>
          </div>


          {/* <!-- Author: FormBold Team --> */}

          <form className="mt-0 pt-4 regPatientClass" autoComplete="off" onSubmit={(e) => registerHandler(e)}>
            <div class="grid gap-6 mb-6 md:grid-cols-2">
              <div>
                <Input className="inputClass" id="fName" color="blue" label="First Name" required />
              </div>
              <div>
                <Input className="inputClass" id="lName" color="blue" label="Last Name" required />
              </div>
              <div>
                <Select className="inputClass" id="gender" color="blue" label="Gender" labelProps={{
                  className: "text-blue-gray-600"
                }}
                  value={gender}
                  onChange={(val) => setGender(val)}
                  required>
                  <Option value="Male">Male</Option>
                  <Option value="Female">Female</Option>
                </Select>
              </div>
              <div>
                <Input className="inputClass" id="aabhaId" color="blue" label="AABHA ID" required />
              </div>
              {!toggleState ? <div className="relative flex">
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
                <Input required type="tel" id="mobno" maxLength={10} minLength={10} className="inputClass rounded-l-none !border-t-blue-gray-200  focus:!border-t-blue-500 focus:!border placeholder:!opacity-100" color="blue" placeholder="Mobile Number" labelProps={{
                  className: "before:content-none after:content-none",
                }} containerProps={{
                  className: "min-w-min"
                }} />
              </div> : undefined}
              {!toggleState ? <div>
                <Input type="email" className="inputClass" id="emailId" color="blue" label="Email Address" required />
              </div> : undefined}
              <div>
                <Select className="inputClass" id="district" color="blue" label="District" value={district}
                  onChange={(val) => setDistrict(val)} labelProps={{
                    className: "text-blue-gray-600"
                  }} required>
                  <Option value="Indore">Indore</Option>
                </Select>
              </div>
              <div>
                <Select className="inputClass" id="subdiv" color="blue" label="Sub Division" labelProps={{
                  className: "text-blue-gray-600"
                }}
                  value={subDiv}
                  onChange={(val) => setSubDiv(val)}
                  required>
                  <Option value="Mhow">Mhow</Option>
                </Select>
              </div>
              <div>
                {/* <Input
                  type="text"
                  value={date.toLocaleDateString()}
                  readOnly={true}
                  placeholder="Select date"
                  onClick={() => { }}
                /> */}
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DatePicker label="Date of Birth" onChange={(newValue) => setDate(newValue)} value={date} />
                </LocalizationProvider>
                {/* <Popover placement="bottom">
                  <PopoverHandler>
                    <Input
                      required
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
                </Popover> */}
              </div>
              <div>
                <Input type="number" className="inputClass" id="age" color="blue" label="Age" value={age} />
              </div>
              {/* {!toggleState ? <div className="flex">
                <Input required color="blue" id="password" type="password" className="inputClass pr-9" label="Password" containerProps={{
                  style: { minWidth: "-webkit-fill-available" }
                }} />
                <button style={{ position: "relative", right: "2rem" }} onClick={showPassword}><span class="material-symbols-outlined relative" id='showPass' style={{ top: "0.2rem" }}>
                  visibility
                </span></button>
              </div> : undefined}
              {!toggleState ? <div className="flex">
                <Input required color="blue" type="password" id="confirmPassword" className="inputClass pr-9" label="Confirm Password" containerProps={{
                  style: { minWidth: "-webkit-fill-available" }
                }} />
                <button style={{ position: "relative", right: "2rem" }} onClick={showConfirmPassword}><span class="material-symbols-outlined relative" id='showConfirmPass' style={{ top: "0.2rem" }}>
                  visibility
                </span></button>
              </div> : undefined} */}
            </div>
            <div>
              <Textarea color="blue" label="Address" id="address" required />
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

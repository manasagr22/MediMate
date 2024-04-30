import React, { useEffect, useState } from "react";
import NavbarAd from "../../components/NavbarAd";
import SuperVisorCard from "../../components/SuperVisorCard";
import { useNavigate } from "react-router-dom";
import data from "./State_Dist.json";
import {
  Input, Select, Option
} from "@material-tailwind/react";
// import { useState } from "react";
// import from "@mui/material/colors"

const AddHospital = (props) => {
  const navigate = useNavigate();
  // props.checkToken();

  const [state, setState] = useState(null);
  const [district, setDistrict] = useState(null);
  const [subDistrict, setSubDistrict] = useState(null);
  const [hospital, setHospital] = useState(null);
  const [districtList, setDistrictList] = useState([]);
  const [subDistrictList, setSubDistrictList] = useState([]);
  const [hospitalList, setHospitalList] = useState([]);
  const [email, setEmail] = useState(null);
  const [data, setData] = useState(null);

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
          const url = new URL("http://localhost:8082");
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
    async function getSubDistrict() {
      if (district !== null) {
        try {
          const url = new URL("http://localhost:8082");
          url.pathname = '/admin/getSubDistrict';
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

  useEffect(() => {
    async function getHospital() {
      if (subDistrict !== null) {
        try {
          const url = new URL("http://localhost:8082");
          url.pathname = '/admin/getHospitals';
          url.searchParams.set('state', state);
          url.searchParams.set('district', district);
          url.searchParams.set('subDistrict', subDistrict);
          const dis = await fetch(url, {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              "Authorization": "Bearer " + props.jwtToken
            }
          }).then(res => res.json());

          setData(dis);
          const list1 = [];
          for (let i = 0; i < dis.length; i++) {
            list1.push((Object.keys(dis[i]))[0]);
            // list2.push(dis[i][list1[i]]['email']);
          }
          setHospitalList(list1);
        }
        catch (error) {
          props.handleAlert("danger", "Some Error Occurred!")
        }
      }
    }
    getHospital();
  }, [subDistrict])

  useEffect(() => {
    async function getHospitalEmail() {
      if (hospital !== null && data !== null) {
        try {
          for (let i = 0; i < data.length; i++) {
            let key = Object.keys(data[i]);
            if (key[0] === hospital) {
              setEmail(data[i][key[0]]['email']);
              break;
            }
          }
        }
        catch (error) {
          props.handleAlert("danger", "Some Error Occurred!")
        }
      }
    }
    getHospitalEmail();
  }, [hospital])


  useEffect(() => {
    getStateList();
  }, [props.stateList])

  useEffect(() => {
    if (props.jwtToken !== null)
      getStateList();
  }, [props.jwtToken])

  async function getStateList() {
    try {
      if (props.stateList.length === 0 && props.jwtToken !== null) {
        const state1 = await fetch("http://localhost:8082/admin/getState", {
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

  
  async function registerSup() {
    // console.log(email, district, sub_div);
    const url = "http://localhost:8082/admin/regHospital";
    const hosp = "HOSPITAL";

    props.setBackground("brightness(0.01)");
    props.setLoad(true);

    try {
      const key = "Bearer " + props.jwtToken;
      //   console.log("hello " + key);
      const result1 = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: key,
        },
        body: JSON.stringify({
          district: district,
          state: state,
          subDivision: subDistrict,
          user: {
            email: email,
            role: {
              name: hosp,
            },
          },
          name: hospital,
        }),
      }).then((res) => res.json());

      props.setBackground("");
      props.setLoad(false);

      if (result1 === true) {

        props.handleAlert(
          "success",
          "User Credentials have been sent to registered email"
        );
      }
      else {
        props.handleAlert("danger", "Error Registering Hospital");
      }
    } catch {
      props.setBackground("");
      props.setLoad(false);
      props.handleAlert("danger", "Error Registering Hospital");
    }
  }

  return (
    <div style={{ backgroundColor: "#f5f5f5", height: window.innerHeight }}>
      <NavbarAd checkToken={props.checkToken} setJwtToken={props.setJwtToken} jwtToken={props.jwtToken} decryptData={props.decryptData} handleAlert={props.handleAlert} setBackground={props.setBackground} setLoad={props.setLoad} />
      {/* Register Page */}
      <div
        class="bg-gray-100 py-6 flex flex-col justify-center sm:py-12"
        style={{ height: window.innerHeight - 64 }}
      >
        <div class="relative py-3 sm:max-w-xl sm:mx-auto">
          <div class="absolute inset-0 bg-gradient-to-r from-blue-300 to-blue-600 shadow-lg transform -skew-y-6 sm:skew-y-0 sm:-rotate-6 sm:rounded-3xl"></div>
          <div class="relative px-4 py-10 bg-white shadow-lg sm:rounded-3xl sm:p-20">
            <div class="max-w-md mx-auto">
              <div>
                <h1 class="text-2xl font-semibold">Enter Hospital Details</h1>
              </div>
              <div class="divide-y divide-gray-200">
                <div class="py-8 text-base leading-6 space-y-4 text-gray-700 sm:text-lg sm:leading-">
                  <div>
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
                  <div>
                    <Select color="blue" label="Hospital Name" labelProps={{
                      className: "text-blue-gray-600"
                    }}
                      onChange={(val) => setHospital(val)}
                      required>
                      {hospitalList.map((dist, index) => {
                        return (
                          <Option key={dist} value={dist}>{dist}</Option>
                        )
                      })}
                    </Select>
                  </div>
                  <div className="mb-6">
                    <Input type="email" color="blue" label="Email Address" value={email} required />
                  </div>
                  <div class="relative">
                    <button
                      class="bg-blue-500 text-white rounded-md px-2 py-1"
                      onClick={registerSup}
                    >
                      Register
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddHospital;

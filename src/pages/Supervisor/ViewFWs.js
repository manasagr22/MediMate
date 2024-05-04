import React, { useEffect, useState } from "react";
// import AddSuperVisor from "./AddSuperVisor";
import { useNavigate } from "react-router-dom";
import NavbarSup from "../../components/NavbarSup";
import SuperVisorCard from "../../components/SuperVisorCard";
import { Select, Option } from "@material-tailwind/react";
const ViewFW = (props) => {
  const navigate = useNavigate();
  const [state, setState] = useState(0);
  const [subDistrictList, setSubDistrictList] = useState([]);
  const [district, setDistrict] = useState(null);
  const [subDistrict, setSubDistrict] = useState(null);
  const [fwList, setFwList] = useState(null);
  // const addSuperVisorHandler = () => {
  //     navigate("/admin/addsupervisor");
  // }

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
      else if ((state === null && props.jwtToken !== null) || (state === 0 && props.jwtToken !== null)) {
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
          props.handleAlert("danger", "Some Error Occurred!")
        }
      }
    }
    getDistrict();
  }, [state, props.jwtToken])

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

  async function searchFW() {
    if (subDistrict) {
      try {
        props.setBackground("brightness(0.01)");
        props.setLoad(true);

        const url = new URL("http://localhost:8082")
        url.pathname = "/supervisor/viewFw";
        url.searchParams.set('area', subDistrict);
        const result = await fetch(url, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "Authorization": "Bearer " + props.jwtToken
          }
        }).then(res => res.json());
        setFwList(result);

        props.setBackground("");
        props.setLoad(false);
      }
      catch {
        props.setBackground("");
        props.setLoad(false);
        props.handleAlert("danger", "Server Error Occurred!")
      }
    }
  }


  return (
    <div>
      <NavbarSup checkToken={props.checkToken} page={"viewFW"} setJwtToken={props.setJwtToken} jwtToken={props.jwtToken} decryptData={props.decryptData} handleAlert={props.handleAlert} setBackground={props.setBackground} setLoad={props.setLoad} />
      <div className="flex justify-center" style={{ marginTop: 20 }}>
        <div class="w-72">
          <div class="relative w-full min-w-[200px] h-10">
            <input
              value={state}
              class="peer w-full h-full  text-blue-gray-700 font-sans font-normal outline outline-0 focus:outline-0 disabled:bg-blue-gray-50 disabled:border-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 border focus:border-2 border-t-transparent focus:border-t-transparent text-sm px-3 py-2.5 rounded-[7px] border-blue-gray-200 focus:border-gray-900"
              placeholder=" "
            />
            <label class="flex w-full h-full select-none pointer-events-none absolute left-0 font-normal !overflow-visible truncate peer-placeholder-shown:text-blue-gray-500 leading-tight peer-focus:leading-tight peer-disabled:text-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500 transition-all -top-1.5 peer-placeholder-shown:text-sm text-[11px] peer-focus:text-[11px] before:content[' '] before:block before:box-border before:w-2.5 before:h-1.5 before:mt-[6.5px] before:mr-1 peer-placeholder-shown:before:border-transparent before:rounded-tl-md before:border-t peer-focus:before:border-t-2 before:border-l peer-focus:before:border-l-2 before:pointer-events-none before:transition-all peer-disabled:before:border-transparent after:content[' '] after:block after:flex-grow after:box-border after:w-2.5 after:h-1.5 after:mt-[6.5px] after:ml-1 peer-placeholder-shown:after:border-transparent after:rounded-tr-md after:border-t peer-focus:after:border-t-2 after:border-r peer-focus:after:border-r-2 after:pointer-events-none after:transition-all peer-disabled:after:border-transparent peer-placeholder-shown:leading-[3.75] text-gray-500 peer-focus:text-gray-900 before:border-blue-gray-200 peer-focus:before:!border-gray-900 after:border-blue-gray-200 peer-focus:after:!border-gray-900">
              State
            </label>
          </div>
        </div>
        <div class="w-72" style={{ marginLeft: 15 }}>
          <div class="relative w-full min-w-[200px] h-10">
            <input
              value={district}
              class="peer w-full h-full  text-blue-gray-700 font-sans font-normal outline outline-0 focus:outline-0 disabled:bg-blue-gray-50 disabled:border-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 border focus:border-2 border-t-transparent focus:border-t-transparent text-sm px-3 py-2.5 rounded-[7px] border-blue-gray-200 focus:border-gray-900"
              placeholder=" "
            />
            <label class="flex w-full h-full select-none pointer-events-none absolute left-0 font-normal !overflow-visible truncate peer-placeholder-shown:text-blue-gray-500 leading-tight peer-focus:leading-tight peer-disabled:text-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500 transition-all -top-1.5 peer-placeholder-shown:text-sm text-[11px] peer-focus:text-[11px] before:content[' '] before:block before:box-border before:w-2.5 before:h-1.5 before:mt-[6.5px] before:mr-1 peer-placeholder-shown:before:border-transparent before:rounded-tl-md before:border-t peer-focus:before:border-t-2 before:border-l peer-focus:before:border-l-2 before:pointer-events-none before:transition-all peer-disabled:before:border-transparent after:content[' '] after:block after:flex-grow after:box-border after:w-2.5 after:h-1.5 after:mt-[6.5px] after:ml-1 peer-placeholder-shown:after:border-transparent after:rounded-tr-md after:border-t peer-focus:after:border-t-2 after:border-r peer-focus:after:border-r-2 after:pointer-events-none after:transition-all peer-disabled:after:border-transparent peer-placeholder-shown:leading-[3.75] text-gray-500 peer-focus:text-gray-900 before:border-blue-gray-200 peer-focus:before:!border-gray-900 after:border-blue-gray-200 peer-focus:after:!border-gray-900">
              District
            </label>
          </div>
        </div>
        <div className="w-72" style={{ marginLeft: 15 }}>
          <Select id="subDistrictId" color="black" label="Sub Division" labelProps={{
            className: "text-blue-gray-600"
          }}
            containerProps={{
              className: "bg-white"
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
        <button type="button" class="py-3 px-4 inline-flex items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent bg-blue-100 text-blue-800 hover:bg-blue-200 disabled:opacity-50 disabled:pointer-events-none dark:hover:bg-blue-900 dark:text-blue-400 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600" style={{ marginLeft: 15 }} onClick={searchFW}>
          SEARCH<svg fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" viewBox="0 0 24 24" class="w-4 h-4"><path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
        </button>
      </div>

      {/* <AddSuperVisor /> */}
      {fwList !== null ? <div className="flex flex-wrap gap-12" style={{ marginTop: 20 }}>
        {fwList.map((item, index) => (
          <SuperVisorCard name={item.firstName + " " + item.lastName} area={subDistrict} email={item.email} chatDirect={props.chatDirect} setChatDirect={props.setChatDirect}/>
        ))}
        
      </div> : undefined}
    </div>
  );
};

export default ViewFW;

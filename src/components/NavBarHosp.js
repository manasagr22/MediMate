import React from "react";
import icon from "../Images/Logo_Name.png";
import { useNavigate } from "react-router-dom";
const NavbarHosp = (props) => {
  const navigate = useNavigate();
  const viewDoctors = () => {
    navigate("/hospital/viewDoctors");
  };
  const logOutHosp = () => {};

  return (
    <nav class="bg-gray-100 shadow shadow-gray-300 w-100 md:px-auto">
      <div class="md:h-16 h-28 container flex items-center justify-between flex-wrap md:flex-nowrap">
        <div class="flex items-center gap-4">
          <div>
            <span
              className="headerSpan"
              style={{ width: "10.2rem", top: "1.2px", left: "0.8rem" }}
            >
              {/* <span className='headerSpan1'>
              <img className='headerImg' alt="" aria-hidden="true" src={icon}/>
            </span> */}
              <img alt="logo" src={icon} class="cursor-pointer headerImg" />
            </span>
          </div>
        </div>

        <div className="bg-gradient-to-br from-blue-200 to-purple-200 rounded-lg shadow-lg text-gray-800 flex justify-center items-center p-3 ml-96">
          <div className="text-center inline-flex">
            <h1 className=" mt-6 flex items-center text-4xl font-bold px-5">{props.name}</h1>
            <div className="flex-col text-left">
              <p className="pt-8 text-lg">
                <span className="font-bold">State:</span> {props.state}
              </p>
              <p className="text-lg">
                <span className="font-bold">District:</span> {props.district}
              </p>
              <p className="text-lg">
                <span className="font-bold">SubDivision:</span> {props.subDiv}
              </p>
            </div>
          </div>
        </div>

        <div class="order-2 md:order-3">
          <div
            className="flex absolute justify-between  items-center"
            style={{ top: "0.7rem", right: "0.8rem" }}
          >
            <button
              class="px-4 py-2 bg-blue-400 hover:bg-blue-500 text-black-400 rounded-xl flex font-semibold items-center gap-2"
              style={{ marginLeft: "0.8rem" }}
              onClick={viewDoctors}
            >
              <span class="material-symbols-outlined">visibility</span>
              <span>View Doctors</span>
            </button>
            <button
              class="px-4 py-2 bg-red-500 hover:bg-red-600 text-gray-50 rounded-xl flex items-center gap-2"
              style={{ marginLeft: "0.8rem" }}
              onClick={logOutHosp}
            >
              <span class="material-symbols-outlined">logout</span>
              <span>Log Out</span>
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default NavbarHosp;

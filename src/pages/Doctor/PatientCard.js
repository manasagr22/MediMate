import React from "react";
import img1 from "../Hospital/img.jpg";
import { useState } from "react";
import { Checkbox, Typography, Avatar } from "@material-tailwind/react";
import { useNavigate } from "react-router-dom";
function PatientCard({ patient }) {
  // const history = useHistory();
  const navigate = useNavigate();
  const [hover, setHover] = useState();
  const { name, aabhaId, district, status, publicId } = patient;

  function getBackgroundTint() {
    if (status === "RED") {
      return "bg-gradient-to-t from-red-100 to-red-200"; // Red tint
    } else if (status === "YELLOW") {
      return "bg-gradient-to-t from-yellow-100 to-yellow-200"; // Yellow tint
    } else if (status === "GREEN") {
      return "bg-gradient-to-t from-green-100 to-green-200"; // Green tint
    } else {
      return ""; // Default background if score is out of range
    }
  }

  const handleCardClick = () => {
    navigate('/doc/patientrecord', { state: { patientId: aabhaId, patientName: name, publicId : publicId } });

  }


  const photo = img1;

  return (
    <div
      className={`flex relative border p-2 mb-4 bg-white rounded-lg shadow-md w-full ${getBackgroundTint()} transition-transform duration-300 ease-in-out ${
        hover ? "hover:scale-105 cursor-pointer transition-transform duration-300 ease-in-out ease-out" : ""
      }`}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      onClick={() => handleCardClick(patient.aabhaId)}
    >
      <div
        className="flex justify-center items-center"
        style={{ width: "14%" }}
      >
        <Avatar
          variant="circular"
          size="xl"
          alt="tania andrew"
          className="border border-gray-900 p-0.5"
          src="https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1480&q=80"
        />
      </div>

      {/* Right side with doctor details and checkbox */}
      <div
        className="flex justify-center items-center grid grid-cols-3 grid-rows-3 ml-1"
        style={{ width: "-webkit-fill-available" }}
      >
        <div
          class="col-span-2 flex flex-col items-start"
          style={{ width: "72%" }}
        >
          <h2 class="text-gray-600 mb-1 font-semibold text-lg">
            Name: <span class="font-normal">{name}</span>
          </h2>
          <p class="text-gray-600 mb-1 font-semibold text-lg">
            AABHA ID: <span class="font-normal">{aabhaId}</span>
          </p>
          <p class="text-gray-600 mb-2 font-semibold text-lg">
            District: <span class="font-normal">{district}</span>
          </p>
          {/* <p class="text-gray-600 font-semibold text-lg">
            Score: <span class="font-normal">{score}</span>
          </p> */}
        </div>
      </div>
    </div>
  );
}

export default PatientCard;

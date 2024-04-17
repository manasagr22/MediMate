import React from "react";
import img1 from "./img.jpg"

import { Checkbox, Typography } from "@material-tailwind/react";
function DoctorCard({doctor, onSelectCard, isSelected, checkbox}) {
    const { name, registration_number, email } = doctor;
  const photo = img1;
  return (
    <div className="flex justify-center items-center border p-4 mb-4 bg-white rounded-lg shadow-md h-1/6 w-full mt-4">
      {/* Left side with doctor photo */}
      <div className="mr-4 border border-gray-300 rounded-full overflow-hidden">
        <img src={photo} alt="Aryan Bhatt" className="w-20 h-20" />
      </div>

      {/* Right side with doctor details and checkbox */}
      <div className="grid grid-cols-3 grid-rows-3 ml-1 mt-52">
  <div class="col-span-2 flex flex-col items-start">
    <h2 class="text-gray-600 mb-1 font-semibold text-lg">Name: <span class="font-normal">{name}</span></h2>
    <p class="text-gray-600 mb-1 font-semibold text-lg">Email: <span class="font-normal">{email}</span></p>
    <p class="text-gray-600 mb-2 font-semibold text-lg">Reg No: <span class="font-normal">{registration_number}</span></p>
</div>
  
  {checkbox === true ? <div className="flex ml-2">
    <Checkbox
    key={registration_number}
      ripple={true}
      checked={isSelected}
      label={
        <div>
          <Typography color="blue-gray" className="font-semibold">
            Add Doctor
          </Typography>
        </div>
      }
      className="h-9 w-9 rounded-full border-gray-900/20 bg-gray-900/10 transition-all hover:scale-105 hover:before:opacity-0"
      style={{}}
      onClick={() => onSelectCard(doctor)}
    />
  </div> : undefined}
  
</div>

    </div>
  );
}

export default DoctorCard;

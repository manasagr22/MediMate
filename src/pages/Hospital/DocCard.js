import React from "react";
import img1 from "./img.jpg"

import { Checkbox, Typography, Avatar } from "@material-tailwind/react";
function DoctorCard({ doctor, onSelectCard, isSelected, checkbox }) {
  const { name, registration_number, email } = doctor;
  const photo = img1;
  return (
    <div className="flex relative border p-2 mb-4 bg-white rounded-lg shadow-md w-full" style={{ height: "27%" }}>
      {/* <div className="mr-4 border border-gray-300 rounded-full overflow-hidden">
        <img src={photo} alt="Aryan Bhatt" className="w-20 h-20" />
      </div> */}
      <div className="flex justify-center items-center" style={{ width: "14%" }}>
        <Avatar
          variant="circular"
          size="xl"
          alt="tania andrew"
          className="border border-gray-900 p-0.5"
          src="https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1480&q=80"
        />
      </div>

      {/* Right side with doctor details and checkbox */}
      <div className="flex justify-center items-center grid grid-cols-3 grid-rows-3 ml-1" style={{width: "-webkit-fill-available"}}>
        <div class="col-span-2 flex flex-col items-start" style={{width: "72%"}}>
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

import React, { useState, useEffect } from "react";
import NavbarDoc from "../../components/NavbarDoc";
import { Input } from "@material-tailwind/react";
const CreateDocQn = (props) => {
  const [formName, setFormName] = useState("");
  return (
    <>
      <NavbarDoc
        checkToken={props.checkToken}
        setJwtToken={props.setJwtToken}
        jwtToken={props.jwtToken}
        decryptData={props.decryptData}
        handleAlert={props.handleAlert}
        setBackground={props.setBackground}
        setLoad={props.setLoad}
      />

      <div className="flex justify-center items-center font-xl">
        <div className="w-72 mt-12">
          <h2 class="block antialiased tracking-normal font-sans text-3xl font-semibold leading-[1.3] text-gray-700 mb-4">
          Questionnaire Name
          </h2>
          <Input variant="outlined" label="Questionnaire Name" onChange={(new_value) => setFormName(new_value)}/>
        </div>
      </div>


      {/* now same as Admin Create Questionnaire */}
    </>
  );
};

export default CreateDocQn;

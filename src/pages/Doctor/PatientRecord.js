import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import NavbarDoc from "../../components/NavbarDoc";

const PatientRecord = (props) => {
  const location = useLocation();
  const [questionnaireData, setQuestionnaireData] = useState(null);
  const [patentRecord, setpatientRecord] = useState(null);
  const [patientId, setPatientId] = useState(null);
  const [patientName, setPatientName] = useState(null);
  useEffect(() => {
    const patientId = location.state.patientId;
    const patientName = location.state.patientName;
    try {
      console.log(patientId);
      setPatientId(patientId);
      setPatientName(patientName);
    } catch (err) {
      console.log(err);
    }
  }, [location]);

    // RETRIEVE PATIENT RECORD FROM PATIENT ID
  useEffect(() => {
    // from backend
  }, [patientId]);

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
      <div className="flex justify-center h-screen -ml-12">
        <div className="text-left ">
          <h1 className="font-sans text-4xl antialiased font-semibold leading-tight tracking-normal mt-8 text-gray-700">
            Name: {patientName}
          </h1>
          <h1 className="font-sans text-4xl antialiased font-semibold leading-tight tracking-normal mt-4 mb-8 text-gray-700">
            Aabha Id: {patientId}
          </h1>
        </div>
      </div>
    </>
  );
};

export default PatientRecord;

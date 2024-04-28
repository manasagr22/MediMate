import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import NavbarDoc from "../../components/NavbarDoc";
import QuestionnaireCard from "./QuestionnaireCard";
import SchedulePopup from "./SchedulePopUp";
import Prescribe from "./PrecribeMedication";
// import { useNavigate } from "react-router-dom";

const PatientRecord = (props) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [questionnaireData, setQuestionnaireData] = useState(null);
  const [patentRecord, setpatientRecord] = useState(null);
  const [patientId, setPatientId] = useState(null);
  const [patientName, setPatientName] = useState(null);
  const [PopSchOpen, setSchPopOpen] = useState(false);
  const [PopPresOpen, setPresPopOpen] = useState(false);

  const handleCreateQn = () => {
    navigate('/doc/createQn', {replace: true, state: {patientId: location.state.patientId, patientName: location.state.patientName}});
  }
  const handleDonePatient = () => {
    navigate('/doc/dashboard', {replace: true});
  }
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

  const openSchPopup = () => {
    setSchPopOpen(true);
  };

  const closeSchPopup = () => {
    setSchPopOpen(false);
  };

  const openPresPopup = () => {
    setPresPopOpen(true);
  };

  const closePresPopup = () => {
    setPresPopOpen(false);
  };


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
      <div className="flex flex-col justify-center items-center -ml-12">
        <div className="items-center">
          <h1 className="font-sans text-4xl antialiased font-semibold leading-tight tracking-normal mt-4 text-gray-700">
            Name: {patientName}
          </h1>
          <h1 className="font-sans text-4xl antialiased font-semibold leading-tight tracking-normal mt-4 mb-8 text-gray-700">
            Aabha Id: {patientId}
          </h1>
        </div>

        <div className="flex flex-col bg-gradient-to-b from-gray-200 to-gray-300 items-center w-fit mt-10 px-10 py-16 shadow-inner shadow-xl rounded-3xl">
          <div class="flex justify-center">
            <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
              <QuestionnaireCard name={"Admin Questionnaire"} />
              <QuestionnaireCard name={"Admin Questionnaire"} />
              <QuestionnaireCard name={"Admin Questionnaire"} />
              <QuestionnaireCard name={"Admin Questionnaire"} />
              <QuestionnaireCard name={"Admin Questionnaire"} />
              <QuestionnaireCard name={"Admin Questionnaire"} />
            </div>
          </div>
          {/* BUTTONS */}
          <div class="flex justify-center mt-24">
            <div class="grid grid-cols-1 gap-4 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-3 gap-20">
              <button
                class="text-lg font-semibold h-16 w-48 pb-1 relative rounded-2xl px-5 overflow-hidden group bg-gray-800 relative hover:bg-gradient-to-r hover:from-gray-700 hover:to-gray-800 text-white hover:ring-2 hover:ring-gray-400 transition-all ease-out duration-300"
                onClick={openSchPopup}
              >
                <span class="absolute right-0 w-8 h-32 -mt-12 transition-all duration-1000 transform translate-x-12 bg-white opacity-10 rotate-12 group-hover:-translate-x-40 ease"></span>
                <span class="relative">Schedule Appointment/Visit</span>
              </button>
              <button class="text-lg font-semibold h-16 w-48 pb-1 relative rounded-2xl px-5 overflow-hidden group bg-gray-800 relative hover:bg-gradient-to-r hover:from-gray-700 hover:to-gray-800 text-white hover:ring-2 hover:ring-gray-400 transition-all ease-out duration-300 " onClick={openPresPopup}>
                <span class="absolute right-0 w-8 h-32 -mt-12 transition-all duration-1000 transform translate-x-12 bg-white opacity-10 rotate-12 group-hover:-translate-x-40 ease"></span>
                <span class="relative">Prescribe Medications</span>
              </button>
              <button class="text-lg font-semibold h-16 w-48 pb-1 relative rounded-2xl px-5 overflow-hidden group bg-gray-800 relative hover:bg-gradient-to-r hover:from-gray-700 hover:to-gray-800 text-white hover:ring-2 hover:ring-gray-400 transition-all ease-out duration-300" onClick={handleCreateQn}>
                <span class="absolute right-0 w-8 h-32 -mt-12 transition-all duration-1000 transform translate-x-12 bg-white opacity-10 rotate-12 group-hover:-translate-x-40 ease" ></span>
                <span class="relative">Create Questionnaire</span>
              </button>
            </div>
          </div>
        </div>
      </div>
      {PopSchOpen && <SchedulePopup closePopup={closeSchPopup} />}
      {PopPresOpen && <Prescribe closePopup={closePresPopup} />}

      <button className="relative px-10 py-3 text-lg  font-bold text-white transition duration-300 bg-green-400 rounded-md hover:bg-green-500 ease" style={{marginTop: '2%'}} onClick={handleDonePatient}>
        <span class="absolute bottom-0 left-0 h-full -ml-2">
          <svg
            viewBox="0 0 487 487"
            class="w-auto h-full opacity-100 object-stretch"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M0 .3c67 2.1 134.1 4.3 186.3 37 52.2 32.7 89.6 95.8 112.8 150.6 23.2 54.8 32.3 101.4 61.2 149.9 28.9 48.4 77.7 98.8 126.4 149.2H0V.3z"
              fill="#FFF"
              fill-rule="nonzero"
              fill-opacity=".1"
            ></path>
          </svg>
        </span>
        <span class="absolute top-0 right-0 w-12 h-full -mr-3">
          <svg
            viewBox="0 0 487 487"
            class="object-cover w-full h-full"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M487 486.7c-66.1-3.6-132.3-7.3-186.3-37s-95.9-85.3-126.2-137.2c-30.4-51.8-49.3-99.9-76.5-151.4C70.9 109.6 35.6 54.8.3 0H487v486.7z"
              fill="#FFF"
              fill-rule="nonzero"
              fill-opacity=".1"
            ></path>
          </svg>
        </span>
        <span class="relative">Done Patient</span>
      </button>
    </>
  );
};

export default PatientRecord;

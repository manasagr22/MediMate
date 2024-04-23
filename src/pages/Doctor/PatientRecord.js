import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import NavbarDoc from "../../components/NavbarDoc";
import QuestionnaireCard from "./QuestionnaireCard";
import SchedulePopup from "./SchedulePopUp";

const PatientRecord = (props) => {
  const location = useLocation();
  const [questionnaireData, setQuestionnaireData] = useState(null);
  const [patentRecord, setpatientRecord] = useState(null);
  const [patientId, setPatientId] = useState(null);
  const [patientName, setPatientName] = useState(null);
  const [schedulePopOpen, setSchedulePopOpen] = useState(false);
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
    setSchedulePopOpen(true);
  };

  const closeSchPopup = () => {
    setSchedulePopOpen(false);
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

        <div className="flex flex-col bg-gradient-to-b from-gray-200 to-gray-300 items-center w-fit mt-10 px-10 py-10 shadow-inner shadow-xl rounded-3xl">
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
                class="text-lg font-semibold h-16 w-48 pb-1 relative rounded-2xl px-5 overflow-hidden group bg-green-500 relative hover:bg-gradient-to-r hover:from-green-500 hover:to-green-400 text-white hover:ring-2 hover:ring-green-400 transition-all ease-out duration-300"
                onClick={openSchPopup}
              >
                <span class="absolute right-0 w-8 h-32 -mt-12 transition-all duration-1000 transform translate-x-12 bg-white opacity-10 rotate-12 group-hover:-translate-x-40 ease"></span>
                <span class="relative">Schedule Appointment/Visit</span>
              </button>
              <button class="text-lg font-semibold h-16 w-48 relative rounded-2xl px-5 overflow-hidden group bg-red-500 relative hover:bg-gradient-to-r hover:from-red-500 hover:to-red-400 text-white hover:ring-2 hover:ring-red-400 transition-all ease-out duration-300 ">
                <span class="absolute right-0 w-8 h-32 -mt-12 transition-all duration-1000 transform translate-x-12 bg-white opacity-10 rotate-12 group-hover:-translate-x-40 ease"></span>
                <span class="relative">Prescibe Mediations</span>
              </button>
              <button class="text-lg font-semibold h-16 w-48 relative rounded-2xl px-5 overflow-hidden group bg-blue-500 relative hover:bg-gradient-to-r hover:from-blue-500 hover:to-blue-400 text-white hover:ring-2 hover:ring-blue-400 transition-all ease-out duration-300">
                <span class="absolute right-0 w-8 h-32 -mt-12 transition-all duration-1000 transform translate-x-12 bg-white opacity-10 rotate-12 group-hover:-translate-x-40 ease"></span>
                <span class="relative">Create Questionnaire</span>
              </button>
            </div>
          </div>
        </div>
      </div>
      {schedulePopOpen && <SchedulePopup closePopup={closeSchPopup} />}
    </>
  );
};

export default PatientRecord;

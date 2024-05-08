import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import NavbarDoc from "../../components/NavbarDoc";
import QuestionnaireCard from "./QuestionnaireCard";
import SchedulePopup from "./SchedulePopUp";
import Prescribe from "./PrecribeMedication";
import PrescriptionCard from "./PrescriptionCard";
import { set } from "date-fns";
import Data from './Dummy.json'
import RecordCard from "./History/RecordCard";
import Questionnaire from "./History/Questionnaire";
import Prescription from "./History/Prescription";
import PrescriptionUpdate from "./History/PrescriptionUpdate"
import Status from "./History/Status"
import Appointment from "./History/Appointment"
import AppointmentUpdate from "./History/AppointmentUpdate"
import DoctorQuestionnaire from "./History/DoctorQuestionnaire";
import CreateDocQn from "./DocCreateQn";
// import { useNavigate } from "react-router-dom";

const PatientRecord = (props) => {
	const navigate = useNavigate();
	const location = useLocation();
	const [patentRecord, setpatientRecord] = useState(null);
	const [patientId, setPatientId] = useState(null);
	const [patientName, setPatientName] = useState(null);
	const [PopSchOpen, setSchPopOpen] = useState(false);
	const [PopPresOpen, setPresPopOpen] = useState(false);
	const [PopQnOpen, setQnPopOpen] = useState(false);
	const [loading, setLoading] = useState(true);
	const [record, setRecord] = useState(null);
	const [currentPage, setCurrentPage] = useState(1);
	const [totalPages, setTotalPages] = useState(0);
	const [recordSelect, setRecordSelect] = useState(null);
	// const [publicId, setPublicId] = useState(null);

	const publicId = location.state.publicId;

	// const [QuestionAnswerList, setQuestionAnswer] = useState(null);
	// const [prescriptionList, setPrescription] = useState(null);


	var questionAnswer = {};
	var allEntries = [];

	const fetchAnswers = async () => {
		try {
			const response = await fetch(`http://localhost:8082/doctor/seeReport?id=${publicId}`, {
				method: "GET",
				headers: {
					"Content-Type": "application/json",
					Authorization: `Bearer ${props.jwtToken}`,
				},
			}).then(res => res.json())

			if (response.length > 0)
				setRecord(response);
		}
		catch {
			setRecord(Data);
			props.handleAlert("danger", "Server Error Occurred!")
		}
	};

	useEffect(() => {
		if (!record && props.jwtToken)
			fetchAnswers();
		else if (record)
			setFilteredPatientCards(record);
	}, [record, props.jwtToken])

	const cardsPerPage = 7;
	const [filteredPatientCards, setFilteredPatientCards] = useState(null);

	useEffect(() => {
		if (filteredPatientCards && totalPages === 0) {
			const totalPagesCount = Math.ceil(
				filteredPatientCards.length / cardsPerPage
			);
			setTotalPages(totalPagesCount);
		}
		else if(totalPages !== 0) {
			setCurrentPage(totalPages)
		}
	}, [filteredPatientCards, totalPages]);

	const handlePageChange = (pageNumber) => {
		setCurrentPage(pageNumber);
	};

	// const handleCreateQn = () => {
	// 	navigate('/doc/createQn', { state: { patientId: location.state.patientId, patientName: location.state.patientName, publicId: location.state.publicId } });
	// }
	const handleDonePatient = () => {
		navigate('/doc/dashboard', { replace: true });
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

	const setBackground = (val) => {
		document.getElementById("backgroundDoctor").style.filter = val;
	}

	useEffect(() => {
		if (!recordSelect)
			setBackground("");
	}, [recordSelect])


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
			<>
				<div className="flex w-full h-full" id="backgroundDoctor" style={{ overflowY: "hidden" }}>

					<div className="flex flex-col w-3/4 h-full justify-center items-center">
						<div className="shadow-2xl rounded-xl bg-white">
							<div className="items-center">
								<h1 className="font-sans text-3xl antialiased font-semibold leading-tight tracking-normal mt-4 text-gray-900">
									Name: <span className="text-3xl" style={{ fontFamily: "CrimsonText-Regular", color: "blue" }}>{patientName}</span>
								</h1>
								<h1 className="font-sans text-3xl antialiased font-semibold leading-tight tracking-normal mt-4 mb-8 text-gray-900">
									Aabha Id: <span className="text-3xl" style={{ fontFamily: "CrimsonText-Regular", color: "blue" }}>{patientId}</span>
								</h1>
							</div>

							<div className="flex flex-col bg-gradient-to-b from-gray-200 to-gray-300 items-center w-fit mt-10 px-10 py-16 shadow-inner shadow-xl rounded-3xl">
								<div className="relative flex justify-center bottom-4">
								<div class="absolute justify-center flex items-center" style={{width: "24rem"}}>
								{record ? <RecordCard keyItem={0} latest={true} record={record[record.length - 1]} setRecordSelect={setRecordSelect} setBackground={setBackground} /> : undefined}
								</div>
								</div>
								{/* BUTTONS */}
								<div class="flex justify-center mt-24">
									<div class="grid grid-cols-1 gap-4 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-3 gap-20">
										<button
											class="text-lg font-semibold h-16 w-48 pb-1 relative rounded-2xl px-5 overflow-hidden group bg-blue-800 relative hover:bg-gradient-to-r hover:from-blue-700 hover:to-blue-800 text-white hover:ring-2 hover:ring-gray-400 transition-all ease-out duration-300"
											onClick={openSchPopup}
										>
											<span class="absolute right-0 w-8 h-32 -mt-12 transition-all duration-1000 transform translate-x-12 bg-white opacity-10 rotate-12 group-hover:-translate-x-40 ease"></span>
											<span class="relative">Schedule Appointment/Visit</span>
										</button>
										<button class="text-lg font-semibold h-16 w-48 pb-1 relative rounded-2xl px-5 overflow-hidden group bg-blue-800 relative hover:bg-gradient-to-r hover:from-blue-700 hover:to-blue-800 text-white hover:ring-2 hover:ring-gray-400 transition-all ease-out duration-300 " onClick={openPresPopup}>
											<span class="absolute right-0 w-8 h-32 -mt-12 transition-all duration-1000 transform translate-x-12 bg-white opacity-10 rotate-12 group-hover:-translate-x-40 ease"></span>
											<span class="relative">Prescribe Medications</span>
										</button>
										<button class="text-lg font-semibold h-16 w-48 pb-1 relative rounded-2xl px-5 overflow-hidden group bg-blue-800 relative hover:bg-gradient-to-r hover:from-blue-700 hover:to-blue-800 text-white hover:ring-2 hover:ring-gray-400 transition-all ease-out duration-300" onClick={() => setQnPopOpen(!PopQnOpen)}>
											<span class="absolute right-0 w-8 h-32 -mt-12 transition-all duration-1000 transform translate-x-12 bg-white opacity-10 rotate-12 group-hover:-translate-x-40 ease" ></span>
											<span class="relative">Create Questionnaire</span>
										</button>
									</div>
								</div>
							</div>

							{PopSchOpen && <SchedulePopup closePopup={closeSchPopup} publicId={publicId} jwtToken={props.jwtToken} setBackground={props.setBackground} handleAlert={props.handleAlert} setLoad={props.setLoad}/>}
							{PopPresOpen && <Prescribe closePopup={closePresPopup} publicId={publicId} jwtToken={props.jwtToken} setBackground={props.setBackground} handleAlert={props.handleAlert} setLoad={props.setLoad}/>}
							{PopQnOpen && <CreateDocQn closePopup={closePresPopup} publicId={publicId} jwtToken={props.jwtToken} setBackground={props.setBackground} handleAlert={props.handleAlert} setLoad={props.setLoad} setQnPopOpen={setQnPopOpen} PopQnOpen={PopQnOpen}/>}
						</div>

						<button className="relative px-10 py-3 text-lg  font-bold text-white transition duration-300 bg-green-400 rounded-md hover:bg-green-500 ease" style={{ marginTop: '2%' }} onClick={handleDonePatient}>
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
						{/* </div> */}
					</div>

					<div className="w-1/4 p-4 flex flex-col h-full bg-gray-300" style={{ borderLeftWidth: "0.1rem", borderLeftColor: "lightgray" }}>
					<p className='relative bottom-2' style={{color: "red", fontSize: 20}}>Medical History</p>
						{filteredPatientCards &&
							filteredPatientCards.slice((currentPage - 1) * cardsPerPage, currentPage * cardsPerPage)
								.map((medicalRecord, index) => (
									currentPage !== totalPages ? <RecordCard keyItem={index} latest={false} record={medicalRecord} setRecordSelect={setRecordSelect} setBackground={setBackground} /> : index !== (record.length - 1 - (currentPage-1)*cardsPerPage) ? <RecordCard keyItem={index} record={medicalRecord} setRecordSelect={setRecordSelect} setBackground={setBackground} /> : undefined
								))}
						<div>
							<div class="flex mt-2 mb-1 justify-center">
								{/* PREV */}
								<button
									className={
										1 !== currentPage
											? "px-4 py-2 mx-1 text-gray-700 transition-colors duration-300 transform bg-white rounded-md dark:bg-gray-800 dark:text-gray-200 hover:bg-blue-500 dark:hover:bg-blue-500 hover:text-white dark:hover:text-gray-200"
											: "px-4 py-2 mx-1 text-gray-700 transition-colors duration-300 transform bg-white rounded-md dark:bg-gray-800 dark:text-gray-200 cursor-not-allowed"
									}
									disabled={1 === currentPage}
									onClick={() => handlePageChange(currentPage - 1)}
								>
									<div class="flex items-center -mx-1">
										<svg
											xmlns="http://www.w3.org/2000/svg"
											class="w-6 h-6 mx-1 rtl:-scale-x-100"
											fill="none"
											viewBox="0 0 24 24"
											stroke="currentColor"
										>
											<path
												stroke-linecap="round"
												stroke-linejoin="round"
												stroke-width="2"
												d="M7 16l-4-4m0 0l4-4m-4 4h18"
											/>
										</svg>

										<span class="mx-1">Previous</span>
									</div>
								</button>

								{Array.from({ length: totalPages }, (_, i) => i + 1).map(
									(pageNumber) => (
										<button
											className={
												currentPage === pageNumber
													? "hidden px-4 py-2 mx-1 text-gray-700 transition-colors duration-300 transform bg-blue-500 rounded-md sm:inline dark:bg-gray-800 dark:text-gray-200 hover:bg-blue-500 dark:hover:bg-blue-500 hover:text-white dark:hover:text-gray-200"
													: "hidden px-4 py-2 mx-1 text-gray-700 transition-colors duration-300 transform bg-white rounded-md sm:inline dark:bg-gray-800 dark:text-gray-200 hover:bg-blue-500 dark:hover:bg-blue-500 hover:text-white dark:hover:text-gray-200"
											}
											key={pageNumber}
											onClick={() => handlePageChange(pageNumber)}
										>
											{pageNumber}
										</button>
									)
								)}

								{/* NEXT */}
								<button
									class={
										totalPages !== currentPage
											? "px-4 py-2 mx-1 text-gray-700 transition-colors duration-300 transform bg-white rounded-md dark:bg-gray-800 dark:text-gray-200 hover:bg-blue-500 dark:hover:bg-blue-500 hover:text-white dark:hover:text-gray-200"
											: "px-4 py-2 mx-1 text-gray-700 transition-colors duration-300 transform bg-white rounded-md dark:bg-gray-800 dark:text-gray-200 cursor-not-allowed"
									}
									disabled={totalPages === currentPage}
									onClick={() => handlePageChange(currentPage + 1)}
								>
									<div class="flex items-center -mx-1">
										<span class="mx-1">Next</span>

										<svg
											xmlns="http://www.w3.org/2000/svg"
											class="w-6 h-6 mx-1 rtl:-scale-x-100"
											fill="none"
											viewBox="0 0 24 24"
											stroke="currentColor"
										>
											<path
												stroke-linecap="round"
												stroke-linejoin="round"
												stroke-width="2"
												d="M17 8l4 4m0 0l-4 4m4-4H3"
											/>
										</svg>
									</div>
								</button>
							</div>
						</div>
					</div>
				</div>
				{recordSelect ? recordSelect[0] === "questionnaire" || recordSelect[0] === "Questionnaire" || recordSelect[0] === "doctorQuestionAnswer" ?
					<Questionnaire data={recordSelect[1]} setRecordSelect={setRecordSelect} /> : recordSelect[0] === "prescription" ?
						<Prescription data={recordSelect[1]} setRecordSelect={setRecordSelect} /> : recordSelect[0] === "appointment" ?
							<Appointment data={recordSelect[1]} setRecordSelect={setRecordSelect} /> : recordSelect[0] === "prescriptionUpdate" ?
								<PrescriptionUpdate data={recordSelect[1]} setRecordSelect={setRecordSelect} /> : recordSelect[0] === "status" ?
									<Status data={recordSelect[1]} setRecordSelect={setRecordSelect} /> : recordSelect[0] === "appointment" ?
										<AppointmentUpdate data={recordSelect[1]} setRecordSelect={setRecordSelect} /> : recordSelect[0] === "doctorQuestionnaire" ?
											<DoctorQuestionnaire data={recordSelect[1]} setRecordSelect={setRecordSelect} /> : undefined
					: undefined}
			</>
		</>
	);
};

export default PatientRecord;

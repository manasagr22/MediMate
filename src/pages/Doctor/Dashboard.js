import React from "react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

import NavbarDoc from "../../components/NavbarDoc";
import SearchBar from "../../pages/Hospital/SearchBar";
import PatientCard from "./PatientCard";
import { ImageNotSupported, SettingsInputAntenna } from "@mui/icons-material";
import { useEffect } from "react";
const DocDashboard = (props) => {



	// console.log(props.jwtToken);
	const [currentPage, setCurrentPage] = useState(1);
	const [totalPages, setTotalPages] = useState(1);

	const [patientList, setPatientList] = useState([
	]);

	console.log(props.jwtToken);

	const fetchData = async() => {
		const response = await fetch("http://localhost:8082/doctor/viewActivePatient",
			{
				method: "GET",
				headers: {
					"Content-Type": "application/json",
					Authorization: `Bearer ${props.jwtToken}`,
				}
			}
		);
		response.json().then(
			(data) => {
				var listOfPatients = [];
				Object.entries(data).forEach(([key, value]) => {
					var patient = {
						"name": value.firstName + " " + value.lastName,
						"aabhaId": value.aabhaId,
						"district": value.district,
						"status": value.status,
						"publicId": value.publicId
					}
					listOfPatients.push(patient);
				})
				console.log(listOfPatients[0]);
				setPatientList(listOfPatients);
			}
		).catch((error) => {
			console.error('Error:', error);
		}
		);
	}

	useEffect(() => {
		fetchData();
	}, [props.jwtToken]);


	const [searchQuery, setSearchQuery] = useState("");
	const cardsPerPage = 3;
	const [filteredPatientCards, setFilteredPatientCards] = useState(patientList);
	const handleSearchInputChange = (event) => {
		setSearchQuery(event.target.value);
	};

	const handlePageChange = (pageNumber) => {
		setCurrentPage(pageNumber);
	};

	useEffect(() => {
		const totalPagesCount = Math.ceil(
			filteredPatientCards.length / cardsPerPage
		);
		setTotalPages(totalPagesCount);
	}, [filteredPatientCards, cardsPerPage]);

	useEffect(() => {
		// Filter doctor cards based on search query
		const filteredCards = patientList.filter((patient) =>
			patient.name.toLowerCase().includes(searchQuery.toLowerCase())
		);
		setFilteredPatientCards(filteredCards);
		setCurrentPage(1); // Reset to first page when search query changes
	}, [patientList, searchQuery]);

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

			<SearchBar
				searchQuery={searchQuery}
				handlePageChange={handleSearchInputChange}
				placeholder={"Search Patients by name"}
			/>

			<h1 class="block font-sans text-5xl antialiased font-semibold leading-tight tracking-normal mt-8 text-gray-700">
				Patients to See
			</h1>
			{/* MAIN BOX */}

			{filteredPatientCards.length > 0 ? <div
				className="mt-8 mx-auto flex justify-center bg-gradient-to-b from-gray-100 to-gray-300 h-3/5 rounded-2xl shadow-[0_3px_10px_rgb(0,0,0,0.2)] px-6 pt-4"
				style={{ width: "45%" }}
			>
				<div
					class="flex flex-col items-center"
					style={{ width: "-webkit-fill-available" }}
				>
					{filteredPatientCards
						.slice((currentPage - 1) * cardsPerPage, currentPage * cardsPerPage)
						.map((patient) => (
							<PatientCard patient={patient} />
						))}

					<div>
						<div class="flex mt-2 mb-1">
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
			</div> : null}

			
		</>
	);
};

export default DocDashboard;

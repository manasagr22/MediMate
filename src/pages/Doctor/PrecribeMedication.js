import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import {
	Card,
	Input,
	Checkbox,
	Button,
	Typography,
} from "@material-tailwind/react";
import { Duration } from "luxon";

const Prescribe = (props) => {
	const closePopup = props.closePopup;
	const handleSubmit = () => {
		console.log(props);
		closePopup();

		// give data to backend
		props.setBackground("brightness(0.01)")
		props.setLoad(true);
		try {
			const url = "http://localhost:8082/doctor/followup";
			const prescription = {
				"medicine": document.getElementById("prescriptionText").value,
				"tests": document.getElementById("testText").value,
				"precautions": document.getElementById("precautionsText").value,
				"days": parseInt(document.getElementById("duration").value)
			}
			const body = {
				"id": parseInt(props.publicId),
				"type": "prescription",
				"timestamp": new Date().toISOString(),
				"prescription": prescription,
				"doctorQuestions": [],
				"appointment": {
					"duration": "",
					"date": "",
					"time": ""
				},
				"status": "false"
			}
			try {
				const response = fetch(url, {
					method: "POST",
					headers: {
						"Content-Type": "application/json",
						Authorization: `Bearer ${props.jwtToken}`,
					},
					body: JSON.stringify(body),
				})

				if (response.ok) {
					props.handleAlert("success", "Prescription Successfully Given!")
				}
				else
					props.handleAlert("danger", "Unable to give prescription!")
			}
			catch (e) {
				props.handleAlert("danger", "Server Error Occurred!")
			}
		} catch (e) {
			props.handleAlert("danger", "Server Error Occurred!")
		}
		props.setBackground("")
		props.setLoad(false);
	};
	return (
		<>
			<div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50 z-50">
				<Card color="white" shadow={false} className="bg-gradient-to-b from-gray-300 to-cyan-50 px-12 py-8 w-2/5">
					<h2 class="block antialiased tracking-normal font-sans text-4xl font-semibold leading-[1.3] text-inherit">
						Write Prescription
					</h2>

					<div className="mt-4">
						<div className="mt-4">
							<label className="flex flex-col items-start mb-1 font-semibold text-xl">Prescription</label>
							<div class="relative w-full min-w-[200px]">
								<textarea
									class="peer h-full min-h-[100px] w-full resize-none rounded-xl border border-blue-gray-200 border-t-transparent bg-white px-3 py-3 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 focus:border-2 focus:border-gray-900 focus:border-t-transparent focus:outline-0 disabled:resize-none disabled:border-0 disabled:bg-blue-gray-50"
									placeholder=" "
									id="prescriptionText"
								></textarea>
								<label class="before:content[' '] after:content[' '] pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none text-[11px] font-normal leading-tight text-blue-gray-400 transition-all before:pointer-events-none before:mt-[6.5px] before:mr-1 before:box-border before:block before:h-1.5 before:w-2.5 before:rounded-tl-md before:border-t before:border-l before:border-blue-gray-200 before:transition-all after:pointer-events-none after:mt-[6.5px] after:ml-1 after:box-border after:block after:h-1.5 after:w-2.5 after:flex-grow after:rounded-tr-md after:border-t after:border-r after:border-blue-gray-200 after:transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[4.1] peer-placeholder-shown:text-blue-gray-500 peer-placeholder-shown:before:border-transparent peer-placeholder-shown:after:border-transparent peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-gray-900 peer-focus:before:border-t-2 peer-focus:before:border-l-2 peer-focus:before:border-gray-900 peer-focus:after:border-t-2 peer-focus:after:border-r-2 peer-focus:after:border-gray-900 peer-disabled:text-transparent peer-disabled:before:border-transparent peer-disabled:after:border-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500">
									Write Prescription
								</label>
							</div>
						</div>

						<div className="mt-4">
							<label className="flex flex-col items-start mb-1 font-semibold text-xl">Duration</label>
							<div class="relative w-full min-w-[200px]">
								<input
									class="peer h-full w-full resize-none rounded-xl border border-blue-gray-200 border-t-transparent bg-white px-3 py-3 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 focus:border-2 focus:border-gray-900 focus:border-t-transparent focus:outline-0 disabled:resize-none disabled:border-0 disabled:bg-blue-gray-50"
									placeholder=" "
									id="duration"
								></input>
								<label class="before:content[' '] after:content[' '] pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none text-[11px] font-normal leading-tight text-blue-gray-400 transition-all before:pointer-events-none before:mt-[6.5px] before:mr-1 before:box-border before:block before:h-1.5 before:w-2.5 before:rounded-tl-md before:border-t before:border-l before:border-blue-gray-200 before:transition-all after:pointer-events-none after:mt-[6.5px] after:ml-1 after:box-border after:block after:h-1.5 after:w-2.5 after:flex-grow after:rounded-tr-md after:border-t after:border-r after:border-blue-gray-200 after:transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[4.1] peer-placeholder-shown:text-blue-gray-500 peer-placeholder-shown:before:border-transparent peer-placeholder-shown:after:border-transparent peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-gray-900 peer-focus:before:border-t-2 peer-focus:before:border-l-2 peer-focus:before:border-gray-900 peer-focus:after:border-t-2 peer-focus:after:border-r-2 peer-focus:after:border-gray-900 peer-disabled:text-transparent peer-disabled:before:border-transparent peer-disabled:after:border-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500">
									Enter Duration
								</label>
							</div>
						</div>

						<div className="mt-4">
							<label className="flex flex-col items-start mb-1 font-semibold  text-xl">Tests</label>
							<div class="relative w-full min-w-[200px]">
								<textarea
									class="peer h-full min-h-[100px] w-full resize-none rounded-xl border border-blue-gray-200 border-t-transparent bg-white px-3 py-3 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 focus:border-2 focus:border-gray-900 focus:border-t-transparent focus:outline-0 disabled:resize-none disabled:border-0 disabled:bg-blue-gray-50"
									placeholder=" "
									id="testText"
								></textarea>
								<label class="before:content[' '] after:content[' '] pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none text-[11px] font-normal leading-tight text-blue-gray-400 transition-all before:pointer-events-none before:mt-[6.5px] before:mr-1 before:box-border before:block before:h-1.5 before:w-2.5 before:rounded-tl-md before:border-t before:border-l before:border-blue-gray-200 before:transition-all after:pointer-events-none after:mt-[6.5px] after:ml-1 after:box-border after:block after:h-1.5 after:w-2.5 after:flex-grow after:rounded-tr-md after:border-t after:border-r after:border-blue-gray-200 after:transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[4.1] peer-placeholder-shown:text-blue-gray-500 peer-placeholder-shown:before:border-transparent peer-placeholder-shown:after:border-transparent peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-gray-900 peer-focus:before:border-t-2 peer-focus:before:border-l-2 peer-focus:before:border-gray-900 peer-focus:after:border-t-2 peer-focus:after:border-r-2 peer-focus:after:border-gray-900 peer-disabled:text-transparent peer-disabled:before:border-transparent peer-disabled:after:border-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500">
									Write Tests
								</label>
							</div>
						</div>

						<div className="mt-4">
							<label className="flex flex-col items-start mb-1 font-semibold text-xl">Precautions</label>
							<div class="relative w-full min-w-[200px]">
								<textarea
									class="peer h-full min-h-[100px] w-full resize-none rounded-xl border border-blue-gray-200 border-t-transparent bg-white px-3 py-3 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 focus:border-2 focus:border-gray-900 focus:border-t-transparent focus:outline-0 disabled:resize-none disabled:border-0 disabled:bg-blue-gray-50"
									placeholder=" "
									id="precautionsText"
								></textarea>
								<label class="before:content[' '] after:content[' '] pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none text-[11px] font-normal leading-tight text-blue-gray-400 transition-all before:pointer-events-none before:mt-[6.5px] before:mr-1 before:box-border before:block before:h-1.5 before:w-2.5 before:rounded-tl-md before:border-t before:border-l before:border-blue-gray-200 before:transition-all after:pointer-events-none after:mt-[6.5px] after:ml-1 after:box-border after:block after:h-1.5 after:w-2.5 after:flex-grow after:rounded-tr-md after:border-t after:border-r after:border-blue-gray-200 after:transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[4.1] peer-placeholder-shown:text-blue-gray-500 peer-placeholder-shown:before:border-transparent peer-placeholder-shown:after:border-transparent peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-gray-900 peer-focus:before:border-t-2 peer-focus:before:border-l-2 peer-focus:before:border-gray-900 peer-focus:after:border-t-2 peer-focus:after:border-r-2 peer-focus:after:border-gray-900 peer-disabled:text-transparent peer-disabled:before:border-transparent peer-disabled:after:border-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500">
									Write Precautions
								</label>
							</div>
						</div>

						<div className="flex justify-center gap-4 mt-12">
							<button
								class="select-none rounded-lg border border-gray-900 py-3 px-6 text-center align-middle font-sans text-xs font-bold uppercase text-gray-900 transition-all hover:opacity-75 focus:ring focus:ring-gray-300 active:opacity-[0.85] disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
								type="button"
								onClick={() => closePopup()}>
								Close
							</button>
							<button
								class="select-none rounded-lg bg-gradient-to-tr from-gray-900 to-gray-800 py-3 px-6 text-center align-middle font-sans text-xs font-bold uppercase text-white shadow-md shadow-gray-900/10 transition-all hover:shadow-lg hover:shadow-gray-900/20 active:opacity-[0.85] disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
								type="button"
								onClick={handleSubmit}>
								Give Prescription
							</button>
						</div>

					</div>
				</Card>
			</div>
		</>
	);
};

export default Prescribe;

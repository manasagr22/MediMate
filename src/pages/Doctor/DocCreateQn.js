import React, { useState, useEffect } from "react";
import NavbarDoc from "../../components/NavbarDoc";
import { Card, Input } from "@material-tailwind/react";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import { Box } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { Duration } from "luxon";

const CreateDocQn = (props) => {
	const navigate = useNavigate();
	const location = useLocation()
	const [formName, setFormName] = useState("");
	const [categoryNo, setCategory] = useState(1);
	const [preview, setPreview] = useState("Show");
	const [patientId, setPatientId] = useState(null);
	const [patientName, setPatientName] = useState("");
	const [options_list, setOptionsList] = useState(["", "", "", ""]);
	const [type, setType] = useState("mcq");
	const [object, setObject] = useState(null);
	const loginActiveUser = JSON.parse(localStorage.getItem("loginActiveUser"));
	// useEffect(() => {
	// 	for (let i = 1; i <= 3; i++) {
	// 		let ele = document.getElementById(`${i}`);
	// 		if (i == categoryNo) {
	// 			ele.className =
	// 				"w-full relative inline-flex items-center justify-center p-4 overflow-hidden text-lg font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-green-400 to-blue-600 group-hover:from-green-400 group-hover:to-blue-600 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-green-200 dark:focus:ring-green-800 buttonClass";
	// 			ele.style.fontWeight = "700";
	// 		} else {
	// 			ele.className =
	// 				"inline-block text-lg w-full p-4 bg-gray-150 hover:bg-gray-100 focus:outline-none dark:bg-gray-700 dark:hover:bg-gray-600 buttonClass";
	// 			ele.style.fontWeight = "500";
	// 		}
	// 	}
	// 	if (categoryNo === 1) setType("mcq");
	// 	else if (categoryNo === 2) setType("descriptive");
	// 	else setType("range");
	// }, [categoryNo]);

	// useEffect(() => {
	// 	const patientId = location.state.patientId;
	// 	const patientName = location.state.patientName;
	// 	try {
	// 		console.log(patientName);
	// 		setPatientId(patientId);
	// 		setPatientName(patientName);
	// 	} catch (err) {
	// 		console.log(err);
	// 	}
	// }, [location]);

	//   useEffect(() => {
	//     const fetchData = async () => {
	//       if (object !== null) {
	//         if (object.question !== "") {
	//           // console.log(object)
	//           const key = "Bearer " + props.jwtToken;
	//           const url3 = "http://localhost:8082/doctor/setQ";
	//           // console.log("object: ", object);

	//           try {
	//             const result3 = await fetch(url3, {
	//               method: "POST",
	//               headers: {
	//                 "Content-Type": "application/json",
	//                 Authorization: key,
	//               },
	//               body: object,
	//             }).then((res) => res.json());

	//             if (result3 === true) {
	//               props.handleAlert("success", "Question Added!");
	//               document.getElementById("message").value = "";
	//               setOptionsList(["", "", "", ""]);
	//               const elements = document.getElementsByClassName("inputClass");
	//               for (let i = 0; i < elements.length; i++) {
	//                 elements[i].value = "";
	//                 elements[i].style.borderTopColor = "gray";
	//               }
	//               setObject(null);
	//             } else {
	//               props.handleAlert("danger", "Unable to add Question!");
	//             }
	//           } catch {
	//             props.handleAlert("danger", "Error adding question");
	//           } finally {
	//             props.setBackground("");
	//             props.setLoad(false);
	//           }
	//         }
	//       }
	//     };

	// //     fetchData();
	// //   }, [object]);

	// const fetchData = async () => {
	// 	if (object !== null) {
	// 		if (object.question !== "") {
	// 			// console.log(object)
	// 			const key = "Bearer " + props.jwtToken;
	// 			const url3 = "http://localhost:8082/doctor/setQ";
	// 			// console.log("object: ", object);

	// 			try {
	// 				const result3 = await fetch(url3, {
	// 					method: "POST",
	// 					headers: {
	// 						"Content-Type": "application/json",
	// 						Authorization: key,
	// 					},
	// 					body: object,
	// 				}).then((res) => res.json());

	// 				if (result3 === true) {
	// 					props.handleAlert("success", "Question Added!");
	// 					document.getElementById("message").value = "";
	// 					setOptionsList(["", "", "", ""]);
	// 					const elements = document.getElementsByClassName("inputClass");
	// 					for (let i = 0; i < elements.length; i++) {
	// 						elements[i].value = "";
	// 						elements[i].style.borderTopColor = "gray";
	// 					}
	// 					setObject(null);
	// 				} else {
	// 					props.handleAlert("danger", "Unable to add Question!");
	// 				}
	// 			} catch {
	// 				props.handleAlert("danger", "Error adding question");
	// 			} finally {
	// 				props.setBackground("");
	// 				props.setLoad(false);
	// 			}
	// 		}
	// 	}
	// };

	// async function addQuestion2(ques, key, id) {
	// 	if (type === "mcq") {
	// 		const elements = document.getElementsByClassName("inputClass");
	// 		let list = [];
	// 		for (let i = 0; i < elements.length; i++) {
	// 			// console.log(elements[i].value)
	// 			list.push(elements[i].value);
	// 		}
	// 		if (list.length !== 0) {
	// 			setObject(
	// 				JSON.stringify({
	// 					type: type,
	// 					question: ques,
	// 					optA: list[0],
	// 					optB: list[1],
	// 					optC: list[2],
	// 					optD: list[3],
	// 					qnId: id,
	// 				})
	// 			);
	// 		} else {
	// 			setObject(
	// 				JSON.stringify({
	// 					type: type,
	// 					question: ques,
	// 					optA: options_list[0],
	// 					optB: options_list[1],
	// 					optC: options_list[2],
	// 					optD: options_list[3],
	// 					qnId: id,
	// 				})
	// 			);
	// 		}
	// 	} else {
	// 		setObject(
	// 			JSON.stringify({
	// 				type: type,
	// 				question: ques,
	// 				qnId: id,
	// 			})
	// 		);
	// 	}
	// }

	// async function addQuestion() {
	// 	console.log(props.jwtToken);
	// 	const url = new URL("http://localhost:8082/doctor/followup");
	// 	const publicId = location.state.publicId;
	// 	const ques = document.getElementById("message").value;
	// 	if (categoryNo === 1) {		//mcq
	// 		const object = {
	// 			"id": publicId,
	// 			"type": "doctorQuestionnaire",
	// 			"timestamp": new Date().toISOString(),
	// 			"prescription": {
	// 				"medicine": "",
	// 				"test": "",
	// 				"precaution": "",
	// 			},
	// 			"doctorQuestions": [
	// 				{
	// 					"type": "mcq",
	// 					"question": ques,
	// 					"optA": document.getElementById("optionA").value,
	// 					"optB": document.getElementById("optionB").value,
	// 					"optC": document.getElementById("optionC").value,
	// 					"optD": document.getElementById("optionD").value,
	// 				}
	// 			],
	// 			"appointment": {
	// 				"duration": Duration.fromISO("PT0H0M"),
	// 				"date": "",
	// 				"time": ""
	// 			},
	// 			"status": "false"
	// 		}
	// 		const response = await fetch(url, {
	// 			method: "POST",
	// 			headers: {
	// 				"Content-Type": "application/json",
	// 				Authorization: `Bearer ${props.jwtToken}`,
	// 			},
	// 			body: JSON.stringify(object),
	// 		}).then(
	// 			(data) => {
	// 				console.log(data);
	// 			}
	// 		);
	// 	}
	// 	else if (categoryNo === 2) {	//descriptive
	// 		const object = {
	// 			"id": publicId,
	// 			"type": "doctorQuestionnaire",
	// 			"timestamp": new Date().toISOString(),
	// 			"prescription": {
	// 				"medicine": "",
	// 				"test": "",
	// 				"precaution": "",
	// 			},
	// 			"doctorQuestions": [
	// 				{
	// 					"type": "descriptive",
	// 					"question": ques,
	// 				}
	// 			],
	// 			"appointment": {
	// 				"duration": Duration.fromISO("PT0H0M"),
	// 				"date": "",
	// 				"time": ""
	// 			},
	// 			"status": "false"
	// 		}
	// 		const response = await fetch(url, {
	// 			method: "POST",
	// 			headers: {
	// 				"Content-Type": "application/json",
	// 				Authorization: `Bearer ${props.jwtToken}`,
	// 			},
	// 			body: JSON.stringify(object),
	// 		}).then(
	// 			(data) => {
	// 				console.log(data);
	// 			}
	// 		);
	// 	}
	// 	else if (categoryNo === 3) {	//range
	// 		const object = {
	// 			"id": publicId,
	// 			"type": "doctorQuestionnaire",
	// 			"timestamp": new Date().toISOString(),
	// 			"prescription": {
	// 				"medicine": "",
	// 				"test": "",
	// 				"precaution": "",
	// 			},
	// 			"doctorQuestions": [
	// 				{
	// 					"type": "range",
	// 					"question": ques,
	// 				}
	// 			],
	// 			"appointment": {
	// 				"duration": Duration.fromISO("PT0H0M"),
	// 				"date": "",
	// 				"time": ""
	// 			},
	// 			"status": "false"
	// 		}
	// 		const response = await fetch(url, {
	// 			method: "POST",
	// 			headers: {
	// 				"Content-Type": "application/json",
	// 				Authorization: `Bearer ${props.jwtToken}`,
	// 			},
	// 			body: JSON.stringify(object),
	// 		}).then(
	// 			(data) => {
	// 				console.log(data);
	// 			}
	// 		);

	// 	}

	// }

	// const handleSubmit = () => {

	// 	navigate('/doc/patientrecord', { replace: true, state: { patientId: patientId, patientName: patientName } });
	// }
	const closePopup = props.closePopup;
	const handleSubmit = () => {
		closePopup();

		// give data to backend
		props.setBackground("brightness(0.01)")
		props.setLoad(true);
		try {
			const url = "http://localhost:8082/doctor/followup";
			const prescription = {
				"medicine": "",
				"tests": "",
				"precautions": "",
				"days": 0
			}
			const body = {
				"id": props.publicId,
				"type": "prescription",
				"timestamp": new Date().toISOString(),
				"prescription": prescription,
				"doctorQuestions": [],
				"appointment": {
					"duration": Duration.fromISO("PT0H0M"),
					"date": "",
					"time": ""
				},
				"doctorQuestions": {
					"type": "descriptive",
					"question": document.getElementById("message").value,
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

			<>
				<div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50 z-50">
					<Card color="white" shadow={false} className="bg-gradient-to-b from-gray-300 to-cyan-50 px-12 py-8 w-2/5">
						<h2 class="block antialiased tracking-normal font-sans text-4xl font-semibold leading-[1.3] text-inherit">
							Create Questionnaire
						</h2>

						<div className="mt-4">
							<div className="mt-4">
								<label className="flex flex-col items-start mb-1 font-semibold text-xl">Question</label>
								<div class="relative w-full min-w-[200px]">
									<textarea
										class="peer h-full min-h-[100px] w-full resize-none rounded-xl border border-blue-gray-200 border-t-transparent bg-white px-3 py-3 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 focus:border-2 focus:border-gray-900 focus:border-t-transparent focus:outline-0 disabled:resize-none disabled:border-0 disabled:bg-blue-gray-50"
										placeholder=" "
										id="message"
									></textarea>
									<label class="before:content[' '] after:content[' '] pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none text-[11px] font-normal leading-tight text-blue-gray-400 transition-all before:pointer-events-none before:mt-[6.5px] before:mr-1 before:box-border before:block before:h-1.5 before:w-2.5 before:rounded-tl-md before:border-t before:border-l before:border-blue-gray-200 before:transition-all after:pointer-events-none after:mt-[6.5px] after:ml-1 after:box-border after:block after:h-1.5 after:w-2.5 after:flex-grow after:rounded-tr-md after:border-t after:border-r after:border-blue-gray-200 after:transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[4.1] peer-placeholder-shown:text-blue-gray-500 peer-placeholder-shown:before:border-transparent peer-placeholder-shown:after:border-transparent peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-gray-900 peer-focus:before:border-t-2 peer-focus:before:border-l-2 peer-focus:before:border-gray-900 peer-focus:after:border-t-2 peer-focus:after:border-r-2 peer-focus:after:border-gray-900 peer-disabled:text-transparent peer-disabled:before:border-transparent peer-disabled:after:border-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500">
										Write your Question..
									</label>
								</div>
							</div>

							<div className="flex justify-center gap-4 mt-12">
								<button
									class="select-none rounded-lg border border-gray-900 py-3 px-6 text-center align-middle font-sans text-xs font-bold uppercase text-gray-900 transition-all hover:opacity-75 focus:ring focus:ring-gray-300 active:opacity-[0.85] disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
									type="button"
									onClick={() => props.setQnPopOpen(!props.PopQnOpen)}>
									Close
								</button>
								<button
									class="select-none rounded-lg bg-gradient-to-tr from-gray-900 to-gray-800 py-3 px-6 text-center align-middle font-sans text-xs font-bold uppercase text-white shadow-md shadow-gray-900/10 transition-all hover:shadow-lg hover:shadow-gray-900/20 active:opacity-[0.85] disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
									type="button"
									onClick={handleSubmit}>
									Add Question
								</button>
							</div>

						</div>
					</Card>
				</div>
			</>
		</>
	);
};

export default CreateDocQn;

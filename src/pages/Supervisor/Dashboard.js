import React, { useEffect, useState } from 'react';
import NavbarSup from "../../components/NavbarSup";
import PieChart from "./PieChart";
import {
	Typography,
	Menu,
	MenuHandler,
	MenuList,
	MenuItem,
} from "@material-tailwind/react";
import {
	ChevronDownIcon,
} from "@heroicons/react/24/solid";
import { Select, Option } from "@material-tailwind/react";
import { Button } from '@mui/material';


export default function Dashboard(props) {
	const defaultPatientData = {
		'red': 52,
		'yellow': 23,
		'green': 90
	}

	const [isMenuOpen, setIsMenuOpen] = useState(false);
	const [state, setState] = useState(null);
	const [district, setDistrict] = useState(null);
	const [subDistrict, setSubDistrict] = useState([]);
	const [selectedSubDistrict, setSelectedSubDistrict] = useState(null);
	const [patientData, setPatientData] = useState(null);
	const [data, setData] = useState({
		labels: ['Critical', 'Sick', 'Healthy'],
		datasets: [
			{
				label: '# of Patients',
				data: [52, 23, 90],
				backgroundColor: ['red', 'blue', 'yellow'],
				borderColor: ['red', 'blue', 'yellow'],
				borderWidth: 1,
			},
		],
	});

	// const getState = async () => {
	// 	const response = await fetch("http://localhost:8082/supervisor/getSupState", {
	// 		method: "GET",
	// 		headers: {
	// 			"Content-Type": "application/json",
	// 			Authorization: `Bearer ${props.jwtToken}`,
	// 		}
	// 	})

	// 	response.json().then(
	// 		(data) => {
	// 			console.log(data['state']);
	// 			setState(data['state']);
	// 			getDistrict(data['state']);
	// 		}
	// 	).catch((error) => {
	// 		console.error('Error:', error);
	// 	}
	// 	);
	// }

	// const getDistrict = async () => {
	// 	const response = await fetch(`http://localhost:8082/supervisor/getSupDistrict`, {
	// 		method: "GET",
	// 		headers: {
	// 			"Content-Type": "application/json",
	// 			Authorization: `Bearer ${props.jwtToken}`,
	// 		}
	// 	});
	// 	response.json().then(
	// 		(data) => {
	// 			console.log(data['district']);
	// 			setDistrict(data['district']);
	// 			console.log(state);
	// 			getSubDistrict();
	// 		}
	// 	).catch((error) => {
	// 		console.error('Error:', error);
	// 	}
	// 	);
	// }

	useEffect(() => {
		async function getDistrict() {
			if (state !== null && state !== 0) {
				try {
					const url = new URL("http://localhost:8082");
					url.pathname = '/supervisor/getSupDistrict';
					// url.searchParams.set('state', state);
					const dis = await fetch(url, {
						method: "GET",
						headers: {
							"Content-Type": "application/json",
							"Authorization": "Bearer " + props.jwtToken
						}
					}).then(res => res.json());
					setDistrict(dis.district);
				}
				catch (error) {
					props.handleAlert("danger", "Some Error Occurred!")
				}
			}
			else if ((state === null && props.jwtToken !== null) || (state === 0 && props.jwtToken !== null)) {
				try {
					// const url = new URL("http://localhost:8082");
					const url = 'http://localhost:8082/supervisor/getSupState';
					const key = "Bearer " + props.jwtToken;
					console.log(key)
					const dis = await fetch(url, {
						method: "GET",
						headers: {
							"Content-Type": "application/json",
							"Authorization": key
						}
					}).then((res) => res.json());
					setState(dis.state);
				}
				catch (error) {
					props.handleAlert("danger", "Some Error Occurred!")
				}
			}
		}
		console.log("State: ", state)
		getDistrict();
	}, [state, props.jwtToken])

	useEffect(() => {
		async function getSubDistrict() {
			if (district !== null) {
				try {
					const url = new URL("http://localhost:8082");
					url.pathname = '/supervisor/getSubDistrict';
					url.searchParams.set('state', state);
					url.searchParams.set('district', district);
					const dis = await fetch(url, {
						method: "GET",
						headers: {
							"Content-Type": "application/json",
							"Authorization": "Bearer " + props.jwtToken
						}
					}).then(res => res.json());
					setSubDistrict(dis);
				}
				catch (error) {
					props.handleAlert("danger", "Some Error Occurred!")
				}
			}
		}
		if(district && props.jwtToken)
			getSubDistrict();
	}, [district, props.jwtToken])

	useEffect(() => {
		if(subDistrict.length > 0)
			setSelectedSubDistrict(subDistrict[0]);
	}, [subDistrict])

	const getSurvey = async () => {
		try {
		const response = await fetch(`http://localhost:8082/supervisor/getSurveyDetailsByRegion?subDistrict=${selectedSubDistrict}`, {
			method: "GET",
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${props.jwtToken}`,
			}
		}).then(res => res.json())

		setPatientData(response);
	}
	catch {
		;
	}
		// response.json().then(
		// 	(data) => {
		// 		if (data['red'] !== 0 || data['yellow'] !== 0 || data['green'] !== 0) {
		// 			setData(data);
		// 		}
		// 		else {
		// 			setData(defaultPatientData);
		// 		}
		// 		console.log(data);
		// 	}
		// ).catch((error) => {
		// 	console.error('Error:', error);
		// }
		// );

	}

	useEffect(() => {
		if(patientData) {
			setData({
				labels: ['Critical', 'Sick', 'Healthy'],
				datasets: [
					{
						label: '# of Patients',
						data: [patientData['red'], patientData['yellow'], patientData['green']],
						backgroundColor: ['red', 'blue', 'yellow'],
						borderColor: ['red', 'blue', 'yellow'],
						borderWidth: 1,
					},
				],
			});
		}
	}, [patientData])

	// const handleSubDistrictSelect = (subDistrict) => {
	// 	setSelectedSubDistrict(subDistrict);
	// 	getSurvey(subDistrict);
	// 	setIsMenuOpen(false);
	// }

	function NavListMenu(props) {
		return (
			<div className="w-72" style={{ marginLeft: 15 }}>
				<Select id="subDistrictId" color="black" label="Sub Division" labelProps={{
					className: "text-blue-gray-600"
				}}
					containerProps={{
						className: "bg-white"
					}}
					onChange={(val) => props.setSelectedSubDistrict(val)}
					required>
					{props.subDistrict.map((dist, index) => {
						return (
							<Option key={dist} value={dist}>{dist}</Option>
						)
					})}
				</Select>
			</div>
		);
	}

	


	return (
		<div>
			<div className="navBar">
				<NavbarSup checkToken={props.checkToken} page={"dashboard"} setJwtToken={props.setJwtToken} jwtToken={props.jwtToken} decryptData={props.decryptData} handleAlert={props.handleAlert} setBackground={props.setBackground} setLoad={props.setLoad} />
				<h1 class="">Area wise Graphs</h1>
			</div>
			{/* <div class="text-black-500 order-3 w-full md:w-auto md:order-2 text-lg text-left pl-10 pt-10">
				Select the sub district */}
			{subDistrict.length > 0 && <NavListMenu subDistrict={subDistrict} setSelectedSubDistrict={setSelectedSubDistrict}/>}
			<Button onClick={getSurvey}>Get Graph</Button>
			{patientData ? <PieChart data={data} width={2} height={2} /> : undefined}
			{/* </div> */}
		</div>

	)
}

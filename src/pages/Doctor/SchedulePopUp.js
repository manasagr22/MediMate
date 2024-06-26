import React, { useState } from "react";
import { DateCalendar } from "@mui/x-date-pickers/DateCalendar";
import dayjs from "dayjs";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { renderTimeViewClock } from '@mui/x-date-pickers/timeViewRenderers';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';


function Popup(props) {
	const closePopup = props.closePopup;
	const [selectedDate, setSelectedDate] = useState(null);
	const [date, setDate] = useState(null);

	// Function to generate an array of days for the current month

	const handleDateClick = (day) => { };

	function formatDateTime(dateString) {
		const dateObject = new Date(dateString);

		// Extract date and time components
		const year = dateObject.getFullYear();
		const month = (dateObject.getMonth() + 1).toString().padStart(2, '0');
		const day = dateObject.getDate().toString().padStart(2, '0');
		const hours = dateObject.getHours().toString().padStart(2, '0');
		const minutes = dateObject.getMinutes().toString().padStart(2, '0');
		const seconds = dateObject.getSeconds().toString().padStart(2, '0');

		
		// Format date as "DD/MM/YYYY"
		const formattedDate = `${year}-${month}-${day}`;

		// Format time as "HH:MM:SS"
		const formattedTime = `${hours}:${minutes}`;

		return { formattedDate, formattedTime };
	}

	const handleSubmit = () => {
		const d = new Date(date).toISOString()
		const { formattedDate, formattedTime } = formatDateTime(d);
		props.setBackground("brightness(0.01)")
		props.setLoad(true);
		try {
			const url = "http://localhost:8082/doctor/followup";
			const body = {
				"id": parseInt(props.publicId),
				"type": "appointment",
				"timestamp": new Date().toISOString(),
				"appointment": {
					"date": formattedDate,
					"time": formattedTime
				},
				"status": "false"
			}
			try {
				const response = fetch(url, {
					method: "POST",
					headers: {
						"Content-Type": "application/json",
						Authorization: "Bearer " + props.jwtToken,
					},
					body: JSON.stringify(body),
				})

				console.log(body);

				if (response.data === "FollowUp given successfully!") {
					props.handleAlert("success", "Appointment Successfully Scheduled!")
				}
				else
					props.handleAlert("danger", "Unable to schedule appointment!")
			}
			catch (e) {
				props.handleAlert("danger", "Server Error Occurred!")
			}
		} catch (e) {
			props.handleAlert("danger", "Server Error Occurred!")
		}
		props.setBackground("")
		props.setLoad(false);
		closePopup();
	};

	return (
		<div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50 z-50">
			<div className="bg-gradient-to-b from-gray-300 to-cyan-50 px-5 py-5 rounded-2xl">
				<h3 class="block font-sans text-2xl antialiased font-semibold leading-snug tracking-normal text-gray-800">
					Select Date for Appointment/Visit
				</h3>
				<LocalizationProvider dateAdapter={AdapterDayjs}>
					<DemoContainer components={['DateTimePicker', 'DateTimePicker']}>
						{/* <DateCalendar
						label="Schedule Appointment"
						onChange={(newValue) => setDate(newValue)}
						value={date}
						style={{ height: "200rem", width: "30rem" }}
					/> */}
						<DateTimePicker
							label="Schedule Appointment"
							// viewRenderers={{
							// 	hours: renderTimeViewClock,
							// 	minutes: renderTimeViewClock,
							// 	seconds: renderTimeViewClock,
							// }}
							onChange={(newValue) => setDate(newValue)}
							value={date}
							style={{ height: "200rem", width: "30rem" }}
						/>
					</DemoContainer>
				</LocalizationProvider>

				<div className="flex justify-center gap-4">
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
						Submit Date
					</button>
				</div>
			</div>
		</div>
	);
}

export default Popup;

import React, { useEffect, useState} from 'react';
import NavbarSup from "../../components/NavbarSup";
import PieChart  from "./PieChart";
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


export default function MonitorRegion(props) {



	return (
		<div>
			<div className="navBar">
				<NavbarSup checkToken={props.checkToken} page={"supervisors"} setJwtToken={props.setJwtToken} jwtToken={props.jwtToken} decryptData={props.decryptData} handleAlert={props.handleAlert} setBackground={props.setBackground} setLoad={props.setLoad} />
				{/* <h1 class="">Area wise Graphs</h1> */}
			</div>
			{/* <div class="text-black-500 order-3 w-full md:w-auto md:order-2 text-lg text-left pl-10 pt-10">
				Select the sub district */}
			{/* </div> */}
		</div>

	)
}

import React, { useEffect, useState } from "react";
// import Navbar from '../../components/Navbar'
import NavbarSup from "../../components/NavbarSup";
import { useNavigate } from "react-router-dom";
import { isFuture } from "date-fns";
const SupervisorDashboard = (props) => {
    const navigate = useNavigate();

    return(
    <div className="navBar">
        <NavbarSup checkToken={props.checkToken} page={"dashboard"} setJwtToken={props.setJwtToken} jwtToken={props.jwtToken} decryptData={props.decryptData} handleAlert={props.handleAlert} setBackground={props.setBackground} setLoad={props.setLoad}/>
        {/* <h1>Graphs</h1> */}
    </div>)
}

export default SupervisorDashboard;
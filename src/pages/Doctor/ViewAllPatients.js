import React from "react";
import NavbarDoc from "../../components/NavbarDoc";

const ViewAllPatients = (props) => {
    return (<>
        <NavbarDoc checkToken={props.checkToken} setJwtToken={props.setJwtToken} jwtToken={props.jwtToken} decryptData={props.decryptData} handleAlert={props.handleAlert} setBackground={props.setBackground} setLoad={props.setLoad} setDoctorNotification={props.setDoctorNotification}/>
    </>)
}

export default ViewAllPatients;
import React from "react";
// import Navbar from '../../components/Navbar'
import NavbarFW from "../../components/NavbarFW";
import { useNavigate } from "react-router-dom";
const FWDashboard = (props) => {
    const navigate = useNavigate();
    if(props.jwtToken === null) {
        const jwt = JSON.parse(localStorage.getItem("/"));
        if(jwt === "" || jwt === null)
            navigate('/', {replace: true});
        else {
            props.setJwtToken(props.decryptData());
        }
    }
    else {
        // console.log(props.jwtToken)
    }

    return(
    <div>
        <NavbarFW checkToken={props.checkToken} page={"dashboard"} setJwtToken={props.setJwtToken} jwtToken={props.jwtToken} decryptData={props.decryptData} handleAlert={props.handleAlert} setBackground={props.setBackground} setLoad={props.setLoad}/>
        <h1>Graphs</h1>
    </div>)
}

export default FWDashboard;
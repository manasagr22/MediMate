import React from "react";
import NavbarAd from '../../components/NavbarAd'
import { useNavigate } from "react-router-dom";
const AdminHomePage = (props) => {
    const navigate = useNavigate();
    // props.checkToken();

    return(
    <div>
        <NavbarAd page={"dashboard"} checkToken={props.checkToken} setJwtToken={props.setJwtToken} jwtToken={props.jwtToken} decryptData={props.decryptData} handleAlert={props.handleAlert} setBackground={props.setBackground} setLoad={props.setLoad}/>
        <h1>Graphs</h1>
    </div>)
}

export default AdminHomePage;
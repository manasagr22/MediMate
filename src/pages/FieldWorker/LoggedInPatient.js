import React from "react";
// import Navbar from '../../components/Navbar'
import NavbarFW2 from "../../components/NavbarFW2";
import { useNavigate } from "react-router-dom";
const LoggedInPatient = (props) => {
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
        <NavbarFW2 page={"dashboard"}/>
        <h1>Graphs</h1>
    </div>)
}

export default LoggedInPatient;
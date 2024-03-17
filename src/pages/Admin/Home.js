import React from "react";
import NavbarAd from '../../components/NavbarAd'
import { useNavigate } from "react-router-dom";
const AdminHomePage = (props) => {
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
        <NavbarAd page={"dashboard"}/>
        <h1>Graphs</h1>
    </div>)
}

export default AdminHomePage;
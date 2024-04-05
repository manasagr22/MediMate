import React from "react";
import NavbarAd from '../../components/NavbarAd'
import { useNavigate } from "react-router-dom";
const AdminHomePage = (props) => {
    const navigate = useNavigate();
    props.checkToken();

    return(
    <div>
        <NavbarAd page={"dashboard"}/>
        <h1>Graphs</h1>
    </div>)
}

export default AdminHomePage;
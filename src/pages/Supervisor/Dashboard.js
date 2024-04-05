import React from "react";
// import Navbar from '../../components/Navbar'
import NavbarSup from "../../components/NavbarSup";
import { useNavigate } from "react-router-dom";
const SupervisorDashboard = (props) => {
    const navigate = useNavigate();
    props.checkToken();

    return(
    <div>
        <NavbarSup page={"dashboard"}/>
        {/* <h1>Graphs</h1> */}
    </div>)
}

export default SupervisorDashboard;
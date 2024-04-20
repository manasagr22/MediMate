import React from "react";
import { useNavigate } from "react-router-dom";
import NavbarDoc from "../../components/NavbarDoc";
const DocDashboard = (props) => {
   return(<>
   <NavbarDoc checkToken={props.checkToken} setJwtToken={props.setJwtToken} jwtToken={props.jwtToken} decryptData={props.decryptData} handleAlert={props.handleAlert} setBackground={props.setBackground} setLoad={props.setLoad}/>
   </>)
}

export default DocDashboard;
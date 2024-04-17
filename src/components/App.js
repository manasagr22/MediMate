import "../styles/App.css";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useNavigate,
} from "react-router-dom";
import { useEffect, useState } from "react";
import Home from "./Home";
import Header from "./Header";
import About from "./About";
import Doctors from "./Doctors";
import Services from "./Services";
import Contact from "./Contact";
import LoginPop from "./LoginPop";
import Login from "./Login";
import Spinner from "./Spinner";
import AdminHomePage from "../pages/Admin/Home";
import SeeSuperVisor from "../pages/Admin/Supervisor";
import AddSuperVisor from "../pages/Admin/AddSuperVisor";
import SeeDoctors from "../pages/Admin/Doctors";
import SeeWorkers from "../pages/Admin/FieldWorkers";
import SupervisorDashboard from "../pages/Supervisor/Dashboard";
import FieldWorker from "./FieldWorker";
import CryptoJS from "crypto-js";
import AddFieldWorker from "../pages/Supervisor/AddFieldWorker";
import Questionnaire from "../pages/Admin/Questionnaire";
import FWDashboard from "../pages/FieldWorker/Dashboard";
import LoginPatient from "../pages/FieldWorker/LoginPatient";
import QuestionnairePatient from "../pages/FieldWorker/Questionnaire";
import RegisterPatient from "../pages/FieldWorker/RegisterPatient";
import LoggedInPatient from "../pages/FieldWorker/LoggedInPatient";
import ViewFW from "../pages/Supervisor/ViewFWs";
import TransferFW from "../pages/Supervisor/TransferFWs";
import TestAudio from "./TestAudio";
import AddHospital from "../pages/Admin/AddHospital";

import HospDashboard from "../pages/Hospital/Dashboard";
import DocDashboard from "../pages/Doctor/Dashboard";
import ViewDocs from "../pages/Hospital/ViewDocs";
import AlertIcon from "./Alert";
function App() {
  const [mediaWidth, setMediaWidth] = useState(window.innerWidth);
  const [loginStatus, setLoginStatus] = useState(false);
  const [loginActiveStatus, setLoginActiveStatus] = useState(false);
  const [load, setLoad] = useState(false);
  const [jwtToken, setJwtToken] = useState(null);
  const [role, setRole] = useState(null);
  const [alert, setAlert] = useState(null);
  const [stateList, setStateList] = useState([]);
  const navigate = useNavigate();

  function checkToken() {
    // if (jwtToken === null) {
    //   const jwt = JSON.parse(localStorage.getItem("/"));
    //   if (jwt === "" || jwt === null)
    //     navigate('/', { replace: true });
    //   else {
    //     setJwtToken(decryptData());
    //   }
    // }
    // else {
    //   const jwt = JSON.parse(localStorage.getItem("/"));
    //   if (jwt === null)
    //     navigate('/', { replace: true });
    // }
  }

  useEffect(() => {
    const pathNames = ['/', '/about', '/contact', '/doctors', '/services']
    if (!(pathNames.includes(window.location.pathname))) {
      if (window.location.pathname === '/login') {
        const loginActiveUser = JSON.parse(localStorage.getItem("loginActiveUser"))
        if (loginActiveUser === "" || loginActiveUser === null)
          navigate('/', { replace: true });
      }
      else {
        if (jwtToken === null) {
          const jwt = JSON.parse(localStorage.getItem("/"));
          if (jwt === "" || jwt === null)
            navigate('/', { replace: true });
          else {
            setJwtToken(decryptData());
          }
        }
        else {
          const jwt = JSON.parse(localStorage.getItem("/"));
          if (jwt === null)
            navigate('/', { replace: true });
        }
      }
    }
  })




  const loggedUser = JSON.parse(localStorage.getItem("user"));
  const [user, setUser] = useState(loggedUser);
  if (loggedUser === null || loggedUser === "") {
    if (loginStatus)
      setLoginStatus(false)
  }
  else {
    if (!loginStatus)
      setLoginStatus(true)
  }

  function setBackground(value) {
    const bg = document.getElementById("background");
    bg.style.filter = value;
  }

  function loginActive() {
    if (loginStatus === false) {
      setBackground("brightness(0.4)");
      setLoginActiveStatus(true);
    } else {
      setLoginStatus(false);
      setUser("");
      localStorage.setItem("user", JSON.stringify(""));
    }
  }

  function closeButton(value) {
    setBackground("");
    setLoginActiveStatus(false);
    if (value === "admin") {
      setUser("admin")
      localStorage.setItem("loginActiveUser", JSON.stringify("admin"))
      // localStorage.setItem("user", JSON.stringify("admin"));
    }
    else if (value === "supervisor") {
      setUser("supervisor")
      localStorage.setItem("loginActiveUser", JSON.stringify("supervisor"))
      // localStorage.setItem("user", JSON.stringify("supervisor"));
    }
    else if (value === "doctor") {
      setUser("doctor")
      localStorage.setItem("loginActiveUser", JSON.stringify("doctor"))
      // localStorage.setItem("user", JSON.stringify("doctor"));
    }
    else if(value === "hospital"){
      setUser("hospital");
      localStorage.setItem("loginActiveUser", JSON.stringify("hospital"));
    }
    else if (value === "worker") {
      setUser("worker")
      localStorage.setItem("loginActiveUser", JSON.stringify("worker"))
      // localStorage.setItem("user", JSON.stringify("worker"));
    }
    else if (value === "patient") {
      setUser("patient")
      localStorage.setItem("loginActiveUser", JSON.stringify("patient"))
      // localStorage.setItem("user", JSON.stringify("patient"));
    } else {
      setUser("");
      localStorage.setItem("loginActiveUser", JSON.stringify(""));
      localStorage.setItem("user", JSON.stringify(""));
    }
  }

  function encryptData(text) {
    const secretPass = "XkhZG4fW2t2W27ABbg";
    const data = CryptoJS.AES.encrypt(
      JSON.stringify(text),
      secretPass
    ).toString();
    localStorage.setItem("/", JSON.stringify(data));
  }
 
  function decryptData() {
    const secretPass = "XkhZG4fW2t2W27ABbg";
    const text = JSON.parse(localStorage.getItem("/"));
    const bytes = CryptoJS.AES.decrypt(text, secretPass);
    const data = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
    return data;
  }

  function handleAlert(flag, msg) {
    if (flag === "success") {
      setAlert({
        msg: msg,
        d: "M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zm13.36-1.814a.75.75 0 10-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 00-1.06 1.06l2.25 2.25a.75.75 0 001.14-.094l3.75-5.25z",
        type: flag,
      });

      setTimeout(() => {
        setAlert(null);
      }, 1800);
    } else {
      setAlert({
        msg: msg,
        d: "M9.401 3.003c1.155-2 4.043-2 5.197 0l7.355 12.748c1.154 2-.29 4.5-2.599 4.5H4.645c-2.309 0-3.752-2.5-2.598-4.5L9.4 3.003zM12 8.25a.75.75 0 01.75.75v3.75a.75.75 0 01-1.5 0V9a.75.75 0 01.75-.75zm0 8.25a.75.75 0 100-1.5.75.75 0 000 1.5z",
        type: flag,
      });

      setTimeout(() => {
        setAlert(null);
      }, 1800);
    }
  }

  return (
    <>
      {alert ? <AlertIcon alert={alert} /> : undefined}
      {load ? <Spinner /> : undefined}
      {loginActiveStatus ? <LoginPop closeButton={closeButton} /> : undefined}
      <div id="background" className="App w-full h-full absolute">
        <Routes>
          <Route
            path="/"
            element={
              <>
                <Header
                  homePage={true}
                  mediaWidth={mediaWidth}
                  page={"home"}
                  loginStatus={loginStatus}
                  loginActive={loginActive}
                />
                <Home handleAlert={handleAlert} />
              </>
            }
          />
          <Route path='/about' element={
            <>
              <Header homePage={false} mediaWidth={mediaWidth} page={"about"} loginStatus={loginStatus} loginActive={loginActive} />
              <About />
            </>
          } />
          <Route path='/doctors' element={
            <>
              <Header mediaWidth={mediaWidth} page={"doctors"} loginStatus={loginStatus} loginActive={loginActive} />
              <Doctors />
            </>
          } />
          <Route path='/services' element={
            <>
              <Header mediaWidth={mediaWidth} page={"services"} loginStatus={loginStatus} loginActive={loginActive} />
              <Services />
            </>
          } />
          <Route path='/contact' element={
            <>
              <Header mediaWidth={mediaWidth} page={"contact"} loginStatus={loginStatus} loginActive={loginActive} />
              <Contact />
            </>
          } />
          <Route path='/login' element={
            <>
              <Header homePage={true} mediaWidth={mediaWidth} loginStatus={loginStatus} loginActive={loginActive} />
              <Login user={user} stateList={stateList} setStateList={setStateList} handleAlert={handleAlert} setBackground={setBackground} setLoad={setLoad} jwtToken={jwtToken} setJwtToken={setJwtToken} encryptData={encryptData} decryptData={decryptData} />
            </>
          } />
          <Route path='/admin' element={
            <>
              <AdminHomePage checkToken={checkToken} setJwtToken={setJwtToken} jwtToken={jwtToken} decryptData={decryptData} handleAlert={handleAlert} setBackground={setBackground} setLoad={setLoad} />
            </>
          } />
          <Route path='/admin/supervisors' element={
            <>
              <SeeSuperVisor checkToken={checkToken} />
            </>
          } />
          <Route path='/admin/addsupervisor' element={
            <>
              <AddSuperVisor stateList={stateList} setStateList={setStateList} checkToken={checkToken} setJwtToken={setJwtToken} jwtToken={jwtToken} decryptData={decryptData} handleAlert={handleAlert} setBackground={setBackground} setLoad={setLoad} />
            </>
          } />
          <Route path='/admin/setQuestionnaire' element={
            <>
              <Questionnaire checkToken={checkToken} setJwtToken={setJwtToken} jwtToken={jwtToken} decryptData={decryptData} handleAlert={handleAlert} setBackground={setBackground} setLoad={setLoad} />
            </>
          } />
          <Route path='/admin/doctors' element={
            <>
              <SeeDoctors checkToken={checkToken} />
            </>
          } />
          <Route path='/admin/addHospital' element={
            <>
              <AddHospital checkToken={checkToken} setJwtToken={setJwtToken} jwtToken={jwtToken} decryptData={decryptData} handleAlert={handleAlert} setBackground={setBackground} setLoad={setLoad} />
            </>
          } />
          <Route path='/admin/fieldworkers' element={
            <>
              <SeeWorkers checkToken={checkToken} />
            </>
          } />
          <Route path='/sup/addFieldWorker' element={
            <>
              <AddFieldWorker stateList={stateList} setStateList={setStateList} checkToken={checkToken} setJwtToken={setJwtToken} jwtToken={jwtToken} decryptData={decryptData} handleAlert={handleAlert} setBackground={setBackground} setLoad={setLoad} />
            </>
          } />
          <Route path='/sup/dashboard' element={
            <>
              <SupervisorDashboard checkToken={checkToken} />
            </>
          } />
          <Route path='/field-worker' element={
            <>
              <FieldWorker checkToken={checkToken} />
            </>
          } />
           <Route path="/fw/dashboard" element={<FWDashboard />} />
          <Route path="/fw/loginPatientPage" element={<LoginPatient />} />
          <Route path="/fw/questionnaire" element={<QuestionnairePatient checkToken={checkToken} setJwtToken={setJwtToken} jwtToken={jwtToken} decryptData={decryptData} handleAlert={handleAlert} setBackground={setBackground} setLoad={setLoad}/>} />

          <Route path="/fw/registerPatientPage" element={<RegisterPatient checkToken={checkToken} setJwtToken={setJwtToken} jwtToken={jwtToken} decryptData={decryptData} handleAlert={handleAlert} setBackground={setBackground} setLoad={setLoad}/>} />

          <Route path="/fw/loggedInPatient" element={<LoggedInPatient setJwtToken={setJwtToken} jwtToken={jwtToken} decryptData={decryptData} handleAlert={handleAlert} setBackground={setBackground} setLoad={setLoad}/>} />
          <Route path="/sup/viewFW" element={<ViewFW setJwtToken={setJwtToken} jwtToken={jwtToken} decryptData={decryptData} handleAlert={handleAlert} setBackground={setBackground} setLoad={setLoad}/>} />
          <Route path="/sup/transferFW" element={<TransferFW setJwtToken={setJwtToken} jwtToken={jwtToken} decryptData={decryptData} handleAlert={handleAlert} setBackground={setBackground} setLoad={setLoad}/>} />
          <Route path="/doc/dashboard" element={<TransferFW />} />
          <Route path="/test/audio" element={<TestAudio/>}/>
          
          <Route path="/hospital/dashboard" element={<HospDashboard checkToken={checkToken} setJwtToken={setJwtToken} jwtToken={jwtToken} decryptData={decryptData} handleAlert={handleAlert} setBackground={setBackground} setLoad={setLoad}/>}/>

          <Route path="/hospital/viewDoctors" element={<ViewDocs checkToken={checkToken} setJwtToken={setJwtToken} jwtToken={jwtToken} decryptData={decryptData} handleAlert={handleAlert} setBackground={setBackground} setLoad={setLoad}/>}/>
          
        </Routes>
      </div>
    </>
  );
}

export default App;

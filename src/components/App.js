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
import Alert from "./Alert";
import AddFieldWorker from "../pages/Supervisor/AddFieldWorker";
import Questionnaire from "../pages/Admin/Questionnaire";
import FWDashboard from "../pages/FieldWorker/Dashboard";
import LoginPatient from "../pages/FieldWorker/LoginPatient";
import QuestionnairePatient from "../pages/FieldWorker/Questionnaire";
import RegisterPatient from "../pages/FieldWorker/RegisterPatient";
import LoggedInPatient from "../pages/FieldWorker/LoggedInPatient";
import ViewFW from "../pages/Supervisor/ViewFWs";
import TransferFW from "../pages/Supervisor/TransferFWs";

function App() {
  const [mediaWidth, setMediaWidth] = useState(window.innerWidth);
  const [loginStatus, setLoginStatus] = useState(false);
  const [loginActiveStatus, setLoginActiveStatus] = useState(false);
  const [load, setLoad] = useState(false);
  const [jwtToken, setJwtToken] = useState(null);
  const [role, setRole] = useState(null);
  const [alert, setAlert] = useState(null);

  const loggedUser = JSON.parse(localStorage.getItem("user"));
  const [user, setUser] = useState(loggedUser);
  if (loggedUser === null || loggedUser === "") {
    if (loginStatus) setLoginStatus(false);
  } else {
    if (!loginStatus) setLoginStatus(true);
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
      setUser("admin");
      localStorage.setItem("loginActiveUser", JSON.stringify("admin"));
      // localStorage.setItem("user", JSON.stringify("admin"));
    } else if (value === "supervisor") {
      setUser("supervisor");
      localStorage.setItem("loginActiveUser", JSON.stringify("supervisor"));
      // localStorage.setItem("user", JSON.stringify("supervisor"));
    } else if (value === "doctor") {
      setUser("doctor");
      localStorage.setItem("loginActiveUser", JSON.stringify("doctor"));
      // localStorage.setItem("user", JSON.stringify("doctor"));
    } else if (value === "worker") {
      setUser("worker");
      localStorage.setItem("loginActiveUser", JSON.stringify("worker"));
      // localStorage.setItem("user", JSON.stringify("worker"));
    } else if (value === "patient") {
      setUser("patient");
      localStorage.setItem("loginActiveUser", JSON.stringify("patient"));
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
        d: "M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zm-3.97-3.03a.75.75 0 0 0-1.08.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-.01-1.05z",
        type: flag,
      });

      setTimeout(() => {
        setAlert(null);
      }, 1800);
    } else {
      setAlert({
        msg: msg,
        d: "M8.982 1.566a1.13 1.13 0 0 0-1.96 0L.165 13.233c-.457.778.091 1.767.98 1.767h13.713c.889 0 1.438-.99.98-1.767L8.982 1.566zM8 5c.535 0 .954.462.9.995l-.35 3.507a.552.552 0 0 1-1.1 0L7.1 5.995A.905.905 0 0 1 8 5zm.002 6a1 1 0 1 1 0 2 1 1 0 0 1 0-2z",
        type: flag,
      });

      setTimeout(() => {
        setAlert(null);
      }, 1800);
    }
  }

  return (
    <Router>
      {alert ? <Alert alert={alert} /> : undefined}
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
          <Route
            path="/about"
            element={
              <>
                <Header
                  homePage={false}
                  mediaWidth={mediaWidth}
                  page={"about"}
                  loginStatus={loginStatus}
                  loginActive={loginActive}
                />
                <About />
              </>
            }
          />
          <Route
            path="/doctors"
            element={
              <>
                <Header
                  mediaWidth={mediaWidth}
                  page={"doctors"}
                  loginStatus={loginStatus}
                  loginActive={loginActive}
                />
                <Doctors />
              </>
            }
          />
          <Route
            path="/services"
            element={
              <>
                <Header
                  mediaWidth={mediaWidth}
                  page={"services"}
                  loginStatus={loginStatus}
                  loginActive={loginActive}
                />
                <Services />
              </>
            }
          />
          <Route
            path="/contact"
            element={
              <>
                <Header
                  mediaWidth={mediaWidth}
                  page={"contact"}
                  loginStatus={loginStatus}
                  loginActive={loginActive}
                />
                <Contact />
              </>
            }
          />
          <Route
            path="/login"
            element={
              <>
                <Header
                  homePage={true}
                  mediaWidth={mediaWidth}
                  loginStatus={loginStatus}
                  loginActive={loginActive}
                />
                <Login
                  user={user}
                  handleAlert={handleAlert}
                  setBackground={setBackground}
                  setLoad={setLoad}
                  jwtToken={jwtToken}
                  setJwtToken={setJwtToken}
                  encryptData={encryptData}
                  decryptData={decryptData}
                />
              </>
            }
          />
          <Route
            path="/admin"
            element={
              <>
                <AdminHomePage
                  setJwtToken={setJwtToken}
                  jwtToken={jwtToken}
                  decryptData={decryptData}
                  handleAlert={handleAlert}
                  setBackground={setBackground}
                  setLoad={setLoad}
                />
              </>
            }
          />
          <Route
            path="/admin/supervisors"
            element={
              <>
                <SeeSuperVisor />
              </>
            }
          />
          <Route
            path="/admin/addsupervisor"
            element={
              <>
                <AddSuperVisor
                  setJwtToken={setJwtToken}
                  jwtToken={jwtToken}
                  decryptData={decryptData}
                  handleAlert={handleAlert}
                  setBackground={setBackground}
                  setLoad={setLoad}
                />
              </>
            }
          />
          <Route
            path="/admin/setQuestionnaire"
            element={
              <>
                <Questionnaire
                  setJwtToken={setJwtToken}
                  jwtToken={jwtToken}
                  decryptData={decryptData}
                  handleAlert={handleAlert}
                  setBackground={setBackground}
                  setLoad={setLoad}
                />
              </>
            }
          />
          <Route
            path="/admin/doctors"
            element={
              <>
                <SeeDoctors />
              </>
            }
          />
          <Route
            path="/admin/fieldworkers"
            element={
              <>
                <SeeWorkers />
              </>
            }
          />
          <Route
            path="/sup/addFieldWorker"
            element={
              <>
                <AddFieldWorker
                  setJwtToken={setJwtToken}
                  jwtToken={jwtToken}
                  decryptData={decryptData}
                  handleAlert={handleAlert}
                  setBackground={setBackground}
                  setLoad={setLoad}
                />
              </>
            }
          />
          <Route
            path="/sup/dashboard"
            element={
              <>
                <SupervisorDashboard />
              </>
            }
          />
          <Route
            path="/field-worker"
            element={
              <>
                <FieldWorker />
              </>
            }
          />
          <Route path="/fw/dashboard" element={<FWDashboard />} />
          <Route path="/fw/loginPatientPage" element={<LoginPatient />} />
          <Route path="/fw/questionnaire" element={<QuestionnairePatient />} />
          <Route path="/fw/registerPatientPage" element={<RegisterPatient />} />

          <Route path="/fw/loggedInPatient" element={<LoggedInPatient />} />
          <Route path="/sup/viewFW" element={<ViewFW />} />
          <Route path="/sup/transferFW" element={<TransferFW />} />
          <Route path="/doc/dashoard" element={<TransferFW />} />

        </Routes>
      </div>
    </Router>
  );
}

export default App;

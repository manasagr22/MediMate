import '../styles/App.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useEffect, useState } from "react";
import Home from './Home';
import Header from './Header';
import About from './About';
import Doctors from './Doctors';
import Services from './Services';
import Contact from './Contact';
import LoginPop from './LoginPop';
import Login from './Login';
import Spinner from './Spinner'
import AdminHomePage from '../pages/Admin/Home'
import SeeSuperVisor from '../pages/Admin/Supervisor';
import AddSuperVisor from '../pages/Admin/AddSuperVisor';
import SeeDoctors from '../pages/Admin/Doctors';
import SeeWorkers from '../pages/Admin/FieldWorkers';
import SupervisorDashboard from '../pages/Supervisor/Dashboard';
import FieldWorker from './FieldWorker';



function App() {
  const [mediaWidth, setMediaWidth] = useState(window.innerWidth);
  const [loginStatus, setLoginStatus] = useState(false);
  const [loginActiveStatus, setLoginActiveStatus] = useState(false);
  const [load, setLoad] = useState(false);

  
  const loggedUser = JSON.parse(localStorage.getItem("user"));
  const [user, setUser] = useState(loggedUser);
    if(loggedUser === null || loggedUser === "") {
      if(loginStatus)
        setLoginStatus(false)
    }
    else {
      if(!loginStatus)
        setLoginStatus(true)
    }

  function setBackground(value) {
    const bg = document.getElementById('background');
    bg.style.filter = value;
  }

  function loginActive() {
    if(loginStatus === false) {
      setBackground("brightness(0.4)");
      setLoginActiveStatus(true);
    }
    else {
      setLoginStatus(false);
      setUser("");
      localStorage.setItem("user", JSON.stringify(""))
    }
  }

  function closeButton(value) {
    setBackground("");
    setLoginActiveStatus(false);
    if(value === "admin") {
      setUser("admin")
      localStorage.setItem("loginActiveUser", JSON.stringify("admin"))
      // localStorage.setItem("user", JSON.stringify("admin"));
    }
    else if(value === "supervisor") {
      setUser("supervisor")
      localStorage.setItem("loginActiveUser", JSON.stringify("supervisor"))
      // localStorage.setItem("user", JSON.stringify("supervisor"));
    }
    else if(value === "doctor") {
      setUser("doctor")
      localStorage.setItem("loginActiveUser", JSON.stringify("doctor"))
      // localStorage.setItem("user", JSON.stringify("doctor"));
    }
    else if(value === "worker") {
      setUser("worker")
      localStorage.setItem("loginActiveUser", JSON.stringify("worker"))
      // localStorage.setItem("user", JSON.stringify("worker"));
    }
    else if(value === "patient") {
      setUser("patient")
      localStorage.setItem("loginActiveUser", JSON.stringify("patient"))
      // localStorage.setItem("user", JSON.stringify("patient"));
    }
    else {
      setUser("")
      localStorage.setItem("loginActiveUser", JSON.stringify(""))
      localStorage.setItem("user", JSON.stringify(""))
    }
  }


  return (
    <Router>
      {load ? <Spinner/> : undefined}
      {loginActiveStatus ? <LoginPop closeButton={closeButton}/> : undefined}
      <div id='background' className="App w-full h-full absolute">
        <Routes>
          <Route
            path="/"
            element={
              <>
                <Header homePage={true} mediaWidth={mediaWidth} page={"home"} loginStatus={loginStatus} loginActive={loginActive} />
                <Home />
              </>
            }
          />
          <Route path='/about' element={
            <>
            <Header homePage={false} mediaWidth={mediaWidth} page={"about"} loginStatus={loginStatus} loginActive={loginActive}/>
            <About />
            </>
          }/>
          <Route path='/doctors' element={
            <>
            <Header mediaWidth={mediaWidth} page={"doctors"} loginStatus={loginStatus} loginActive={loginActive}/>
            <Doctors />
            </>
          }/>
          <Route path='/services' element={
            <>
            <Header mediaWidth={mediaWidth} page={"services"} loginStatus={loginStatus} loginActive={loginActive}/>
            <Services />
            </>
          }/>
          <Route path='/contact' element={
            <>
            <Header mediaWidth={mediaWidth} page={"contact"} loginStatus={loginStatus} loginActive={loginActive}/>
            <Contact />
            </>
          }/>
          <Route path='/login' element={
            <>
            <Header homePage={true} mediaWidth={mediaWidth} loginStatus={loginStatus} loginActive={loginActive}/>
            <Login user={user} setBackground={setBackground} setLoad={setLoad} />
            </>
          }/>
          <Route path='/admin' element={
            <>
            {/* <Header homePage={true} mediaWidth={mediaWidth} loginStatus={loginStatus} loginActive={loginActive}/>
            <Login user={user} setBackground={setBackground} setLoad={setLoad} /> */}
            <AdminHomePage />
            </>
          }/>
          <Route path='/admin/supervisors' element={
            <>
            {/* <Header homePage={true} mediaWidth={mediaWidth} loginStatus={loginStatus} loginActive={loginActive}/>
            <Login user={user} setBackground={setBackground} setLoad={setLoad} /> */}
            <SeeSuperVisor />
            </>
          }/>
          <Route path='/admin/addsupervisor' element={
            <>
            {/* <Header homePage={true} mediaWidth={mediaWidth} loginStatus={loginStatus} loginActive={loginActive}/>
            <Login user={user} setBackground={setBackground} setLoad={setLoad} /> */}
            <AddSuperVisor />
            </>
          }/>
        <Route path='/admin/doctors' element={
            <>
            {/* <Header homePage={true} mediaWidth={mediaWidth} loginStatus={loginStatus} loginActive={loginActive}/>
            <Login user={user} setBackground={setBackground} setLoad={setLoad} /> */}
            <SeeDoctors />
            </>
          }/>
          <Route path='/admin/fieldworkers' element={
            <>
            {/* <Header homePage={true} mediaWidth={mediaWidth} loginStatus={loginStatus} loginActive={loginActive}/>
            <Login user={user} setBackground={setBackground} setLoad={setLoad} /> */}
            <SeeWorkers />
            </>
          }/>
          <Route path='/supervisor/dashboard' element={
            <>
            {/* <Header homePage={true} mediaWidth={mediaWidth} loginStatus={loginStatus} loginActive={loginActive}/>
            <Login user={user} setBackground={setBackground} setLoad={setLoad} /> */}
            <SupervisorDashboard />
            </>
          }/>
          <Route path='/field-worker' element={
            <>
            {/* <Header homePage={true} mediaWidth={mediaWidth} loginStatus={loginStatus} loginActive={loginActive}/>
            <Login user={user} setBackground={setBackground} setLoad={setLoad} /> */}
            <FieldWorker/>
            </>
          }/>
        </Routes>
      </div>
    </Router>
  );
}

export default App;

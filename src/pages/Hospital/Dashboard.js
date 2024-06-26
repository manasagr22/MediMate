import React, { useEffect } from "react";
import { useState } from "react";
import NavbarHosp from "../../components/NavBarHosp";
import DoctorCard from "./DocCard";
import SearchBar from "./SearchBar";
import docs_data from './Hosp_Docs.json'
import { SettingsInputAntenna } from "@mui/icons-material";
// import {useState, useEffect } from "react";
const HospDashboard = (props) => {
  const [hospName, setHospName] = useState(null);
  const [distName, setDistName] = useState(null);
  const [sub_div, setSub_div] = useState(null);
  const [stateName, setState] = useState(null)

  const cardsPerPage = 3;

  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");

  const [selectedDocs, setSelectedDocs] = useState([]);
  const [doctorInfo, setDoctorInfo] = useState(null);

  const [filteredDoctorCards, setFilteredDoctorCards] = useState(doctorInfo);


  // FETCH DOCTORS FROM THE HOSPITAL DB


  // useEffect(() => {
  //   if (props.jwtToken === null) {
  //     props.checkToken();
  //   }
  //   // setHospName(null);
  //   // setDistName(null);
  //   // setSub_div(null);
  //   // setState(null);
  // }, [props.checkToken])

  useEffect(() => {
    // get email from local storage
    const fetchHospDetails = async () => {
      try {
        const url = "http://localhost:8082/hospital/details";
        const key = "Bearer " + props.jwtToken;
        // props.setBackground("brightness(0.01)");
        // props.setLoad(true);
        const response = await fetch(url, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: key,
          },
        }).then((response) => response.json());

        if (response.hospital) {
          setHospName(response.hospital.name);
          setDistName(response.hospital.district);
          setSub_div(response.hospital.subdivision);
          setState(response.hospital.state);
        }
        else {
          props.setBackground("");
          props.setLoad(false);
          props.handleAlert("danger", "Server Error Occurred!")
        }

      } catch (e) {
        props.setBackground("");
        props.setLoad(false);
        props.handleAlert("danger", "Server Error Occurred!")
      }
    }
    if ((stateName === null && distName === null && sub_div === null && hospName === null && props.jwtToken !== null)) {
      fetchHospDetails();
    }
    // get hospital details (like name, dsitrict) by email id
  }, [stateName, distName, sub_div, hospName, props.jwtToken]);

  useEffect(() => {
    if (filteredDoctorCards) {
      const totalPagesCount = Math.ceil(
        filteredDoctorCards.length / cardsPerPage
      );
      setTotalPages(totalPagesCount);
    }
  }, [filteredDoctorCards, cardsPerPage]);

  useEffect(() => {
    // Filter doctor cards based on search query
    if (doctorInfo) {
      const filteredCards = doctorInfo.filter((doctor) =>
        doctor.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredDoctorCards(filteredCards);
      setCurrentPage(1); // Reset to first page when search query changes
    }
  }, [doctorInfo, searchQuery]);


  useEffect(() => {

    const fetchHospDocs = async () => {
      try {
        const url = "http://localhost:8082/hospital/allDoctors"
        const key = "Bearer " + props.jwtToken;
        const response = await fetch(url, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: key,
          },
        }).then((res) => res.json());

        setDoctorInfo(response);

        props.setBackground("");
        props.setLoad(false);
      } catch (e) {
        props.setBackground("");
        props.setLoad(false);
        props.handleAlert("danger", "Server Error Occurred!")
      }
    }

    if ((stateName !== null && distName !== null && sub_div !== null && hospName !== null)) {
      fetchHospDocs();
    }
  }, [stateName, distName, sub_div, hospName]);


  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handleSearchInputChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const toggleSelectCard = (doctor) => {
    setSelectedDocs((prevSelectedDoctors) => {
      const doctorIndex = prevSelectedDoctors.findIndex((doc) => doc.registration_number === doctor.registration_number);
      if (doctorIndex !== -1) {
        // Doctor already selected, deselect
        return prevSelectedDoctors.filter((doc) => doc.registration_number !== doctor.registration_number);
      } else {
        // Doctor not selected, select
        return [...prevSelectedDoctors, doctor];
      }
    });
  };


  const handleSubmit = async () => {
    // Submit selected cards to the backend
    console.log("Selected doctor cards:", selectedDocs);

    try {
      const url = "http://localhost:8082/hospital/regDoctor";
      const key = "Bearer " + props.jwtToken;

      const json_to_send = [];


      for (let i = 0; i < selectedDocs.length; i++) {
        json_to_send.push({
          user: {
            email: selectedDocs[i].email,
            role: {
              name: "DOCTOR"
            }
          },
          fullName: selectedDocs[i].name,
          regNo: selectedDocs[i].registration_number
        })
      }
      // console.log("hello " + key)

      props.setBackground("brightness(0.01)");
      props.setLoad(true);
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          "Content-Type": "application/json",
          "Authorization": key
        },
        body: JSON.stringify(json_to_send),
      }).then((res) => res.json());

      // Redirect or handle success response
      props.setBackground("");
      props.setLoad(false);
      if (response) {
        props.handleAlert("success", "Doctor Added Successfully");
      }
      else {
        props.handleAlert("danger", "Unable to add Doctors!");
      }


      // navigate("/fw/dashboard", { replace: true })
    } catch (error) {
      props.setBackground("");
      props.setLoad(false);
      props.handleAlert("danger", "Some Error Occurred");
      // console.log("Error    " + error);
      // Handle error, show error message to the user, etc.
    }

    // Reset the current page to the initial page (e.g., page 1)

    setCurrentPage(1);
    setSearchQuery("");
    // Reset the selected cards
    setSelectedDocs([]);
    // Make your API call here to send selectedCards to the backend
  };



  return (
    <>
      {hospName && stateName && distName && sub_div ? <NavbarHosp checkToken={props.checkToken} name={hospName} district={distName} subDiv={sub_div} state={stateName} setJwtToken={props.setJwtToken} jwtToken={props.jwtToken} decryptData={props.decryptData} handleAlert={props.handleAlert} setBackground={props.setBackground} setLoad={props.setLoad} /> : undefined}

      {/* <!-- component --> */}
      {/* <!-- This is an example component --> */}
      {hospName && stateName && distName && sub_div ? <SearchBar
        searchQuery={searchQuery}
        handlePageChange={handleSearchInputChange}
        placeholder={"Search Doctors by name"}
      /> : undefined}

      {/* MAIN BOX */}
      {hospName && stateName && distName && sub_div && filteredDoctorCards ? <div className="mt-12 mx-auto flex justify-center bg-gradient-to-b from-gray-100 to-gray-300 h-3/5 rounded-2xl shadow-[0_3px_10px_rgb(0,0,0,0.2)] px-8" style={{ width: "45%" }}>
        <div class="flex flex-col items-center" style={{ width: "-webkit-fill-available" }}>
          {/* <DoctorCard />
          <DoctorCard />
          <DoctorCard />
          <DoctorCard /> */}
          {filteredDoctorCards
            .slice((currentPage - 1) * cardsPerPage, currentPage * cardsPerPage)
            .map((doctor) => (
              <DoctorCard
                doctor={doctor}
                onSelectCard={toggleSelectCard}
                isSelected={selectedDocs.some(selectedDoctor => selectedDoctor.registration_number === doctor.registration_number)}
                checkbox={true}
              />
            ))}

          <div>
            <div class="flex mt-2 mb-1">
              {/* PREV */}
              <button
                className={
                  1 !== currentPage
                    ? "px-4 py-2 mx-1 text-gray-700 transition-colors duration-300 transform bg-white rounded-md dark:bg-gray-800 dark:text-gray-200 hover:bg-blue-500 dark:hover:bg-blue-500 hover:text-white dark:hover:text-gray-200"
                    : "px-4 py-2 mx-1 text-gray-700 transition-colors duration-300 transform bg-white rounded-md dark:bg-gray-800 dark:text-gray-200 cursor-not-allowed"
                }
                disabled={1 === currentPage}
                onClick={() => handlePageChange(currentPage - 1)}
              >
                <div class="flex items-center -mx-1">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    class="w-6 h-6 mx-1 rtl:-scale-x-100"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M7 16l-4-4m0 0l4-4m-4 4h18"
                    />
                  </svg>

                  <span class="mx-1">Previous</span>
                </div>
              </button>

              {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                (pageNumber) => (
                  <button
                    className={
                      currentPage === pageNumber
                        ? "hidden px-4 py-2 mx-1 text-gray-700 transition-colors duration-300 transform bg-blue-500 rounded-md sm:inline dark:bg-gray-800 dark:text-gray-200 hover:bg-blue-500 dark:hover:bg-blue-500 hover:text-white dark:hover:text-gray-200"
                        : "hidden px-4 py-2 mx-1 text-gray-700 transition-colors duration-300 transform bg-white rounded-md sm:inline dark:bg-gray-800 dark:text-gray-200 hover:bg-blue-500 dark:hover:bg-blue-500 hover:text-white dark:hover:text-gray-200"
                    }
                    key={pageNumber}
                    onClick={() => handlePageChange(pageNumber)}
                  >
                    {pageNumber}
                  </button>
                )
              )}

              {/* NEXT */}
              <button
                class={
                  totalPages !== currentPage
                    ? "px-4 py-2 mx-1 text-gray-700 transition-colors duration-300 transform bg-white rounded-md dark:bg-gray-800 dark:text-gray-200 hover:bg-blue-500 dark:hover:bg-blue-500 hover:text-white dark:hover:text-gray-200"
                    : "px-4 py-2 mx-1 text-gray-700 transition-colors duration-300 transform bg-white rounded-md dark:bg-gray-800 dark:text-gray-200 cursor-not-allowed"
                }
                disabled={totalPages === currentPage}
                onClick={() => handlePageChange(currentPage + 1)}
              >
                <div class="flex items-center -mx-1">
                  <span class="mx-1">Next</span>

                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    class="w-6 h-6 mx-1 rtl:-scale-x-100"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M17 8l4 4m0 0l-4 4m4-4H3"
                    />
                  </svg>
                </div>
              </button>
            </div>
          </div>
          {/* <!-- Add more DoctorCard components as needed --> */}
        </div>
      </div> : undefined}
      {hospName && stateName && distName && sub_div && filteredDoctorCards ? <button
        className="w-full py-4 text-xl font-semibold text-center text-white transition-colors duration-300 bg-green-400 rounded-2xl hover:bg-green-500 ease px-9 md:w-auto mt-5"
        onClick={handleSubmit}
      >
        Register Doctors
      </button> : undefined}
    </>
  );
};

export default HospDashboard;

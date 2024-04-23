import React from "react";

import { useState, useEffect } from "react";
import NavbarHosp from "../../components/NavBarHosp";
import DoctorCard from "./DocCard";
import SearchBar from "./SearchBar";
const ViewDocs = (props) => {
  const [hospName, setHospName] = useState("");
  const [distName, setDistName] = useState("");
  const [sub_div, setSub_div] = useState("");
  const [state, setState] = useState("");
  const cardsPerPage = 3;

  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");

  const [selectedIds, setSelectedIds] = useState([]);

  const [doctorInfo, setDoctorInfo] = useState([
    {
      name: "Batra Raghubir Singh",
      registration_number: 2301,
      email: "batraraghubirsingh17@gmail.com",
    },
    {
      name: "Chandra Ram",
      registration_number: 2310,
      email: "chandraram17@gmail.com",
    },
    {
      name: "Sen Gupta Ramesh Chandra",
      registration_number: 2578,
      email: "senguptarameshchandra17@gmail.com",
    },
    {
      name: "Lal Harbansh Garg",
      registration_number: 2702,
      email: "lalharbanshgarg17@gmail.com",
    },
    {
      name: "Bagchi Gopal Chandra",
      registration_number: 2728,
      email: "bagchigopalchandra17@gmail.com",
    },
    {
      name: "Sharma Ram Shri Miss.",
      registration_number: 2750,
      email: "sharmaramshrimiss.17@gmail.com",
    },
  ]);

  const [filteredDoctorCards, setFilteredDoctorCards] = useState(doctorInfo);

  useEffect(() => {
    if(props.jwtToken === null) {
      props.checkToken();
    }
    setHospName(null);
    setDistName(null);
    setSub_div(null);
    setState(null);
  }, [props.checkToken])

  useEffect(() => {
    // get email from local storage
    const fetchHospDetails = async () =>{
      try{
        const url = "http://localhost:8081/hospital/details";
      const key = "Bearer " + props.jwtToken;

      const response = await fetch(url, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: key,
        },
      }).then((response) => response.json());

      // const jsonResp = await response.json()
      setHospName(response.hospital.name);
      setDistName(response.hospital.district);
      setSub_div(response.hospital.subdivision);
      setState(response.hospital.state);

      }catch(e){
        console.log(e);
      }
    }
    if((state === null && distName === null && sub_div === null && hospName === null) && ((state !== 0 && distName !== 0 && sub_div !== 0 && hospName !== 0))) {
      fetchHospDetails();
    }
    // get hospital details (like name, dsitrict) by email id
  }, [state, distName, sub_div, hospName]);


  useEffect(() => {
    const totalPagesCount = Math.ceil(
      filteredDoctorCards.length / cardsPerPage
    );
    setTotalPages(totalPagesCount);
  }, [filteredDoctorCards, cardsPerPage]);

  useEffect(() => {
    // Filter doctor cards based on search query
    const filteredCards = doctorInfo.filter((doctor) =>
      doctor.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredDoctorCards(filteredCards);
    setCurrentPage(1); // Reset to first page when search query changes
  }, [doctorInfo, searchQuery]);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handleSearchInputChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const toggleSelectCard = (cardId) => {
    setSelectedIds((prevSelectedCards) => {
      if (prevSelectedCards.includes(cardId)) {
        return prevSelectedCards.filter((id) => id !== cardId); // Deselect
      } else {
        return [...prevSelectedCards, cardId]; // Select
      }
    });
  };

  useEffect(() => {
    // get email from local storage
    const fetchDoctors = async () => {
      const url = "http://localhost:8081/hospital/doctors";
      const key = "Bearer " + props.jwtToken;

      try{
        const response = await fetch(url, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: key,
          },
        }).then((res) => res.json());
  
        console.log(response);
        // setDoctorInfo(response);
        
        const json_to_set = [];
        for(let i = 0; i < response.length; i++) {
          json_to_set.push({
            name: response[i].name,
            registration_number: response[i].registration_number,
            email: response[i].email
          })
        }
        console.log("hello json", json_to_set);
        setDoctorInfo(json_to_set);
      }catch(err) {
        console.log(err);
      }
    };

    fetchDoctors();
  }, []);

  return (
    <>
      <NavbarHosp checkToken={props.checkToken} name={hospName} district={distName} subDiv={sub_div} state={state} setJwtToken={props.setJwtToken} jwtToken={props.jwtToken} decryptData={props.decryptData} handleAlert={props.handleAlert} setBackground={props.setBackground} setLoad={props.setLoad}/>

      <SearchBar
        searchQuery={searchQuery}
        handlePageChange={handleSearchInputChange}
      />

      {/* MAIN BOX */}
      <div className="  mt-12 mx-auto flex justify-center bg-gradient-to-b from-gray-100 to-gray-300 h-4/6 w-2/5 rounded-2xl shadow-[0_3px_10px_rgb(0,0,0,0.2)] px-8"  style={{width: "45%"}}>
        <div class="flex flex-col items-center" style={{width: "-webkit-fill-available"}}>
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
                isSelected={selectedIds.includes(doctor.registration_number)}
                checkbox={false}
              />
            ))}

          <div>
            <div class="flex mt-4">
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
      </div>
    </>
  );
};

export default ViewDocs;

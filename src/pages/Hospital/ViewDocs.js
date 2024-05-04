import React from "react";

import { useState, useEffect } from "react";
import NavbarHosp from "../../components/NavBarHosp";
import DoctorCard from "./DocCard";
import SearchBar from "./SearchBar";
import { Typography } from "@material-tailwind/react";
const ViewDocs = (props) => {
  const [hospName, setHospName] = useState(null);
  const [distName, setDistName] = useState(null);
  const [sub_div, setSub_div] = useState(null);
  const [stateName, setState] = useState(null);
  const cardsPerPage = 3;

  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");

  const [selectedIds, setSelectedIds] = useState([]);

  const [doctorInfo, setDoctorInfo] = useState(null);

  const [filteredDoctorCards, setFilteredDoctorCards] = useState(doctorInfo);

  // useEffect(() => {
  //   if(props.jwtToken === null) {
  //     props.checkToken();
  //   }
  //   setHospName(null);
  //   setDistName(null);
  //   setSub_div(null);
  //   setState(null);
  // }, [props.checkToken])

  useEffect(() => {
    // get email from local storage
    const fetchHospDetails = async () => {
      try {
        const url = "http://localhost:8082/hospital/details";
        const key = "Bearer " + props.jwtToken;
        props.setBackground("brightness(0.01)");
        props.setLoad(true);
        const response = await fetch(url, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: key,
          },
        }).then((response) => response.json());

        // const jsonResp = await response.json()
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
      const url = "http://localhost:8082/hospital/doctors";
      const key = "Bearer " + props.jwtToken;

      try {
        const response = await fetch(url, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: key,
          },
        }).then((res) => res.json());


        const json_to_set = [];
        for (let i = 0; i < response.length; i++) {
          json_to_set.push({
            name: response[i].name,
            registration_number: response[i].regNo,
            email: response[i].email
          })
        }

        setDoctorInfo(json_to_set);

        props.setBackground("");
        props.setLoad(false);
      } catch (err) {
        props.setBackground("");
        props.setLoad(false);
        props.handleAlert("danger", "Server Error Occurred!")
      }
    };

    if ((stateName !== null && distName !== null && sub_div !== null && hospName !== null)) {
      fetchDoctors();
    }
  }, [stateName, distName, sub_div, hospName]);

  return (
    <>
      {hospName && stateName && distName && sub_div ? <NavbarHosp checkToken={props.checkToken} name={hospName} district={distName} subDiv={sub_div} state={stateName} setJwtToken={props.setJwtToken} jwtToken={props.jwtToken} decryptData={props.decryptData} handleAlert={props.handleAlert} setBackground={props.setBackground} setLoad={props.setLoad} /> : undefined}

      {hospName && stateName && distName && sub_div ? <SearchBar
        searchQuery={searchQuery}
        handlePageChange={handleSearchInputChange}
        placeholder={"Search Doctors by name"}
      /> : undefined}


      {/* MAIN BOX */}
      {hospName && stateName && distName && sub_div && filteredDoctorCards ? <div className="  mt-12 mx-auto flex justify-center bg-gradient-to-b from-gray-100 to-gray-300 h-4/6 w-2/5 rounded-2xl shadow-[0_3px_10px_rgb(0,0,0,0.2)] px-8" style={{ width: "45%" }}>
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
      </div> : filteredDoctorCards ? <Typography className="mt-24 text-gray-700" variant="h2">No Doctors Added yet</Typography> : undefined}

    </>
  );
};

export default ViewDocs;

import React, { useEffect, useState } from 'react'
import NavbarDoc from '../../components/NavbarDoc'
import NewPatientsCard from './NewPatientsCard'
import SearchBar from '../Hospital/SearchBar';

export default function Inbox(props) {
    const [notifications, setNotifications] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);

    const [searchQuery, setSearchQuery] = useState("");
    const cardsPerPage = 3;
    const [filteredPatientCards, setFilteredPatientCards] = useState(notifications);
    const handleSearchInputChange = (event) => {
        setSearchQuery(event.target.value);
    };

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    useEffect(() => {
        if (filteredPatientCards) {
            const totalPagesCount = Math.ceil(
                filteredPatientCards.length / cardsPerPage
            );
            setTotalPages(totalPagesCount);
        }
    }, [filteredPatientCards, cardsPerPage]);

    useEffect(() => {
        if (notifications) {
            const filteredCards = notifications.filter((patient) =>
                patient.firstName.toLowerCase().includes(searchQuery.toLowerCase())
            );
            setFilteredPatientCards(filteredCards);
            setCurrentPage(1); // Reset to first page when search query changes
        }
    }, [notifications, searchQuery]);

    async function getNotifications() {
        try {
            props.setBackground("brightness(0.01)")
            props.setLoad(true);
            const result = await fetch("http://localhost:8082/doctor/getNotifications", {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": "Bearer " + props.jwtToken
                }
            }).then(res => res.json());

            if (result && result.length > 0) {
                setNotifications(result);
            }
            props.setBackground("")
            props.setLoad(false);
        }
        catch {
            props.handleAlert("danger", "Server Error Occurred!")
        }
    }

    useEffect(() => {
        if (!notifications && props.jwtToken && !props.doctorNotification)
            getNotifications();
    }, [notifications, props.jwtToken])

    useEffect(() => {
        if (props.jwtToken && props.doctorNotification)
            getNotifications();
    }, [props.jwtToken, props.doctorNotification])

    return (
        <>
            <NavbarDoc
                checkToken={props.checkToken}
                setJwtToken={props.setJwtToken}
                jwtToken={props.jwtToken}
                decryptData={props.decryptData}
                handleAlert={props.handleAlert}
                setBackground={props.setBackground}
                setLoad={props.setLoad}
                setDoctorNotification={props.setDoctorNotification}
            />
            {notifications ?
                <>
                    <SearchBar
                        searchQuery={searchQuery}
                        handlePageChange={handleSearchInputChange}
                        placeholder={"Search Patients"}
                    />

                    <h1 class="block font-sans text-4xl antialiased font-semibold leading-tight tracking-normal mt-8 text-gray-700 mr-4">
                        Inbox
                    </h1>
                    {/* MAIN BOX */}
                    {notifications ? <div
                        className="mt-8 mx-auto flex justify-center bg-gradient-to-b from-gray-100 to-gray-300 h-3/5 rounded-2xl shadow-[0_3px_10px_rgb(0,0,0,0.2)] px-6 pt-4"
                        style={{ width: "45%" }}
                    >
                        <div
                            class="flex flex-col items-center"
                            style={{ width: "-webkit-fill-available" }}
                        >
                            {filteredPatientCards &&
                                filteredPatientCards.slice((currentPage - 1) * cardsPerPage, currentPage * cardsPerPage)
                                    .map((patient, index) => (
                                        <NewPatientsCard patient={patient} keyItem={index} jwtToken={props.jwtToken} handleAlert={props.handleAlert}
                                            setBackground={props.setBackground}
                                            setLoad={props.setLoad} />
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
                        </div>
                    </div> : undefined}
                </> :
                <div className="w-full h-full flex">
                    <div className="justify-center flex items-center bg-white shadow-2xl rounded-2xl m-auto relative" style={{ width: "22rem", height: "11rem", bottom: "64px" }}>
                        <h5 class="block font-sans text-2xl antialiased font-semibold leading-snug tracking-normal text-gray-700">
                            Inbox is Empty!
                        </h5>
                    </div>
                </div>
            }
        </>
    )
}

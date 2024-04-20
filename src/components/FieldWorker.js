import React, { useState } from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";
import moment from "moment";
import "../styles/FieldWorker.css";
import NavbarFW from "./NavbarFW";

const localizer = momentLocalizer(moment);

export default function FieldWorker(props) {
  const [events, setEvents] = useState([
    {
      title: "Event 1",
      start: new Date(2024, 1, 7), // Month is 0-indexed
      end: new Date(2024, 1, 8),
    },
    {
      title: "Event 2",
      start: new Date(2024, 1, 14),
      end: new Date(2024, 1, 15),
    },
    // Add more events as needed
  ]);

  const handleSelect = ({ start, end }) => {
    const title = window.prompt("New Event Title:");
    if (title) {
      setEvents([
        ...events,
        {
          start,
          end,
          title,
        },
      ]);
    }
  };

  return (
    <div>
      <NavbarFW checkToken={props.checkToken} page={"dashboard"} setJwtToken={props.setJwtToken} jwtToken={props.jwtToken} decryptData={props.decryptData} handleAlert={props.handleAlert} setBackground={props.setBackground} setLoad={props.setLoad}/>
      <div
        className="flex absolute z-1 h-max top-0 bottom-0 right-0 left-0 m-auto bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700"
        style={{
          width: "68rem",
          height: "32rem",
          top: "68.8333px",
          backgroundColor: "#ffffff",
          borderColor: "#ffffff",
          borderWidth: "0.2rem",
        }}
      >
        <Calendar
          localizer={localizer}
          events={events}
          startAccessor="start"
          endAccessor="end"
          style={{ height: 500 }}
          onSelectSlot={handleSelect}
          selectable
        />
      </div>
    </div>
  );
}

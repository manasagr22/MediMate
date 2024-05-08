import { Input } from '@material-tailwind/react';
import { DateTimePicker, LocalizationProvider } from '@mui/x-date-pickers'
import { DemoContainer } from '@mui/x-date-pickers/internals/demo'
import React, { useEffect, useState } from 'react'

export default function Appointment(props) {
  const [date, setDate] = useState(null);

  useEffect(() => {
    if (!date) {
      const str = props.record.appointment;
      const dateMatch = str.match(/Date: (\S+)/);
      const timeMatch = str.match(/Time: (\S+)/);
      const durationMatch = str.match(/Duration: (\S+)/);

      const d = dateMatch ? dateMatch[1] : null;
      const time = timeMatch ? timeMatch[1] : null;
      const duration = durationMatch ? durationMatch[1] : null;

      setDate([d, time, duration]);

      console.log('Date:', d);
      console.log('Time:', time);
      console.log('Duration:', duration);
    }
  }, [date])

  return (
    <div
      className="flex absolute z-1 h-max justify-center items-center top-0 bottom-0 right-0 left-0 w-fit bg-white border border-gray-200 rounded-lg shadow-2xl dark:bg-gray-800 dark:border-gray-700 py-2 px-2"
      style={{
        width: "22rem",
        height: "11rem",
        backgroundColor: "#ffffff",
        borderColor: "#ffffff",
        borderWidth: "0.2rem",
        flexDirection: "column",
        margin: "auto",
        marginTop: "auto",
        boxShadow: "0 0 30px rgba(0, 0, 0, 0.5)",
      }}
    >
      <div className='absolute right-0 top-0' style={{ color: "red", zIndex: 1 }}><button onClick={() => {
        props.setRecordSelect(null)
      }}><span class="material-symbols-outlined" style={{ fontSize: "1.8rem", fontWeight: "600" }}>
          close
        </span></button>
      </div>

      <div>
      <h2 class="block antialiased tracking-normal font-sans text-3xl font-semibold leading-[1.3] text-inherit">
          Doctor: <span style={{ fontFamily: "CrimsonText-Regular", color: "blue" }}>{props.data.doctor}</span>
      </h2>
      <h3 class="block font-sans text-2xl antialiased font-semibold leading-snug tracking-normal text-gray-800">
        Appointment Schedule
      </h3>
      <Input color='blue' value={date[0]} label='Date'/>
      <Input color='blue' value={date[1]} label='Time'/>
      <Input color='blue' value={date[2]} label='Duration'/>
    </div>
    </div>
  )
}

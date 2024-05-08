import React from 'react'

export default function PrescriptionUpdate(props) {
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
      
        <h5 class="block font-sans text-2xl antialiased font-semibold leading-snug tracking-normal text-gray-700">
          Field Worker '{props.data.fieldWorker}' conveyed the prescription to the patient.
        </h5>
    </div>
  )
}

import React from 'react'

export default function Prescription(props) {
  return (
    <div
      className="flex absolute z-1 h-max top-0 bottom-0 right-0 left-0 w-fit bg-white border border-gray-200 rounded-lg shadow-2xl dark:bg-gray-800 dark:border-gray-700 py-2 px-2"
      style={{
        width: "40rem",
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
          Doctor: <span style={{ fontFamily: "CrimsonText-Regular", color: "blue" }}>{props.data[0]}</span>
        </h2>

        <div className="mt-4">
          <div className="mt-4">
            <label className="flex flex-col items-start mb-1 font-semibold text-xl">Prescription</label>
            <div class="relative w-full min-w-[200px]">
              <textarea
                class="peer h-full min-h-[100px] w-full resize-none rounded-xl border border-blue-gray-200 border-t-transparent bg-white px-3 py-3 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 focus:border-2 focus:border-gray-900 focus:border-t-transparent focus:outline-0 disabled:resize-none disabled:border-0 disabled:bg-blue-gray-50"
                placeholder=" "
                id="prescriptionText"
                value={`${props.data[1].medicine}` + " for " + `${props.data[1].days}` + " days"}
              ></textarea>
              <label class="before:content[' '] after:content[' '] pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none text-[11px] font-normal leading-tight text-blue-gray-400 transition-all before:pointer-events-none before:mt-[6.5px] before:mr-1 before:box-border before:block before:h-1.5 before:w-2.5 before:rounded-tl-md before:border-t before:border-l before:border-blue-gray-200 before:transition-all after:pointer-events-none after:mt-[6.5px] after:ml-1 after:box-border after:block after:h-1.5 after:w-2.5 after:flex-grow after:rounded-tr-md after:border-t after:border-r after:border-blue-gray-200 after:transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[4.1] peer-placeholder-shown:text-blue-gray-500 peer-placeholder-shown:before:border-transparent peer-placeholder-shown:after:border-transparent peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-gray-900 peer-focus:before:border-t-2 peer-focus:before:border-l-2 peer-focus:before:border-gray-900 peer-focus:after:border-t-2 peer-focus:after:border-r-2 peer-focus:after:border-gray-900 peer-disabled:text-transparent peer-disabled:before:border-transparent peer-disabled:after:border-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500">
                Write Prescription
              </label>
            </div>
          </div>

          <div className="mt-4">
            <label className="flex flex-col items-start mb-1 font-semibold  text-xl">Tests</label>
            <div class="relative w-full min-w-[200px]">
              <textarea
                class="peer h-full min-h-[100px] w-full resize-none rounded-xl border border-blue-gray-200 border-t-transparent bg-white px-3 py-3 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 focus:border-2 focus:border-gray-900 focus:border-t-transparent focus:outline-0 disabled:resize-none disabled:border-0 disabled:bg-blue-gray-50"
                placeholder=" "
                id="testText"
                value={props.data[1].test !== "" || props.data[1].test !== null ? props.data[1].test : ""}
              ></textarea>
              <label class="before:content[' '] after:content[' '] pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none text-[11px] font-normal leading-tight text-blue-gray-400 transition-all before:pointer-events-none before:mt-[6.5px] before:mr-1 before:box-border before:block before:h-1.5 before:w-2.5 before:rounded-tl-md before:border-t before:border-l before:border-blue-gray-200 before:transition-all after:pointer-events-none after:mt-[6.5px] after:ml-1 after:box-border after:block after:h-1.5 after:w-2.5 after:flex-grow after:rounded-tr-md after:border-t after:border-r after:border-blue-gray-200 after:transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[4.1] peer-placeholder-shown:text-blue-gray-500 peer-placeholder-shown:before:border-transparent peer-placeholder-shown:after:border-transparent peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-gray-900 peer-focus:before:border-t-2 peer-focus:before:border-l-2 peer-focus:before:border-gray-900 peer-focus:after:border-t-2 peer-focus:after:border-r-2 peer-focus:after:border-gray-900 peer-disabled:text-transparent peer-disabled:before:border-transparent peer-disabled:after:border-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500">
                Write Tests
              </label>
            </div>
          </div>

          <div className="mt-4">
            <label className="flex flex-col items-start mb-1 font-semibold text-xl">Precautions</label>
            <div class="relative w-full min-w-[200px]">
              <textarea
                class="peer h-full min-h-[100px] w-full resize-none rounded-xl border border-blue-gray-200 border-t-transparent bg-white px-3 py-3 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 focus:border-2 focus:border-gray-900 focus:border-t-transparent focus:outline-0 disabled:resize-none disabled:border-0 disabled:bg-blue-gray-50"
                placeholder=" "
                id="precautionsText"
                value={props.data[1].precaution !== "" || props.data[1].precaution !== null ? props.data[1].precaution : ""}
              ></textarea>
              <label class="before:content[' '] after:content[' '] pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none text-[11px] font-normal leading-tight text-blue-gray-400 transition-all before:pointer-events-none before:mt-[6.5px] before:mr-1 before:box-border before:block before:h-1.5 before:w-2.5 before:rounded-tl-md before:border-t before:border-l before:border-blue-gray-200 before:transition-all after:pointer-events-none after:mt-[6.5px] after:ml-1 after:box-border after:block after:h-1.5 after:w-2.5 after:flex-grow after:rounded-tr-md after:border-t after:border-r after:border-blue-gray-200 after:transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[4.1] peer-placeholder-shown:text-blue-gray-500 peer-placeholder-shown:before:border-transparent peer-placeholder-shown:after:border-transparent peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-gray-900 peer-focus:before:border-t-2 peer-focus:before:border-l-2 peer-focus:before:border-gray-900 peer-focus:after:border-t-2 peer-focus:after:border-r-2 peer-focus:after:border-gray-900 peer-disabled:text-transparent peer-disabled:before:border-transparent peer-disabled:after:border-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500">
                Write Precautions
              </label>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

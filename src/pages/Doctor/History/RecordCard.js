import React, { useState } from 'react'

export default function RecordCard(props) {
    const arr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
    const [isHovered, setIsHovered] = useState(false);
    console.log(props.keyItem)

    const handleMouseEnter = () => {
        setIsHovered(true);
    };

    const handleMouseLeave = () => {
        setIsHovered(false);
    };

    function formatTimestamp(timestamp) {
        const date = new Date(timestamp);
        const day = date.getDate().toString().padStart(2, '0');
        const month = (date.getMonth() + 1).toString().padStart(2, '0');
        const year = date.getFullYear();
        const hours = date.getHours().toString().padStart(2, '0');
        const minutes = date.getMinutes().toString().padStart(2, '0');
        return `${day}/${month}/${year}, ${hours}:${minutes}`;
    }

    function handleButtonPress() {
        props.setBackground("blur(4px)")
        if(props.record['type'] === 'Questionnaire') {
            props.setRecordSelect([props.record['type'], props.record['adminQuestionnaire']]);
        }
        else if(props.record['type'] === 'doctorQuestionAnswer') {
            props.setRecordSelect([props.record['type'], props.record['doctorQuestionAnswer']]);
        }
        else if(props.record['type'] === 'doctorQuestionnaire') {
            props.setRecordSelect([props.record['type'], props.record['doctorQuestionnaire']]);
        }
        else if(props.record['type'] === 'questionnaire') {
            props.setRecordSelect([props.record['type'], props.record['doctorQuestionnaire']])
        }
        else if(props.record['type'] === 'prescription') {
            props.setRecordSelect([props.record['type'], [props.record.doctor, props.record['prescription']]])
        }
        else if(props.record['type'] === 'prescriptionUpdate') {
            props.setRecordSelect([props.record['type'], props.record])
        }
        else if(props.record['type'] === 'appointmentUpdate') {
            props.setRecordSelect([props.record['type'], props.record])
        }
        else if(props.record['type'] === 'appointment') {
            props.setRecordSelect([props.record['type'], props.record])
        }
        else if(props.record['type'] === 'changeStatus') {
            props.setRecordSelect([props.record['type'], props.record['status']])
        }
    }

    return (
        <button key={props.keyItem} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave} onClick={handleButtonPress} className='w-full'>
            <div className='flex flex-col relative w-full h-20 mb-2 justify-center items-center'>
                <div className='absolute w-full flex flex-col justify-start'>
                {props.latest && <p className='absolute -top-2 pl-2' style={{color: "red", fontSize: 17}}>Latest</p>}
                    {props.record['type'] === 'Questionnaire' || props.record['type'] === 'doctorQuestionAnswer' || props.record['type'] === 'questionnaire' || props.record['type'] === 'doctorQuestionnaire' ?
                        <>
                            <h1 className="font-sans text-xl antialiased font-semibold leading-tight tracking-normal text-gray-900">
                                Title: <span className="text-xl" style={{ fontFamily: "CrimsonText-Regular", color: "blue" }}>Questionnaire</span>
                            </h1>
                        </>
                        : props.record['type'] === 'prescription' ?
                            <>
                                <h1 className="font-sans text-xl antialiased font-semibold leading-tight tracking-normal text-gray-900">
                                    Title: <span className="text-xl" style={{ fontFamily: "CrimsonText-Regular", color: "blue" }}>Prescription</span>
                                </h1>
                            </> : props.record['type'] === 'prescriptionUpdate' ?
                                <>
                                    <h1 className="font-sans text-xl antialiased font-semibold leading-tight tracking-normal text-gray-900">
                                        Title: <span className="text-xl" style={{ fontFamily: "CrimsonText-Regular", color: "blue" }}>Prescription Update</span>
                                    </h1>
                                </> : props.record['type'] === 'appointment' ?
                                    <>
                                        <h1 className="font-sans text-xl antialiased font-semibold leading-tight tracking-normal text-gray-900">
                                            Title: <span className="text-xl" style={{ fontFamily: "CrimsonText-Regular", color: "blue" }}>Appointment</span>
                                        </h1>
                                    </> : props.record['type'] === 'changeStatus' ?
                                        <>
                                            <h1 className="font-sans text-xl antialiased font-semibold leading-tight tracking-normal text-gray-900">
                                                Title: <span className="text-xl" style={{ fontFamily: "CrimsonText-Regular", color: "blue" }}>Status</span>
                                            </h1>
                                        </> : undefined}
                    <h1 className="font-sans text-xl antialiased font-semibold leading-tight tracking-normal text-gray-900">
                        Date: <span className="text-lg" style={{ fontFamily: "CrimsonText-Regular", color: "gray" }}>{formatTimestamp(props.record['timestamp'])}</span>
                    </h1>
                </div>
                {/* <p className="absolute w-full text-center">Text for the outer div</p> */}
                {arr.map((ele, index) => (
                    <div key={index} className={isHovered ? 'w-full shadow h-2 rounded-2xl bg-gray-300' : 'w-full shadow h-2 rounded-2xl bg-white'} style={{ borderTop: 'none', borderBottom: "none" }}>
                    </div>
                ))}
            </div>
        </button>
    )
}

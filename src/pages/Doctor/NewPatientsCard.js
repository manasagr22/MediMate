import React, { useState } from 'react'
import { Card, CardBody, CardHeader, Typography } from '@material-tailwind/react'
import UpdateTextCard from './UpdateTextCard'
import { useNavigate } from 'react-router-dom';

export default function NewPatientsCard(props) {
    const arr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
    const [isHovered, setIsHovered] = useState(false);
    const navigate = useNavigate();

    const handleMouseEnter = () => {
        setIsHovered(true);
    };

    const handleMouseLeave = () => {
        setIsHovered(false);
    };
    
    function handleButtonPress() {
        navigate('/doc/patientrecord', { state: { patientId: props.patient.aabhaId, patientName: props.patient.firstName + " " + props.patient.lastName, publicId : props.patient.pid } });
    }

    return (
        <button key={props.keyItem} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave} onClick={handleButtonPress} className='w-full'>
            <div className='flex flex-col relative w-full h-20 mb-2 justify-center items-center'>
                <div className='absolute w-full flex flex-col justify-start'>
                    <h1 className="font-sans text-xl antialiased font-semibold leading-tight tracking-normal text-gray-900">
                        Patient Name: <span className="text-xl" style={{ fontFamily: "CrimsonText-Regular", color: "blue" }}>{props.patient.firstName + " " + props.patient.lastName}</span>
                    </h1>
                    <h1 className="font-sans text-xl antialiased font-semibold leading-tight tracking-normal text-gray-900">
                        Area: <span className="text-lg" style={{ fontFamily: "CrimsonText-Regular", color: "gray" }}>{props.patient.area}</span>
                    </h1>
                    <UpdateTextCard message={props.patient.message}/>
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

import React from 'react'
import NavbarSup from '../../components/NavbarSup'
import { Avatar } from '@mui/material'
import EditIcon from '@mui/icons-material/Edit';

export default function Chat(props) {
    return (
        <div style={{ backgroundColor: "#f5f5f5", height: "100%", overflow: "hidden" }}>
            <NavbarSup checkToken={props.checkToken} setJwtToken={props.setJwtToken} jwtToken={props.jwtToken} decryptData={props.decryptData} handleAlert={props.handleAlert} setBackground={props.setBackground} setLoad={props.setLoad} />
            <div className='leftView bg-green-500 w-96 h-full'>
                <div className='topView1 w-full h-24 bg-red-500 flex justify-between items-center'>
                    <div className='flex pl-4'>
                        <Avatar
                            variant="circular"
                            sx={{ width: 56, height: 56 }}
                            alt="tania andrew"
                            className="border border-gray-900"
                            src="https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1480&q=80"
                        />
                        <div className='flex flex-col justify-start'>
                            <p className='text-blue-600' style={{fontFamily: "SignikaNegative-Bold", fontSize: 22}}>Manas Agrawal</p>
                            <p className='text-lg text-gray-400 w-fit'>District: Indore</p>
                        </div>
                    </div>
                    <div className='pr-4'>
                        <EditIcon color='lightgray' />
                    </div>
                </div>
            </div>
        </div>
    )
}

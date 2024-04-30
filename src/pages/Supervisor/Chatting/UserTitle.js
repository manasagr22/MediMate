import React from 'react'
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';
import PushPinOutlinedIcon from '@mui/icons-material/PushPinOutlined';
import NotificationsNoneOutlinedIcon from '@mui/icons-material/NotificationsNoneOutlined';
import { Avatar } from '@mui/material';

export default function UserTitle(props) {
    return (
        <div className="flex flex-row items-center w-full pl-4 pr-4">
            <div className="flex items-center">
                <Avatar
                    variant="circular"
                    sx={{ width: 56, height: 56 }}
                    alt="tania andrew"
                    className="w-14 h-14 rounded-full border-2 border-black mr-2"
                    src="https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1480&q=80"
                />
                <p className="text-lg font-medium" style={{color: 'black', fontFamily: 'SignikaNegative-Medium', fontSize: 24}}>{props.name}</p>
            </div>
            <div className="flex items-center ml-auto justify-around w-32">
                <EmailOutlinedIcon style={{fontSize: 30, color: "gray"}}/>
                <PushPinOutlinedIcon style={{fontSize: 30, color: "gray"}}/>
                <NotificationsNoneOutlinedIcon style={{fontSize: 30, color: "gray"}}/>
            </div>
        </div>
    )
}

import React, { useState } from 'react'
import DoneAllIcon from '@mui/icons-material/DoneAll';
import CheckOutlinedIcon from '@mui/icons-material/CheckOutlined';

export default function MessageBox(props) {
    const isSender = props.senderId === props.userId;
    const [sent, setSent] = useState('delivered')

    function extractHourMinuteAMPM(time) {
        var timeDigits = time.split(":");

        var hours = timeDigits[0];
        var minutes = timeDigits[1];
        var ampm = timeDigits[2].includes("AM") ? "AM" : "PM";

        var extractedTime = hours + ':' + minutes + ' ' + ampm;

        return extractedTime;
    }
    return (
        <div key={props.keyItem} className={`flex p-2 ${isSender ? 'self-end bg-blue-500' : 'self-start bg-gray-200'} rounded-lg mb-2 max-w-2/3`}>
            <p className={`text-sm ${isSender ? 'text-white' : 'text-black'}`} style={{fontSize: 15}}>{props.data}</p>
            <div className="flex justify-between items-center mt-2">
                <p className={`ml-1 text-xs ${isSender ? 'text-black' : 'text-gray-600'}`}>{extractHourMinuteAMPM(props.time)}</p>
                <div className="flex items-center">
                    {isSender && sent === 'sent' && <CheckOutlinedIcon className="fas fa-checkmark-done text-gray-900 text-base" style={{paddingBottom: 5}}/>}
                    {isSender && sent === 'delivered' && <DoneAllIcon className="fas fa-checkmark-done text-black-700 text-base" style={{paddingBottom: 5}}/>}
                </div>
            </div>
        </div>
    );
}

import React, { useEffect, useRef, useState } from 'react'
// import ChatData from './ChatData.json';
import DoneAllIcon from '@mui/icons-material/DoneAll';

export default function ChannelList(props) {
    const [str, setStr] = useState(props.data.length === 0 ? null : props.data.msg)
    // const wrapperRef = useRef(null);
//   const [isTruncated, setIsTruncated] = useState(false);

useEffect(() => {
    setStr(props.data.msg)
}, [props.data.msg])

  const truncateText = (text, maxLength) => {
    if (text.length <= maxLength) return text;
    return text.slice(0, maxLength) + '...';
  };

//   const truncatedText = truncateText(text, maxWidth / 8);


    function getCorrectDate(date) {
        const parts = date.split("/");
        return `${parts[2]}-${parts[1]}-${parts[0]}`;
    }

    function getLabel(date) {
        const today = new Date();
        const yesterday = new Date(today);
        yesterday.setDate(today.getDate() - 1);

        const messageDate = new Date(getCorrectDate(date));

        let dateLabel;
        if (messageDate.toDateString() === today.toDateString()) {
            dateLabel = "Today";
        } else if (messageDate.toDateString() === yesterday.toDateString()) {
            dateLabel = "Yesterday";
        } else {
            dateLabel = date;
        }

        return dateLabel;
    }

    function extractHourMinuteAMPM(time) {
        var timeDigits = time.split(":");

        var hours = timeDigits[0];
        var minutes = timeDigits[1];
        var ampm = timeDigits[2].includes("AM") ? "AM" : "PM";

        var extractedTime = hours + ':' + minutes + ' ' + ampm;

        return extractedTime;
    }

    async function openChat() {
        //console.log(props.userEmail)
        const url = new URL("http://localhost:8082")
        url.pathname = "/supervisor/getChats";
        url.searchParams.set("id", props.userEmail);
        const result = await fetch(url, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + props.jwtToken
            }
        }).then(res => res.json());
        props.setChatData(result);
        //console.log(result);
        props.setUser({ id: props.userEmail, name: props.name, data: props.data })
    }

    return (
        <div className="topView flex justify-start ml-4 mb-4 py-2" key={props.index} style={{borderRadius: 6}}>
            <button onClick={openChat} className='w-full'>
                <div className="avatarView flex items-center">
                    <img src="https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1480&q=80" alt="avatar" className="avatar w-14 h-14 rounded-full border-2 border-black mr-2" />
                    <div className="flex flex-col justify-start h-full w-full">
                        <div className="flex w-full items-center justify-between">
                            <p className="user" style={{ fontFamily: "SignikaNegative-Bold", fontSize: 21, color: "blue" }}>{props.name}</p>
                            {str && props.data.length !== 0 ? (
                                <p className="time pr-2" style={{fontFamily: "CrimsonText-Regular", color: "gray"}}>
                                    {getLabel(props.data.date) === 'Today'
                                        ? extractHourMinuteAMPM(props.data.time)
                                        : getLabel(props.data.date)}
                                </p>
                            ) : undefined}
                        </div>
                        <div className="flex w-full overflow-hidden justify-between" style={{ maxHeight: '1.5rem' }}>
                            {str && (
                                <p className="user text-gray-500 text-base break-words truncated-text" >
                                    {truncateText(str, 240/8)}
                                </p>
                            )}
                            {str && props.senderEmail === props.index ? (
                                <div className="relative ml-8 pr-2">
                                    <DoneAllIcon className="fas fa-checkmark-done text-blue-600 text-base" style={{paddingBottom: 5}}/>
                                </div>
                            ) : undefined}
                        </div>
                    </div>
                </div>
            </button>
        </div>
    )
}

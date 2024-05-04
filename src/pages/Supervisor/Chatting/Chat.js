import React, { useEffect, useRef, useState } from 'react'
import NavbarSup from '../../../components/NavbarSup'
import { Avatar } from '@mui/material'
import EditIcon from '@mui/icons-material/Edit';
import "../../../styles/Chat.css";
import SearchIcon from '@mui/icons-material/Search';
import ChannelList from './ChannelList';
// import Data from './dummy.json'
import UserTitle from './UserTitle';
import MessageBox from './MessageBox';
import InputBox from './InputBox';
import SockJS from "sockjs-client";
import { Client } from "@stomp/stompjs";
import { useNavigate } from 'react-router-dom';

export default function Chat(props) {
    const [data, setData] = useState(null);
    const [Data, setConstData] = useState(null);
    const [chatDataWithLabels, setChatDataWithLabels] = useState(null);
    const [chatData, setChatData] = useState(null);
    const [topPadding, setTopPadding] = useState(null);
    const [searchText, setSearchText] = useState(null);
    const [countMessages, setCountMessages] = useState(0);
    const [user, setUser] = useState(null);
    const [message, setMessage] = useState(null);
    const messageContainer = useRef(null);
    const sendMessageSpecificRef = useRef();
    const [client, setClient] = useState(null);
    const [sent, setSent] = useState('delivered')

    const SOCKET_URL = "http://localhost:8082/ws-message";
    const navigate = useNavigate();

    function receiveMessage(msg) {
        
    }

    useEffect(() => {
        const email = JSON.parse(localStorage.getItem("email"))
        if (!email)
            navigate("/");
        console.log(email)

        const socket1 = new SockJS(SOCKET_URL + `?email=${email}`);
        const stompClient = new Client({
            webSocketFactory: () => socket1,
            onConnect: () => {
                console.log("Connected 1!!");
                stompClient.subscribe('/user/topic/private-messages', function (message) {
                    receiveMessage(JSON.parse(message.body).content);
                });
            },
            onDisconnect: () => {
                console.log("Disconnected 1!");
            },
        });

        stompClient.activate();
        setClient(stompClient);

        // return () => {
        //     if (stompClient) {
        //         stompClient.deactivate();
        //         setClient(null);
        //     }
        // };
    }, [])

    const updateDataWithMessage = (message) => {
        // Find the index of the conversation in the data array based on the receiver's email
        const conversationIndex = data ? data.findIndex((conversation) => conversation.id === message.id) : -1;

        // If the conversation exists in the data array
        if (conversationIndex !== -1) {
            // Update the data array with the latest message
            setData((prevData) => {
                const newData = [...prevData]; // Create a shallow copy of the data array
                console.log(newData)
                console.log(newData[conversationIndex])
                newData[conversationIndex].data = message.data; // Update the data of the conversation
                return newData;
            });
        } else {
            // If the conversation does not exist in the data array, add it as a new conversation
            const temp = data;
            temp ? setData((prevData) => [
                ...prevData,
                {
                    id: message.id,
                    name: message.name,
                    data: message.data
                }
            ]) : setData([{
                id: message.id,
                name: message.name,
                data: message.data
            }])

            temp ? setConstData((prevData) => [
                ...prevData,
                {
                    id: message.id,
                    name: message.name,
                    data: message.data
                }
            ]) : setConstData([{
                id: message.id,
                name: message.name,
                data: message.data
            }])
        }
    };

    useEffect(() => {
        async function sendPrivateMessage(text, to, date, time, name) {
            console.log(client);
            if (client && client.connected) {
                console.log(text, to);
                setSent("sent")
                client.publish({
                    destination: "/ws/private-message",
                    body: JSON.stringify({ messageContent: text, to: to, date: date, time: time }),
                });
                setSent("delivered")

                const newMessage = {
                    id: to,
                    name: name,
                    data: {
                        id: JSON.parse(localStorage.getItem("email")),
                        msg: text,
                        date: date,
                        time: time
                    }
                }

                updateDataWithMessage(newMessage);

            } else {
                props.handleAlert("danger", "Server Error Occurred!")
            }
        }
        sendMessageSpecificRef.current = sendPrivateMessage;
    }, [client])

    useEffect(() => {

        async function getFW() {
            try {
                const result = await fetch("http://localhost:8082/supervisor/getProfiles", {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": "Bearer " + props.jwtToken
                    }
                })

                props.setBackground("");
                props.setLoad(false);

                if (result.ok) {
                    const res = await result.json();
                    if (res.length !== 0) {
                        setConstData(res)
                        setData(res);
                    }
                }
                else {
                    props.handleAlert("danger", "Server Error Occurred!")
                }
            }
            catch {
                props.handleAlert("danger", "Server Error Occurred!")
            }
        }
        if (Data === null && props.jwtToken !== null) {
            getFW();
        }
    }, [Data, props.jwtToken])

    useEffect(() => {
        function getCorrectDate(date) {
            const parts = date.split("/");
            return `${parts[2]}-${parts[1]}-${parts[0]}`;
        }

        function getChatDataWithLabels() {
            const today = new Date();
            const yesterday = new Date(today);
            yesterday.setDate(today.getDate() - 1);

            const processedData = [];

            for (const date in chatData) {
                const messageDate = new Date(getCorrectDate(date));

                let dateLabel;
                if (messageDate.toDateString() === today.toDateString()) {
                    dateLabel = "Today";
                } else if (messageDate.toDateString() === yesterday.toDateString()) {
                    dateLabel = "Yesterday";
                } else {
                    dateLabel = date;
                }

                processedData.push({
                    dateLabel: dateLabel,
                    messages: chatData[date]
                });
            }

            return processedData.reverse();
        }
        if (chatData && user) {
            setChatDataWithLabels(getChatDataWithLabels(chatData));
        }
    }, [chatData, user])

    const options = {
        hour: 'numeric',
        minute: 'numeric',
        hour12: true,
        timeZone: 'Asia/Kolkata'
    };

    const indianTime = new Date().toLocaleTimeString('en-US', options);

    useEffect(() => {
        if (topPadding === null && Data !== null) {
            const len = Data.length;
            setTopPadding((len / 6.5) * 14);
        }
    }, [Data, topPadding])

    useEffect(() => {
        if (searchText !== null && searchText !== "") {
            const list = [];
            Data.forEach((item) => {
                if (item.name.startsWith(searchText))
                    list.push(item)
            })
            setData(list);
        }
        else {
            setData(Data);
        }
    }, [searchText])

    useEffect(() => {
        if (chatDataWithLabels !== null) {
            if (messageContainer.current) {
                messageContainer.current.scrollTop = messageContainer.current.scrollHeight;
            }
        }
    }, [chatDataWithLabels, countMessages]);

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

    useEffect(() => {
        async function openChat() {
            try {
                const url = new URL("http://localhost:8082")
                url.pathname = "/supervisor/getChats";
                var index = null;
                for (let i = 0; i < data.length; i++) {
                    if (data[i].id === props.chatDirect.email)
                        index = data[i].id;
                }
                if (index === null) {
                    setUser({ id: props.chatDirect.email, name: props.chatDirect.name })
                    setChatData(null);
                }
                else {
                    console.log(index)
                    url.searchParams.set("id", index);
                    const result = await fetch(url, {
                        method: "GET",
                        headers: {
                            "Content-Type": "application/json",
                            "Authorization": "Bearer " + props.jwtToken
                        }
                    }).then(res => res.json());
                    setUser({ id: props.chatDirect.email, name: props.chatDirect.name })
                    setChatData(result);
                }
            }
            catch {
                setUser({ id: props.chatDirect.email, name: props.chatDirect.name })
                setChatData(null);
            }
        }

        if (props.chatDirect && client)
            openChat();
    }, [props.chatDirect, client])

    return (
        <div style={{ backgroundColor: '#f5f6f9', height: "100%", overflow: "hidden" }}>
            <NavbarSup checkToken={props.checkToken} setJwtToken={props.setJwtToken} jwtToken={props.jwtToken} decryptData={props.decryptData} handleAlert={props.handleAlert} setBackground={props.setBackground} setLoad={props.setLoad} />
            <div className='flex flex-row'>
                <div className='leftView w-96 h-full border-r-2' style={{ borderRightColor: "lightgray" }}>
                    <div className='topView1 w-full h-24 flex justify-between items-center'>
                        <div className='flex pl-4'>
                            <Avatar
                                variant="circular"
                                sx={{ width: 56, height: 56 }}
                                alt="tania andrew"
                                className="border border-gray-900"
                                src="https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1480&q=80"
                            />
                            <div className='pl-2 flex flex-col justify-start'>
                                <p className='' style={{ fontFamily: "SignikaNegative-Bold", fontSize: 24, color: "blue" }}>Manas Agrawal</p>
                                <p className='w-fit relative' style={{ fontFamily: "CrimsonText-Regular", color: "black", fontSize: 19, bottom: 8 }}>District: Indore</p>
                            </div>
                        </div>
                        <div className='pr-4 relative' style={{ bottom: 4 }}>
                            <EditIcon color='lightgray' />
                        </div>
                    </div>
                    <div className="inputContainer relative mb-10 flex items-center bg-white w-80 mx-auto rounded-full border-1 border-gray-300 mt-10">
                        <input
                            type="text"
                            className="input rounded-full text-black text-base pl-12 py-3 w-full"
                            placeholder="Search"
                            value={searchText}
                            onChange={(e) => setSearchText(e.target.value)}
                        />
                        <SearchIcon className="iconSearch absolute top-1/2 left-4 transform -translate-y-1/2 fas fa-search text-gray-500" />
                    </div>
                    <div className="channelContainer overflow-y-scroll w-full" style={{ height: window.innerHeight - 16 * (17.5) }}>
                        {topPadding && data && (
                            <div className="flex flex-col justify-evenly" style={{ paddingTop: topPadding - 30 }}>
                                {data.map((item) => (
                                    <ChannelList
                                        key={item.id}
                                        name={item.name}
                                        data={item.data}
                                        senderId={JSON.parse(localStorage.getItem("email"))}
                                        index={item.id}
                                        setChatData={setChatData}
                                        setUser={setUser}
                                        jwtToken={props.jwtToken}
                                    />
                                ))}
                            </div>
                        )}
                    </div>
                </div>
                <div className="rightView bg-white h-full" style={{ width: window.innerWidth - (4 * 96) }}>
                    {user ? (
                        <div className="h-20 border-b-3 border-gray-300 flex justify-center items-center mb-4" style={{ borderBottomWidth: 3, borderBottomColor: "#e1e4e6", borderRadius: 10 }}>
                            <UserTitle name={user.name} />
                        </div>
                    ) : undefined
                    }
                    {/* {chatDataWithLabels && */}
                    {user ? <div className="bg-white w-full" style={{ height: window.innerHeight - (4 * 40) }}>
                        <div ref={messageContainer} className='border-b-2 border-gray-300 ml-8 mr-8 overflow-x-scroll' style={{ height: window.innerHeight - (4 * 60) }}>
                            {chatDataWithLabels && chatDataWithLabels.map((item, index) => (
                                <div className='flex flex-col' key={index}>
                                    <div className="flex justify-center items-center relative m-4 mb-6" style={{ borderBottomWidth: 2, borderBottomColor: "#e1e4e6", marginTop: 0 }}>
                                        <p className="font-bold relative px-4 bg-white" style={{ top: "0.8rem" }}>{getLabel(item.dateLabel)}</p>
                                    </div>
                                    {item.messages.map((message, messageIndex) => (
                                        <MessageBox key={messageIndex} sent={sent} senderId={message.id} userId={user.email} data={message.data} time={message.time} keyItem={message.key} />
                                    ))}
                                </div>
                            ))}
                        </div>
                        <div className="h-20 flex mb-0 justify-center items-center">
                            <InputBox countMessages={countMessages} setCountMessages={setCountMessages} setChatData={setChatData} chatData={chatData} sendMessageSocket={sendMessageSpecificRef.current} email={props.chatDirect ? props.chatDirect.email : user.id} senderId={JSON.parse(localStorage.getItem("email"))} client={client} name={user.name}/>
                        </div>
                    </div> : undefined}
                    {/* } */}
                </div>
            </div>
        </div>
    )
}

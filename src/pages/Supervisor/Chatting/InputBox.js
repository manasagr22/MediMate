import React, { useEffect, useState } from 'react'
import MicNoneOutlinedIcon from '@mui/icons-material/MicNoneOutlined';
import SentimentSatisfiedAltOutlinedIcon from '@mui/icons-material/SentimentSatisfiedAltOutlined';
import AttachmentOutlinedIcon from '@mui/icons-material/AttachmentOutlined';
import SendIcon from '@mui/icons-material/Send';
import EmojiPicker from 'emoji-picker-react';

export default function InputBox(props) {
    const smileys = ['😀', '😃', '😄', '😁', '😆', '😅', '😂', '🤣', '😊', '😇', '🙂', '🙃', '😉', '😌', '😍', '🥰', '😘', '😗', '😙', '😚', '😋', '😛', '😝', '😜', '🤪', '🤨', '🧐', '🤓', '😎', '🤩', '🥳', '😏', '😒', '😞', '😔', '😟', '😕', '🙁', '☹️', '😣', '😖', '😫', '😩', '🥺', '😢', '😭', '😤', '😠', '😡', '🤬', '🤯', '😳', '🥵', '🥶', '😱', '😨', '😰', '😥', '😓', '🤗', '🤔', '🤭', '🤫', '🤥', '😶', '😐', '😑', '😬', '🙄', '😯', '😦', '😧', '😮', '😲', '🥱', '😴', '🤤', '😪', '😵', '🤐', '🥴', '🤢', '🤮', '🤧', '😷', '🤒', '🤕', '🤑', '🤠', '😈', '👿', '👹', '👺', '🤡', '💩', '👻', '💀', '☠️', '👽', '👾', '🤖', '🎃'];

    const [isModalVisible, setModalVisible] = useState(false);

    const toggleModal = () => {
        setModalVisible(!isModalVisible);
    };

    const handleEmojiClick = (emojiObject, event) => {
        try {
            document.getElementById("searchText").value += emojiObject.emoji
        }
        catch {
            ;
        }
    };

    const convertFormat = (date) => {
        const str = (date.split(","))[0].split("/")
        var dd = str[1], mm = str[0];
        dd = dd.length === 1 ? '0' + dd : dd;
        mm = mm.length === 1 ? '0' + mm : mm;
        return `${dd}/${mm}/${str[2]}`
    }

    const sendMessage = () => {
        const options = {
            year: 'numeric',
            month: 'numeric',
            day: 'numeric',
            timeZone: 'Asia/Kolkata'
        };

        const options1 = {
            hour: 'numeric',
            minute: 'numeric',
            second: 'numeric',
            hour12: true,
            timeZone: 'Asia/Kolkata'
        }
        const date = convertFormat(new Date().toLocaleTimeString('en-US', options));
        const time = new Date().toLocaleTimeString('en-US', options1);
        const searchText = document.getElementById("searchText").value;

        var key = 0;

        for (const d in props.chatData) {
            key += props.chatData[d].length
        }
        const newMessage = {
            key: String(key + 1),
            id: props.senderId,
            data: searchText,
            time: time
        }

        if(props.client && props.client.connected) {
            try {
                if (props.chatData[date]) {
                    // If the date exists, push the newMessage object into the array
                    props.setChatData(prevChatData => ({
                        ...prevChatData,
                        [date]: [...prevChatData[date], newMessage]
                    }));
                } else {
                    // If the date doesn't exist, create a new key-value pair with the new date and initialize it with an array containing the newMessage object
                    props.setChatData(prevChatData => ({
                        ...prevChatData,
                        [date]: [newMessage]
                    }));
                }
            }
            catch {
                props.setChatData(prevChatData => ({
                    ...prevChatData,
                    [date]: [newMessage]
                }));
            }
            props.sendMessageSocket(searchText, props.email, date, time, props.name)
            document.getElementById("searchText").value = "";
        }
    }

    return (
        <div className="w-full flex justify-center items-center">
            <div className="relative flex flex-row items-center w-5/6 rounded-full border border-gray-300" style={{ backgroundColor: '#f2f4f6' }}>
                <input
                    id='searchText'
                    className="w-full py-2 px-4 pl-10 text-black placeholder-gray-500 rounded-full focus:outline-none"
                    type="text"
                    placeholder="Type here..."
                    // value={searchText}
                    style={{ backgroundColor: '#f2f4f6' }}
                    onKeyDown={(e) => e.key === 'Enter' ? 
                        sendMessage() : undefined}
                    // onChange={(e) => setSearchText(e.target.value)}
                />
                <button className="absolute left-2">
                    <MicNoneOutlinedIcon style={{ color: "red", fontSize: 28 }} />
                    {/* <Feather name="mic" size={24} color="red" /> */}
                </button>
                <div className="flex flex-row items-center justify-evenly w-1/6">
                    <button>
                        <AttachmentOutlinedIcon style={{ color: "gray", fontSize: 28 }} />
                        {/* <Entypo name="attachment" size={24} color="gray" /> */}
                    </button>
                    <button onClick={toggleModal}>

                        <SentimentSatisfiedAltOutlinedIcon style={{ color: isModalVisible ? "blue" : "gray", fontSize: 28 }} />
                        {/* <Fontisto name="smiley" size={24} color="gray" /> */}
                    </button>
                    {isModalVisible ? (
                        <div className="absolute right-0 bottom-10 rounded-lg shadow-lg">
                            <EmojiPicker onEmojiClick={handleEmojiClick}/>
                        </div>
                    ) : undefined}
                    {/* {isModalVisible && (
                        <div className="absolute top-full left-0 bg-gray-200 p-4 rounded-lg shadow-lg">
                            {smileys.map((smiley, index) => (
                                <p key={index} className="text-2xl">{smiley}</p>
                            ))}
                        </div>
                    )} */}
                    <button onClick={sendMessage}>
                        <SendIcon style={{ color: "blue", fontSize: 28 }} />
                        {/* <MaterialIcons name="send" size={33} color="blue" /> */}
                    </button>
                </div>
            </div>
        </div>
    )
}

import React, {useEffect, useRef, useState} from 'react';

import Message from "../../components/Message";

import "./chatcontainer.css"
import API from "../../api";

function ChatContainer({currentChat, currentUser}) {
    const [messages, setMessages] = useState([])
    const [newMessage, setNewMessage] = useState("")
    const scrollRef = useRef()

    useEffect(() => {
        async function fetchData() {
            try {
                const response = await API.get('/getMessages/' + currentChat?.id)
                setMessages(response.data)
            } catch (e) {
                console.log(e)
            }
        }

        fetchData().then()
    }, [currentChat])

    useEffect(() => {
        scrollRef.current?.scrollIntoView({behavior: "smooth"})
    }, [messages])

    const handleSubmit = async (e) => {
        e.preventDefault()
        const message = {
            chatId: currentChat.id,
            senderId: currentUser.id,
            text: newMessage
        }

        try {
            const response = await API.post('/createMessage', message)
            setMessages([...messages, response.data])
            setNewMessage("")
        } catch (e) {
            console.log(e)
        }
    }

    return (
        <div>
            <div className="message-container">
                <hr/>
                <div className="container-fluid">
                    {
                        currentChat ? <>
                            <fieldset className="chat-box">
                                {messages.map((m => (
                                    <div ref={scrollRef}>
                                        <Message message={m} own={m.senderId == currentUser.id}/>
                                    </div>
                                )))
                                }
                            </fieldset>
                            <textarea placeholder="Send a message"
                                      className="send-message"
                                      onChange={(e) => setNewMessage(e.target.value)}
                                      value={newMessage}
                            />
                            <div style={{cursor: 'pointer'}} className="send-icon" onClick={handleSubmit}>
                                <i className="fa fa-arrow-circle-right"/>
                            </div>
                        </> : <span>Open a conversation to start a chat</span>}
                </div>
            </div>
        </div>
    );
}

export default ChatContainer;
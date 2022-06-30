import React, { useState, useEffect, useContext } from "react"
import { axios } from "../utils/axios"
import { notificationStyles } from '../globalStyles';
import { useNavigate } from 'react-router-dom';
import { showNotification } from '@mantine/notifications';
import { SocketContext } from "./SocketContext";

export const MessageContext = React.createContext()

export const MessageProvider = ({children}) => {
    const [messages, setMessages] = useState([]);

    const {socket} = useContext(SocketContext);

    useEffect(() => {
        if(socket){
            socket.on("receive_message", (messageData) => {
                setMessages(message => [...message, messageData])
            })
        }
    }, [socket]);

    useEffect(() => {
        if(socket){
            socket.on("new_event", (data) => {
                setMessages(event => [...event, data])
            })
        }
    }, [socket]);

    useEffect(() => {
        if(socket){
            socket.on("left_user", (data) => {
                setMessages(event => [...event, data])
            })
        }
    }, [socket]);

    return(
        <MessageContext.Provider value={{
            messages,

            setMessages,
        }}>
            {children}
        </MessageContext.Provider>
    )
}
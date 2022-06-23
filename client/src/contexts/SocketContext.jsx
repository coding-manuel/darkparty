import React, { useState, useEffect } from "react"
import { io } from "socket.io-client"

export const SocketContext = React.createContext()

export const SocketProvider = ({children}) => {
    const [socket, setSocket] = useState(null);
    useEffect(() => {
        setSocket(io.connect("http://localhost:9000"))
    }, []);

    return(
        <SocketContext.Provider value={{socket}}>
            {children}
        </SocketContext.Provider>
    )
}
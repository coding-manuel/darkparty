import React, { useState, useEffect } from "react"

export const PlayerContext = React.createContext()

export const PlayerProvider = ({children}) => {
    const [chicken, setChicken] = useState('')

    return(
        <PlayerContext.Provider>
            {children}
        </PlayerContext.Provider>
    )
}
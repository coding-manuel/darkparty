import React, { useState, useEffect } from "react"

export const PlayerContext = React.createContext()

export const PlayerProvider = ({children}) => {
    const [playerState, setPlayerState] = useState({
        url: null,
        pip: false,
        playing: false,
        seeking: false,
        light: true,
        volume: 1,
        muted: false,
        played: 0,
        loaded: 0,
        duration: 0,
        elapsedTime: 0,
        loadedTime: 0,
        playbackRate: 1.0,
        loop: false
    });


    return(
        <PlayerContext.Provider value={{playerState, setPlayerState}}>
            {children}
        </PlayerContext.Provider>
    )
}
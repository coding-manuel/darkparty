import React, {useState, useContext, useEffect} from 'react'
import { VideoSeekSlider } from "react-video-seek-slider";
import { Pause, Play, SpeakerSimpleHigh, SpeakerSimpleLow, SpeakerSimpleSlash } from 'phosphor-react'
import { Group, Stack, Tooltip, Text, Slider, Button } from '@mantine/core'

import "react-video-seek-slider/styles.css"
import { PlayerContext } from '../contexts/PlayerContext';
import { SocketContext } from '../contexts/SocketContext';

const StyledTooltip = ({children, label}) => {
    return(
        <Tooltip sx={{height: 16}} color='dark' gutter={28} transition="pop" transitionDuration={150} transitionTimingFunction="ease"  label={<Text size='xs'>{label}</Text>}>
            {children}
        </Tooltip>
)}

export default function PlayerControls({
    volume,
    muted,
    playing,
    duration,
    elapsedTime,
    loadedTime,
    onPlayPause,
    onMute,
    onVolumeChange,
    onSeek,
    onSeekDown
}) {
    const [volumeOpen, setVolumeOpen] = useState(false);

    const {socket} = useContext(SocketContext);
    const {controlVisible} = useContext(PlayerContext);

    function convertSeconds(seconds) {
        var convert = function(x) { return (x < 10) ? "0"+x : x; }

        let hours = convert(parseInt(seconds / (60*60)))
        let minutes = convert(parseInt(seconds / 60 % 60))
        let second = convert(parseInt(seconds) % 60)

        if(hours == 0)
            return minutes + ":" + second
        else
            return hours + ":" + minutes + ":" + second
    }

    return (
        <Stack sx={{position: 'absolute', bottom: 0, width: '100%', height: '24px', padding: '0 16px 56px 16px'}}>
            <Stack sx={{transition: 'transform .2s ease-out, opacity .4s ease-out', opacity: !controlVisible ? 0 : 1, transform: !controlVisible && 'translate(0, 30px)'}} spacing={4}>
            <div onMouseDown={onSeekDown}>
                <VideoSeekSlider
                    max={duration}
                    currentTime={elapsedTime}
                    progress={loadedTime}
                    onChange={onSeek}
                    offset={0}
                    secondsPrefix="00:00:"
                    minutesPrefix="00:"
                    limitTimeTooltipBySides
                />
            </div>
            <Group spacing='md' onMouseLeave={() => setVolumeOpen(false)}>
                {playing ?
                <StyledTooltip label='Pause'>
                    <Pause onClick={() => onPlayPause(false)} cursor='pointer' size={16} weight="fill" />
                </StyledTooltip>
                :
                <StyledTooltip label='Play'>
                    <Play onClick={() => onPlayPause(true)} cursor='pointer' size={16} weight="fill" />
                </StyledTooltip>}
                <Group onMouseOver={() => setVolumeOpen(true)}>
                    {muted ?
                    <StyledTooltip label='Unmute'>
                        <SpeakerSimpleSlash onClick={onMute} cursor='pointer' size={16} weight="fill" />
                    </StyledTooltip>
                    :
                    <StyledTooltip label='Mute'>
                        <SpeakerSimpleHigh onClick={onMute} cursor='pointer' size={16} weight="fill" />
                    </StyledTooltip>}
                    {volumeOpen && <Slider size='xs' value={muted ? 0 : volume} onChange={onVolumeChange} sx={{minWidth: volumeOpen ? 50 : 0, opacity: volumeOpen ? 1 : 0, transition: '.1s ease-out'}} label={null}  min={0} max={1} step={0.1} />}
                </Group>
                <Group spacing={8}><Text size='xs' weight={600}>{convertSeconds(elapsedTime)}</Text><Text size='xs'>/</Text><Text size='xs' color='grey'>{convertSeconds(duration)}</Text></Group>
            </Group>
            </Stack>
        </Stack>
    )
}

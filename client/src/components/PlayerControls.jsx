import React, {useState} from 'react'
import { VideoSeekSlider } from "react-video-seek-slider";
import { Pause, Play, SpeakerSimpleHigh, SpeakerSimpleLow, SpeakerSimpleSlash } from 'phosphor-react'
import { Group, Stack, Tooltip, Text, Slider } from '@mantine/core'

import "react-video-seek-slider/styles.css"

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
    onPlayPause,
    duration,
    elapsedTime,
    loadedTime,
    onMute,
    onVolumeChange,
    onSeek,
    onSeekUp,
    onSeekDown
}) {
    const [volumeOpen, setVolumeOpen] = useState(false);

    return (
        <Stack spacing={4} sx={{position: 'absolute', bottom: 0, width: '100%', height: '24px', backgroundColor:'green', padding: '0 16px 56px 16px'}}>
            <div onMouseDown={onSeekDown} onMouseUp={onSeekUp}>
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
            <Group>
                {playing ?
                <StyledTooltip label='Pause'>
                    <Pause onClick={onPlayPause} cursor='pointer' size={16} weight="fill" />
                </StyledTooltip>
                :
                <StyledTooltip label='Play'>
                    <Play onClick={onPlayPause} cursor='pointer' size={16} weight="fill" />
                </StyledTooltip>}
                <Group onMouseOver={() => setVolumeOpen(true)} onMouseLeave={() => setVolumeOpen(false)}>
                    {muted ?
                    <StyledTooltip label='Unmute'>
                        <SpeakerSimpleSlash onClick={onMute} cursor='pointer' size={16} weight="fill" />
                    </StyledTooltip>
                    :
                    <StyledTooltip label='Mute'>
                        <SpeakerSimpleHigh onClick={onMute} cursor='pointer' size={16} weight="fill" />
                    </StyledTooltip>}
                    <Slider size='xs' value={muted ? 0 : volume} onChange={onVolumeChange} sx={{minWidth: volumeOpen ? 50 : 0, opacity: volumeOpen ? 1 : 0, transition: '.1s ease-out'}} label={null}  min={0} max={1} step={0.05} />
                </Group>
            </Group>
        </Stack>
    )
}

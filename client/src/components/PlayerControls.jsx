import React, {useState} from 'react'
import { VideoSeekSlider } from "react-video-seek-slider";
import { Pause, Play, SpeakerSimpleHigh, SpeakerSimpleLow, SpeakerSimpleSlash } from 'phosphor-react'
import { Group, Stack, Tooltip, Text, Slider, Button } from '@mantine/core'

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
        <Stack spacing={4} sx={{position: 'absolute', bottom: 0, width: '100%', height: '24px', padding: '0 16px 56px 16px'}}>
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
                    {volumeOpen && <Slider size='xs' value={muted ? 0 : volume} onChange={onVolumeChange} sx={{minWidth: volumeOpen ? 50 : 0, opacity: volumeOpen ? 1 : 0, transition: '.1s ease-out'}} label={null}  min={0} max={1} step={0.1} />}
                </Group>
                <Group spacing={8}><Text size='xs' weight={600}>{convertSeconds(elapsedTime)}</Text><Text size='xs'>/</Text><Text size='xs' color='grey'>{convertSeconds(duration)}</Text></Group>
            </Group>
        </Stack>
    )
}

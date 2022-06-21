import React from 'react'
import { VideoSeekSlider } from "react-video-seek-slider";
import { Pause, Play } from 'phosphor-react'
import { Group, Stack, Tooltip, Text } from '@mantine/core'

import "react-video-seek-slider/styles.css"

const StyledTooltip = ({children, label}) => {
    return(
        <Tooltip color='dark' gutter={28} transition="pop" transitionDuration={150} transitionTimingFunction="ease"  label={<Text size='xs'>{label}</Text>}>
            {children}
        </Tooltip>
)}

export default function PlayerControls({playing, onPlayPause}) {
  return (
    <Stack spacing={4} sx={{position: 'absolute', bottom: 0, width: '100%', height: '24px', backgroundColor:'green', padding: '0 16px 56px 16px'}}>
        <VideoSeekSlider
            max={1152}
            currentTime={22}
            progress={400}
            offset={0}
            secondsPrefix="00:00:"
            minutesPrefix="00:"
         />
        <Group>
            {playing ?
            <StyledTooltip label='Pause'>
                <Pause onClick={onPlayPause} cursor='pointer' size={16} weight="fill" />
            </StyledTooltip>
            :
            <StyledTooltip label='Play'>
                <Play onClick={onPlayPause} cursor='pointer' size={16} weight="fill" />
            </StyledTooltip>}
        </Group>
    </Stack>
  )
}

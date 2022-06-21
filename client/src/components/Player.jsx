import React, {useState} from 'react';
import { AspectRatio, Box } from '@mantine/core';
import ReactPlayer from 'react-player/file'

import PlayerControls from './PlayerControls';

const Player = ({url}) => {
    const [playing, setPlaying] = useState(false);

    const handlePlayPause = () => {
        setPlaying(!playing)
    }

    return (
        <Box sx={{height: '100%', backgroundColor: '#000', position: 'relative'}}>
            <ReactPlayer playing={playing} controls={false} height='100%' width='100%' url={"https://d15jncv4xxvixg.cloudfront.net/l4l2q6610.uofdezfuo5d.mp4.mp4"} />
            <PlayerControls
                playing={playing}
                onPlayPause={handlePlayPause}
            />
        </Box>
    );
}

export default Player;

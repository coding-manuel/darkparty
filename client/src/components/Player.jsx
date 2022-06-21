import { Box } from '@mantine/core';
import React from 'react';
import ReactPlayer from 'react-player/file'

const Player = ({url}) => {
    return (
        <ReactPlayer height='100%' width='100%' controls url={"https://d15jncv4xxvixg.cloudfront.net/l4l2q6610.uofdezfuo5d.mp4.mp4"} />
    );
}

export default Player;

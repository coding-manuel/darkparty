import React, {useState, useEffect} from 'react'
import { useParams } from 'react-router-dom'
import { axios } from '../utils/axios';
import { Container, Grid, LoadingOverlay, Stack, Text } from '@mantine/core';

import Player from '../components/Player';
import ChatBox from '../components/ChatBox';

export default function Movie() {
    const [movieDetails, setMovieDetails] = useState(null);
    const {id} = useParams()

    useEffect(() => {
        axios.post("/movie/getmovie", {movieID: id})
        .then(res => setMovieDetails(res.data[0]))
    }, [])

    return (
        movieDetails === null ?
            <LoadingOverlay visible={true} />
        :
            <Grid gutter={0} sx={{height: '100vh', width: '100vw', margin: 0}}>
                <Grid.Col span={9}>
                    <Player url={movieDetails.movieurl}/>
                </Grid.Col>
                <Grid.Col span={3}><ChatBox /></Grid.Col>
            </Grid>
    )
}

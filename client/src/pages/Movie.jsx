import React, {useState, useEffect} from 'react'
import { useParams } from 'react-router-dom'
import { axios } from '../utils/axios';
import { Container, Group, LoadingOverlay } from '@mantine/core';

import Player from '../components/Player';

export default function Movie() {
    const [movieDetails, setMovieDetails] = useState(null);
    const {id} = useParams()

    useEffect(() => {
        axios.post("/movie/getmovie", {movieID: id})
        .then(res => setMovieDetails(res.data[0]))
    }, [])

    return (
        <Container size='xl'>
            {movieDetails === null ?
                <LoadingOverlay visible={true} />
            :
                <Group noWrap>
                    <Player url={movieDetails.movieurl}/>
                    <div style={{minWidth: 200}}>
                        sjfklasj
                    </div>
                </Group>
            }
        </Container>
    )
}

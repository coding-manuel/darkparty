import React, {useState, useEffect} from 'react'
import { useParams } from 'react-router-dom'
import { axios } from '../utils/axios';

import Player from '../components/Player';

export default function Movie() {
    const [movieDetails, setMovieDetails] = useState(null);
    const {id} = useParams()

    useEffect(() => {
        axios.post("/movie/getmovie", {movieID: id})
        .then(res => setMovieDetails(res.data))
    }, [])
    return (
        movieDetails !== null && <Player url={movieDetails.movieurl}/>
    )
}

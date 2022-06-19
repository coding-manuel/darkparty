import React, {useState, useEffect} from 'react'
import { useParams } from 'react-router-dom'
import { axios } from '../utils/axios';

export default function Movie() {
    const [movieDetails, setMovieDetails] = useState(null);
    const {id} = useParams()

    useEffect(() => {
        axios.post("/movie/getmovie", {movieID: id})
        .then(res => setMovieDetails(res.data))
    }, [])
    return (
        <div>Movie</div>
    )
}

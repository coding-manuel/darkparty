import React from 'react'
import { Stack, Text, AspectRatio } from '@mantine/core'
import { useNavigate } from 'react-router-dom'

export default function MovieThumb({movie}) {
    const navigate = useNavigate()

    const handleClick = () => {
        navigate(`/movie/${movie.id}`)
    }

    return (
        <Stack onClick={handleClick} spacing={0} sx={{cursor: 'pointer', transition: '.1s ease-out', '&:hover': {transform: 'translate(0, -6px)'}}}>
            <AspectRatio mb={8} ratio={1600 / 2400} sx={{ width: 180 }} mx="auto">
                <img src={movie.posterurl} alt="" />
            </AspectRatio>
            <Text size='sm' weight={600}>{movie.title}</Text>
            <Text size='xs'>{movie.director}</Text>
        </Stack>
    )
}
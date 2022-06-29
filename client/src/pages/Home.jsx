import React, { useEffect, useState } from 'react'
import { axios } from '../utils/axios';
import { Group, Button, Stack, Divider, Text } from '@mantine/core'
import MovieThumb from '../components/MovieThumb';

export default function Home() {

  const [allMovies, setAllMovies] = useState([]);

  useEffect(() => {
    axios.get("/movie/getallmovie")
    .then(res => setAllMovies(res.data))
  }, []);

  return (
    <Stack>
      <Group position='center'>
        <Button>Create Room</Button>
      </Group>
      <Divider></Divider>
      <Text>
        Browse Movies
      </Text>
      <Group position='center' grow>
        {allMovies.length !== 0 && allMovies.map(movie => {
          return (
            <MovieThumb movie={movie} />
          )
        })}
      </Group>
    </Stack>
  )
}

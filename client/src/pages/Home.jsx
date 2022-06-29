import React, { useEffect, useState, useContext } from 'react'
import { Group, Button, Stack, Divider, Text } from '@mantine/core'
import { useNavigate } from 'react-router-dom';

import { axios } from '../utils/axios';
import { AuthContext } from '../contexts/AuthContext';
import { SocketContext } from '../contexts/SocketContext';
import MovieThumb from '../components/MovieThumb';

export default function Home() {
  const [allMovies, setAllMovies] = useState([]);

  const {username} = useContext(AuthContext);
  const {socket} = useContext(SocketContext);

  const navigate = useNavigate()

  useEffect(() => {
    axios.get("/movie/getallmovie")
    .then(res => setAllMovies(res.data))
  }, []);

  const handleClick = () => {
    socket.emit("create_room", username)
    socket.on("send_roomID", ({roomID}) => {
        navigate(`/room/${roomID}`)
    })
  }

  return (
    <Stack>
      <Group position='center'>
        <Button onClick={handleClick}>Create Room</Button>
      </Group>
      <Divider></Divider>
      {/* <Text>
        Browse Movies
      </Text>
      <Group position='center' grow>
        {allMovies.length !== 0 && allMovies.map(movie => {
          return (
            <MovieThumb movie={movie} />
          )
        })}
      </Group> */}
    </Stack>
  )
}

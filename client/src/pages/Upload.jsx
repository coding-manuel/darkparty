import React, { useState, useEffect } from 'react'
import { Stack, Group, Text, TextInput, Button, AspectRatio, useMantineTheme } from '@mantine/core'
import { useForm, zodResolver } from '@mantine/form'
import { Dropzone, MIME_TYPES, IMAGE_MIME_TYPE } from '@mantine/dropzone';
import { z } from 'zod'
import { showNotification } from '@mantine/notifications';
import { notificationStyles } from '../globalStyles';
import { axios } from '../utils/axios'

const processImage = (item, type) => {
    var id = item[0].name.replaceAll(" ", '') + Math.random().toString(16).slice(2)
    var file = item[0];
    var blob = file.slice(0, file.size);
    const newFile = new File([blob], id, {type: type});

    return { id: id, file: newFile}
}

export const dropzoneChildren = (movieFile, theme) => {

    return (
    movieFile === null ?
        <Group position="center" spacing="sm" p={0} style={{ minHeight: 60, pointerEvents: 'none' }}>
            <Text size="md" inline>
                Drag and drop movie file to upload
            </Text>
        </Group>
        :
        <Group spacing="sm" style={{ padding: 16, minHeight: 60, pointerEvents: 'none' }}>
            <Text size="md" inline>
                File Selected: {movieFile[0].name.slice(0, -4)}
            </Text>
        </Group>
    )
};

export const dropzonePosterChildren = (moviePoster, theme) => {

    const [posterSrc, setPosterSrc] = useState('');

    useEffect(() => {
        if(moviePoster !== null){
            let fr = new FileReader();
            fr.onload = () => {
                console.log(fr.result)
                setPosterSrc(fr.result)
            }
            fr.readAsDataURL(moviePoster[0])
        }
    }, [moviePoster]);

    return (
    moviePoster === null ?
        <Group position="center" spacing="sm" p={0} style={{ padding: 16, pointerEvents: 'none' }}>
            <Text size="md" inline>
                Upload movie poster
            </Text>
        </Group>
        :
        <Group spacing="sm" style={{ minHeight: 60, pointerEvents: 'none' }}>
            <img src={posterSrc} alt="" style={{height: 'auto', width: '100%', objectFit: 'cover'}} />
        </Group>
    )
};

export default function Upload() {
    const [movieFile, setMovieFile] = useState(null);
    const [moviePoster, setMoviePoster] = useState(null);
    const theme = useMantineTheme()

    const movieSchema = z.object({
        title: z.string(),
        director: z.string(),
    })

    const form = useForm({
        schema: zodResolver(movieSchema),
        initialValues: {
            title : "",
            director: ""
        }
    })

    const handleUpload = async (values) => {
        const newPosterFile = processImage(moviePoster, moviePoster[0].type)
        const newMovieFile = processImage(movieFile, 'video/mp4')

        const posterUrl = `d15jncv4xxvixg.cloudfront.net${newPosterFile.id}`
        const movieUrl = `d15jncv4xxvixg.cloudfront.net${newMovieFile.id}`

        // axios.post("/movie/generateUrl", {filename: newMovieFile.file.name})
        // .then(function(res){
        //     fetch(res.data.message, {
        //         method: 'PUT',
        //         body: newMovieFile.file
        //     })
        // })

        // axios.post("/movie/generateUrl", {filename: newPosterFile.file.name})
        // .then(function(res){
        //     fetch(res.data.message, {
        //         method: 'PUT',
        //         body: newPosterFile.file
        //     })
        // })

        values = {...values, poster: posterUrl, movie: movieUrl}
    }

    return (
        <Stack>
            <AspectRatio ratio={1600 / 2400} sx={{ width: 180 }} mx="auto">
                <Dropzone
                    onDrop={(files) => setMoviePoster(files)}
                    onReject={(files) => showNotification({title: 'File not Valid', styles: notificationStyles})}
                    accept={IMAGE_MIME_TYPE}
                    >
                    {() => dropzonePosterChildren(moviePoster, theme)}
                </Dropzone>
            </AspectRatio>
            <Dropzone
                onDrop={(files) => setMovieFile(files)}
                styles={{root: {backgroundColor: movieFile !== null && theme.colors.orange[5]}}}
                onReject={(files) => showNotification({title: 'File not Valid', styles: notificationStyles})}
                accept={MIME_TYPES.mp4}
                >
                {() => dropzoneChildren(movieFile, theme)}
            </Dropzone>
            <form onSubmit={form.onSubmit((values) => handleUpload(values))}>
                <Stack>
                    <TextInput
                        label="MOVIE TITLE"
                        required
                        {...form.getInputProps('title')}
                    />
                    <TextInput
                        label="DIRECTOR"
                        required
                        {...form.getInputProps('director')}
                    />
                    <Button type='submit'>Submt</Button>
                </Stack>
            </form>
        </Stack>
    )
}

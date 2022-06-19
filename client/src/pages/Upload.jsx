import React, { useState, useEffect } from 'react'
import { Stack, Group, Text, TextInput, Button, AspectRatio, useMantineTheme, Progress } from '@mantine/core'
import { useForm, zodResolver } from '@mantine/form'
import { Dropzone, MIME_TYPES, IMAGE_MIME_TYPE } from '@mantine/dropzone';
import { z } from 'zod'
import { useNavigate } from 'react-router-dom';
import { showNotification } from '@mantine/notifications';
import { notificationStyles } from '../globalStyles';
import { axios, freeAxios } from '../utils/axios'
import { Uploader } from '../utils/multipartUploader'

const uid = () => {
    return Date.now().toString(36) + Math.random().toString(36);
};

const processImage = (item, type) => {
    let name = item[0].name.replace(/[^a-zA-Z0-9.]+/g, '')
    let id = uid() + name.slice(-4)
    console.log(id)
    let file = item[0];
    let blob = file.slice(0, file.size);
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
    const [movieDetails, setMovieDetails] = useState({});
    const [loading, setLoading] = useState(false);
    const [uploader, setUploader] = useState(undefined)
    const [percentage, setPercentage] = useState(undefined);

    const navigate = useNavigate()
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

        const posterUrl = `https://d15jncv4xxvixg.cloudfront.net/${newPosterFile.id}`
        const movieUrl = `https://d15jncv4xxvixg.cloudfront.net/${newMovieFile.id}`

        setLoading(true)

        axios.post("/movie/generateUrl", {filename: newPosterFile.id})
        .then(function(res){
            freeAxios.put(res.data.message, newPosterFile.file)
        })

        const videoUploaderOptions = {
            fileName: newMovieFile.id,
            file: newMovieFile.file,
        }

        const uploader = new Uploader(videoUploaderOptions)
        setUploader(uploader)

        uploader
            .onProgress(({ percentage: newPercentage }) => {
            // to avoid the same percentage to be logged twice
            if (newPercentage !== percentage) {
                setPercentage(newPercentage)
            }
            })
            .onError((error) => {
                console.error(error)
            })

        uploader.start()

        values = {...values, poster: posterUrl, movie: movieUrl}

        setMovieDetails(values)

    }

    const handleCancel = () => {
        if (uploader) {
            setLoading(false)
            uploader.abort()
        }
    }

    useEffect(() => {
        if(percentage === 100){
            axios.post("/movie/uploadmoviedetails", movieDetails)
            .then(res => {
                navigate("/home")
            })
        }
    }, [percentage]);

    return (
        <Stack>
            <AspectRatio ratio={1600 / 2400} sx={{ width: 180 }} mx="auto">
                <Dropzone
                    onDrop={(files) => setMoviePoster(files)}
                    onReject={(files) => showNotification({title: 'File not Valid', styles: notificationStyles})}
                    accept={IMAGE_MIME_TYPE}
                    disabled={loading}

                    >
                    {() => dropzonePosterChildren(moviePoster, theme)}
                </Dropzone>
            </AspectRatio>
            <Dropzone
                onDrop={(files) => setMovieFile(files)}
                styles={{root: {backgroundColor: movieFile !== null && theme.colors.orange[5]}}}
                onReject={(files) => showNotification({title: 'File not Valid', styles: notificationStyles})}
                accept={MIME_TYPES.mp4}
                disabled={loading}
                >
                {() => dropzoneChildren(movieFile, theme)}
            </Dropzone>
            <form onSubmit={form.onSubmit((values) => handleUpload(values))}>
                <Stack>
                    <TextInput
                        label="MOVIE TITLE"
                        required
                        disabled={loading}
                        {...form.getInputProps('title')}
                    />
                    <TextInput
                        label="DIRECTOR"
                        required
                        disabled={loading}
                        {...form.getInputProps('director')}
                    />
                    <Button type='submit' loading={loading}>Upload</Button>
                    {loading && <Progress size="sm" value={percentage} animate />}
                </Stack>
            </form>
            {loading && <Button type='reset' onClick={handleCancel} sx={{backgroundColor: theme.colors.red[9], "&:hover": {backgroundColor: `${theme.colors.red[8]}!important`}}}>Cancel Upload</Button>}
        </Stack>
    )
}

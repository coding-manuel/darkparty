import React, { useState } from 'react'
import { Stack, Group, Text, TextInput, Button } from '@mantine/core'
import { useForm, zodResolver } from '@mantine/form'
import { Dropzone, MIME_TYPES } from '@mantine/dropzone';
import { z } from 'zod'
import { showNotification } from '@mantine/notifications';
import { notificationStyles } from '../globalStyles';

export const dropzoneChildren = (movieFile) => (
    movieFile === null ?
        <Group position="center" spacing="sm" style={{ minHeight: 60, pointerEvents: 'none' }}>
            <Text size="md" inline>
                Drag and drop movie file to upload
            </Text>
        </Group>
        :
        <Group spacing="sm" style={{ minHeight: 60, pointerEvents: 'none' }}>
            <Text size="md" inline>
                File Selected: {movieFile[0].name.slice(0, -4)}
            </Text>
        </Group>

);

export default function Upload() {
    const [movieFile, setMovieFile] = useState(null);

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
        var id = movieFile[0].name.replaceAll(" ", '') + Math.random().toString(16).slice(2)
        var file = movieFile[0];
        var blob = file.slice(0, file.size);
        const newMovieFile = new File([blob], id, {type: 'video/mp4'});

        axios.post("/movie/generateUrl", {filename: movieFile[0].name, filetype: movieFile[0].type})
        .then(function(res){
            fetch(res.data.message, {
                method: 'PUT',
                body: newMovieFile[0]
            })
            .then((response) => {
                const fileUrl = `d15jncv4xxvixg.cloudfront.net${id}`
                console.log(fileUrl)
            })
        })
    }

    return (
        <Stack>
            <Dropzone
                onDrop={(files) => setMovieFile(files)}
                onReject={(files) => showNotification({title: 'File not Valid', styles: notificationStyles})}
                maxSize={3 * 1024 ** 2}
                accept={MIME_TYPES.mp4}
                >
                {() => dropzoneChildren(movieFile)}
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

import React, { useState } from 'react'
import { Stack, Group, Text, TextInput, Button } from '@mantine/core'
import { useForm, zodResolver } from '@mantine/form'
import { Dropzone, MIME_TYPES } from '@mantine/dropzone';
import { axios } from '../utils/axios'

export const dropzoneChildren = () => (
    <Group position="center" spacing="sm" style={{ minHeight: 60, pointerEvents: 'none' }}>
        <Text size="xl" inline>
            Drag and drop movie file to upload
        </Text>
    </Group>
);

export default function Upload() {
    const [movieFile, setMovieFile] = useState(null);

    const form = useForm({
        // schema: zodResolver(signInSchema),
        initialValues: {
            title : "",
            director: ""
        }
    })

    const handleUpload = async (values) => {
        axios.post("/movie/generateUrl", {filename: movieFile[0].name, filetype: movieFile[0].type})
        .then(function(res){
            fetch(res.data.message, {
                method: 'PUT',
                body: movieFile[0]
            })
            .then(response => response.json())

            // axios.put(res.data.message, [movieFile])
            // .then()
        })
    }

    return (
        <Stack>
            <Dropzone
                onDrop={(files) => setMovieFile(files)}
                onReject={(files) => console.log('rejected files', files)}
                maxSize={3 * 1024 ** 2}
                accept={MIME_TYPES.mp4}
                >
                {() => dropzoneChildren()}
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

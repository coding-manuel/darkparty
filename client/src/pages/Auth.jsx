import React, {useEffect, useState} from 'react'
import { Paper, Stack, Tabs, TextInput, Button, Box } from '@mantine/core';
import { useForm } from '@mantine/form'

export default function Auth() {

    const [activeTab, setActiveTab] = useState(1);

    const form = activeTab === "signIn" ? useForm({
        initialValues: {
            email : 0,
            password: ""
        }
    }) :
    useForm({
        initialValues: {
            email : 0,
            password: ""
        }
    })

    const handleSignin = (values) => {
        console.log("login")
    }

    const handleSignUp = (values) => {
        console.log("signupo")
    }

    const onChange = (active, tabKey) => {
        setActiveTab(active);
    };

    return (
        <Box sx={{width: "90%", maxWidth: '350px', margin: 'auto'}}>
            <Tabs active={activeTab} onTabChange={onChange} grow position='center' variant="pills">
                <Tabs.Tab label="Sign In" tabKey="signIn">
                    <form style={{padding: '0 8px'}} onSubmit={form.onSubmit((values) => handleSignin(values))}>
                        <Stack>
                            <TextInput
                                label="EMAIL OR USERNAME"
                                required
                                {...form.getInputProps('email')}
                            />
                            <TextInput
                                label="PASSWORD"
                                required
                                {...form.getInputProps('password')}
                            />
                            <Button type='submit'>Log In</Button>
                        </Stack>
                    </form>
                </Tabs.Tab>
                <Tabs.Tab label="Sign Up" tabKey="signUp">
                    <form style={{padding: '0 8px'}} onSubmit={form.onSubmit((values) => handleSignUp(values))}>
                        <Stack>
                            <TextInput
                                label="EMAIL OR USERNAME"
                                required
                                {...form.getInputProps('email')}
                            />
                            <TextInput
                                label="PASSWORD"
                                required
                                {...form.getInputProps('password')}
                            />
                            <Button type='submit'>Log In</Button>
                        </Stack>
                    </form>
                </Tabs.Tab>
                </Tabs>
        </Box>
    )
}

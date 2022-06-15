import React, {useEffect, useState} from 'react'
import { z } from 'zod'
import { Paper, Stack, Tabs, TextInput, Button, Box } from '@mantine/core';
import { useForm, zodResolver } from '@mantine/form'

export default function Auth() {

    const [activeTab, setActiveTab] = useState(0);

    const signInSchema = z.object({
        email: z.string().email({ message: 'Invalid email' }),
        password: z.string().min(8, {message: 'Password should be atleast 8 characters'})
    });

    const signUpSchema = z.object({
        name: z.string().min(4, {message: "Enter Valid Name"}),
        username: z.string().min(4, {message: "Username should be atleast 4 characters"}),
        email: z.string().email({ message: 'Invalid email' }),
        password: z.string().min(8, {message: 'Password should be atleast 8 characters'})
    });

    const signInForm = useForm({
        schema: zodResolver(signInSchema),
        initialValues: {
            email : "",
            password: ""
        }
    })

    const signUpForm = useForm({
        schema: zodResolver(signUpSchema),
        initialValues: {
            name: "",
            username: "",
            email : "",
            password: ""
        }
    })

    const handleSignin = (values) => {
        console.log(values)
    }

    const handleSignUp = (values) => {
        console.log(values)
    }

    const onChange = (active, tabKey) => {
        setActiveTab(active);
    };

    return (
        <Box sx={{width: "90%", maxWidth: '350px', margin: 'auto'}}>
            <Tabs active={activeTab} onTabChange={onChange} grow position='center' variant="pills">
                <Tabs.Tab label="Sign In" tabKey="signIn">
                    <form onSubmit={signInForm.onSubmit((values) => handleSignin(values))}>
                        <Stack>
                            <TextInput
                                label="EMAIL OR USERNAME"
                                required
                                {...signInForm.getInputProps('email')}
                            />
                            <TextInput
                                label="PASSWORD"
                                type='password'
                                required
                                {...signInForm.getInputProps('password')}
                            />
                            <Button type='submit' mt={16}>Log In</Button>
                        </Stack>
                    </form>
                </Tabs.Tab>
                <Tabs.Tab label="Sign Up" tabKey="signUp">
                    <form onSubmit={signUpForm.onSubmit((values) => handleSignUp(values))}>
                        <Stack>
                            <TextInput
                                label="FULL NAME"
                                required
                                {...signUpForm.getInputProps('name')}
                            />
                            <TextInput
                                label="EMAIL"
                                required
                                {...signUpForm.getInputProps('email')}
                            />
                            <TextInput
                                label="Username"
                                required
                                {...signUpForm.getInputProps('username')}
                            />
                            <TextInput
                                label="PASSWORD"
                                required
                                {...signUpForm.getInputProps('password')}
                            />
                            <Button type='submit' mt={16}>Sign Up</Button>
                        </Stack>
                    </form>
                </Tabs.Tab>
                </Tabs>
        </Box>
    )
}

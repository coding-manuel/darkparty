import React, {useEffect, useState} from 'react'
import { z } from 'zod'
import { X } from 'phosphor-react'
import { Paper, Stack, Tabs, TextInput, Button, Box } from '@mantine/core';
import { useForm, zodResolver } from '@mantine/form'
import { axios } from '../utils/axios'
import { showNotification } from '@mantine/notifications';
import { useNavigate } from 'react-router-dom';
import { notificationStyles } from '../globalStyles';

export default function Auth() {
    const navigate = useNavigate()

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

    const handleSignUp = (values) => {
        axios.post("/auth/register", {email: values.email, password: values.password, name: values.name, username: values.username})
        .then(function (response){
            setActiveTab(0)
            let title = 'Try Signing In with your credentials'
            showNotification({
                title: title,
                styles: notificationStyles
            })
        })
        .catch(function (error){
            if(error.response){
                const status = error.response.status
                let title, description
                if(status === 409){
                    title = 'User with this Email Address Already Exists'
                    description = 'Maybe try signing in'
                }
                else if(status === 408){
                    title = 'Username already taken'
                    description = 'Trying being more creative'
                }
                showNotification({
                    title: title,
                    message: description,
                    styles: notificationStyles
                })

            }
        })
    }

    const handleSignIn = (values) => {
        axios.post("/auth/login", {email: values.email, password: values.password})
        .then(function (response){
            navigate('/home')
        })
        .catch(function (error){
            if(error.response){
                const status = error.response.status
                let title, description
                if(status === 403){
                    title = 'User Not Found'
                    description = 'Check The Email Address Entered'
                }
                else if(status === 401){
                    title = 'Wrong Password Entered'
                    description = 'Check The Password Entered'
                }
                showNotification({
                    title: title,
                    message: description,
                    styles: notificationStyles
                  })

            }
        })
    }

    const onChange = (active, tabKey) => {
        setActiveTab(active);
    };

    return (
        <Box sx={{width: "90%", maxWidth: '350px', margin: 'auto'}}>
            <Tabs active={activeTab} onTabChange={onChange} grow position='center' variant="pills">
                <Tabs.Tab label="Sign In" tabKey="signIn">
                    <form onSubmit={signInForm.onSubmit((values) => handleSignIn(values))}>
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

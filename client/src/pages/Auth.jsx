import React, {useEffect, useState, useContext} from 'react'
import { z } from 'zod'
import { Paper, Stack, Tabs, TextInput, Button, Box, useMantineColorScheme } from '@mantine/core';
import LogoDark from "../assets/logo-dark.svg"
import LogoLight from "../assets/logo-light.svg"
import { useForm, zodResolver } from '@mantine/form'
import { AuthContext } from '../contexts/AuthContext';
import { useLocation, useNavigate } from 'react-router-dom';

export default function Auth() {
    const { signIn, signUp, authed, loading } = useContext(AuthContext);
    const colorScheme = useMantineColorScheme()

    const navigate = useNavigate()
    const location = useLocation()

    let from = location.state.from || "/home";

    const [activeTab, setActiveTab] = useState(0);

    const signInSchema = z.object({
        email: z.string(),
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
        signUp(values)
    }

    const handleSignIn = (values) => {
        signIn(values, from)
    }

    const handleOpenAppClick = (values) => {
        navigate("/home")
    }

    const onChange = (active, tabKey) => {
        setActiveTab(active);
    };

    return (
        <Box sx={{width: "90%", maxWidth: '350px', margin: 'auto'}}>
            <Stack>
                <img style={{padding: '24px', maxHeight: '80px'}} src={colorScheme.colorScheme === 'dark' ? LogoLight : LogoDark} alt="" />
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
                                {!authed && <Button loading={loading} type='submit' mt={16}>Log In</Button>}
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
                                {!authed && <Button loading={loading} type='submit' mt={16}>Sign Up</Button>}
                            </Stack>
                        </form>
                    </Tabs.Tab>
                </Tabs>
                {authed && <Button mt={16} fullWidth onClick={handleOpenAppClick}>Open App</Button>}
            </Stack>
        </Box>
    )
}

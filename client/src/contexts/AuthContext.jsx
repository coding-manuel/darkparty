import React, { useState, useEffect } from "react"
import { axios } from "../utils/axios"
import { notificationStyles } from '../globalStyles';
import { useNavigate } from 'react-router-dom';
import { showNotification } from '@mantine/notifications';

export const AuthContext = React.createContext()

export const AuthProvider = ({children}) => {
    const [authed, setAuthed] = useState(JSON.parse(localStorage.getItem("authed")) || false);
    const [loading, setLoading] = useState(false);
    const [username, setUsername] = useState(localStorage.getItem("username") || '');
    const navigate = useNavigate()

    const signUp = (values) => {
        setLoading(true)
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
        .finally(function(){
            setLoading(false)
        })
    }

    const signIn = (values, from) => {
        setLoading(true)
        axios.post("/auth/login", {email: values.email, password: values.password})
        .then(function (response){
            localStorage.setItem("authed", JSON.stringify(true))
            localStorage.setItem("username", response.data.username)
            setAuthed(true)
            navigate(from)
        })
        .catch(function (error){
            if(error.response){
                const status = error.response.status
                let title, description
                if(status === 403){
                    title = 'User Not Found'
                    description = 'Check The Email Address or Username Entered'
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
        .finally(function(){
            setLoading(false)
        })
    }

    const signOut = () => {
        axios.post("/auth/logout")
        .then(function (response){
            localStorage.setItem("authed", JSON.stringify(false))
            localStorage.setItem("username", '')
            setAuthed(false)
            showNotification({
                title: 'Succesfully Logged Out',
                styles: notificationStyles
            })
            navigate('/auth')
        })
        .catch(function (error){
            if(error.response){
                const status = error.response.status
                let title, description
                if(status === 403){
                    title = 'User Not Found'
                    description = 'Check The Email Address or Username Entered'
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

    const isAuth = () => {
        axios.post("/auth/isauthed")
        .then(res => {
            setAuthed(true)
            localStorage.setItem("authed", JSON.stringify(true))
            localStorage.setItem("username", res.data.username)
        })
        .catch(err => {
            localStorage.setItem("authed", JSON.stringify(false))
            setAuthed(false)
            showNotification({
                title: 'Session Timed Out',
                message: 'Please Login Again',
                styles: notificationStyles
            })
        })
    }

    return(
        <AuthContext.Provider value={{signIn, signUp, signOut, authed, isAuth, username, loading}}>
            {children}
        </AuthContext.Provider>
    )
}
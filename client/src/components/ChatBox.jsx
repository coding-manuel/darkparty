import React, {useState, useContext, useEffect} from 'react';
import { Button, Tooltip, Box, Textarea, Text, Group, Stack, useMantineTheme, ActionIcon } from '@mantine/core';
import LogoLight from '../assets/logo-light.svg'
import { ArrowFatRight, Link } from 'phosphor-react';
import { showNotification } from '@mantine/notifications';
import ReactTimeAgo from 'react-time-ago'

import { notificationStyles } from '../globalStyles';
import {SocketContext} from "../contexts/SocketContext"
import { PlayerContext } from '../contexts/PlayerContext';
import { MessageContext } from '../contexts/MessageContext';

const StyledTooltip = ({children, label}) => {
    return(
        <Tooltip sx={{height: 16}} color='dark' transition="pop" transitionDuration={150} transitionTimingFunction="ease"  label={<Text size='xs'>{label}</Text>}>
            {children}
        </Tooltip>
)}

const StyledEvent = ({username, message}) => {

    return(
    <Stack mx={12}>
        <Text align='center' size='xs' color='white'>{username} {message}</Text>
    </Stack>
    )
}

const StyledMessage = ({me, message, username, time}) => {
    const theme = useMantineTheme()

    return(
    <Stack mx={12} my={6} spacing={2}>
        {me ?
        <Group position='right'>
            <Text sx={{fontSize: 10}} color='gray'><ReactTimeAgo date={time} locale="en-US"/></Text>
            <Text sx={{fontSize: 10}} weight={600} color='white'>{username}</Text>
        </Group>
        :
        <Group position='left'>
            <Text sx={{fontSize: 10}} weight={600} color='white'>{username}</Text>
            <Text sx={{fontSize: 10}} color='gray'><ReactTimeAgo date={time} locale="en-US"/></Text>
        </Group>}
        <Box sx={{minWidth: 150, width: 'fit-content', overflowWrap: 'anywhere', border: '1px solid #fff', alignSelf: me && "flex-end", borderRadius: 4, padding: 8, background: me ? theme.colors.dark[6] : theme.colors.orange[5]}}>
            <Text size='xs' color='white'>{message}</Text>
        </Box>
    </Stack>
    )
}

const ChatBox = ({roomID, movieID, username}) => {
    const [chatOpen, setChatOpen] = useState(true);
    const [messageValue, setMessageValue] = useState('');

    const {controlVisible, selecting} = useContext(PlayerContext);
    const {socket} = useContext(SocketContext);
    const {messages, setMessages} = useContext(MessageContext);

    const handleShareLink = () => {
        navigator.clipboard.writeText(`http://localhost:3000/room/${roomID}`)
        showNotification({
            title: 'Link to party copied',
            styles: notificationStyles
        })
    }

    const handleKeyPress = (e) => {
        if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault();
            handleMessage()
        }
    }

    const handleMessage = () => {
        if(messageValue !== ''){
            const messageData = {
                room: roomID,
                author: username,
                message: messageValue,
                time: Date.now()
            }

            socket.emit("send_message", messageData)
            setMessages(message => [...message, messageData])
            setMessageValue("")
        }
    }

    return (
        <>
            <ActionIcon onClick={() => setChatOpen(!chatOpen)} sx={{position: 'absolute', background: '#1A1B1E', borderRadius: '4px 0 0 4px', border: 'none', top: '50%', right: chatOpen ? 300 : 0, transform: 'translate(0, -50%)', "&:active": {transform: 'translate(0, -50%)'}, opacity: controlVisible || selecting ? 1 : 0}}>
                <ArrowFatRight size={16} weight="fill" style={{transform : !chatOpen && 'rotate(180deg)', transition: '.2s ease-out'}} />
            </ActionIcon>
            <Stack spacing={0} sx={{height: '100vh', flex: '0 0 300px', display: !chatOpen && 'none', opacity: chatOpen ? 1 : 0, transition: 'transform .3s ease-out, opacity .2s ease-out'}}>
                <Group spacing={150} position='center' py={12} sx={{borderBottom: '2px solid #ffffff'}}>
                    <img src={LogoLight} alt="" />
                    <StyledTooltip label='Share Link'>
                        {chatOpen && <Link onClick={handleShareLink} cursor='pointer' size={16} weight="fill" />}
                    </StyledTooltip>
                </Group>
                <Stack spacing={8} sx={{flexGrow: 2, height: '80%', overflow: 'scroll', padding: '4px 8px'}}>
                    {messages.map(message => {
                        return(
                            message.time ?
                            <StyledMessage me={message.author === username} message={message.message} username={message.author} time={message.time} />
                            :
                            <StyledEvent username={message.username} message={message.message} />
                    )})}
                </Stack>
                <Stack spacing={0} sx={{flexDirection: 'row'}}>
                    <Textarea
                        sx={{justifySelf: 'flex-end', border: '1px solid #ffffff', borderWidth: '1px 1px 1px 0', padding:'0 8px', width: '100%'}}
                        value={messageValue}
                        onChange={(event) => setMessageValue(event.currentTarget.value)}
                        onKeyDown={handleKeyPress}
                        maxRows={1}
                        placeholder="Send Text"
                        variant="unstyled"
                        required
                    />
                    <Button disabled={messageValue === ''} onClick={handleMessage} radius={0}><ArrowFatRight size={16} weight="fill" /></Button>
                </Stack>
            </Stack>
        </>
    );
}

export default ChatBox;

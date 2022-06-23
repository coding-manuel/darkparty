import React, {useState} from 'react';
import { Button, Tooltip, Box, Textarea, Text, Group, Stack, useMantineTheme, ActionIcon } from '@mantine/core';
import LogoLight from '../assets/logo-light.svg'
import { ArrowFatLeft, ArrowFatRight, Link } from 'phosphor-react';
import { showNotification } from '@mantine/notifications';
import { notificationStyles } from '../globalStyles';
import { PlayerContext } from '../contexts/PlayerContext';
import { useContext } from 'react';

const StyledTooltip = ({children, label}) => {
    return(
        <Tooltip sx={{height: 16}} color='dark' transition="pop" transitionDuration={150} transitionTimingFunction="ease"  label={<Text size='xs'>{label}</Text>}>
            {children}
        </Tooltip>
)}

const StyledMessage = ({me, message}) => {
    const theme = useMantineTheme()

    return(
    <Box ml={me && 24} mr={!me && 24} sx={{width: 'fit-content', border: '1px solid #fff', borderRadius: 4, padding: 8, background: me ? theme.colors.dark[6] : theme.colors.orange[5]}}>
        <Text size='xs' color='white'>{message}</Text>
    </Box>
    )
}

const ChatBox = () => {
    const [chatOpen, setChatOpen] = useState(true);
    const {controlVisible} = useContext(PlayerContext);

    const handleShareLink = () => {
        navigator.clipboard.writeText('https://djghsdjhgjdsgjh')
        showNotification({
            title: 'Link to party copied',
            styles: notificationStyles
        })
    }

    return (
        <>
            <ActionIcon onClick={() => setChatOpen(!chatOpen)} sx={{position: 'absolute', top: 40, right: chatOpen ? 300 : 0, transition: 'right .3s ease-out, opacity .2s ease-out', opacity: controlVisible ? 1 : 0}}>
                <ArrowFatRight size={16} weight="fill" style={{transform : chatOpen && 'rotate(180deg)', transition: '.2s ease-out'}} />
            </ActionIcon>
            <Stack spacing={0} sx={{height: '100%', width: chatOpen ? 300 : 0, opacity: chatOpen ? 1 : 0, transition: 'width .3s ease-out, opacity .2s ease-out'}}>
                <Group spacing={150} position='center' py={12} sx={{borderBottom: '2px solid #ffffff'}}>
                    <img src={LogoLight} alt="" />
                    <StyledTooltip label='Share Link'>
                        {chatOpen && <Link onClick={handleShareLink} cursor='pointer' size={16} weight="fill" />}
                    </StyledTooltip>
                </Group>
                <Stack spacing={8} sx={{flexGrow: 2, height: '80%', overflow: 'scroll', padding: '4px 8px'}}>
                    <StyledMessage me={true} message='Dude, I cannot believe what just happened' />
                    <StyledMessage me={false} message='Yes me too' />
                    <StyledMessage me={true} message='Dude, I cannot believe what just happened' />
                    <StyledMessage me={false} message='Yes me too' />
                    <StyledMessage me={true} message='Dude, I cannot believe what just happened' />
                    <StyledMessage me={true} message='Dude, I cannot believe what just happened' />
                    <StyledMessage me={true} message='Dude, I cannot believe what just happened' />
                    <StyledMessage me={true} message='Dude, I cannot believe what just happened' />
                    <StyledMessage me={false} message='Yes me too' />
                    <StyledMessage me={true} message='Dude, I cannot believe what just happened' />
                    <StyledMessage me={false} message='Yes me too' />
                    <StyledMessage me={true} message='Dude, I cannot believe what just happened' />
                    <StyledMessage me={false} message='Yes me too' />
                    <StyledMessage me={true} message='Dude, I cannot believe what just happened' />
                    <StyledMessage me={false} message='Yes me too' />
                    <StyledMessage me={true} message='Dude, I cannot believe what just happened' />
                    <StyledMessage me={false} message='Yes me too' />
                    <StyledMessage me={true} message='Dude, I cannot believe what just happened' />
                    <StyledMessage me={false} message='Yes me too' />
                    <StyledMessage me={true} message='Dude, I cannot believe what just happened' />
                    <StyledMessage me={false} message='Yes me too' />
                    <StyledMessage me={true} message='Dude, I cannot believe what just happened' />
                    <StyledMessage me={false} message='Yes me too' />
                </Stack>
                <Stack spacing={0} sx={{flexDirection: 'row'}}>
                    <Textarea
                        sx={{justifySelf: 'flex-end', border: '1px solid #ffffff', borderWidth: '1px 1px 1px 0', padding:'0 8px', width: '100%'}}
                        maxRows={1}
                        placeholder="Send Text"
                        variant="unstyled"
                        required
                    />
                    <Button radius={0}><ArrowFatRight size={16} weight="fill" /></Button>
                </Stack>
            </Stack>
        </>
    );
}

export default ChatBox;

import React from 'react';
import { Paper, Tooltip, TextInput, Text, Group, Stack } from '@mantine/core';
import LogoLight from '../assets/logo-light.svg'
import { Link } from 'phosphor-react';
import { showNotification } from '@mantine/notifications';
import { notificationStyles } from '../globalStyles';

const StyledTooltip = ({children, label}) => {
    return(
        <Tooltip sx={{height: 16}} color='dark' transition="pop" transitionDuration={150} transitionTimingFunction="ease"  label={<Text size='xs'>{label}</Text>}>
            {children}
        </Tooltip>
)}

const ChatBox = () => {
    const handleShareLink = () => {
        navigator.clipboard.writeText('https://djghsdjhgjdsgjh')
        showNotification({
            title: 'Link to party copied',
            styles: notificationStyles
        })
    }

    return (
        <Stack sx={{height: '100%', padding: '12px 0', width: 250}}>
            <Group spacing={110} position='center' pb={12} sx={{borderBottom: '2px solid #ffffff'}}>
                <img src={LogoLight} alt="" />
                <StyledTooltip label='Share Link'>
                    <Link onClick={handleShareLink} cursor='pointer' size={16} weight="fill" />
                </StyledTooltip>
            </Group>
            <Stack sx={{flexGrow: 2}}>
                <div>
                    asfjdsakfgj
                </div>
                <div>
                    asfjdsakfgj
                </div>
                <div>
                    asfjdsakfgj
                </div>
                <div>
                    asfjdsakfgj
                </div>
                <div>
                    asfjdsakfgj
                </div>
            </Stack>
            <TextInput sx={{justifySelf: 'flex-end'}} placeholder='Send Text' />
        </Stack>
    );
}

export default ChatBox;

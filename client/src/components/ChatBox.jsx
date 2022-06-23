import React from 'react';
import { Button, Tooltip, Textarea, Text, Group, Stack } from '@mantine/core';
import LogoLight from '../assets/logo-light.svg'
import { ArrowFatRight, Link } from 'phosphor-react';
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
        <Stack spacing={0} sx={{height: '100%', width: 300}}>
            <Group spacing={110} position='center' py={12} sx={{borderBottom: '2px solid #ffffff'}}>
                <img src={LogoLight} alt="" />
                <StyledTooltip label='Share Link'>
                    <Link onClick={handleShareLink} cursor='pointer' size={16} weight="fill" />
                </StyledTooltip>
            </Group>
            <Stack sx={{flexGrow: 2, height: '80%', overflow: 'scroll'}}>
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
    );
}

export default ChatBox;

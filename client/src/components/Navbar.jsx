import React, { useState, useContext, useEffect } from 'react';
import { createStyles, Menu, Header, Container, Group, Avatar, useMantineColorScheme, Switch, ActionIcon, Text } from '@mantine/core';
import LogoDark from '../assets/logo-dark.svg'
import LogoLight from '../assets/logo-light.svg'
import {SignOut} from "phosphor-react"
import { AuthContext } from '../contexts/AuthContext';

const HEADER_HEIGHT = 60;

const useStyles = createStyles((theme) => ({
  root: {
    position: 'relative',
    zIndex: 1,
  },

  dropdown: {
    position: 'absolute',
    top: HEADER_HEIGHT,
    left: 0,
    right: 0,
    zIndex: 0,
    borderTopRightRadius: 0,
    borderTopLeftRadius: 0,
    borderTopWidth: 0,
    overflow: 'hidden',

    [theme.fn.largerThan('sm')]: {
      display: 'none',
    },
  },

  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: '100%',
  },

  burger: {
    [theme.fn.largerThan('sm')]: {
      display: 'none',
    },
  },
}));

export default function Navbar() {
  const { classes, cx } = useStyles();
  const {colorScheme, toggleColorScheme} = useMantineColorScheme();
  const {authed, signOut} = useContext(AuthContext);

  const [checked, setChecked] = useState(false);

  const handleLogoClick = () => {
    navigate("/home")
  }
  const handleToggle = () => {
    toggleColorScheme()
  }

  useEffect(()=>{
    colorScheme === 'dark' ? setChecked(true) : setChecked(false)
  }, [colorScheme])

  return (
    <Header fixed height={HEADER_HEIGHT} className={classes.root}>
      <Container size='xl' className={classes.header}>
        <img onClick={handleLogoClick} style={{height: 25, cursor: "pointer"}} src={colorScheme === 'dark' ? LogoLight : LogoDark} alt="" />
        <Group spacing={24}>
          <ActionIcon variant='outline'>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
            </svg>
          </ActionIcon>
          <Menu gutter={2} placement='end' closeOnItemClick={false} control={<ActionIcon variant='outline'><Avatar sx={{cursor: "pointer"}} size='sm' /></ActionIcon>} styles={{itemLabel: {width: '100%'}}}>
            {/* <Menu.Item component={Link} to={`/artist/${currentAccount}`} icon={<User size={16} weight="regular" />}>Your Profile</Menu.Item> */}
            <Menu.Item ><Switch checked={checked} onChange={handleToggle} styles={{root:{flexDirection: 'row-reverse', justifyContent: 'space-between', width: '100%'}, label:{paddingLeft: 0, paddingRight: 8}}} label={<Text variant='xs'>Dark Mode</Text>} /></Menu.Item>
            {authed && <Menu.Item onClick={signOut} icon={<SignOut size={16} />}><Text variant='xs'>Sign Out</Text></Menu.Item>}
          </Menu>
        </Group>
      </Container>
    </Header>
  )
}

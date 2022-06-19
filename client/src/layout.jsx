import React, { useState, useContext, useEffect } from 'react'
import {
  AppShell,
  Container,
  useMantineTheme,
} from '@mantine/core'

import Navbar from './components/Navbar'
import Footer from './components/Footer'


export default function Layout({ children }) {
  const theme = useMantineTheme()

  return (
    <AppShell
      styles={{
        main: {
          background: theme.colorScheme === 'dark' ? theme.colors.dark[8] : theme.colors.gray[0],
          padding: '20px',
          minHeight: 'initial'
        },
        body: {
          minHeight: '92vh'
        }
      }}
      fixed
      header={<Navbar />}
    >
      <Container size='xl'>
        {children}
      </Container>
    </AppShell>
  )
}

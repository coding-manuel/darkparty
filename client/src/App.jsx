import { useEffect, useState, useContext } from 'react';
import { Navigate, Route, Routes, useLocation } from 'react-router-dom';
import { MantineProvider, ColorSchemeProvider } from '@mantine/core';
import { NotificationsProvider } from '@mantine/notifications';
import { useLocalStorage } from '@mantine/hooks';

import globalStyles from './globalStyles';
import { AuthContext, AuthProvider } from './contexts/AuthContext';
import { PlayerProvider } from './contexts/PlayerContext';
import { SocketProvider } from './contexts/SocketContext';

import Home from './pages/Home';
import Auth from './pages/Auth';
import Upload from './pages/Upload';
import Layout from './Layout';
import Movie from './pages/Movie';

function App() {
  const [colorScheme, setColorScheme] = useLocalStorage({
    key: 'mantine-color-scheme',
    defaultValue: 'light',
    getInitialValueInEffect: true,
  });

  const toggleColorScheme = (value) => setColorScheme(value || (colorScheme === 'dark' ? 'light' : 'dark'));

  const theme = {
    colorScheme: colorScheme,
    primaryColor: 'orange',
    primaryShade: 5,

    black: '#323232',

    fontFamily: 'Azeret Mono, sans-serif',

    colors: {
      "orange": [
        "#FFEDE5",
        "#FFCEB8",
        "#FFAF8A",
        "#FF8F5C",
        "#FF6F2E",
        "#FF5000",
        "#CC4000",
        "#993000",
        "#662000",
        "#331000"
    ]
    },

    lineHeight: 1.3,
    headings: {
      fontFamily: 'Azeret, sans-serif',
      sizes: {
        h1: {fontSize: '5.653rem'},
        h2: {fontSize: '3.998rem'},
        h3: {fontSize: '2.827rem'},
        h4: {fontSize: '1.999rem'},
        h5: {fontSize: '1.414rem'},
        h6: {fontSize: '0.707rem'}
      },
    },
  }

  return (
    <ColorSchemeProvider colorScheme={colorScheme} toggleColorScheme={toggleColorScheme}>
      <MantineProvider theme={theme} styles={globalStyles} withGlobalStyles withNormalizeCSS>
        <NotificationsProvider>
          <AuthProvider>
            <PlayerProvider>
              <SocketProvider>
                <Routes>
                    <Route path='/home' element={<RequireAuth><Layout><Home /></Layout></RequireAuth>} />
                    <Route path='/upload' element={<RequireAuth><Layout><Upload /></Layout></RequireAuth>} />
                    <Route path='/movie/:id/party/:roomid' element={<RequireAuth><Movie /></RequireAuth>} />
                    <Route path='/chicken' element={<RequireAuth><Home/></RequireAuth>} />
                    <Route path='/auth' element={<Auth />} />
                    <Route path='*' element={<Navigate to='/home' />} />
                </Routes>
              </SocketProvider>
            </PlayerProvider>
          </AuthProvider>
        </NotificationsProvider>
      </MantineProvider>
    </ColorSchemeProvider>
  );
}

function RequireAuth({ children }) {
  const {isAuth, authed} = useContext(AuthContext);
  let location = useLocation();
  console.log(location)

  isAuth()
  return authed ? children : <Navigate to='/auth' state={{ from: location.pathname }} replace />;
}

export default App

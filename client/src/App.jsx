import { useEffect, useState, useContext } from 'react';
import { Route, Routes } from 'react-router-dom';
import { MantineProvider, ColorSchemeProvider } from '@mantine/core';
import { useLocalStorage } from '@mantine/hooks';

import globalStyles from './globalStyles';

import Home from './pages/Home';
import Auth from './pages/Auth';
import Layout from './Layout';

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
        <Layout>
          <Routes>
            <Route path='home' element={<Home />} />
            <Route path='auth' element={<Auth />} />
          </Routes>
        </Layout>
      </MantineProvider>
    </ColorSchemeProvider>
  );
}

export default App

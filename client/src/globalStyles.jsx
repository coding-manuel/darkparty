const globalStyles = {
    '::-moz-selection': { color: 'red', background: 'yellow' },

    '::selection': { color: 'red', background: 'yellow' },

    Header: (theme) => ({
        root: { borderBottom: `1px solid ${theme.colorScheme === 'dark' ? theme.white : theme.black}`}
    }),
    ActionIcon: () => ({
        root: { width: '32px', height: '32px', padding: '5px'},
    }),

    Avatar: () => ({
        placeholder: { backgroundColor: 'transparent' }
    }),

    Menu : (theme) => ({
        body: { border: `1px solid ${theme.colorScheme === 'dark' ? theme.white : theme.black}`, padding: 0},
        item: { padding: '6px 8px' }
    }),

    Tabs : (theme) => ({
        tabsList: { gap: 8 },
        tabControl: { border: `1px solid ${theme.colorScheme === 'dark' ? theme.white : theme.black}`, '&:hover': {background: `${theme.colorScheme === 'dark' ? '##2d2d2d' : theme.colors.orange[2]}!important`} },
        tabActive: { color: `${theme.white}!important`, background: `${theme.colors.orange[5]}!important`, fontWeight: 600, '&:hover': {background: `${theme.colors.orange[5]}!important`} },
        body: { padding: '16px 0px' }
    }),

    TextInput: (theme) => ({
        label: { fontWeight: 600 },
        filledVariant: { border: `1px solid ${theme.colorScheme === 'dark' ? '#8e8e8e' : '#bbbbbb'}`, transition: '.1s ease-in' },
        defaultVariant: { border: `1px solid ${theme.colorScheme === 'dark' ? '#8e8e8e' : '#bbbbbb'}`, transition: '.1s ease-in' },
        error: { fontSize: 12 }
    }),

    Button : (theme) => ({
        filled: { border: `1px solid ${theme.colorScheme === 'dark' ? theme.white : theme.black}`, transition: '.2s ease', '&:hover': {background: `${theme.colors.orange[5]}!important`, transform: 'translate(0px, -3px)' }}
    })
}

export default globalStyles;
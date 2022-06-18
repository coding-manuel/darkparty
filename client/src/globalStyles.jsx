const globalStyles = {
    '::-moz-selection': { color: 'red', background: 'yellow' },

    '::selection': { color: 'red', background: 'yellow' },

    Header: (theme) => ({
        root: { borderBottom: `1px solid ${theme.colorScheme === 'dark' ? theme.white : theme.black}`}
    }),

    ActionIcon: (theme) => ({
        root: { width: '32px', height: '32px', padding: '5px', color: `${theme.colorScheme === 'dark' ? theme.white : theme.black}`, border: `1px solid ${theme.colorScheme === 'dark' ? theme.white : theme.black}`, '&:hover': { color: theme.white, background: `${theme.colors.orange[5]}` }},
    }),

    Avatar: () => ({
        placeholder: { backgroundColor: 'transparent' }
    }),

    Menu : (theme) => ({
        body: { padding: 0, background: 'transparent', border: 'none', boxShadow: 'none'},
        item: { padding: '6px 8px', background: theme.colorScheme !== 'dark' ? theme.colors.gray[0] : theme.colors.dark[6], border: `1px solid ${theme.colorScheme === 'dark' ? theme.white : theme.black}`, margin: '2px 0'},
        itemHovered: {backgroundColor: `${theme.colorScheme !== 'dark' ? theme.colors.orange[3] : theme.colors.dark[5]}!important`}
    }),

    Tabs : (theme) => ({
        tabsList: { gap: 8 },
        tabControl: { border: `1px solid ${theme.colorScheme === 'dark' ? theme.white : theme.black}`, '&:hover': {background: `${theme.colorScheme === 'dark' ? '##2d2d2d' : theme.colors.orange[2]}!important`} },
        tabActive: { color: `${theme.white}!important`, background: `${theme.colors.orange[5]}!important`, fontWeight: 600, '&:hover': {background: `${theme.colors.orange[5]}!important`} },
        body: { padding: '16px 0px' }
    }),

    TextInput: (theme) => ({
        label: { fontWeight: 600 },
        filledVariant: { border: `1px solid ${theme.colorScheme === 'dark' ? '#8e8e8e' : '#bbbbbb'}`, background: `${theme.colors.dark[6]}!important`, '&:hover, &:focus': {background: `${theme.colors.dark[5]}!important`}, transition: '.1s ease-in' },
        defaultVariant: { border: `1px solid ${theme.colorScheme === 'dark' ? '#8e8e8e' : '#bbbbbb'}`, background: `${theme.colors.gray[0]}!important`, '&:hover, &:focus': {background: `${theme.colors.gray[1]}!important`}, transition: '.1s ease-in' },
        error: { fontSize: 12 }
    }),

    Button : (theme) => ({
        filled: { border: `1px solid ${theme.colorScheme === 'dark' ? theme.white : theme.black}`, transition: '.2s ease', '&:hover': {background: `${theme.colors.orange[5]}!important`, transform: 'translate(0px, -3px)' }}
    })
}

export const notificationStyles = (theme) => ({
    root: {
        backgroundColor: `${theme.colorScheme === 'dark' ? theme.black : theme.white}`,
        borderColor: theme.colors.orange[4],
        borderWidth: 2,
        paddingLeft: 12,

        '::before': {
            width: 0
        }
    },
    title: { color: `${theme.colorScheme === 'dark' ? theme.white : theme.black}`, fontSize: 12, fontWeight: 600 },
    description: { color: `${theme.colorScheme === 'dark' ? theme.white : theme.black}`, fontSize: 10 },
    closeButton: {
        color: `${theme.colorScheme === 'dark' ? theme.white : theme.black}`,
        transition: '0.1s ease-out',
        '&:hover': { backgroundColor: theme.colors.orange[4] },
    },
})

export default globalStyles;
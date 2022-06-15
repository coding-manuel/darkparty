const globalStyles = {
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
    })
}

export default globalStyles;
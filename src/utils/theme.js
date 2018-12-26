import { createMuiTheme } from '@material-ui/core';

const getTheme = editor => ({
    typography: {
        useNextVariants: true,
    },
    palette: {
        type: editor ? 'dark' : 'light',
        primary: {
            main: editor ? '#ab47bc' : '#6a1b9a',
        },
        secondary: {
            main: '#81c784',
        }
    }
})

export default createMuiTheme(getTheme());

export const editorTheme = createMuiTheme(getTheme(true));
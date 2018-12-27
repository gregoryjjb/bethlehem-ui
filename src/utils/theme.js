import { createMuiTheme } from '@material-ui/core';

const getTheme = editor => ({
    typography: {
        useNextVariants: true,
    },
    palette: {
        type: editor ? 'dark' : 'light',
        primary: {
            main: editor ? '#b39ddb' : '#7e57c2',
        },
        secondary: {
            main: '#81c784',
        }
    }
})

export default createMuiTheme(getTheme());

export const editorTheme = createMuiTheme(getTheme(true));
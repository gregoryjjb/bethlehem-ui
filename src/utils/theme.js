import { createMuiTheme } from '@material-ui/core';

const theme = {
    typography: {
        useNextVariants: true,
    },
    palette: {
        primary: {
            main: '#6a1b9a',
        },
        secondary: {
            main: '#81c784',
        }
    }
}

export default createMuiTheme(theme);

const etheme = JSON.parse(JSON.stringify(theme));
etheme.palette.type = 'dark';

export const editorTheme = createMuiTheme(etheme);
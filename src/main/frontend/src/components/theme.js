import logo from '../img/logo.png'
import darklogo from '../img/darklogo.png'

const darkTheme = {
    logo: darklogo,
    color: 'white',
    navFooterBgColor: "rgb(40 40 40)",
    bgColor: '#1f1f1f'
};

const lightTheme = {
    logo: logo,
    color: 'black',
    bgColor: 'white',
};

const themes = {
    light: lightTheme,
    dark: darkTheme
}

export default themes
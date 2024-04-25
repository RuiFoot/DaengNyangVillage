import { atom } from 'recoil';

export const isDarkAtom = atom({
    key: 'isDark',
    default: JSON.parse(localStorage.getItem('isDark')),
});
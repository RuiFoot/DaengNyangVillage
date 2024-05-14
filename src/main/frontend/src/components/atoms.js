import { atom } from 'recoil';

export const isDarkAtom = atom({
    key: 'isDark',
    default: JSON.parse(localStorage.getItem('isDark')),
});

export const presentPage = atom({
    key: 'presentPage',
    default: 1,
});
import { createGlobalStyle } from "./theme";
import {
    RecoilRoot,
    atom,
    selector,
    useRecoilState,
    useRecoilValue,
} from 'recoil';
import { isDarkAtom } from '../atoms';

const isDark = useRecoilValue(isDarkAtom);

const GlobalStyle = createGlobalStyle`

    body{
        /* font-family: 'Nunito','Pretendard', sans-serif;
        margin: 0;
        font-size: 12px; */
    }
    h2{
        font-size: 18px;
    }
    button{
        cursor: pointer;
        border: none;
    }
    div{
        font-size: 12px;
    }
`;

export default GlobalStyle;

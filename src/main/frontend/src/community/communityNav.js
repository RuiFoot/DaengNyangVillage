import styled from "styled-components";
import Bumper from "../layout/bumper";
import { useEffect, useState } from "react";
import axios from "axios";
import { useRecoilValue } from 'recoil';
import { isDarkAtom } from '../atoms';
import themes from "../theme";

const CommunityNavbar = styled.div`
border-bottom: 1px solid rgba(0, 0, 0, 0.5);
display: flex;
flex-direction: row;
justify-content: space-evenly;
align-items: center;
`
const NavItems = styled.a`
padding: 10px;
text-decoration: none;
color: black;
&:hover {
    transform: scale(1.1);
}
`

function CommunityNav() {
    const isDark = useRecoilValue(isDarkAtom);
    const pathname = window.location.pathname; //현재 화면 주소
    const [loginedNickName, setLoginedNickName] = useState("")

    useEffect(() => {
        if (sessionStorage.getItem("logined") !== null) {
            setLoginedNickName("/" + JSON.parse(sessionStorage.getItem("logined")).nickname)
        }
    });

    return (
        <>
            <Bumper />
            <CommunityNavbar style={{
                color: `${isDark ? themes.dark.color : themes.light.color}`,
                backgroundColor: `${isDark ? themes.dark.navFooterBgColor : themes.light.bgColor}`,
                borderBottom: `1px solid ${isDark ? themes.dark.color : "rgba(0, 0, 0, 0.5)"}`
            }}>
                <NavItems style={{ color: `${pathname === `/free-board${loginedNickName}` ? "#F2884B" : `${isDark ? themes.dark.color : themes.light.color}`}` }} href={`/free-board${loginedNickName}`}>
                    자유게시판
                </NavItems>
                <NavItems style={{ color: `${pathname === `/pet-boast${loginedNickName}` ? "#F2884B" : `${isDark ? themes.dark.color : themes.light.color}`}` }} href={`/pet-boast${loginedNickName}`} >
                    반려동물 자랑
                </NavItems>
                <NavItems style={{ color: `${pathname === `/training-method${loginedNickName}` ? "#F2884B" : `${isDark ? themes.dark.color : themes.light.color}`}` }} href={`/training-method${loginedNickName}`}>
                    훈련 방법 공유
                </NavItems>
                <NavItems style={{ color: `${pathname === `/used-market${loginedNickName}` ? "#F2884B" : `${isDark ? themes.dark.color : themes.light.color}`}` }} href={`/used-market${loginedNickName}`}>
                    댕냥 마켓
                </NavItems>
            </CommunityNavbar>
        </>
    );
}

export default CommunityNav;
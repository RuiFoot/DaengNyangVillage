import styled from "styled-components";
import Bumper from "../layout/bumper";
import { useEffect, useState } from "react";
import axios from "axios";
import { useRecoilState, useRecoilValue } from 'recoil';
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
    //다크모드
    const isDark = useRecoilValue(isDarkAtom);
    const [isOn, setisOn] = useRecoilState(isDarkAtom)
    const pathname = window.location.pathname; //현재 화면 주소
    const switchColor = `${isDark ? themes.dark.color : themes.light.color}`
    const switchBgColor = `${isDark ? themes.dark.bgColor : themes.light.bgColor}`
    const lightOnOff = `${isOn ? themes.dark.color : themes.light.color}`


    const [loginedNickName, setLoginedNickName] = useState("")
    useEffect(() => {
        if (sessionStorage.getItem("logined") !== null) {
            setLoginedNickName("/" + JSON.parse(sessionStorage.getItem("logined")).nickName)
        }
    });

    let free = [`free`]
    let pet = [`pet`]
    let training = [`training`]
    let used = [`used`]
    const lightOn = (path, board) => {
        if (path.indexOf("-", 1) === -1) {
            return board.indexOf(path.slice(1, path.indexOf("/", 1))) !== -1 ? true : false
        } else {
            return board.indexOf(path.slice(1, path.indexOf("-", 1))) !== -1 ? true : false
        }
    }

    return (
        <>
            <Bumper />
            <CommunityNavbar style={{
                color: switchColor,
                backgroundColor: switchBgColor,
                borderBottom: `1px solid ${isDark ? themes.dark.color : "rgba(0, 0, 0, 0.5)"}`
            }}>
                <NavItems style={{ color: `${lightOn(pathname, free) ? '#F2884B' : lightOnOff}` }} href={`/free-board${loginedNickName}`}>
                    자유게시판
                </NavItems>
                <NavItems style={{ color: `${lightOn(pathname, pet) ? '#F2884B' : lightOnOff}` }} href={`/pet-boast${loginedNickName}`} >
                    반려동물 자랑
                </NavItems>
                <NavItems style={{ color: `${lightOn(pathname, training) ? '#F2884B' : lightOnOff}` }} href={`/training-method${loginedNickName}`}>
                    훈련 방법 공유
                </NavItems>
                <NavItems style={{ color: `${lightOn(pathname, used) ? '#F2884B' : lightOnOff}` }} href={`/used-market${loginedNickName}`}>
                    댕냥 마켓
                </NavItems>
            </CommunityNavbar>
        </>
    );
}

export default CommunityNav;
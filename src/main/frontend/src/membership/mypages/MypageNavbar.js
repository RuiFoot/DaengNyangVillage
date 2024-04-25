import styled from "styled-components";
import Bumper from "../../layout/Bumper";
import { useEffect, useState } from "react";
import '../membershipStyle.css'
import axios from "axios";
import { useRecoilValue } from 'recoil';
import { isDarkAtom } from '../../atoms';
import themes from "../../theme";

const MypageNav = styled.div`
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
    color: #F2884B;
}
`

function Mypage() {
    const isDark = useRecoilValue(isDarkAtom);
    const pathname = window.location.pathname; //현재 화면 주소
    const [loginedNickName, setLoginedNickName] = useState("")

    useEffect(() => {
        setLoginedNickName(JSON.parse(sessionStorage.getItem("logined")).nickName)
    });

    return (
        <>
            <Bumper />
            <MypageNav style={{
                color: `${isDark ? themes.dark.color : themes.light.color}`,
                backgroundColor: `${isDark ? themes.dark.bgColor : themes.light.bgColor}`,
                borderBottom: `1px solid ${themes.dark.color}`
            }}>
                <NavItems style={{ color: `${pathname === `/MyInfo/${loginedNickName}` ? "#F2884B" : `${isDark ? themes.dark.color : themes.light.color}`}` }} href={`/MyInfo/${loginedNickName}`}>
                    내 정보
                </NavItems>
                <NavItems style={{ color: `${pathname === `/ChangePasswd/${loginedNickName}` ? "#F2884B" : `${isDark ? themes.dark.color : themes.light.color}`}` }} href={`/ChangePasswd/${loginedNickName}`} >
                    비밀번호 변경
                </NavItems>
                <NavItems style={{ color: `${pathname === `/SelectedLocation/${loginedNickName}` ? "#F2884B" : `${isDark ? themes.dark.color : themes.light.color}`}` }} href={`/SelectedLocation/${loginedNickName}`}>
                    찜한 장소
                </NavItems>
                <NavItems style={{ color: `${pathname === `/WrittenByMe/${loginedNickName}` ? "#F2884B" : `${isDark ? themes.dark.color : themes.light.color}`}` }} href={`/WrittenByMe/${loginedNickName}`}>
                    내가 쓴 글
                </NavItems>
            </MypageNav>
        </>
    );
}

export default Mypage;
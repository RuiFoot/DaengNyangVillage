import styled from "styled-components";
import Bumper from "../../layout/bumper";
import { useEffect, useState } from "react";
import '../membershipStyle.css'
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
    transform: scale(1.1);
}
`
function Mypage() {
    //다크모드
    const isDark = useRecoilValue(isDarkAtom);
    const switchColor = `${isDark ? themes.dark.color : themes.light.color}`
    const pathname = window.location.pathname; //현재 화면 주소
    const [loginedNickName, setLoginedNickName] = useState("")

    useEffect(() => {
        setLoginedNickName(JSON.parse(sessionStorage.getItem("logined")).nickName)
    });

    return (
        <>
            <Bumper />
            <MypageNav style={{
                color: switchColor,
                backgroundColor: `${isDark ? themes.dark.navFooterBgColor : themes.light.bgColor}`,
                borderBottom: `1px solid ${isDark ? themes.dark.color : "rgba(0, 0, 0, 0.5)"}`
            }}>
                <NavItems style={{ color: `${pathname === `/my-info/${loginedNickName}` || pathname === `/my-info-change/${loginedNickName}` ? "#F2884B" : switchColor}` }} href={`/my-info/${loginedNickName}`}>
                    내 정보
                </NavItems>
                <NavItems style={{ color: `${pathname === `/change-passwd/${loginedNickName}` ? "#F2884B" : switchColor}` }} href={`/change-passwd/${loginedNickName}`} >
                    비밀번호 변경
                </NavItems>
                <NavItems style={{ color: `${pathname === `/selected-location/${loginedNickName}` ? "#F2884B" : switchColor}` }} href={`/selected-location/${loginedNickName}`}>
                    찜한 장소
                </NavItems>
                <NavItems style={{ color: `${pathname === `/written-by-me/${loginedNickName}` ? "#F2884B" : switchColor}` }} href={`/written-by-me/${loginedNickName}`}>
                    내가 쓴 글
                </NavItems>
            </MypageNav>
        </>
    );
}

export default Mypage;
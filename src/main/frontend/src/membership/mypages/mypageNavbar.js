import styled from "styled-components";
import Bumper from "../../layout/bumper";
import { useEffect, useState } from "react";
import '../membershipStyle.css'
import { useRecoilValue } from 'recoil';
import { isDarkAtom } from '../../components/atoms';
import themes from "../../components/theme";

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
        if (JSON.parse(sessionStorage.getItem("logined")) !== null) {
            setLoginedNickName(JSON.parse(sessionStorage.getItem("logined")).nickName)
        }
    });
    // 유저에게 현재 위치를 알려주기 위함
    let my = [`my`]
    let change = [`change`]
    let selected = [`selected`]
    let written = [`written`]
    const lightOn = (path, board) => {
        if (path.indexOf("-", 1) === -1) {
            return board.indexOf(path.slice(1, path.indexOf("/", 1))) !== -1 ? true : false
        } else {
            return board.indexOf(path.slice(1, path.indexOf("-", 1))) !== -1 ? true : false
        }
    }
    console.log(pathname)
    return (
        <>
            <Bumper />
            <MypageNav style={{
                color: switchColor,
                backgroundColor: `${isDark ? themes.dark.navFooterBgColor : themes.light.bgColor}`,
                borderBottom: `1px solid ${isDark ? themes.dark.color : "rgba(0, 0, 0, 0.5)"}`
            }}>

                <NavItems style={{ color: `${lightOn(pathname, my) ? "#F2884B" : switchColor}` }} href={`/my-info/${loginedNickName}`}>
                    내 정보
                </NavItems>
                {
                    sessionStorage.getItem("social") === "true"
                        ?
                        null
                        :
                        <NavItems style={{ color: `${lightOn(pathname, change) ? "#F2884B" : switchColor}` }} href={`/change-passwd/${loginedNickName}`} >
                            비밀번호 변경
                        </NavItems>
                }
                <NavItems style={{ color: `${lightOn(pathname, selected) ? "#F2884B" : switchColor}` }} href={`/selected-location/${loginedNickName}`}>
                    찜한 장소
                </NavItems>
                <NavItems style={{ color: `${lightOn(pathname, written) ? "#F2884B" : switchColor}` }} href={`/written-by-me/${loginedNickName}`}>
                    내가 쓴 글
                </NavItems>
            </MypageNav>
        </>
    );
}

export default Mypage;
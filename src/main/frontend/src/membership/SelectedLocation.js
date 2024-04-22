import styled from "styled-components";
import Bumper from "../layout/Bumper";

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

function SelectedLocation() {
    const pathname = window.location.pathname;
    return (
        <div>
            <Bumper />
            <MypageNav>
                <NavItems style={{ color: `${pathname === "/Mypage/logined" ? "#F2884B" : "black"}` }} href="/Mypage/logined">
                    내 정보
                </NavItems>
                <NavItems style={{ color: `${pathname === "/ChangePasswd/logined" ? "#F2884B" : "black"}` }} href="/ChangePasswd/logined" >
                    비밀번호 변경
                </NavItems>
                <NavItems style={{ color: `${pathname === "/SelectedLocation/logined" ? "#F2884B" : "black"}` }} href="/SelectedLocation/logined">
                    찜한 장소
                </NavItems>
                <NavItems style={{ color: `${pathname === "/WrittenByMe/logined" ? "#F2884B" : "black"}` }} href="/WrittenByMe/logined">
                    내가 쓴 글
                </NavItems>
            </MypageNav>
            찜한 장소입니다.
        </div>
    );
}

export default SelectedLocation;
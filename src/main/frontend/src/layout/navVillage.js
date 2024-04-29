import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import naver from '../img/naver.jpg'
import kakao from '../img/kakao.png'
import google from '../img/google.png'
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import styled from "styled-components";
import { useEffect, useState } from 'react';
import { CiBrightnessDown, CiDark } from "react-icons/ci";
import "./layout.css"
import { useRecoilState, useRecoilValue } from 'recoil';
import { isDarkAtom } from '../atoms';
import themes from "../theme";
import { useNavigate } from 'react-router-dom';

//css
const Logo = styled.img`
position: fixed;
top: 12px;
left: 50%;
width: 90px;
transform: translate(-50%, -10%);
`
const LoginLogo = styled.img`
cursor: pointer;
width: 100px;
`
const ToggleContainer = styled.div`
margin-right: 10px;
display: flex;
align-items: center;
position: relative;
cursor: pointer;
  > .toggle-container {
    width: 60px;
    height: 30px;
    border-radius: 30px;
    background-color: #161F30;}
  > .toggle--checked {
    background-color: rgb(233,233,234);
    transition : 0.5s
  }
  > .toggle-circle {
    position: absolute;
    left: 1px;
    width: 28px;
    height: 28px;
    border-radius: 50%;
    background-color: rgb(255,254,255);
    transition : 0.5s
  } >.toggle--checked {
    left: 31px;
    transition : 0.5s
  }
`;

const ModalBodyFooter = styled.div`
display: flex;
flex-direction: column;
justify-content: center;
align-items: center;
`
const SunMoon = styled.div`
font-size: 40px;
display: flex;
justify-content: center;
align-items: center;
`

const FindIdPassward = styled.a`
cursor: pointer;
margin-bottom: 10px;
`
const Social = styled.div`
margin-bottom: 10px;
display: flex;
flex-direction: column;
justify-content: center;
align-items: center;
`
const Logos = styled.div`
`
const NaverLogo = styled.img`
margin: 0 5px;
width: 50px;
`
const KakaoLogo = styled.img`
margin: 0 5px;
width: 50px;
`
const GoogleLogo = styled.img`
margin: 0 5px;
width: 50px;
`

//회원 데이터
let localData
const getDataLocalStorage = (name) => {
    localData = JSON.parse(localStorage.getItem(name))
    return JSON.stringify(localData);
}

// 네비바
function NavVillage() {

    //현재 주소
    const pathname = window.location.pathname;
    const isDark = useRecoilValue(isDarkAtom); //다크모드
    const [login, setLogin] = useState();

    //로그인 모달
    function LoginModal(props) {
        const [userId, setUserId] = useState("")
        const [userPassword, setUserPassword] = useState("")

        const saveUserId = (e) => {
            setUserId(e.target.value)
        }

        const saveUserPw = (e) => {
            setUserPassword(e.target.value)
        }

        const loginBtn = () => {
            getDataLocalStorage(`member`)
            //SHA256(userPassword).toString() 해쉬값 비교
            if (userId === localData.email && userPassword === localData.password) {
                sessionStorage.setItem("logined", JSON.stringify(localData))
                const nickName = JSON.parse(sessionStorage.getItem("logined")).nickName
                setLogin(true)
                setUserId("")
                setUserPassword("")
                props.onHide();
                window.location.href = `${pathname}${nickName}`
            } else {
                setLogin(false)
            }
        }
        return (
            <Modal className='modal'
                {...props}
                aria-labelledby="contained-modal-title-vcenter"
                centered
            >
                <Modal.Header style={{
                    color: `${isDark ? themes.dark.color : themes.light.color}`,
                    backgroundColor: `${isDark ? themes.dark.bgColor : themes.light.bgColor}`
                }} className='modalHeader'>
                    <LoginLogo src={isOn ? themes.dark.logo : themes.light.logo}
                        onClick={() => { window.location.href = "/" }}
                    />
                    <Modal.Title id="contained-modal-title-vcenter">
                        반려동물의 모든 것 멍냥빌리지
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body style={{
                    color: `${isDark ? themes.dark.color : themes.light.color}`,
                    backgroundColor: `${isDark ? themes.dark.bgColor : themes.light.bgColor}`
                }} >
                    <Form.Label htmlFor="inputemail">아이디</Form.Label>
                    <Form.Control
                        type="email"
                        id="inputemail"
                        className='modalInput'
                        value={userId}
                        onChange={saveUserId}
                        placeholder='아이디(이메일)을 입력해주세요.'
                    />
                    <Form.Label htmlFor="inputPassword">비밀번호</Form.Label>
                    <Form.Control
                        type="password"
                        className='modalInput'
                        value={userPassword}
                        onChange={saveUserPw}
                        id="inputPassword"
                        placeholder='********'
                    />
                    <ModalBodyFooter >
                        <FindIdPassward onClick={() => { window.location.href = "/find-id-passwd" }}>아이디 / 비밀번호가 기억나지 않아요</FindIdPassward>
                        <Social>
                            <p>소셜 로그인</p>
                            <Logos>
                                <NaverLogo className='socialLogo' src={naver} onClick={() => { alert("네이버~") }} />
                                <KakaoLogo className='socialLogo' src={kakao} onClick={() => { alert("카카오~") }} />
                                <GoogleLogo className='socialLogo' src={google} onClick={() => { alert("구글~") }} />
                            </Logos>
                        </Social>
                    </ModalBodyFooter>
                </Modal.Body>
                <Modal.Footer style={{
                    color: `${isDark ? themes.dark.color : themes.light.color}`,
                    backgroundColor: `${isDark ? themes.dark.bgColor : themes.light.bgColor}`
                }} className='modalFooter'>
                    {
                        login === undefined ? null
                            : !login &&
                            <p className='warning'>일치하는 아이디 혹은 비밀번호가 없습니다</p>
                    }
                    <Button className='joinBtn' onClick={() => window.location.href = '/join-membership'}>회원가입</Button>
                    <Button type='submit' className='modalLoginBtn' onClick={() => loginBtn()}>로그인</Button>
                </Modal.Footer>
            </Modal>
        );
    }

    //로그인 상태일때
    const [url, setUrl] = useState("")
    const [nickName, setNickName] = useState("")
    useEffect(() => {
        if (window.sessionStorage.key(0) === "logined") {
            setLogin(true)
            setNickName(JSON.parse(sessionStorage.getItem("logined")).nickName)
            setUrl(`/${nickName}`)
        }
    }, [login]);
    const [modalShow, setModalShow] = useState(false);
    const LogOut = () => {
        setUrl("/")
        window.sessionStorage.removeItem("logined")
        window.location.href = "/"
    }

    //다크모드
    const [isOn, setisOn] = useRecoilState(isDarkAtom)
    useEffect(() => {
        localStorage.setItem('isDark', isOn)
    }, [isOn]);
    const toggleHandler = () => {
        setisOn(!isOn)
    };

    // 마이페이지 안의 페이지들 주소
    let mypages = [`/my-info/${nickName}`, `/change-passwd/${nickName}`, `/selected-location/${nickName}`, `/written-by-me/${nickName}`]
    // 커뮤니티안의 페이지들 주소
    let community = [`/free-board${"/" + nickName}`, `/pet-boast${"/" + nickName}`, `/training-method${"/" + nickName}`, `/used-market${"/" + nickName}`, `/text-write${"/" + nickName}`]
    return (
        <div>
            <Navbar expand="lg" className="navbar"
                style={{
                    backgroundColor: `${isOn ? themes.dark.navFooterBgColor : themes.light.bgColor}`
                }}
            >
                <a href={login ? `${url}` : `/${url}`}><Logo src={isOn ? themes.dark.logo : themes.light.logo} /></a>
                <Container fluid>
                    <Navbar.Brand className='navHomeLink' style={{
                        color: `${pathname === `${login ? url : "/" + url}`
                            ? "#F2884B" : `${isOn ? themes.dark.color : themes.light.color}`}`
                    }} href={login ? `${url}` : `/${url}`}>
                        Home
                        {/*모든 네비 카테고리는 현재 주소가 해당 카테고리면 컬러가 다르게 표시됨 */}
                    </Navbar.Brand>
                    <Navbar.Toggle style={{
                        backgroundColor: themes.light.bgColor
                    }} aria-controls="navbarScroll" />
                    <Navbar.Collapse id="navbarScroll"
                    >
                        <Nav
                            className="me-auto my-2 my-lg-0"
                            style={{ minHeight: '80px', maxHeight: '120px' }}
                            navbarScroll
                        >
                            <Nav.Link style={{ color: `${community.includes(pathname) ? '#F2884B' : `${isOn ? themes.dark.color : themes.light.color}`}` }} className='navLink' href={`/free-board${url}`}>
                                커뮤니티
                            </Nav.Link>
                            <Nav.Link style={{
                                color: `${pathname === `/place-recommend${url}`
                                    ? '#F2884B' : `${isOn ? themes.dark.color : themes.light.color}`}`
                            }} className='navLink' href={`/place-recommend${url}`}>
                                장소추천
                            </Nav.Link>
                            <Nav.Link style={{
                                color: `${pathname === `/about-us${url}`
                                    ? '#F2884B' : `${isOn ? themes.dark.color : themes.light.color}`}`
                            }} className='navLink' href={`/about-us${url}`}>
                                About Us
                            </Nav.Link>
                        </Nav>
                        <Nav className="d-flex">
                            <ToggleContainer onClick={toggleHandler}>
                                <div className={`toggle-container ${isOn ? "toggle--checked" : null}`}></div>
                                <SunMoon style={{
                                    color: `${isDark ? themes.dark.color : themes.light.color}`,
                                    backgroundColor: `${isDark ? themes.dark.bgColor : themes.light.bgColor}`
                                }}
                                    className={`toggle-circle ${isOn ? "toggle--checked" : null}`}>{isOn ? <CiDark /> : <CiBrightnessDown />}</SunMoon>
                            </ToggleContainer>
                            {
                                login ?
                                    <Nav.Link className='navLink' style={{
                                        color: `${mypages.includes(pathname)
                                            ? '#F2884B' : `${isOn ? themes.dark.color : themes.light.color}`}`
                                    }} href={`/my-info/${nickName}`}>
                                        {nickName}님의 마이페이지
                                    </Nav.Link>
                                    :
                                    <Nav.Link className='navLink' style={{
                                        color: `${pathname === `/join-membership${url}`
                                            ? '#F2884B' : `${isOn ? themes.dark.color : themes.light.color}`}`
                                    }} href={`/join-membership${url}`}>
                                        회원가입
                                    </Nav.Link>
                            }
                            {
                                login ?
                                    <Nav.Link className='navLink'>
                                        <Button style={{ backgroundColor: `${isOn ? themes.dark.navFooterBgColor : themes.light.bgColor}`, color: `${isOn ? themes.dark.color : themes.light.color}` }} className='loginBtn' onClick={() => LogOut()}>로그아웃
                                        </Button>
                                    </Nav.Link>
                                    :
                                    <Nav.Link className='navLink'>
                                        <Button style={{ backgroundColor: `${isOn ? themes.dark.navFooterBgColor : themes.light.bgColor}`, color: `${isOn ? themes.dark.color : themes.light.color}` }} className='loginBtn' onClick={() => setModalShow(true)}>로그인
                                        </Button>
                                        <LoginModal
                                            show={modalShow}
                                            onHide={() => setModalShow(false)}
                                        />
                                    </Nav.Link>
                            }
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </div>
    );
}

export default NavVillage;
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import logo from '../img/logo.png'
import naver from '../img/naver.jpg'
import kakao from '../img/kakao.jpg'
import google from '../img/google.png'
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import styled from "styled-components";
import { useEffect, useState } from 'react';
import { CiBrightnessDown, CiDark } from "react-icons/ci";
import "../style.css"
import { useRecoilState } from 'recoil';
import { isDarkAtom } from '../atoms';
import themes from "../theme";

//회원 데이터
let localData
const getDataLocalStorage = (name) => {
    localData = JSON.parse(localStorage.getItem(name))
    return JSON.stringify(localData);
}

// 네비바
function NavVillage() {
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
    display: flex;
    align-items: center;
    position: relative;
    cursor: pointer;
      > .toggle-container {
        width: 50px;
        height: 24px;
        border-radius: 30px;
        background-color: #161F30;}
      > .toggle--checked {
        background-color: rgb(233,233,234);
        transition : 0.5s
      }
      > .toggle-circle {
        position: absolute;
        left: 1px;
        width: 22px;
        height: 22px;
        border-radius: 50%;
        background-color: rgb(255,254,255);
        transition : 0.5s
      } >.toggle--checked {
        left: 27px;
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
                console.log("로그인")
                setUserId("")
                setUserPassword("")
                props.onHide();
                window.location.href = `/${nickName}`
            } else {
                setLogin(false)
                console.log("실패")
            }
        }
        return (
            <Modal className='modal'
                {...props}
                aria-labelledby="contained-modal-title-vcenter"
                centered
            >
                <Modal.Header className='modalHeader'>
                    <LoginLogo src={logo} />
                    <Modal.Title id="contained-modal-title-vcenter">
                        반려동물의 모든 것 멍냥빌리지
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
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
                    />
                    <ModalBodyFooter>
                        <FindIdPassward onClick={() => { window.location.href = "/ForgetIdPassWd" }}>아이디 / 비밀번호가 기억나지 않아요</FindIdPassward>
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
                <Modal.Footer className='modalFooter'>
                    {
                        login === undefined ? null
                            : !login &&
                            <p className='warning'>일치하는 아이디 혹은 비밀번호가 없습니다</p>
                    }
                    <Button className='joinBtn' onClick={() => window.location.href = '/JoinMembership'}>회원가입</Button>
                    <Button type='submit' className='modalLoginBtn' onClick={() => loginBtn()}>로그인</Button>
                </Modal.Footer>
            </Modal>
        );
    }

    //로그인 상태일때
    useEffect(() => {
        if (window.sessionStorage.key(0) === "logined") {
            setLogin(true)
            setNickName(JSON.parse(sessionStorage.getItem("logined")).nickName)
            setUrl(`/${nickName}`)
        }
    }, [login]);
    const [url, setUrl] = useState("/")
    const [modalShow, setModalShow] = useState(false);
    const [nickName, setNickName] = useState("")
    const LogOut = () => {
        setUrl("/")
        window.sessionStorage.removeItem("logined")
        window.location.href = "/"
    }

    //현재 주소
    const pathname = window.location.pathname;

    //다크모드
    const [isOn, setisOn] = useRecoilState(isDarkAtom)
    useEffect(() => {
        localStorage.setItem('isDark', isOn)
    }, [isOn]);
    const toggleHandler = () => {
        setisOn(!isOn)
    };

    // 마이페이지 안의 페이지들 주소
    let mypages = [`/MyInfo/${nickName}`, `/ChangePasswd/${nickName}`, `/SelectedLocation/${nickName}`, `/WrittenByMe/${nickName}`]

    return (
        <div>
            <Navbar expand="lg" className="navbar"
                style={{ backgroundColor: `${isOn ? themes.dark.bgColor : themes.light.bgColor}` }}
            >
                <a href={url}><Logo src={logo} /></a>
                <Container fluid>
                    <Navbar.Brand className='navHomeLink' style={{
                        color: `${pathname === url
                            ? "#F2884B" : `${isOn ? themes.dark.color : themes.light.color}`}`
                    }} href={url}>
                        Home
                        {/*모든 네비 카테고리는 현재 주소가 해당 카테고리면 컬러가 다르게 표시됨 */}
                    </Navbar.Brand>
                    <Navbar.Toggle aria-controls="navbarScroll" />
                    <Navbar.Collapse id="navbarScroll" >
                        <Nav
                            className="me-auto my-2 my-lg-0"
                            style={{ minHeight: '80px', maxHeight: '120px' }}
                            navbarScroll
                        >
                            <Nav.Link style={{ color: `${pathname === `/Community${url}` ? '#F2884B' : `${isOn ? themes.dark.color : themes.light.color}`}` }} className='navLink' href={`/Community${url}`}>
                                커뮤니티
                            </Nav.Link>
                            <Nav.Link style={{
                                color: `${pathname === `/PlaceRecommend${url}`
                                    ? '#F2884B' : `${isOn ? themes.dark.color : themes.light.color}`}`
                            }} className='navLink' href={`/PlaceRecommend${url}`}>
                                장소추천
                            </Nav.Link>
                            <Nav.Link style={{
                                color: `${pathname === `/AboutUs${url}`
                                    ? '#F2884B' : `${isOn ? themes.dark.color : themes.light.color}`}`
                            }} className='navLink' href={`/AboutUs${url}`}>
                                About Us
                            </Nav.Link>
                        </Nav>
                        <Nav className="d-flex">
                            <ToggleContainer onClick={toggleHandler}>
                                <div className={`toggle-container ${isOn ? "toggle--checked" : null}`}></div>
                                <SunMoon className={`toggle-circle ${isOn ? "toggle--checked" : null}`}>{isOn ? <CiDark /> : <CiBrightnessDown />}</SunMoon>
                            </ToggleContainer>
                            {
                                login ?
                                    <Nav.Link className='navLink' style={{
                                        color: `${mypages.includes(pathname)
                                            ? '#F2884B' : `${isOn ? themes.dark.color : themes.light.color}`}`
                                    }} href={`/MyInfo/${nickName}`}>
                                        마이페이지
                                    </Nav.Link>
                                    :
                                    <Nav.Link className='navLink' style={{
                                        color: `${pathname === `/JoinMembership${url}`
                                            ? '#F2884B' : `${isOn ? themes.dark.color : themes.light.color}`}`
                                    }} href={`/JoinMembership${url}`}>
                                        회원가입
                                    </Nav.Link>
                            }
                            {
                                login ?
                                    <Nav.Link className='navLink'>
                                        <Button style={{ backgroundColor: `${isOn ? themes.dark.bgColor : themes.light.bgColor}`, color: `${isOn ? themes.dark.color : themes.light.color}` }} className='loginBtn' onClick={() => LogOut()}>로그아웃
                                        </Button>
                                    </Nav.Link>
                                    :
                                    <Nav.Link className='navLink'>
                                        <Button style={{ backgroundColor: `${isOn ? themes.dark.bgColor : themes.light.bgColor}`, color: `${isOn ? themes.dark.color : themes.light.color}` }} className='loginBtn' onClick={() => setModalShow(true)}>로그인
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
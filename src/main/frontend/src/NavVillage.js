import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import logo from './img/logo.png'
import naver from './img/naver.jpg'
import kakao from './img/kakao.jpg'
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import styled from "styled-components";
import { useState } from 'react';
import { CiBrightnessDown, CiDark } from "react-icons/ci";
import "./style.css"

const Logo = styled.img`
position: fixed;
top: 12px;
left: 50%;
width: 90px;
transform: translate(-50%, -10%);
`

const LoginLogo = styled.img`
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
    background-color: rgb(233,233,234);}
  > .toggle--checked {
    background-color: #161F30;
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

const SunMoon = styled.div`
display: flex;
justify-content: center;
align-items: center;
`
const ModalBodyFooter = styled.div`
display: flex;
flex-direction: column;
justify-content: center;
align-items: center;
`
const FindIdPassward = styled.a`
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

function MyVerticallyCenteredModal(props) {
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
                    placeholder='아이디(이메일)을 입력해주세요.'
                />
                <Form.Label htmlFor="inputPassword">비밀번호</Form.Label>
                <Form.Control
                    type="password"
                    className='modalInput'
                    id="inputPassword"
                />
                <ModalBodyFooter>
                    <FindIdPassward href="/">아이디 / 비밀번호가 기억나지 않아요</FindIdPassward>
                    <Social>
                        <p>소셜 로그인</p>
                        <Logos>
                            <NaverLogo className='socialLogo' src={naver} onClick={() => { alert("네이버~") }} />
                            <KakaoLogo className='socialLogo' src={kakao} onClick={() => { alert("카카오~") }} />
                        </Logos>
                    </Social>
                </ModalBodyFooter>
            </Modal.Body>
            <Modal.Footer className='modalFooter'>
                <Button className='joinBtn' onClick={() => { alert("회원가입드가자~") }}>회원가입</Button>
                <Button className='modalLoginBtn' onClick={() => { alert("드가자~") }}>로그인</Button>
            </Modal.Footer>
        </Modal>
    );
}

function NavVillage() {

    const pathname = window.location.pathname;
    console.log(pathname);

    const [isOn, setisOn] = useState(false);

    const toggleHandler = () => {
        setisOn(!isOn)
    };

    const [modalShow, setModalShow] = useState(false);

    return (
        <div>
            <Navbar expand="lg" className="navbar"  >
                <a href="/"><Logo src={logo} /></a>
                <Container fluid>
                    {
                        pathname === "/"
                            ? <Navbar.Brand className='navLink' style={{ color: '#F2884B' }} href="/">Home</Navbar.Brand>
                            : <Navbar.Brand className='navLink' href="/">Home</Navbar.Brand>
                    }
                    <Navbar.Toggle aria-controls="navbarScroll" />
                    <Navbar.Collapse id="navbarScroll" >
                        <Nav
                            className="me-auto my-2 my-lg-0"
                            style={{ minHeight: '80px', maxHeight: '100px' }}
                            navbarScroll
                        >
                            {
                                pathname === "/Community"
                                    ? <Nav.Link style={{ color: '#F2884B' }} className='navLink' href="Community">커뮤니티</Nav.Link>
                                    : <Nav.Link className='navLink' href="Community">커뮤니티</Nav.Link>
                            }
                            {
                                pathname === "/PlaceRecommend"
                                    ? <Nav.Link style={{ color: '#F2884B' }} className='navLink' href="PlaceRecommend">장소추천</Nav.Link>
                                    : <Nav.Link className='navLink' href="PlaceRecommend">장소추천</Nav.Link>
                            }
                            {
                                pathname === "/AboutUs"
                                    ? <Nav.Link style={{ color: '#F2884B' }} className='navLink' href="AboutUs">About Us</Nav.Link>
                                    : <Nav.Link className='navLink' href="AboutUs">About Us</Nav.Link>
                            }
                        </Nav>
                        <Nav className="d-flex">
                            <ToggleContainer onClick={toggleHandler}>
                                <div className={`toggle-container ${isOn ? "toggle--checked" : null}`}></div>
                                <SunMoon className={`toggle-circle ${isOn ? "toggle--checked" : null}`}>{isOn ? <CiDark /> : <CiBrightnessDown />}</SunMoon>
                            </ToggleContainer>
                            {
                                pathname === "/JoinMembership"
                                    ? <Nav.Link className='navLink' style={{ color: '#F2884B' }} href="JoinMembership">회원가입</Nav.Link>
                                    : <Nav.Link className='navLink' href="JoinMembership">회원가입</Nav.Link>
                            }

                            <Nav.Link className='navLink'>
                                <Button className='loginBtn' onClick={() => setModalShow(true)}>로그인
                                </Button>
                                <MyVerticallyCenteredModal
                                    show={modalShow}
                                    onHide={() => setModalShow(false)}
                                />
                            </Nav.Link>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </div>
    );
}

export default NavVillage;
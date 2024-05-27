import { useEffect, useState } from "react";
import Button from 'react-bootstrap/Button';
import Offcanvas from 'react-bootstrap/Offcanvas';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import "./layout.css"
import { IoChatbubblesOutline } from "react-icons/io5";
import styled from "styled-components";
import { useRecoilValue } from 'recoil';
import { isDarkAtom } from '../components/atoms';
import themes from "../components/theme";
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';
import axios from "axios";
import { Prev } from "react-bootstrap/esm/PageItem";
const SideContainer = styled.div`

`
const FrequentQ = styled.div`
width: 100%;
margin-bottom: 10px;
padding-bottom: 10px;
border-bottom: 1px solid #F2884B;
`
const ChatBox = styled.div`
margin-bottom: 20px;
display: flex;
flex-direction: column;
`

const UserChat = styled.div`
margin-bottom: 10px;
width: 367px;
display: flex;
justify-content: end;
& p {
background-color: #FFE452;
padding: 5px;
margin: 5px 0;
border-radius: 5px 5px 0 5px;
width: fit-content;
box-shadow: 1px 1px 1px 1px #666
}
`
const UserChatItem = styled.div`
`
const ManagerChat = styled.div`
margin-bottom: 10px;
width: 367px;
display: flex;
justify-content: start;
flex-direction: column;
& p {
background-color: white;
padding: 5px;
margin: 5px 0;
border-radius: 5px 5px 5px 0;
width: fit-content;
box-shadow: 1px 1px 1px 1px #666
}
`
const ManagerName = styled.div`
font-size: 16px;
`
const UserName = styled.div`
text-align: end;
font-size: 16px;
`

function SideBar() {

    //다크모드
    const isDark = useRecoilValue(isDarkAtom);
    const switchColor = `${isDark ? themes.dark.color : themes.light.color}`
    const switchBgColor = `${isDark ? themes.dark.bgColor : themes.light.bgColor}`

    // 스프링부트 연동 주소
    const baseUrl = "http://localhost:8080";
    // 챗봇 온오프 버튼 위치
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const heightBody = document.body.scrollHeight
    const [position, setPosition] = useState(0);
    const [on, setOn] = useState(false)
    function onScroll() {
        setPosition(window.scrollY);
    }
    useEffect(() => {
        window.addEventListener("scroll", onScroll);
        return () => {
            window.removeEventListener("scroll", onScroll);
            setOn(true)
        };
    }, []);
    const [nickName, setNickName] = useState("")
    const [login, setLogin] = useState(false)
    useEffect(() => {
        if (window.sessionStorage.key(0) === "logined") {
            setLogin(true)
            setNickName(JSON.parse(sessionStorage.getItem("logined")).nickName)
        }
    }, []);
    //챗봇 내부
    //대답 자료
    const answerList = {
        로그인: "로그인 창에 아이디/비밀번호 찾기를 이용해주세요.",
        소셜로그인비밀번호: "소셜로그인은 아이디/비밀번호 찾기가 불가능합니다.",
        추천장소추가: "추천장소 페이지에 추천 장소 추가를 이용해주세요",
        회원정보변경: "로그인후 마이페이지를 이용해주세요."
    }
    const [userChat, setUserChat] = useState()
    const [userChatArr, setUserChatArr] = useState([])
    const [isChatOn, setIsChatOn] = useState(false)
    const userChatInput = (e) => {
        setUserChat(e.target.value)
    }
    const chatOn = () => {
        setIsChatOn(true)
    }
    // 챗봇 즉시 반응시키기 위해 사용
    const [valueX, setValueX] = useState(0)
    // 메시지 전송
    const sendMessage = () => {
        setValueX(Prev => Prev + 1)
        userChatArr.push(["user", userChat])
        console.log(userChatArr)
        let body = {
            message: userChat
        }
        axios.post(`${baseUrl}/chatbot`, body
        ).then((response) => {

            console.log(response.data);    //오류발생시 실행
        }).catch((error) => {
            console.log(error);    //오류발생시 실행

        })
        setUserChat("")
    }

    return (
        <SideContainer>
            {
                // 챗봇 아이콘 위치조정을 위한 조건식
                heightBody - position < 961
                    ?
                    <IoChatbubblesOutline style={{
                        transition: "transform 0.5s linear",
                        transform: "translateY(-100px)"
                    }} className="chatBotMobile" onClick={handleShow} />
                    :
                    <IoChatbubblesOutline id="chatBotMobile" style={{
                        transition: "transform 0.5s linear"
                    }} className="chatBotMobile" onClick={handleShow} />
            }
            <Offcanvas style={{
                backgroundColor: "#D6ECFF"
            }} show={show} onHide={handleClose} placement='end'>
                <Offcanvas.Header closeButton>
                    <Offcanvas.Title>댕냥 챗봇</Offcanvas.Title>
                </Offcanvas.Header>
                <Offcanvas.Body className="chatBotBody">
                    <FrequentQ>
                        {login ?
                            <Button className="questionBtn" onClick={chatOn}>챗봇에게 질문하기</Button>
                            :
                            <OverlayTrigger overlay={<Tooltip id="tooltip-disabled">로그인 해주세요.</Tooltip>}>
                                <span className="d-inline-block">
                                    <Button disabled style={{ pointerEvents: 'none' }}>
                                        챗봇에게 질문하기
                                    </Button>
                                </span>
                            </OverlayTrigger>
                        }

                    </FrequentQ>
                    {
                        isChatOn ?
                            <>
                                <ChatBox>
                                    {
                                        userChatArr.map((e, i) => (
                                            e[0] === "user" ?
                                                <UserChat key={i}>
                                                    <UserChatItem>
                                                        <UserName>{nickName}</UserName>
                                                        <p>{e[1]}</p>
                                                    </UserChatItem>
                                                </UserChat>
                                                :
                                                <ManagerChat key={i}>
                                                    <ManagerName>댕냥빌리지</ManagerName>
                                                    <p>{e[1]}</p>
                                                </ManagerChat>
                                        ))
                                    }
                                </ChatBox>
                                <InputGroup className="mb-3">
                                    <Form.Control
                                        type="text"
                                        placeholder="질문을 입력해주세요"
                                        aria-describedby="basic-addon2"
                                        value={userChat}
                                        name="userChat"
                                        onChange={userChatInput}
                                    />
                                    <Button className="chatBotBtn" variant="outline-secondary" id="button-addon2"
                                        onClick={sendMessage}
                                    >
                                        전송
                                    </Button>
                                </InputGroup>
                            </>
                            :
                            <InputGroup className="mb-3">
                                <Form.Control
                                    disabled
                                    type="text"
                                    placeholder="챗봇에게 질문하기를 클릭해주세요"
                                    aria-describedby="basic-addon2"
                                    value={userChat}
                                    name="userChat"
                                    onChange={userChatInput}
                                />
                                <Button className="chatBotBtn" variant="outline-secondary" id="button-addon2"
                                >
                                    전송
                                </Button>
                            </InputGroup>
                    }
                </Offcanvas.Body>
            </Offcanvas>
        </SideContainer >
    );
}

export default SideBar;
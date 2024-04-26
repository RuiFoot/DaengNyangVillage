import { useEffect, useState } from "react";
import Button from 'react-bootstrap/Button';
import Offcanvas from 'react-bootstrap/Offcanvas';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import "./layout.css"
import { IoChatbubblesOutline } from "react-icons/io5";
import styled from "styled-components";
import { useRecoilValue } from 'recoil';
import { isDarkAtom } from '../atoms';
import themes from "../theme";

const SideContainer = styled.div`
`
const FrequentQ = styled.div`
margin-bottom: 10px;
padding: 10px;
border: 1px solid black;
border-radius: 10px;
border-color: #F2884B;
`
const FrequentHeader = styled.div`
padding-bottom: 10px;
margin-bottom: 10px;
font-weight: 700;
border-bottom: 1px solid #E7E1E8;
`
const FrequentBtns = styled.div`
display: ruby;

`
const FrequentFooter = styled.div`
margin-top: 10px;
padding: 10px;
border-top: 1px solid #E7E1E8;
`
const ChatBox = styled.div`
display: flex;
flex-direction: column;
`
const ChatBoxManager = styled.div`
display: flex;
flex-direction: column;
`
const UserChat = styled.div`
width: 367px;
display: flex;
justify-content: end;
& p {
padding: 5px;
margin: 5px 0;
border: 1px solid #F2884B;
border-radius: 5px 5px 0 5px;
width: fit-content;
}
`
const ManagerChat = styled.div`
width: 367px;
display: flex;
justify-content: start;
flex-direction: column;
& p {
padding: 5px;
margin: 5px 0;
border: 1px solid #F288CD;
border-radius: 5px 5px 5px 0;
width: fit-content;
}
`
const ManagerName = styled.div`
font-size: 14px;
`
function SideBar() {
    const isDark = useRecoilValue(isDarkAtom);
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

    //챗봇 내부
    //대답 자료
    const answerList = {
        로그인: "로그인 창에 아이디/비밀번호 찾기를 이용해주세요.",
        소셜로그인비밀번호: "소셜로그인은 아이디/비밀번호 찾기가 불가능합니다.",
        추천장소추가: "추천장소 페이지에 추천 장소 추가를 이용해주세요",
        회원정보변경: "로그인후 마이페이지를 이용해주세요."
    }
    const [userChat, setUserChat] = useState()
    const [managerChat, setManagerChat] = useState()
    const [userChatArr, setUserChatArr] = useState([])
    const [managerChatArr, setManagerChatArr] = useState([])
    const [botAnswer, setBotAnswer] = useState()
    const [isChatOn, setIsChatOn] = useState(false)
    const userChatInput = (e) => {
        setUserChat(e.target.value)
    }
    const managerChatInput = (e) => {
        setManagerChat(e.target.value)
    }

    const idPasswd = () => {
        setBotAnswer(answerList.로그인)
    }
    const social = () => {
        setBotAnswer(answerList.소셜로그인비밀번호)
    }
    const placeAdd = () => {
        setBotAnswer(answerList.추천장소추가)
    }
    const changeInfo = () => {
        setBotAnswer(answerList.회원정보변경)
    }
    const chatOn = () => {
        setIsChatOn(true)
    }

    const sendMessage = () => {
        userChatArr.push(["user", userChat])
        console.log(userChatArr)
        setUserChat("")
    }
    const sendAnswer = () => {
        userChatArr.push(["manager", managerChat])
        console.log(managerChatArr)
        setManagerChat("")
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
                color: `${isDark ? themes.dark.color : themes.light.color}`,
                backgroundColor: `${isDark ? themes.dark.navFooterBgColor : themes.light.bgColor}`
            }} show={show} onHide={handleClose} placement='end'>
                <Offcanvas.Header closeButton>
                    <Offcanvas.Title>댕냥 챗봇</Offcanvas.Title>
                </Offcanvas.Header>
                <Offcanvas.Body className="chatBotBody">
                    <FrequentQ>
                        <FrequentHeader>
                            자주 묻는 질문
                        </FrequentHeader>
                        <FrequentBtns>
                            <Button className="questionBtn" onClick={idPasswd}>아이디/비밀번호</Button>
                            <Button className="questionBtn" onClick={social}>소셜로그인</Button>
                            <Button className="questionBtn" onClick={placeAdd}>추천장소 추가</Button>
                            <Button className="questionBtn" onClick={changeInfo}>회원 정보 변경</Button>
                            <Button className="questionBtn" onClick={chatOn}>1:1 상담</Button>
                        </FrequentBtns>
                        <FrequentFooter>
                            {botAnswer}
                        </FrequentFooter>
                    </FrequentQ>
                    {
                        isChatOn ?
                            <>
                                <ChatBox>
                                    {
                                        userChatArr.map((e, i) => (
                                            e[0] === "user" ?
                                                <UserChat key={i}>
                                                    <p>{e[1]}</p>
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
                                <InputGroup className="mb-3">
                                    <Form.Control
                                        type="text"
                                        placeholder="답변을 입력해주세요"
                                        aria-describedby="basic-addon2"
                                        value={managerChat}
                                        name="managerChat"
                                        onChange={managerChatInput}
                                    />
                                    <Button className="chatBotBtn" variant="outline-secondary" id="button-addon2"
                                        onClick={sendAnswer}
                                    >
                                        매니저
                                    </Button>
                                </InputGroup>
                            </>
                            :
                            <InputGroup className="mb-3">
                                <Form.Control
                                    disabled
                                    type="text"
                                    placeholder="1:1 상담 버튼을 클릭해주세요"
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
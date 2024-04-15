import styled from "styled-components";
import { useEffect, useState } from "react";
import Button from 'react-bootstrap/Button';
import Offcanvas from 'react-bootstrap/Offcanvas';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import "./sideBarStyle.css"
import logo from '../img/logo.png'
import { IoChatbubblesOutline } from "react-icons/io5";
import { MdOutlinePersonOutline } from "react-icons/md";

const SideBarContainer = styled.div`
display: flex;
flex-direction: column;
justify-content: space-evenly;
align-items: center;
    position: fixed;
    top: 50%;
    right: 0;
    width: 4vw;
    height: 160px;
    margin: 1vw;
border: 1px solid #0B0B0E;
border-radius: 5px;
`
const SideBarContainerMobile = styled.div`
display: flex;
flex-direction: column;
justify-content: space-evenly;
align-items: center;
    position: fixed;
    bottom: 0;
    right: 6vw;
`
const SideBarLogo = styled.img`
padding: 5px;
width: 3.5vw;
`
const SideBarLine = styled.div`
border: 1px solid #F2884B;
width: 80%;
`

function OffCanvasExample({ name, ...props }) {
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    return (
        <>
            <IoChatbubblesOutline className="chatBot" onClick={handleShow} />
            <Offcanvas show={show} onHide={handleClose} {...props}>
                <Offcanvas.Header closeButton>
                    <Offcanvas.Title>댕냥 챗봇</Offcanvas.Title>
                </Offcanvas.Header>
                <Offcanvas.Body className="chatBotBody">
                    <InputGroup className="mb-3">
                        <Form.Control
                            placeholder="질문을 입력해주세요"
                            aria-describedby="basic-addon2"
                        />
                        <Button className="chatBotBtn" variant="outline-secondary" id="button-addon2">
                            전송
                        </Button>
                    </InputGroup>
                </Offcanvas.Body>
            </Offcanvas>
        </>
    );
}


function ChatBot() {
    return (
        <>
            <OffCanvasExample placement='end' name='end' />
        </>
    );
}



function SideBar() {
    const [windowSize, setWindowSiz] = useState(window.innerWidth);
    const handleResize = () => {
        setWindowSiz(window.innerWidth)
    }
    useEffect(() => {
        window.addEventListener('resize', handleResize);
        return () => {
            window.addEventListener('resize', handleResize)
        }
    }, [])
    return (
        <>
            {windowSize > 997
                ?
                <SideBarContainer>
                    <a href="/"><SideBarLogo src={logo} /></a>
                    <ChatBot />
                    <SideBarLine />
                    <MdOutlinePersonOutline onClick={() => alert("로그인해주세요.")} className="defaultProfile" />
                </SideBarContainer>
                :
                <SideBarContainerMobile>
                    <ChatBot />
                </SideBarContainerMobile>
            }
        </>

    );
}

export default SideBar;
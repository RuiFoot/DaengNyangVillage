import { useEffect, useState } from "react";
import Button from 'react-bootstrap/Button';
import Offcanvas from 'react-bootstrap/Offcanvas';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import "./sideBarStyle.css"
import { IoChatbubblesOutline } from "react-icons/io5";
import styled from "styled-components";


const SideContainer = styled.div`
`


function SideBar() {
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const heightBody = document.body.scrollHeight

    const [position, setPosition] = useState(0);
    const [on, setOn] = useState(false)
    function onScroll() {
        setPosition(window.scrollY);
        // console.log("로딩" + window.scrollY);
        // console.log("로딩" + document.body.scrollHeight);
    }
    useEffect(() => {
        window.addEventListener("scroll", onScroll);
        return () => {
            window.removeEventListener("scroll", onScroll);
            setOn(true)
        };

    }, []);

    return (
        <SideContainer>
            {
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
            {/* <IoChatbubblesOutline id="chatBotMobile"
                className="chatBotMobile" onClick={handleShow} /> */}
            <Offcanvas show={show} onHide={handleClose} placement='end'>
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
        </SideContainer>
    );
}

export default SideBar;
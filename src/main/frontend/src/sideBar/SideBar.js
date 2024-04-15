import { useEffect, useState } from "react";
import Button from 'react-bootstrap/Button';
import Offcanvas from 'react-bootstrap/Offcanvas';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import "./sideBarStyle.css"
import { IoChatbubblesOutline } from "react-icons/io5";


function SideBar() {
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

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
            <IoChatbubblesOutline className="chatBotMobile" onClick={handleShow} />
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
        </>
    );
}

export default SideBar;
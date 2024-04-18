import styled from "styled-components";
import Bumper from "../layout/Bumper";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import { useState } from "react";
import './membershipStyle.css'
const Container = styled.div`
display: flex;
flex-direction: column;
justify-content: center;
align-items: center;
margin: 0 6vw;
`
const Content = styled.div`
margin-top: 20px;
`
const Title = styled.div`
font-size: 24px;
margin-bottom: 20px;
`
const Text = styled.div`
margin-bottom: 10px;
`
const UserId = styled.div`
`

function ForgetIdPassWd() {
    const [phoneNumber, setPhoneNumber] = useState()
    const [numCheck, setNumCheck] = useState()
    const [isSame, setIsSame] = useState()
    const [findUserId, setFindUserId] = useState()
    const isNum = (input) => {
        if (/^[0-9]+$/.test(input) && input.length === 11) {
            setNumCheck(true)
        } else {
            setNumCheck(false)
        }
    };
    const onChange = (e) => {
        setPhoneNumber(e.target.value)
    }

    const findId = () => {
        let memberInfo = JSON.parse(window.localStorage.getItem("member")) // json 객체로 변환 
        if (memberInfo.phoneNumber === phoneNumber) {
            setIsSame(true)
            setFindUserId(memberInfo.email)
        } else {
            setIsSame(false)
            alert("일치하는 전화번호가 없습니다.")
        }
        console.log(isSame)
    }
    return (
        <>
            <Bumper />
            <Container>
                <Content>
                    <Title>내 계정 ID 찾기</Title>
                    <Text>내 계정 ID를 찾으려면 전화번호를 입력하세요.</Text>
                    <InputGroup className="inputGroup">
                        <Form.Control
                            placeholder="01012345678"
                            aria-label="Recipient's username"
                            aria-describedby="basic-addon2"
                            value={phoneNumber}
                            name="phoneNumber"
                            onChange={onChange}
                            onKeyUpCapture={() => isNum(phoneNumber)}
                        />
                        <Button className="btns" onClick={() => { findId() }} >
                            아이디 찾기
                        </Button>
                    </InputGroup>
                    {
                        phoneNumber === undefined ?
                            null
                            :
                            numCheck ?
                                <p className="pass" >사용가능한 번호입니다.</p>
                                :
                                <p className="warning">숫자로 11자리를 입력해주세요.</p>

                    }
                    {
                        findUserId === undefined ?
                            null
                            :
                            <UserId>회원님의 아이디 : {findUserId}</UserId>
                    }
                </Content>
            </Container>
        </>

    );
}

export default ForgetIdPassWd;
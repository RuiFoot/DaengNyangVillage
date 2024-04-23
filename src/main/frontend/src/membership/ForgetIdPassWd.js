import styled from "styled-components";
import Bumper from "../layout/Bumper";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import { useState } from "react";
import emailjs from 'emailjs-com';
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
margin-top: 20px;
`
const Text = styled.div`
margin-bottom: 10px;
`
const UserId = styled.div`
`

function ForgetIdPassWd() {
    const [phoneNumber, setPhoneNumber] = useState("")
    const [email, setEmail] = useState("")
    const [numCheck, setNumCheck] = useState()
    const [isSame, setIsSame] = useState()
    const [findUserId, setFindUserId] = useState()
    const [isEmailSent, setIsEmailSent] = useState(false);

    let memberInfo = JSON.parse(window.localStorage.getItem("member")) // json 객체로 변환 

    // 아이디 찾기
    const isNum = (input) => {
        if (/^[0-9]+$/.test(input) && input.length === 11) {
            setNumCheck(true)
        } else {
            setNumCheck(false)
        }
    };
    const onChangeNum = (e) => {
        setPhoneNumber(e.target.value)
    }

    const findId = () => {
        if (memberInfo.phoneNumber === phoneNumber) {
            setIsSame(true)
            setFindUserId(memberInfo.email)
        } else {
            setIsSame(false)
            alert("일치하는 전화번호가 없습니다.")
        }
        console.log(isSame)
        setPhoneNumber("")
    }

    //비밀번호 찾기

    const onChangeEmail = (e) => {
        setEmail(e.target.value)
    }
    const findEmail = () => {
        const getRandom = (min, max) => Math.floor(Math.random() * (max - min) + min);
        console.log(email)
        console.log(memberInfo.nickName)
        // 이메일 보내기
        // 여기서 정의해야하는 것은 위에서 만든 메일 템플릿에 지정한 변수({{ }})에 대한 값을 담아줘야한다.
        const templateParams = {
            toEmail: email,
            message: getRandom(1, 1000000),
            toName: memberInfo.nickName
        };
        console.log(templateParams)
        emailjs
            .send(
                'DaengNyangVillage', // 서비스 ID
                'DaengNyangVillage', // 템플릿 ID
                templateParams,
                'yHDYpSnWhBXnM4RDs', // public-key
            )
            .then((response) => {
                console.log('이메일이 성공적으로 보내졌습니다:', response);
                setIsEmailSent(true);
                // 이메일 전송 성공 처리 로직 추가
            })
            .catch((error) => {
                console.error('이메일 보내기 실패:', error);
                alert("이메일 전송에 실패했습니다 챗봇을 통해 문의 해주세요.")
            });
        setEmail("")
    };


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
                            onChange={onChangeNum}
                            onKeyUpCapture={() => isNum(phoneNumber)}
                        />
                        <Button className="btns" onClick={() => { findId() }} >
                            아이디 찾기
                        </Button>
                    </InputGroup>
                    {
                        phoneNumber.length < 1 ?
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
                    <Title>내 계정 비밀번호 찾기</Title>
                    <Text>내 계정 비밀번호를 찾으려면 이메일을 입력하세요.</Text>
                    <InputGroup className="inputGroup">
                        <Form.Control
                            placeholder="1234@village.com"
                            aria-label="Recipient's username"
                            aria-describedby="basic-addon2"
                            value={email}
                            name="email"
                            onChange={onChangeEmail}
                        />
                        <Button className="btns" onClick={() => { findEmail() }} >
                            비밀번호 찾기
                        </Button>
                    </InputGroup>
                    {
                        isEmailSent &&
                        <p className="pass" >이메일을 확인해주세요.</p>
                    }
                </Content>
            </Container>
        </>

    );
}

export default ForgetIdPassWd;
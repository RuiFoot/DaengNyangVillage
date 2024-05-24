import styled from "styled-components";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import { useState } from "react";
import emailjs from 'emailjs-com';
import { useRecoilValue } from 'recoil';
import { isDarkAtom } from '../components/atoms';
import themes from "../components/theme";
import './membershipStyle.css'
import axios from "axios";

const Container = styled.div`
min-height: calc(100vh - 86px);
display: flex;
flex-direction: column;
justify-content: center;
align-items: center;
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

function FindIdPasswd() {
    //다크모드
    const isDark = useRecoilValue(isDarkAtom);
    const switchColor = `${isDark ? themes.dark.color : themes.light.color}`
    const switchBgColor = `${isDark ? themes.dark.bgColor : themes.light.bgColor}`
    const baseUrl = "http://localhost:8080";
    const [phoneNumber, setPhoneNumber] = useState("")
    const [email, setEmail] = useState("")
    const [numCheck, setNumCheck] = useState()
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

    //memberInfo 백엔드에서 받아와야함
    const [findedE, setFinedE] = useState()
    console.log(findedE)
    const findId = () => {
        // console.log(phoneNumber)
        axios.post(`${baseUrl}/member/findEmail`, {
            phoneNumber: phoneNumber
        }
        ).then((response) => {
            console.log(response.data);		//정상 통신 후 응답된 메시지 출력
            setFinedE(response.data.email)
        }).catch((error) => {
            alert("가입된 번호가 없습니다.")
            console.log(error);				//오류발생시 실행
        })
        setPhoneNumber("")
    }

    //비밀번호 찾기

    const onChangeEmail = (e) => {
        setEmail(e.target.value)
    }
    // 여기 백엔드에서 받아온값으로해야함 이메일 주소, 닉네임 수정 필요.
    const findEmail = () => {
        axios.post(`${baseUrl}/member/findNickname`, {
            email: email
        }
        ).then((response) => {
            console.log(response);		//정상 통신 후 응답된 메시지 출력
            // 이메일 보내기
            // 여기서 정의해야하는 것은 위에서 만든 메일 템플릿에 지정한 변수({{ }})에 대한 값을 담아줘야한다.
            const templateParams = {
                toEmail: email,
                message: `http://localhost:3000/change-passwd-lick/${response.data.memberNo}`,
                toName: response.data.nickname
            };
            emailjs
                .send(
                    'DaengNyangVillage', // 서비스 ID
                    'DaengNyangVillage', // 템플릿 ID
                    templateParams,
                    'yHDYpSnWhBXnM4RDs', // public-key
                )
                .then((response) => {
                    // console.log('이메일이 성공적으로 보내졌습니다:', response);
                    setIsEmailSent(true);
                    // 이메일 전송 성공 처리 로직 추가
                })
                .catch((error) => {
                    console.error('이메일 보내기 실패:', error);
                    alert("이메일 전송에 실패했습니다 챗봇을 통해 문의 해주세요.")
                });
            setEmail("")
        }).catch((error) => {
            alert("가입된 이메일이 없습니다.")
            console.log(error);				//오류발생시 실행
        })
    };

    return (
        <>
            <Container
                style={{
                    color: switchColor,
                    backgroundColor: switchBgColor
                }}>
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
                        findedE === undefined ?
                            null
                            :
                            <UserId>회원님의 아이디 : {findedE}</UserId>
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

export default FindIdPasswd;
import styled from "styled-components";
import { useState } from "react";
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';
import Button from 'react-bootstrap/Button';
import MypageNavbar from './mypageNavbar';
import { useRecoilValue } from 'recoil';
import { isDarkAtom } from '../../atoms';
import themes from "../../theme";

const Container = styled.div`
min-height: calc(100vh - 229px);
display: flex;
flex-direction: column;
align-items: center;
`
const EditTitle = styled.div`
margin: 20px 0 0 0;
text-align: center;
font-size: clamp(80%, 5vw, 120%);
`

const InputForm = styled.form`
margin: 15px;
width: 350px;
`

const InputTitle = styled.div`
margin: 15px 0 10px 0;
`

function ChangePasswd() {
    const isDark = useRecoilValue(isDarkAtom);
    const baseUrl = "http://localhost:8080";   //스프링부트 연동시
    const previousInfo = JSON.parse(sessionStorage.getItem("logined")) // 이전 회원 정보

    //새 비밀번호
    const [newPasswd, setNewPasswd] = useState("")
    const onNewChange = (e) => {
        setNewPasswd(e.target.value)
    }

    //저장될 맴버정보
    const [memberInfo, setMemberInfo] = useState({
        // email: previousInfo.email,
        password: "",
        passwordCheck: "",
        profileImg: "",
        mypet: previousInfo.mypet,
        nickName: previousInfo.nickName,
        phoneNumber: previousInfo.phoneNumber,
        inputAddress: previousInfo.inputAddress,
        inputZonecode: previousInfo.inputZonecode,
        detailedAddress: previousInfo.detailedAddress
    })

    const { email, password, passwordCheck, profileImg, mypet, nickName, phoneNumber, inputAddress, inputZonecode, detailedAddress } = memberInfo; // 비구조화 할당

    function onChange(e) {
        const { value, name } = e.target;
        setMemberInfo({
            ...memberInfo,
            [name]: value
        });
    }

    // 유효성 검사
    const [passwdCheck, setPasswdCheck] = useState()
    const isSame = newPasswd === passwordCheck;
    const isValid = isSame === true && newPasswd.length > 7
    const isPassword = (input) => {
        if (/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/.test(input)) {
            setPasswdCheck(true)
        } else {
            setPasswdCheck(false)
        }

    }
    async function handleSubmit(e) {
        e.preventDefault();
        // 비밀번호 보안 해시
        // memberInfo.password = SHA256(password).toString();

        // 회원가입에서 값 줄때 사용
        // let body = {
        //     nickname: memberInfo.nickName,
        //     profileImg: memberInfo.profileImg,
        //     address: memberInfo.inputAddress,
        //     addressDetail: memberInfo.detailedAddress,
        //     favoritePet: memberInfo.mypet,
        //     phoneNumber: memberInfo.phoneNumber
        // }
        // axios.post(`${baseUrl}/member/signup`, body
        // ).then((response) => {
        //     alert("댕냥빌리지 가입을 환영합니다.")
        //     console.log(response.data);		//정상 통신 후 응답된 메시지 출력
        // }).catch((error) => {
        //     console.log(error);				//오류발생시 실행
        // })
        delete memberInfo.passwordCheck; //저장될 필요없음
        memberInfo.password = newPasswd //비밀번호를 새비밀번호로 교체
        localStorage.setItem("member", JSON.stringify(memberInfo)); // 로컬스토리지 저장
        setMemberInfo({
            password: "",
            passwordCheck: "",
        }) //인풋 클리어
        setNewPasswd("") //인풋 클리어
        window.sessionStorage.removeItem("logined") //로그인 해제
        window.location.href = "/" // 홈화면이동
    }
    return (
        <>
            <MypageNavbar />
            <Container style={{
                color: `${isDark ? themes.dark.color : themes.light.color}`,
                backgroundColor: `${isDark ? themes.dark.bgColor : themes.light.bgColor}`
            }}>
                <EditTitle>댕냥 빌리지 비밀번호 변경</EditTitle>
                <InputForm>
                    <InputTitle>새 비밀번호</InputTitle>

                    <InputGroup className="inputGroup">
                        <Form.Control
                            placeholder="********"
                            required
                            type="password"
                            value={newPasswd}
                            name="newPasswd"
                            onChange={onNewChange}
                            onKeyUpCapture={() => { isPassword(newPasswd) }}
                        />
                    </InputGroup>
                    {
                        newPasswd.length === 0 ? null :
                            !passwdCheck
                                ?
                                <p className="warning">영문, 숫자, 특수문자로 이루어진 8자리 이상이여야 합니다.</p>
                                : <p className="pass">사용가능한 비밀번호입니다.</p>

                    }
                    <InputTitle>새 비밀번호 확인</InputTitle>
                    <InputGroup className="inputGroup">
                        <Form.Control
                            placeholder="********"
                            required
                            type="password"
                            value={passwordCheck}
                            name="passwordCheck"
                            onChange={onChange}
                        />
                    </InputGroup>
                    {
                        passwordCheck.length === 0 ? null :
                            passwordCheck !== '' && isSame ?
                                <p className="pass">비밀번호가 일치합니다.</p>
                                :
                                <p className="warning">비밀번호가 일치하지 않습니다.</p>

                    }
                </InputForm>
                {
                    isValid ?
                        <button id="joinBtn" type="submit" onClick={handleSubmit}>
                            비밀번호 변경
                        </button>
                        : <OverlayTrigger overlay={<Tooltip id="tooltip-disabled">변경 정보가 유효하지 않습니다.</Tooltip>}>
                            <span className="d-inline-block">
                                <Button id="joinBtn" disabled style={{ pointerEvents: 'none' }}>
                                    비밀번호 변경
                                </Button>
                            </span>
                        </OverlayTrigger>
                }
            </Container>
        </>
    );
}

export default ChangePasswd;
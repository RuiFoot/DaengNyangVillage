import styled from "styled-components";
import Bumper from "../layout/Bumper";
import { useState } from "react";
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';
import Button from 'react-bootstrap/Button';

const MypageNav = styled.div`
border-bottom: 1px solid rgba(0, 0, 0, 0.5);
display: flex;
flex-direction: row;
justify-content: space-evenly;
align-items: center;
`
const NavItems = styled.a`
padding: 10px;
text-decoration: none;
color: black;
&:hover {
    color: #F2884B;
}
`
const Container = styled.div`
margin: 0 6vw;
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
width: 432px;
`

const InputTitle = styled.div`
margin: 15px 0 10px 0;
`

function ChangePasswd() {

    const baseUrl = "http://localhost:8080";
    const pathname = window.location.pathname;
    // 이전 회원 정보
    const previousInfo = JSON.parse(localStorage.getItem("member"))

    const [newPasswd, setNewPasswd] = useState("")

    const onNewChange = (e) => {
        setNewPasswd(e.target.value)
    }

    const [memberInfo, setMemberInfo] = useState({
        email: previousInfo.email,
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

    const isSame = newPasswd === passwordCheck;
    const isValid = isSame === true && newPasswd.length > 7

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
        delete memberInfo.passwordCheck;
        memberInfo.password = newPasswd
        localStorage.setItem("member", JSON.stringify(memberInfo)); // 로컬스토리지 저장
        setMemberInfo({
            password: "",
            passwordCheck: "",
        })
        setNewPasswd("")
        window.sessionStorage.removeItem("logined")
        window.location.href = "/"
    }
    return (
        <>
            <Bumper />
            <MypageNav>
                <NavItems style={{ color: `${pathname === "/Mypage/logined" ? "#F2884B" : "black"}` }} href="/Mypage/logined">
                    내 정보
                </NavItems>
                <NavItems style={{ color: `${pathname === "/ChangePasswd/logined" ? "#F2884B" : "black"}` }} href="/ChangePasswd/logined" >
                    비밀번호 변경
                </NavItems>
                <NavItems style={{ color: `${pathname === "/SelectedLocation/logined" ? "#F2884B" : "black"}` }} href="/SelectedLocation/logined">
                    찜한 장소
                </NavItems>
                <NavItems style={{ color: `${pathname === "/WrittenByMe/logined" ? "#F2884B" : "black"}` }} href="/WrittenByMe/logined">
                    내가 쓴 글
                </NavItems>
            </MypageNav>
            <Container>
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
                        />
                    </InputGroup>
                    {
                        newPasswd.length === 0 ? null :
                            newPasswd.length < 8 && newPasswd.length > 0
                                ?
                                <p className="warning">비밀번호는 8자리 이상이여야합니다.</p>
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
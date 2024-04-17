import Bumper from "../Bumper";
import styled from "styled-components";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';
import Modal from 'react-bootstrap/Modal';
import { useState } from "react";
import './JoinMembershipStyle.css'
import { SHA256 } from 'crypto-js';
import DaumPostcode from "react-daum-postcode";

const Container = styled.div`
margin: 0 6vw;
display: flex;
flex-direction: column;
align-items: center;
`
const InputForm = styled.form`
margin: 15px;
width: 432px;
`
const JoinTitle = styled.div`
margin: 15px 0 0 0;
text-align: center;
font-size: clamp(80%, 5vw, 120%);
`
const InputTitle = styled.div`
margin: 15px 0 10px 0;
`

const CheckBox = styled.input`
margin: 5px;
`
const CheckBoxLabel = styled.label`
margin: 5px;
`
const InputFooter = styled.div`
display: flex;
align-items: center;
justify-content: center;
`

function JoinMembership() {

    //다음 주소 api
    const [show, setShow] = useState(false);
    const [fullAddress, setFullAddress] = useState("주소검색을 이용해주세요")
    const [zonecode, setZonecode] = useState("주소검색을 이용해주세요")
    const handleShow = () => setShow(true);
    const handleClose = () => setShow(false);
    const complete = (data) => {
        setFullAddress(data.address);
        setZonecode(data.zonecode);
        console.log(data)
        setShow(false)
    }



    //회원가입시 받을 값들
    const [memberInfo, setMemberInfo] = useState({
        email: "",
        password: "",
        passwordCheck: "",
        profileImg: "",
        mypet: {},
        nickName: "",
        phoneNumber: "",
        inputAddress: "",
        inputZonecode: "",
        detailedAddress: ""
    })

    const { email, password, passwordCheck, profileImg, mypet, nickName, phoneNumber, inputAddress, inputZonecode, detailedAddress } = memberInfo; // 비구조화 할당

    function onChange(e) {
        const { value, name } = e.target;
        setMemberInfo({
            ...memberInfo,
            [name]: value
        });
    }


    //채크 박스 해제
    const [checked, setChecked] = useState()
    async function handleSubmit(e) {
        e.preventDefault();
        memberInfo.inputAddress = fullAddress
        memberInfo.inputZonecode = zonecode
        memberInfo.password = SHA256(password).toString(); // 비밀번호 보안 해시
        delete memberInfo.passwordCheck;
        console.log(memberInfo)
        localStorage.setItem("member", JSON.stringify(memberInfo)); // 로컬스토리지 저장
        setChecked(false)
        setMemberInfo({
            email: "",
            password: "",
            passwordCheck: "",
            profileImg: "",
            mypet: "",
            nickName: "",
            phoneNumber: "",
            inputAddress: "",
            inputZonecode: "",
            detailedAddress: ""
        })
        window.location.href = '/'
    }


    //유효성 검사
    const [emailCheck, setEmailCheck] = useState()
    const [nickNameCheck, setNickNameCheck] = useState()
    const [numCheck, setNumCheck] = useState()
    const isSame = password === passwordCheck;
    const isValid = email !== '' && password !== '' && isSame === true && emailCheck === true && nickNameCheck === true && numCheck === true

    const isEmail = (input) => {
        if (/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(input)) {
            setEmailCheck(true)
        } else {
            setEmailCheck(false)
        }
    };
    const isNickName = () => {
        if (true) {
            setNickNameCheck(true)
        } else {
            setNickNameCheck(false)
        }
    }
    const isNum = (input) => {
        if (/^[0-9]+$/.test(input) && input.length === 11) {
            setNumCheck(true)
        } else {
            setNumCheck(false)
        }
    };


    return (
        <Container>
            <Bumper />
            <JoinTitle>댕냥 빌리지 회원가입을 환영합니다.</JoinTitle>
            <InputForm>
                <InputTitle>회원아이디(이메일)</InputTitle>
                <InputGroup className="inputGroup">
                    <Form.Control
                        placeholder="1234@village.com"
                        aria-describedby="memberId"
                        required
                        value={email}
                        name="email"
                        onChange={onChange}
                    />
                    <Button className="joinBtns"
                        variant="outline-secondary" id="memberId"
                        onClick={() => isEmail(email)}>
                        중복확인
                    </Button>
                </InputGroup>
                {
                    emailCheck === undefined ?
                        null
                        : emailCheck ?
                            <p className="pass" >사용가능한 이메일입니다.</p>
                            :
                            <p className="warning">사용불가능한 이메일입니다.</p>

                }
                <InputTitle>비밀번호</InputTitle>

                <InputGroup className="inputGroup">
                    <Form.Control
                        placeholder="********"
                        required
                        type="password"
                        value={password}
                        name="password"
                        onChange={onChange}
                    />
                </InputGroup>
                {
                    password.length === 0 ? null :
                        password.length < 8 && password.length > 0
                            ?
                            <p className="warning">비밀번호는 8자리 이상이여야합니다.</p>
                            : <p className="pass">사용가능한 비밀번호입니다.</p>

                }
                <InputTitle>비밀번호 확인</InputTitle>
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
                <InputTitle>프로필 이미지</InputTitle>
                <InputGroup className="inputGroup">
                    <Form.Control value={profileImg || ""}
                        name="profileImg"
                        onChange={onChange} type="file" accept="image/*" />
                </InputGroup>

                <InputTitle>어떤 반려동물과 함께 하십니까?</InputTitle>
                <InputGroup className="inputGroup">

                    <CheckBox
                        id="checkboxDog"
                        type="checkbox"
                        value={memberInfo.mypet = "dog"}
                        name="mypet"
                        onChange={onChange}
                        checked={checked}
                    />
                    <CheckBoxLabel htmlFor="checkboxDog">강아지</CheckBoxLabel>
                </InputGroup>
                <InputGroup className="inputGroup">

                    <CheckBox
                        id="checkboxCat"
                        type="checkbox"
                        value={memberInfo.mypet += "cat"}
                        name="mypet"
                        onChange={onChange}
                        checked={checked}
                    />
                    <CheckBoxLabel htmlFor="checkboxCat">고양이</CheckBoxLabel>
                </InputGroup>
                <InputGroup className="inputGroup">

                    <CheckBox
                        id="checkboxFish"
                        type="checkbox"
                        value={memberInfo.mypet += "fish"}
                        name="mypet"
                        onChange={onChange}
                        checked={checked}
                    />
                    <CheckBoxLabel htmlFor="checkboxFish">관상어</CheckBoxLabel>
                </InputGroup>
                <InputGroup className="inputGroup">

                    <CheckBox
                        id="checkboxEtc"
                        type="checkbox"
                        value={memberInfo.mypet += "etc"}
                        name="mypet"
                        onChange={onChange}
                        checked={checked}
                    />
                    <CheckBoxLabel htmlFor="checkboxEtc">다른 반려동물</CheckBoxLabel>
                </InputGroup>
                <InputTitle>닉네임</InputTitle>
                <InputGroup className="inputGroup">
                    <Form.Control
                        placeholder="닉네임을 입력해주세요"
                        aria-describedby="nickName"
                        required
                        value={nickName}
                        name="nickName"
                        onChange={onChange}
                    />
                    <Button className="joinBtns" variant="outline-secondary" id="nickName"
                        onClick={() => isNickName()}>
                        중복확인
                    </Button>
                </InputGroup>
                {
                    nickNameCheck === undefined ?
                        null
                        :
                        nickNameCheck ?
                            <p className="pass" >사용가능한 닉네임입니다.</p>
                            :
                            <p className="warning">사용불가능한 닉네임입니다.</p>

                }
                <InputTitle>전화번호</InputTitle>
                <InputGroup className="inputGroup">
                    <Form.Control
                        placeholder="01012345678"
                        required
                        type="tel"
                        value={phoneNumber}
                        name="phoneNumber"
                        onChange={onChange}
                        onKeyUpCapture={() => isNum(phoneNumber)}
                    />
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


                <Modal show={show} onHide={handleClose}>
                    <Modal.Body >
                        <DaumPostcode
                            style={{ width: "100%", height: "470px" }}
                            autoClose
                            onComplete={complete} />
                    </Modal.Body>
                </Modal>

                <InputTitle>우편번호</InputTitle>
                <InputGroup className="inputGroup">
                    <Form.Control
                        readOnly // 폼전송가능 입력불가
                        placeholder="주소검색을 사용해주세요"
                        required
                        type="text"
                        value={zonecode}
                        name="inputZonecode"
                        onChange={onChange}
                    />
                    <Button className="joinBtns" onClick={handleShow}>
                        주소검색
                    </Button>
                </InputGroup>
                <InputTitle>주소</InputTitle>
                <InputGroup className="inputGroup">
                    <Form.Control
                        readOnly // 폼전송가능 입력불가
                        placeholder="주소검색을 사용해주세요"
                        required
                        type="text"
                        value={fullAddress}
                        name="inputAddress"
                        onChange={onChange}
                    />
                </InputGroup>
                <InputTitle>상세주소</InputTitle>
                <InputGroup className="inputGroup">
                    <Form.Control
                        placeholder="상세주소를 입력해주세요"
                        required
                        type="text"
                        value={detailedAddress}
                        name="detailedAddress"
                        onChange={onChange}
                    />
                </InputGroup>
                <InputFooter>
                    {
                        isValid ?
                            <button id="joinBtn" type="submit" onClick={handleSubmit}>
                                회원가입
                            </button>
                            : <OverlayTrigger overlay={<Tooltip id="tooltip-disabled">회원가입 정보가 유효하지 않습니다.</Tooltip>}>
                                <span className="d-inline-block">
                                    <Button id="joinBtn" disabled style={{ pointerEvents: 'none' }}>
                                        회원가입
                                    </Button>
                                </span>
                            </OverlayTrigger>
                    }
                </InputFooter>
            </InputForm>

        </Container>
    );
}

export default JoinMembership;
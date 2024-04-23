import styled from "styled-components";
import Bumper from "../layout/Bumper";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';
import Modal from 'react-bootstrap/Modal';
import { useState } from "react";
import './membershipStyle.css'
import DaumPostcode from "react-daum-postcode";
import axios from "axios";

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
const EditTitle = styled.div`
margin: 20px 0 0 0;
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


function Mypage() {
    const baseUrl = "http://localhost:8080";
    const pathname = window.location.pathname;
    // 이전 회원 정보
    let previousInfo = JSON.parse(localStorage.getItem("member"))
    console.log(previousInfo.mypet.search("cat"))
    //다음 주소 api
    const [fullAddress, setFullAddress] = useState(previousInfo.inputAddress)
    const [zonecode, setZonecode] = useState(previousInfo.inputZonecode)
    const [show, setShow] = useState(false);
    const handleShow = () => setShow(true);
    const handleClose = () => setShow(false);
    const complete = (data) => {
        setFullAddress(data.address);
        setZonecode(data.zonecode);
        setShow(false)
    }

    //회원 정보 변경시 받을 값
    // 채크박스 값
    const [checkArr, setCheckArr] = useState([])
    const getCheck = (e) => {
        setCheckArr(prevList => [...prevList, e]); //배열 스테이트 값추가
    }
    const [memberInfo, setMemberInfo] = useState({
        email: previousInfo.email,
        password: previousInfo.password,
        profileImg: "",
        mypet: previousInfo.mypet,
        nickName: previousInfo.nickName,
        phoneNumber: previousInfo.phoneNumber,
        inputAddress: previousInfo.inputAddress,
        inputZonecode: previousInfo.inputZonecode,
        detailedAddress: previousInfo.detailedAddress
    })

    const { profileImg, mypet, nickName, phoneNumber, inputAddress, inputZonecode, detailedAddress } = memberInfo; // 비구조화 할당

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
        memberInfo.mypet = checkArr.join()
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
        localStorage.setItem("member", JSON.stringify(memberInfo)); // 로컬스토리지 저장
        setChecked(false)
        setMemberInfo({
            profileImg: "",
            mypet: "",
            nickName: "",
            phoneNumber: "",
            inputAddress: "",
            inputZonecode: "",
            detailedAddress: ""
        })
        window.location.href = '/Mypage/logined'
    }


    //유효성 검사
    const [nickNameCheck, setNickNameCheck] = useState()
    const [numCheck, setNumCheck] = useState(true)
    const isValid = nickNameCheck === true && numCheck === true


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
                <EditTitle>댕냥 빌리지 회원정보 수정</EditTitle>
                <InputForm>
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
                            value="dog"
                            name="mypet"
                            onChange={(e) => { getCheck(e.target.value) }}
                            checked={previousInfo.mypet.search("dog") === -1 ? checked : true}

                        />
                        <CheckBoxLabel htmlFor="checkboxDog">강아지</CheckBoxLabel>
                    </InputGroup>
                    <InputGroup className="inputGroup">

                        <CheckBox
                            id="checkboxCat"
                            type="checkbox"
                            value="cat"
                            name="mypet"
                            onChange={(e) => { getCheck(e.target.value) }}
                            checked={previousInfo.mypet.search("cat") === -1 ? checked : true}
                        />
                        <CheckBoxLabel htmlFor="checkboxCat">고양이</CheckBoxLabel>
                    </InputGroup>
                    <InputGroup className="inputGroup">

                        <CheckBox
                            id="checkboxFish"
                            type="checkbox"
                            value="fish"
                            name="mypet"
                            onChange={(e) => { getCheck(e.target.value) }}
                            checked={previousInfo.mypet.search("fish") === -1 ? checked : true}
                        />
                        <CheckBoxLabel htmlFor="checkboxFish">관상어</CheckBoxLabel>
                    </InputGroup>
                    <InputGroup className="inputGroup">

                        <CheckBox
                            id="checkboxEtc"
                            type="checkbox"
                            value="etc"
                            name="mypet"
                            onChange={(e) => { getCheck(e.target.value) }}
                            checked={previousInfo.mypet.search("etc") === -1 ? checked : true}
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
                        <Button className="btns" variant="outline-secondary" id="nickName"
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
                        <Button className="btns" onClick={handleShow}>
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
                                    회원 정보 수정
                                </button>
                                : <OverlayTrigger overlay={<Tooltip id="tooltip-disabled">회원 정보가 유효하지 않습니다.</Tooltip>}>
                                    <span className="d-inline-block">
                                        <Button id="joinBtn" disabled style={{ pointerEvents: 'none' }}>
                                            회원 정보 수정
                                        </Button>
                                    </span>
                                </OverlayTrigger>
                        }
                    </InputFooter>
                </InputForm>


            </Container>
        </>
    );
}

export default Mypage;
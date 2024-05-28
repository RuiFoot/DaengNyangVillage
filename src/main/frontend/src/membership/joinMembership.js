import Bumper from "../layout/bumper";
import styled from "styled-components";
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
import { useRecoilValue } from 'recoil';
import { isDarkAtom } from '../components/atoms';
import themes from "../components/theme";
import useUploadImage from "./useUploadImage";
import { deleteObject, ref } from "firebase/storage";
import { storage } from "../servers/firebase";
import defaultImg from '../img/defaultImg.png';


const Container = styled.div`
display: flex;
flex-direction: column;
align-items: center;
`
const InputForm = styled.form`
gap: 10px;
margin: 15px;
width: 350px;
`
const JoinTitle = styled.div`
margin: 15px 0 0 0;
text-align: center;
font-size: clamp(80%, 5vw, 120%);
`
const InputTitle = styled.div`
margin: 40px 0 10px 0;
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
const ProfileImgBox = styled.div`
margin: 10px;
display: flex;
justify-content: center;
align-items: center;
`
const ProfileImgCheck = styled.div`
height: 200px;
width: 200px;
background-position: center;
background-size: cover;
`

function JoinMembership() {
    //다크모드
    const isDark = useRecoilValue(isDarkAtom);
    const switchColor = `${isDark ? themes.dark.color : themes.light.color}`
    const switchBgColor = `${isDark ? themes.dark.bgColor : themes.light.bgColor}`
    const baseUrl = "http://localhost:8080";

    //다음 주소 api
    const [show, setShow] = useState(false);
    const [fullAddress, setFullAddress] = useState("주소검색을 이용해주세요")
    const [zonecode, setZonecode] = useState("주소검색을 이용해주세요")
    const handleShow = () => setShow(true);
    const handleClose = () => setShow(false);
    const complete = (data) => {
        setFullAddress(data.address);
        setZonecode(data.zonecode);
        setShow(false)
    }

    //회원가입시 받을 값들
    // 채크박스 값
    const [checkArr, setCheckArr] = useState([])
    const getCheck = (e) => {
        setCheckArr(prevList => [...prevList, e]); //배열 스테이트 값추가
    }
    const [memberInfo, setMemberInfo] = useState({
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

    const { email, password, passwordCheck, profileImg, nickName, phoneNumber, detailedAddress } = memberInfo; // 비구조화 할당

    function onChange(e) {
        const { value, name } = e.target;
        setMemberInfo({
            ...memberInfo,
            [name]: value
        });
    }


    //채크 박스 해제
    const [checked, setChecked] = useState()

    //입력받은 값 전송
    function handleSubmit(e) {
        console.log(imageUrl)
        e.preventDefault();
        // console.log("이미지 널확인2");		//정상 통신 후 응답된 메시지 출력
        // console.log(imageUrl);		//정상 통신 후 응답된 메시지 출력
        let body = {
            email: memberInfo.email,
            password: memberInfo.password,
            nickname: memberInfo.nickName,
            profileImg: imageUrl === "" ? defaultImg : imageUrl,
            address: fullAddress,
            addressDetail: memberInfo.detailedAddress,
            favoritePet: checkArr.join(", "),
            phoneNumber: memberInfo.phoneNumber,
            inputZonecode: zonecode
        }
        axios.post(`${baseUrl}/member/signup`, body
        ).then((response) => {
            console.log(response.data);		//정상 통신 후 응답된 메시지 출력
        }).catch((error) => {
            console.log(error);				//오류발생시 실행
        })
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
        // console.log(body)
        window.location.href = '/'
    }


    //유효성 검사
    const [emailCheck, setEmailCheck] = useState()
    const [passwdCheck, setPasswdCheck] = useState()
    const [numCheck, setNumCheck] = useState()
    const [isDuplicationE, setIsDuplicationE] = useState()
    const [isDuplicationN, setIsDuplicationN] = useState()
    const isSame = password === passwordCheck;
    const isValid = email !== '' && password !== '' && emailCheck === true && passwdCheck === true && isSame === true && emailCheck === true && isDuplicationN === false && numCheck === true && isDuplicationE === false

    const isEmail = (input) => {
        if (/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(input)) {
            setEmailCheck(true)
        } else {
            setEmailCheck(false)
        }
    };

    const isPassword = (input) => {
        if (/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/.test(input)) {
            setPasswdCheck(true)
        } else {
            setPasswdCheck(false)
        }

    }
    const emailDuplicationCheck = (input) => {
        axios.get(`${baseUrl}/member/duplicationE?email=${input}`)
            .then((res) => {
                setIsDuplicationE(res.data);
                // console.log(isDuplicationE)
            })
    }
    const isNickName = (input) => {
        axios.get(`${baseUrl}/member/duplicationN?nickname=${input}`)
            .then((res) => {
                setIsDuplicationN(res.data);
            })
    }
    const isNum = (input) => {
        if (/^[0-9]+$/.test(input) && input.length === 11) {
            setNumCheck(true)
        } else {
            setNumCheck(false)
        }
    };

    //이미지 업로드
    const [imageUrl, setImageUrl] = useState("");
    const [file, setFile] = useState(null);
    const [isLoding, setIsLoding] = useState()
    const [clickUpload, setClickUpload] = useState(false)

    const uploadImage = useUploadImage();

    const onSubmit = async (e) => {
        e.preventDefault();
        // console.log(file);
        setIsLoding(false)
        if (file) {
            const downloadUrl = await uploadImage(file);
            // console.log(downloadUrl);
            setImageUrl(downloadUrl);
            // console.log("이미지가 널일때 확인");
            // console.log(downloadUrl);
            setIsLoding(true)
            // console.log("받기완료");
        }
    };

    const imageHandler = async (e) => {
        const files = e.target.files;
        if (!files) return null;
        setFile(files[0]);
        setClickUpload(true)
    };


    const imgReset = async () => {
        deleteObject(ref(storage, imageUrl));
        // console.log(file)
        setImageUrl("")
        setClickUpload(false)
        setIsLoding()
        setFile(null)
    }

    return (
        <Container style={{
            color: switchColor,
            backgroundColor: switchBgColor
        }}>
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
                        onKeyUpCapture={() => { isEmail(email) }}
                    />
                    {
                        emailCheck ?
                            <Button className="btns"
                                variant="outline-secondary" id="memberId"
                                onClick={() => { emailDuplicationCheck(email) }}>
                                중복확인
                            </Button>
                            :
                            <OverlayTrigger overlay={<Tooltip id="tooltip-disabled">이메일 입력값을 확인해주세요.</Tooltip>}>
                                <span className="d-inline-block">
                                    <Button className="btns" disabled style={{ pointerEvents: 'none' }}
                                        variant="outline-secondary" id="memberId"
                                        onClick={() => { emailDuplicationCheck(email) }}
                                    >
                                        중복확인
                                    </Button>
                                </span>
                            </OverlayTrigger>
                    }
                </InputGroup>
                {
                    emailCheck === undefined ?
                        null
                        : emailCheck ?
                            <>

                                {isDuplicationE === undefined ?
                                    <p className="warning">중복 확인을 해주세요</p>
                                    :
                                    <>
                                        {
                                            isDuplicationE ?
                                                <p className="warning" >이미 사용중인 이메일입니다</p>
                                                :
                                                <p className="pass" >중복 확인 완료 사용가능한 이메일입니다</p>
                                        }
                                    </>
                                }
                            </>
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
                        onKeyUpCapture={() => { isPassword(password) }}
                    />
                </InputGroup>
                {
                    password.length === 0 ? null :
                        !passwdCheck
                            ?
                            <p className="warning">영문, 숫자, 특수문자로 이루어진 8자리 이상이여야 합니다.</p>
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
                    {
                        !clickUpload && isLoding === undefined ?
                            <>
                                <Form.Control value={profileImg || ""}
                                    name="profileImg"
                                    onChange={imageHandler} type="file" accept="image/*" />
                                <Button className="btns"
                                    variant="outline-secondary"
                                    onClick={onSubmit}>
                                    업로드
                                </Button>
                            </>
                            :
                            <>
                                {isLoding ?
                                    <Button className="btns"
                                        variant="outline-secondary"
                                        onClick={imgReset}
                                        style={{ width: "100%" }}>
                                        다른 이미지 업로드
                                    </Button>
                                    : <Button className="btns"
                                        variant="outline-secondary"
                                        onClick={onSubmit}
                                        style={{ width: "100%" }}>
                                        업로드
                                    </Button>
                                }
                            </>


                    }

                </InputGroup>
                {
                    !clickUpload && isLoding === undefined
                        ?
                        null
                        :
                        <>
                            {isLoding ?
                                <ProfileImgBox>
                                    <ProfileImgCheck style={{ backgroundImage: `url(${imageUrl})` }}></ProfileImgCheck>
                                </ProfileImgBox>
                                :
                                <p className="warning">업로드를 클릭해주세요</p>
                            }
                        </>
                }
                <InputTitle>어떤 반려동물과 함께 하십니까?</InputTitle>
                <InputGroup className="inputGroup">
                    <CheckBox
                        id="checkboxDog"
                        type="checkbox"
                        value="강아지"
                        name="mypet"
                        onChange={(e) => { getCheck(e.target.value) }}
                        checked={checked}
                    />
                    <CheckBoxLabel htmlFor="checkboxDog">강아지</CheckBoxLabel>
                </InputGroup>
                <InputGroup className="inputGroup">
                    <CheckBox
                        id="checkboxCat"
                        type="checkbox"
                        value="고양이"
                        name="mypet"
                        onChange={(e) => { getCheck(e.target.value) }}
                        checked={checked}
                    />
                    <CheckBoxLabel htmlFor="checkboxCat">고양이</CheckBoxLabel>
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
                        onClick={() => isNickName(nickName)}>
                        중복확인
                    </Button>
                </InputGroup>
                {
                    isDuplicationN === undefined ?
                        null
                        :
                        !isDuplicationN ?
                            <>
                                {
                                    nickName.length > 0 ?
                                        <p className="pass" >사용가능한 닉네임입니다.</p>
                                        :
                                        <p className="warning">닉네임은 한 글자 이상이여야 합니다.</p>
                                }
                            </>
                            :
                            <p className="warning">이미 사용중인 닉네임입니다.</p>
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
                                회원가입
                            </button>
                            : <OverlayTrigger overlay={<Tooltip id="tooltip-disabled">회원가입 정보가 유효하지 않습니다.</Tooltip>}>
                                <span className="d-inline-block">
                                    <Button id="joinBtn" disabled style={{ marginTop: "30px", pointerEvents: 'none' }}>
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
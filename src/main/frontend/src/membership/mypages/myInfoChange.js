import styled from "styled-components";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';
import Modal from 'react-bootstrap/Modal';
import { useEffect, useState } from "react";
import '../membershipStyle.css'
import DaumPostcode from "react-daum-postcode";
import axios from "axios";
import MypageNavbar from './mypageNavbar';
import { useRecoilValue } from 'recoil';
import { isDarkAtom } from '../../components/atoms';
import themes from "../../components/theme";
import useUploadImage from "../useUploadImage";
import { deleteObject, ref } from "firebase/storage";
import { storage } from "../../servers/firebase";

const Container = styled.div`
display: flex;
flex-direction: column;
align-items: center;
`
const InputForm = styled.form`
margin: 15px;
width: 380px;
`
const EditTitle = styled.div`
margin: 20px 0 0 0;
text-align: center;
font-size: clamp(80%, 5vw, 120%);
`
const InputTitle = styled.div`
margin: 35px 0 10px 0;
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
const PreImgBox = styled.div`
margin: 10px;
display: flex;
flex-direction: column;
justify-content: center;
align-items: center;
`
const PreImgTitle = styled.div`
margin-bottom: 5px;
`
const PreImg = styled.div`
height: 200px;
width: 200px;
background-position: center;
background-size: cover;
border-radius: 40px;
`
function MyInfoChange() {
    //다크모드
    const isDark = useRecoilValue(isDarkAtom);
    const switchColor = `${isDark ? themes.dark.color : themes.light.color}`
    const switchBgColor = `${isDark ? themes.dark.bgColor : themes.light.bgColor}`
    // baseUrl 스프링 부트 연동, pathname 현재 주소
    const baseUrl = "http://localhost:8080";
    // 이전 회원 정보
    let previousInfo = JSON.parse(sessionStorage.getItem("logined"))
    console.log(previousInfo)
    const previousImg = `${previousInfo.profileImg}`
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
    const [memberInfo, setMemberInfo] = useState({
        email: previousInfo.email,
        password: previousInfo.password,
        profileImg: "",
        memberNo: previousInfo.memberNo,
        mypet: previousInfo.mypet,
        nickName: previousInfo.nickName,
        phoneNumber: previousInfo.phoneNumber,
        inputAddress: previousInfo.inputAddress,
        inputZonecode: previousInfo.inputZonecode,
        detailedAddress: previousInfo.detailedAddress
    })

    const { profileImg, nickName, phoneNumber, detailedAddress } = memberInfo; // 비구조화 할당

    function onChange(e) {
        const { value, name } = e.target;
        setMemberInfo({
            ...memberInfo,
            [name]: value
        });
    }
    // 채크박스 값
    const [checkArr, setCheckArr] = useState([])
    const [catCheck, setCatCheck] = useState()
    const [dogCheck, setDogCheck] = useState()
    useEffect(() => {
        if (memberInfo.mypet !== null) {
            // console.log(memberInfo.mypet)
            memberInfo.mypet.indexOf("강아지") !== -1 ? setDogCheck(true) : setDogCheck(false)
            memberInfo.mypet.indexOf("강아지") !== -1 && checkArr.push("강아지")
            memberInfo.mypet.indexOf("고양이") !== -1 ? setCatCheck(true) : setCatCheck(false)
            memberInfo.mypet.indexOf("고양이") !== -1 && checkArr.push("고양이")
        }
    }, []);
    const getCheck = (e) => {
        if (e === "강아지") {
            setDogCheck(!dogCheck)
            if (!dogCheck) {
                setCheckArr(prevList => [...prevList, e]); //배열 스테이트 값추가
            } else {
                checkArr.splice(checkArr.indexOf(e), 1)
            }
        } else {
            setCatCheck(!catCheck)
            if (!catCheck) {
                setCheckArr(prevList => [...prevList, e]); //배열 스테이트 값추가
            } else {
                checkArr.splice(checkArr.indexOf(e), 1)
            }
        }
    }
    //채크 박스 해제
    const [checked, setChecked] = useState()

    //입력 받은 값 전송
    async function handleSubmit(e) {
        if (imageUrl === "") {
            setImageUrl(previousImg)
        }
        e.preventDefault();
        let body = {
            nickName: memberInfo.nickName,
            memberNo: memberInfo.memberNo,
            profileImg: imageUrl === "" ? previousImg : imageUrl,
            inputAddress: memberInfo.inputAddress === null ? fullAddress : memberInfo.inputAddress,
            detailedAddress: memberInfo.detailedAddress,
            mypet: checkArr.join(", "),
            phoneNumber: memberInfo.phoneNumber,
            inputZonecode: zonecode
        }
        axios.patch(`/api/member/update`, body
        ).then((response) => {
            // console.log(body);
            console.log(response.data);		//정상 통신 후 응답된 메시지 출력
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
            window.location.href = `/my-info/${nickName}`
        }).catch((error) => {
            console.log(error);				//오류발생시 실행
        })
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

    //이미지 업로드
    const [imageUrl, setImageUrl] = useState(`${profileImg}`);
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
            setIsLoding(true)
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
        <>
            <MypageNavbar />
            <Container style={{
                color: switchColor,
                backgroundColor: switchBgColor
            }}>
                <EditTitle>댕냥 빌리지 회원정보 수정</EditTitle>
                <InputForm>
                    <InputTitle>프로필 이미지</InputTitle>
                    <PreImgBox>
                        <PreImgTitle>이전 프로필 이미지</PreImgTitle>
                        <PreImg style={{ backgroundImage: `url(${previousImg})` }} />
                    </PreImgBox>
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
                            checked={dogCheck}
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
                            checked={catCheck}
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
                        phoneNumber !== null &&
                            phoneNumber.length < 1 ?
                            null
                            :
                            numCheck && phoneNumber !== null && phoneNumber.length > 1 ?
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
                                <Button style={{
                                    marginTop: "20px",
                                    color: switchColor,
                                    backgroundColor: switchBgColor
                                }} className="changBtn" type="submit" onClick={handleSubmit}>
                                    회원 정보 수정
                                </Button>
                                : <OverlayTrigger overlay={<Tooltip id="tooltip-disabled">회원 정보가 유효하지 않습니다.</Tooltip>}>
                                    <span className="d-inline-block">
                                        <Button className="changBtn" disabled style={{
                                            marginTop: "20px",
                                            pointerEvents: 'none', color: switchColor,
                                            backgroundColor: switchBgColor
                                        }}>
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

export default MyInfoChange;
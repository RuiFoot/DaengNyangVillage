import { useRecoilValue } from 'recoil';
import { isDarkAtom } from '../components/atoms';
import styled from "styled-components";
import themes from "../components/theme";
import Bumper from '../layout/bumper';
import ReactQuill, { Quill } from "react-quill";
import { ImageActions } from '@xeger/quill-image-actions';
import { ImageFormats } from '@xeger/quill-image-formats';
import "react-quill/dist/quill.snow.css";
import { useEffect, useState, useRef, useMemo } from 'react';
import Dropdown from 'react-bootstrap/Dropdown';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Button from 'react-bootstrap/Button';
import './communityStyle.css'
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';
import { storage } from "../servers/firebase";
import { uploadBytes, getDownloadURL, ref } from "firebase/storage";
import axios from "axios";

const Container = styled.div`
`
const InputForm = styled.div`
min-height: calc(100vh - 159px);
margin: 0 6vw;
`
const Dropdowns = styled.div`
display: flex;
margin: 15px 0;
`
const Inputs = styled.div`
margin: 15px 0;
`
const InputFooter = styled.div`
display: flex;
justify-content: end;
`
const WriteBtn = styled.div`
padding: 0 10px;
text-align: center;
cursor: pointer;
&:hover {
    border-bottom: 1px solid  #F288CD;
}
`
//이미지 사이즈 변경
Quill.register('modules/imageActions', ImageActions);
Quill.register('modules/imageFormats', ImageFormats);

function Write() {
    //다크모드
    const isDark = useRecoilValue(isDarkAtom);
    const switchColor = `${isDark ? themes.dark.color : themes.light.color}`
    const switchBgColor = `${isDark ? themes.dark.bgColor : themes.light.bgColor}`
    const [imageUrl, setImageUrl] = useState([]); // 새로운 상태 추가
    const baseUrl = "http://localhost:8080";
    // 배포용 URL
    const quillRef = useRef(null); // useRef로 ref 생성

    // 이미지 핸들러
    const imageHandler = () => {
        const input = document.createElement("input");
        input.setAttribute("type", "file");
        input.setAttribute("accept", "image/*");
        input.click();
        input.addEventListener("change", async () => {
            const editor = quillRef.current.getEditor();
            const file = input.files[0];
            const range = editor.getSelection(true);
            try {
                // 파일명을 "image/Date.now()"로 저장
                const storageRef = ref(
                    storage,
                    `image/${Date.now()}`
                );
                // Firebase Method : uploadBytes, getDownloadURL
                await uploadBytes(storageRef, file).then((snapshot) => {
                    getDownloadURL(snapshot.ref).then((url) => {
                        // 이미지 URL 에디터에 삽입
                        editor.insertEmbed(range.index, "image", url);
                        // URL 삽입 후 커서를 이미지 뒷 칸으로 이동
                        editor.setSelection(range.index + 1);
                        // console.log('url 확인', url);
                        imageUrl.push(url);
                    });
                });

            } catch (error) {
                console.log(error);
            }
        });
    };
    const [quillValue, setQuillValue] = useState("");
    const modules = useMemo(() => {
        return {
            imageActions: {},
            imageFormats: {},
            toolbar: {
                container: [
                    [{ header: [1, 2, false] }],
                    ["bold", "italic", "underline", "strike", "blockquote"],
                    [
                        { list: "ordered" },
                        { list: "bullet" },
                        { indent: "-1" },
                        { indent: "+1" },
                    ],
                    ["link", "image"],
                    [{ align: [] }, { color: [] }, { background: [] }], // dropdown with defaults from theme
                    ["clean"],
                ],
                handlers: {
                    // 이미지 처리는 우리가 직접 imageHandler라는 함수로 처리할 것이다.
                    image: imageHandler,
                },
                ImageResize: { //이미지 사이즈 변경
                    modules: ['Resize']
                }
            }
        }
    }, [])

    const formats = [
        "header",
        "bold",
        "italic",
        "underline",
        "strike",
        "blockquote",
        "list",
        "bullet",
        "indent",
        "link",
        "image",
        "align",
        "color",
        "background",
        'float',
        'height',
        'width'
    ];
    const userInfo = JSON.parse(window.sessionStorage.getItem("logined"))

    let referrer = document.referrer; //이전 페이지 url
    const [board, setBoard] = useState()
    const [area, setArea] = useState("지역을 입력해주세요")
    const [preface, setPreface] = useState("머릿말을 선택해주세요")
    const [values, setValues] = useState({
        boardName: "",
        detailLocation: "",
        tradeTime: "",
        price: ""
    })

    const { boardName, detailLocation, tradeTime, price } = values; // 비구조화 할당

    function onChange(e) {
        const { value, name } = e.target;
        setValues({
            ...values,
            [name]: value
        });
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        let body = {
            tradeTime: tradeTime,
            detailLocation: detailLocation,
            preface: preface,
            price: price,
            area: area,
            nickname: userInfo.nickName,
            memberNo: userInfo.memberNo,
            category: board,
            field: quillValue,
            imgPath: imageUrl.join(", "),
            boardId: 0,
            boardName: values.boardName
        }
        axios.post(`${baseUrl}/board`, body
        ).then((response) => {
            // console.log(preface);	//정상 통신 후 응답된 메시지 출력
            // console.log(response.data);	//정상 통신 후 응답된 메시지 출력
            if (board === "자유 게시판") {
                window.location.href = `/free-board/${userInfo.nickName}`
            } else if (board === "반려동물 자랑") {
                window.location.href = `/pet-boast/${userInfo.nickName}`
            } else if (board === "훈련 방법 공유") {
                window.location.href = `/training-method/${userInfo.nickName}`
            } else if (board === "댕냥 마켓") {
                window.location.href = `/used-market/${userInfo.nickName}`
            }
        }).catch((error) => {
            console.log(error);	//오류발생시 실행
        })
        setQuillValue("")
        setValues({
            nickname: userInfo.nickName,
            memberNo: "",
            category: board,
            area: "",
            boardName: "",
            detailLocation: "",
            tradeTime: "",
            price: "",
            imgPath: "",
            field: quillValue
        })
    }

    useEffect(() => {
        if (referrer.includes("free")) {
            setBoard("자유 게시판")
        } else if (referrer.includes("boast")) {
            setBoard("반려동물 자랑")
        } else if (referrer.includes("training")) {
            setBoard("훈련 방법 공유")
        } else if (referrer.includes("market")) {
            setBoard("댕냥 마켓")
        }
    }, [])

    const boardBtn = (input) => {
        setBoard(input)
    }
    const areaBtn = (input) => {
        setArea(input)
        // console.log(area)
    }
    const prefaceBtn = (input) => {
        setPreface(input)
        // console.log(preface)
    }

    return (
        <Container style={{
            color: switchColor,
            backgroundColor: switchBgColor
        }}>
            <Bumper />
            <InputForm>
                <Dropdowns >
                    <Dropdown style={{ marginRight: "10px" }}>
                        <Dropdown.Toggle style={{
                            color: switchColor,
                            backgroundColor: switchBgColor
                        }} id="dropdown-basic"
                            className='headerBtn'>
                            {board}
                        </Dropdown.Toggle>
                        <Dropdown.Menu>
                            <Dropdown.Item onClick={() => boardBtn("자유 게시판")}>자유 게시판</Dropdown.Item>
                            <Dropdown.Item onClick={() => boardBtn("반려동물 자랑")}>반려동물 자랑</Dropdown.Item>
                            <Dropdown.Item onClick={() => boardBtn("훈련 방법 공유")}>훈련 방법 공유</Dropdown.Item>
                            <Dropdown.Item onClick={() => boardBtn("댕냥 마켓")}>댕냥 마켓</Dropdown.Item>
                        </Dropdown.Menu>
                    </Dropdown>
                    {
                        board === "자유 게시판" ?
                            <Dropdown>
                                <Dropdown.Toggle style={{
                                    color: switchColor,
                                    backgroundColor: switchBgColor
                                }} id="dropdown-basic"
                                    className='headerBtn'>
                                    {preface}
                                </Dropdown.Toggle>
                                <Dropdown.Menu>
                                    <Dropdown.Item onClick={() => prefaceBtn("잡담")}>잡담</Dropdown.Item>
                                    <Dropdown.Item onClick={() => prefaceBtn("할인정보")}>할인정보</Dropdown.Item>
                                    <Dropdown.Item onClick={() => prefaceBtn("유머")}>유머</Dropdown.Item>
                                </Dropdown.Menu>
                            </Dropdown>
                            : board === "훈련 방법 공유" ?
                                <Dropdown>
                                    <Dropdown.Toggle style={{
                                        color: switchColor,
                                        backgroundColor: switchBgColor
                                    }} id="dropdown-basic"
                                        className='headerBtn'>
                                        {preface}
                                    </Dropdown.Toggle>
                                    <Dropdown.Menu>
                                        <Dropdown.Item onClick={() => prefaceBtn("강아지")}>강아지</Dropdown.Item>
                                        <Dropdown.Item onClick={() => prefaceBtn("고양이")}>고양이</Dropdown.Item>
                                        <Dropdown.Item onClick={() => prefaceBtn("다른 반려동물")}>다른 반려동물</Dropdown.Item>
                                    </Dropdown.Menu>
                                </Dropdown>
                                : board === "댕냥 마켓" ?
                                    <Dropdown>
                                        <Dropdown.Toggle style={{
                                            color: switchColor,
                                            backgroundColor: switchBgColor
                                        }} id="dropdown-basic"
                                            className='headerBtn'>
                                            {preface}
                                        </Dropdown.Toggle>
                                        <Dropdown.Menu>
                                            <Dropdown.Item onClick={() => prefaceBtn("팝니다")}>팝니다</Dropdown.Item>
                                            <Dropdown.Item onClick={() => prefaceBtn("삽니다")}>삽니다</Dropdown.Item>
                                        </Dropdown.Menu>
                                    </Dropdown>
                                    : null
                    }
                    {
                        board === "댕냥 마켓" &&
                        <Dropdown>
                            <Dropdown.Toggle style={{
                                marginLeft: "10px",
                                color: switchColor,
                                backgroundColor: switchBgColor
                            }} id="dropdown-basic"
                                className='headerBtn'>
                                {area}
                            </Dropdown.Toggle>
                            <Dropdown.Menu>
                                <Dropdown.Item onClick={() => areaBtn("경기도")}>경기도</Dropdown.Item>
                                <Dropdown.Item onClick={() => areaBtn("강원도")}>강원도</Dropdown.Item>
                                <Dropdown.Item onClick={() => areaBtn("충청북도")}>충청북도</Dropdown.Item>
                                <Dropdown.Item onClick={() => areaBtn("충청남도")}>충청남도</Dropdown.Item>
                                <Dropdown.Item onClick={() => areaBtn("전라북도")}>전라북도</Dropdown.Item>
                                <Dropdown.Item onClick={() => areaBtn("전라남도")}>전라남도</Dropdown.Item>
                                <Dropdown.Item onClick={() => areaBtn("경상북도")}>경상북도</Dropdown.Item>
                                <Dropdown.Item onClick={() => areaBtn("경상남도")}>경상남도</Dropdown.Item>
                                <Dropdown.Item onClick={() => areaBtn("제주도")}>제주도</Dropdown.Item>
                            </Dropdown.Menu>
                        </Dropdown>
                    }
                </Dropdowns>
                <Inputs>
                    <InputGroup className="mb-3">
                        <Form.Control
                            onChange={onChange}
                            placeholder='글 제목을 입력해주세요'
                            name='boardName'
                            value={boardName}
                        />
                    </InputGroup>
                    {
                        board === "댕냥 마켓" ?
                            <>
                                <InputGroup className="mb-3">
                                    <Form.Control
                                        onChange={onChange}
                                        placeholder='상세 거래 장소를 입력해주세요'
                                        name='detailLocation'
                                        value={detailLocation}
                                    />
                                </InputGroup>
                                <InputGroup className="mb-3">
                                    <Form.Control
                                        onChange={onChange}
                                        placeholder='가격을 입력해주세요'
                                        name='price'
                                        value={price}
                                    />
                                </InputGroup>
                                <InputGroup className="mb-3">
                                    <Form.Control
                                        onChange={onChange}
                                        placeholder='거래 가능 시간을 입력해주세요'
                                        name='tradeTime'
                                        value={tradeTime}
                                    />
                                </InputGroup>
                            </>
                            : null
                    }
                </Inputs>
                <div style={{ minHeight: "450px", height: "fit-content" }}>
                    <ReactQuill
                        theme="snow"
                        ref={quillRef}
                        modules={modules}
                        formats={formats}
                        value={quillValue || ""}
                        style={{ minHeight: "400px" }}
                        onChange={setQuillValue}
                    />
                </div>
                {/* 폼길이 조정 */}
                {
                    board === "반려동물 자랑" ? quillValue.length > 0 && boardName.length > 0 ?
                        <InputFooter>
                            <WriteBtn style={{
                                margin: "10px 0",
                                color: switchColor,
                                backgroundColor: switchBgColor
                            }}
                                onClick={handleSubmit}
                            >등  록</WriteBtn>
                        </InputFooter>
                        :
                        <InputFooter>
                            <OverlayTrigger overlay={<Tooltip id="tooltip-disabled">제목, 내용을 입력해주세요</Tooltip>}>
                                <span className="d-inline-block">
                                    <WriteBtn disabled style={{ margin: "10px 0", backgroundColor: switchBgColor, pointerEvents: 'none' }}>
                                        등  록
                                    </WriteBtn>
                                </span>
                            </OverlayTrigger>
                        </InputFooter>
                        : quillValue.length > 0 && preface !== "머릿말을 선택해주세요" && boardName.length > 0 && board.length > 0 ?
                            <InputFooter>
                                <WriteBtn style={{
                                    margin: "10px 0",
                                    color: switchColor,
                                    backgroundColor: switchBgColor
                                }}
                                    onClick={handleSubmit}
                                >등  록</WriteBtn>
                            </InputFooter>
                            : <InputFooter>
                                <OverlayTrigger overlay={<Tooltip id="tooltip-disabled">제목, 머릿말, 내용을 입력해주세요</Tooltip>}>
                                    <span className="d-inline-block">
                                        <WriteBtn disabled style={{
                                            margin: "10px 0", backgroundColor: switchBgColor,
                                            color: switchColor,
                                            pointerEvents: 'none'
                                        }}>
                                            등  록
                                        </WriteBtn>
                                    </span>
                                </OverlayTrigger>
                            </InputFooter>
                }
            </InputForm>
        </Container >
    );
}

export default Write;
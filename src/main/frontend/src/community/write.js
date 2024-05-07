import { useRecoilValue } from 'recoil';
import { isDarkAtom } from '../atoms';
import styled from "styled-components";
import themes from "../theme";
import Bumper from '../layout/bumper';
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { useEffect, useState, useRef, useMemo } from 'react';
import Dropdown from 'react-bootstrap/Dropdown';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Button from 'react-bootstrap/Button';
import * as DOMPurify from "dompurify";
import './communityStyle.css'
// import QuillImageDropAndPaste from "quill-image-drop-and-paste"; 이미지 드롭
import { storage } from "../firebase";
import { uploadBytes, getDownloadURL, ref } from "firebase/storage";
import axios from "axios";

const Container = styled.div`
`

const InputForm = styled.div`
min-height: calc(100vh - 199px);
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
justify-content: center;
margin: 80px 0 0 0;
`

function Write() {
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
                        console.log('url 확인', url);
                        imageUrl.push(url);
                    });
                });

            } catch (error) {
                console.log(error);
            }
        });
    };

    const isDark = useRecoilValue(isDarkAtom);
    const [quillValue, setQuillValue] = useState("");
    // console.log(quillValue)
    const modules = useMemo(() => {
        return {
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
    ];
    const userNickName = JSON.parse(window.sessionStorage.getItem("logined"))
    // console.log(userNickName.nickName)
    let referrer = document.referrer; //이전 페이지 url
    const [board, setBoard] = useState()
    const [area, setArea] = useState("지역을 입력해주세요")
    const [values, setValues] = useState({
        nickname: userNickName.nickName,
        memberNo: 10,
        category: board,
        area: area,
        boardName: "",
        detailLocation: "",
        tradeTime: "",
        price: "",
        imgPath: "",
        field: quillValue
    })

    const { nickname, memberNo, boardName, detailLocation, tradeTime, price, imgPath, field } = values; // 비구조화 할당

    function onChange(e) {
        const { value, name } = e.target;
        setValues({
            ...values,
            [name]: value
        });
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        values.category = board
        values.area = area
        values.field = quillValue
        values.imgPath = imageUrl
        let body = {
            nickname: userNickName.nickName,
            memberNo: userNickName.memberNo,
            category: board,
            field: quillValue,
            imgPath: imageUrl.join(", "),
            boardId: 0,
            boardName: values.boardName
        }
        axios.post(`${baseUrl}/board`, body
        ).then((response) => {
            console.log(response.data);		//정상 통신 후 응답된 메시지 출력
        }).catch((error) => {
            console.log(error);				//오류발생시 실행
        })
        // localStorage.setItem("write", JSON.stringify(values)); // 로컬스토리지 저장
        setQuillValue("")
        setValues({
            nickname: userNickName.nickName,
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

    //잘나오나 확인용
    let test = JSON.parse(window.localStorage.getItem("write"))
    // console.log(test)
    // console.log(imageUrl)

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

    return (
        <Container style={{
            color: `${isDark ? themes.dark.color : themes.light.color}`,
            backgroundColor: `${isDark ? themes.dark.bgColor : themes.light.bgColor}`
        }}>
            <Bumper />
            <InputForm>
                <Dropdowns >
                    <Dropdown style={{ marginRight: "10px" }}>
                        <Dropdown.Toggle style={{
                            color: `${isDark ? themes.dark.color : themes.light.color}`,
                            backgroundColor: `${isDark ? themes.dark.bgColor : themes.light.bgColor}`
                        }} id="dropdown-basic"
                            className='registerBtns'>
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
                        board === "댕냥 마켓" ?
                            <Dropdown>
                                <Dropdown.Toggle style={{
                                    color: `${isDark ? themes.dark.color : themes.light.color}`,
                                    backgroundColor: `${isDark ? themes.dark.bgColor : themes.light.bgColor}`
                                }} id="dropdown-basic"
                                    className='registerBtns'>
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
                            : null
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
                <ReactQuill
                    theme="snow"
                    ref={quillRef}
                    modules={modules}
                    formats={formats}
                    value={quillValue || ""}
                    style={{ height: "400px" }}
                    onChange={setQuillValue}
                />
                {/* 폼길이 조정 */}
                <InputFooter>
                    <Button style={{
                        color: `${isDark ? themes.dark.color : themes.light.color}`,
                        backgroundColor: `${isDark ? themes.dark.bgColor : themes.light.bgColor}`,
                        marginBottom: "20px"
                    }} className='registerBtns'
                        onClick={handleSubmit}
                    >등록</Button>
                </InputFooter>
            </InputForm>
            {
                test !== null ?
                    <>
                        <div>{test.board}</div>
                        <>
                            {
                                test.area === "지역을 입력해주세요" ? null
                                    :
                                    <div>{test.area}</div>
                            }
                        </>
                        <div>{test.boardName}</div>
                        <div>{test.detailLocation}</div>
                        <div>{test.imgPath.join(", ")}</div>
                        <div>{test.price}</div>
                        <div>{test.tradeTime}</div>
                        <div
                            dangerouslySetInnerHTML={{
                                __html: DOMPurify.sanitize(test.field),
                            }}
                            style={{
                                marginTop: '5px',
                                overflow: 'hidden',
                                whiteSpace: 'pre-wrap',
                            }}
                        />
                    </>
                    : null
            }
        </Container >
    );
}

export default Write;
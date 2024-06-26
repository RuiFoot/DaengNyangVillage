import styled from "styled-components";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { useRecoilValue } from 'recoil';
import { isDarkAtom } from '../components/atoms';
import themes from "../components/theme";
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Button from 'react-bootstrap/Button';
import React, { useRef } from "react"
import { GoReply } from "react-icons/go";
import Modal from 'react-bootstrap/Modal';
import { IoIosArrowUp } from "react-icons/io";
import { MdModeEdit } from "react-icons/md";
import { MdDelete } from "react-icons/md";

const ReviewsTitleBox = styled.div`
width: 80vw;
margin: 20px 0 10px 0;
display: flex;
justify-content: start;
border-bottom: 1px solid;
`
const ReviewsTitle = styled.div`
font-size: 20px;
`
const CommentsBox = styled.div`
display: flex;
flex-direction: column;
width: 80vw;
margin: 0 0 10px 0;
`
const CommentsInputs = styled.div`
margin: 20px 10px 0px 10px;
`
const CommentsItems = styled.div`
margin: 25px 10px;
display: flex;
justify-content: center;
padding-bottom: 5px;
border-bottom: 1px solid #D0D0D0;
`
const CommentsRightBox = styled.div`
display: flex;
flex-direction: column;
justify-content: space-between;
width: 100%;
`
const CommentsImg = styled.div`
border-radius: 50%;
height: 50px;
width: 50px;
background-position: center;
background-size: cover;
margin-bottom: 5px;
`
const CommentsLeftBox = styled.div`
display: flex;
flex-direction: column;
justify-content: center;
align-items: center;
margin-right: 20px;
`
const CommentsText = styled.pre`
margin: 0;
`
const CommentsNickName = styled.div`
text-align: center;
`
const Date = styled.div`
height: 28px;
margin: 3px 0;
display: flex;
justify-content: end;
align-items: center;
`
const CommentsDate = styled.div`
`
const ButtonBox = styled.div`
display: flex;
justify-content: end;
`
const EditDeleteBox = styled.div`
margin: 5px 0;
display: flex;
justify-content: space-between;
`
const ReReEditDeleteBox = styled.div`
margin: 3px 0;
display: flex;
justify-content: end;
`
const ReReviewOutBox = styled.div`
display: flex;
align-items: center;
justify-content: end;
`
const ReReviewBox = styled.div`
width: 95%;
`
const Replyd = styled.div`
display: flex;
transform: rotate( 180deg );
margin-right: 10px;
`
const Buttons = styled.div`
display: flex;
align-items: center;
margin-left: 10px;
gap: 10px;
`
const WriteReRe = styled.div`
cursor: pointer;
margin-left: 20px;
&:hover {
    border-bottom: 1px solid #F288CD;
}
`
const BoarderLine = styled.div`
width: 100%;
border-bottom: 1px solid;
margin-bottom: 5px;
`
const ReWriteEditBtn = styled.div`
height: 25px;
cursor: pointer;
margin: 0 0 20px 0;
&:hover {
    border-bottom: 1px solid #F288CD;
}
`
const ReReBtn = styled.div`
height: 25px;
margin-left: 10px;
cursor: pointer;
&:hover {
    border-bottom: 1px solid #F288CD;
}
`
const ReReFooter = styled.div`
display: flex;
justify-content: space-between;
`

function Comments() {
    //스프링연동을 위한 url
    const baseUrl = "http://localhost:8080";
    // 다크모드
    const isDark = useRecoilValue(isDarkAtom);
    const switchColor = `${isDark ? themes.dark.color : themes.light.color}`
    const switchBgColor = `${isDark ? themes.dark.bgColor : themes.light.bgColor}`
    //useParams로 url에 파라미터 값 가져오기
    const params = useParams()
    //현재 로그인한 유저의 정보
    const userInfo = JSON.parse(sessionStorage.getItem("logined"))
    const [getReview, setGetReview] = useState([{}])
    const [getReReview, setGetReReview] = useState([])
    useEffect(() => {
        axios.get(`/api/board/review?boardId=${params.boardId}`)
            .then((res) => {
                setGetReview(res.data);
                console.log(res.data)
                for (let i = 0; i < res.data.length; i++) {
                    axios.get(`/api/board/review/review?boardReviewNum=${res.data[i].boardReviewNum}`)
                        .then((response) => {
                            getReReview.push(...response.data);
                            console.log(response.data)
                        })
                }
            })
    }, []);

    //댓글 입력
    const [review, setReview] = useState("")
    const [reviewId, setReviewId] = useState()
    const uploadReview = () => {
        if (review.length > 0) {
            let body = {
                profileImg: userInfo.profileImg,
                boardReviewNum: 0,
                boardId: params.boardId,
                nickname: userInfo.nickName,
                memberNo: userInfo.memberNo,
                review: review,
                createDate: ""
            }
            axios.post(`${baseUrl}/board/review`, body
            ).then((response) => {
                setReview("")
                // console.log(response.data);	//정상 통신 후 응답된 메시지 출력
                axios.get(`${baseUrl}/board/review?boardId=${params.boardId}`)
                    .then((res) => {
                        setGetReview(res.data);
                        // console.log(res.data)
                    })
            }).catch((error) => {
                // console.log(error);	//오류발생시 실행
            })
        } else {
            alert("내용을 입력해주세요.")
        }
    }
    //댓글 삭제
    const [show, setShow] = useState(false);
    const [taget, setTaget] = useState()
    const [tagetCheck, setTagetCheck] = useState()
    const handleClose = () => setShow(false);
    const handleShow = (e, check) => {
        setShow(true)
        setTaget(e)
        setTagetCheck(check)
    };
    function DeleteModal() {
        return (
            <>
                <Modal show={show} onHide={handleClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>삭제 확인</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>정말 삭제 하시겠습니까?</Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={handleClose}>
                            취소
                        </Button>
                        <Button variant="primary" onClick={tagetCheck === "댓글" ? deleteReview : deleteReReview}>
                            삭제
                        </Button>
                    </Modal.Footer>
                </Modal>
            </>
        );
    }

    const deleteReview = () => {
        axios.delete(`/api/board/review/${taget}`
        ).then(() => {
            axios.get(`/api/board/review?boardId=${params.boardId}`)
                .then((res) => {
                    setGetReview(res.data);
                    setTaget()
                    setShow(false)
                    // console.log(res.data)
                })
        }).catch((error) => {
            // console.log(error);	//오류발생시 실행
        })
    }

    //댓글 수정
    const [edit, setEdit] = useState(false)
    const scrollRef = useRef([]);

    //인풋 창으로 이동
    const handleScrollView = () => {
        scrollRef.input.scrollIntoView({ behavior: "smooth", block: "center" });
    };
    const editReview = (e) => {
        // console.log(e)
        handleScrollView()
        setEdit(true)
        setReviewId(e.boardReviewNum)
        setReview(e.review)
    }
    const uploadEditReview = () => {
        if (review.length > 0) {
            let body = {
                profileImg: userInfo.profileImg,
                boardReviewNum: reviewId,
                boardId: params.boardId,
                nickname: userInfo.nickName,
                memberNo: userInfo.memberNo,
                review: review,
                createDate: ""
            }
            axios.patch(`/api/board/review`, body
            ).then((response) => {
                // console.log(response)
                axios.get(`/api/board/review?boardId=${params.boardId}`)
                    .then((res) => {
                        setGetReview(res.data);
                        // console.log(res.data)
                    })
            }).catch((error) => {
                // console.log(error);	//오류발생시 실행
            })
            const taget = document.getElementById(reviewId); //스크롤 이동
            taget.scrollIntoView({ behavior: "smooth", block: "center" })
            setReviewId()
            setReview("")
            setEdit(false)
            // console.log(userReviews)
        } else {
            alert("내용을 입력해주세요.")
        }
    }

    //댓글 입력 인풋
    const wrietReview = () => {
        return (
            <>
                <InputGroup className="mb-3">
                    <Form.Control
                        as="textarea"
                        wrap="hard"
                        cols="20"
                        value={review}
                        name="review"
                        onChange={(e) => setReview(e.target.value)}
                        aria-label="Recipient's username"
                        aria-describedby="basic-addon2"
                    />
                </InputGroup>
                <ButtonBox>
                    <ReWriteEditBtn style={{
                        color: switchColor,
                        backgroundColor: switchBgColor
                    }} id="button-addon2"
                        onClick={edit ? uploadEditReview : uploadReview}
                    >
                        {
                            edit ? "댓글 수정" : "댓글 등록"
                        }
                    </ReWriteEditBtn>

                </ButtonBox>
                {/* <BoarderLine /> */}
            </>
        )
    }


    //대댓글
    const [isOpen, setIsOpen] = useState()
    const [isClose, setIsClose] = useState(false)
    const openReview = (e) => {
        // console.log(e)
        setIsClose(!isClose)
        setIsOpen(e)
    }
    const [onReReview, setOnReReview] = useState()
    const [reReview, setReReview] = useState()
    const addReview = (e) => {
        setOnReReview(e)
    }
    const closeReReview = () => {
        setOnReReview()
    }

    const upLoadReReview = (e) => {
        // console.log(e)
        let body = {
            boardReviewNum: e,
            boardId: params.boardId,
            nickname: userInfo.nickName,
            memberNo: userInfo.memberNo,
            review: reReview,
            createDate: "",
            profileImg: userInfo.profileImg,
            reviewId: 0
        }
        axios.post(`${baseUrl}/board/review/review`, body
        ).then((response) => {
            // console.log("보냄");	//정상 통신 후 응답된 메시지 출력
            setOnReReview()
            setReReview()
            window.location.reload();
        }).catch((error) => {
            console.log(error);	//오류발생시 실행
        })
    }
    //대댓글 수정
    const [reEdit, setReEdit] = useState()
    const [reviewNum, setReviewNum] = useState()
    const editReReview = (e) => {
        // console.log(e)
        setReEdit(e.reviewId)
        setReReview(e.review)
        setReviewNum(e.boardReviewNum)
    }
    const cencelReEdit = () => {
        setReEdit()
    }

    const uploadEditReReview = (e) => {
        if (reReview.length > 0) {
            let body = {
                profileImg: userInfo.profileImg,
                boardReviewNum: reviewNum,
                boardId: params.boardId,
                nickname: userInfo.nickName,
                memberNo: userInfo.memberNo,
                review: reReview,
                createDate: "",
                reviewId: reEdit
            }
            axios.patch(`${baseUrl}/board/review/review`, body
            ).then((response) => {
                // console.log(response)
                window.location.reload();
            }).catch((error) => {
                // console.log(error);	//오류발생시 실행
            })
            setReEdit()
            setReReview()
            setReviewNum()
            // console.log(userReviews)
        } else {
            alert("내용을 입력해주세요.")
        }
    }
    //대댓글 삭제
    const deleteReReview = () => {
        // console.log(e)
        axios.delete(`${baseUrl}/board/review/review?reviewId=${taget.reviewId}&boardReviewNum=${taget.boardReviewNum}`
        ).then((res) => {
            window.location.reload();
        }).catch((error) => {
            console.log(error);	//오류발생시 실행
        })
    }
    return (
        <>
            <DeleteModal show={show}
                onHide={() => setShow(false)} />
            <ReviewsTitleBox>
                <ReviewsTitle>Reviews {getReview.length}</ReviewsTitle>
            </ReviewsTitleBox>
            <CommentsBox>
                {
                    window.sessionStorage.getItem("logined") === null ?
                        null :
                        <CommentsInputs ref={(el) => (scrollRef.input = el)}>
                            {wrietReview()}
                        </CommentsInputs>
                }
                { //댓글 보여주기
                    getReview.length > 0 &&
                    getReview.map((e, i) => (
                        <>
                            <>
                                <CommentsItems key={i}>
                                    <CommentsLeftBox>
                                        <CommentsImg id={e.memberNo} style={{ backgroundImage: `url(${e.profileImg})` }} />
                                        <CommentsNickName>{e.nickname}</CommentsNickName>
                                    </CommentsLeftBox>
                                    <CommentsRightBox id={e.boardReviewNum}>
                                        <CommentsText>{e.review}</CommentsText>
                                        <EditDeleteBox >
                                            <Date>
                                                {
                                                    e.createDate !== undefined &&
                                                    <CommentsDate>{e.createDate.replace("T", ", ").slice(0, 17)}</CommentsDate>
                                                }
                                                {
                                                    userInfo !== null &&
                                                    <WriteReRe style={{
                                                        color: switchColor,
                                                        backgroundColor: switchBgColor
                                                    }}
                                                        onClick={() => addReview(e.boardReviewNum)}
                                                    >답글 쓰기</WriteReRe>
                                                }
                                            </Date>
                                            <Buttons>
                                                <IoIosArrowUp className="arrowDown" style={{
                                                    cursor: "pointer",
                                                    color: switchColor,
                                                    backgroundColor: switchBgColor,
                                                    fontSize: "30px"
                                                }} onClick={() => openReview(e.boardReviewNum)} />

                                                {
                                                    userInfo !== null &&
                                                        userInfo.memberNo === e.memberNo ?
                                                        <>
                                                            <MdModeEdit className="mdModeEdit" style={{
                                                                cursor: "pointer",
                                                                fontSize: "20px"
                                                                , margin: "0 5px",
                                                                color: switchColor,
                                                                backgroundColor: switchBgColor
                                                            }}
                                                                onClick={() => editReview(e)} />
                                                            <MdDelete style={{
                                                                cursor: "pointer",
                                                                fontSize: "20px",
                                                                color: switchColor,
                                                                backgroundColor: switchBgColor
                                                            }} className="mdDelete"
                                                                onClick={() => handleShow(e.boardReviewNum, "댓글")} />
                                                        </>
                                                        : null
                                                }
                                            </Buttons>
                                        </EditDeleteBox>

                                    </CommentsRightBox>
                                </CommentsItems>
                                {
                                    onReReview === e.boardReviewNum ?
                                        <>
                                            <>
                                                <InputGroup className="mb-3">
                                                    <Form.Control
                                                        as="textarea"
                                                        wrap="hard"
                                                        cols="20"
                                                        value={reReview}
                                                        name="reReview"
                                                        onChange={(e) => setReReview(e.target.value)}
                                                        aria-label="Recipient's username"
                                                        aria-describedby="basic-addon2"
                                                    />
                                                </InputGroup>
                                                <ButtonBox>
                                                    <ReReBtn style={{
                                                        margin: "0 5px",
                                                        color: switchColor,
                                                        backgroundColor: switchBgColor
                                                    }} id="button-addon2"
                                                        onClick={() => upLoadReReview(e.boardReviewNum)}
                                                    >
                                                        댓글 등록
                                                    </ReReBtn>
                                                    <ReReBtn style={{
                                                        color: switchColor,
                                                        backgroundColor: switchBgColor
                                                    }} id="button-addon2"
                                                        onClick={() => closeReReview(e.boardReviewNum)}
                                                    >
                                                        닫기
                                                    </ReReBtn>
                                                </ButtonBox>

                                            </>
                                        </>
                                        : null
                                }
                            </>
                            <>
                                {
                                    getReReview.length > 0 &&
                                    getReReview.map((k, j) => (
                                        <>
                                            {
                                                e.boardReviewNum === k.boardReviewNum && isOpen === k.boardReviewNum && isClose &&
                                                <ReReviewOutBox>
                                                    <Replyd>
                                                        <GoReply style={{ fontSize: "30px" }} />
                                                    </Replyd>
                                                    <ReReviewBox>
                                                        <CommentsItems key={j}>
                                                            <CommentsLeftBox>
                                                                <CommentsImg id={k.memberNo} style={{ backgroundImage: `url(${k.profileImg})` }} />
                                                                <CommentsNickName>{k.nickname
                                                                }</CommentsNickName>
                                                            </CommentsLeftBox>
                                                            <CommentsRightBox id={k.reviewId}>
                                                                {
                                                                    reEdit === k.reviewId ?
                                                                        <InputGroup className="mb-3">
                                                                            <Form.Control
                                                                                as="textarea"
                                                                                wrap="hard"
                                                                                cols="20"
                                                                                value={reReview}
                                                                                name="review"
                                                                                onChange={(e) => setReReview(e.target.value)}
                                                                                aria-label="Recipient's username"
                                                                                aria-describedby="basic-addon2"
                                                                            />
                                                                        </InputGroup>
                                                                        :
                                                                        <CommentsText>{k.review}</CommentsText>
                                                                }
                                                                <ReReFooter>
                                                                    <Date>
                                                                        {
                                                                            k.createDate !== undefined &&
                                                                            <CommentsDate>{k.createDate.replace("T", ", ").slice(0, 17)}</CommentsDate>
                                                                        }
                                                                    </Date>
                                                                    {
                                                                        userInfo !== null &&
                                                                            userInfo.memberNo === k.memberNo ?
                                                                            <ReReEditDeleteBox >
                                                                                {
                                                                                    reEdit === k.reviewId ?
                                                                                        <ReReBtn style={{
                                                                                            margin: "0 5px",
                                                                                            color: `${isDark ? themes.dark.color : themes.light.color}`,
                                                                                            backgroundColor: `${isDark ? themes.dark.bgColor : themes.light.bgColor}`
                                                                                        }}
                                                                                            onClick={() => uploadEditReReview(k)}
                                                                                        >수정 완료</ReReBtn>
                                                                                        :
                                                                                        <MdModeEdit className="mdModeEdit" style={{
                                                                                            cursor: "pointer",
                                                                                            fontSize: "20px"
                                                                                            , margin: "0 5px",
                                                                                            color: switchColor,
                                                                                            backgroundColor: switchBgColor
                                                                                        }}
                                                                                            onClick={() => editReReview(k)} />
                                                                                }
                                                                                {
                                                                                    reEdit === k.reviewId ?
                                                                                        <ReReBtn style={{
                                                                                            color: `${isDark ? themes.dark.color : themes.light.color}`,
                                                                                            backgroundColor: `${isDark ?
                                                                                                themes.dark.bgColor : themes.light.bgColor}`
                                                                                        }}
                                                                                            onClick={() => cencelReEdit()}
                                                                                        >수정 취소</ReReBtn>
                                                                                        :
                                                                                        <MdDelete style={{
                                                                                            marginLeft: "10PX",
                                                                                            cursor: "pointer",
                                                                                            fontSize: "20px",
                                                                                            color: switchColor,
                                                                                            backgroundColor: switchBgColor
                                                                                        }} className="mdDelete"
                                                                                            onClick={() => handleShow(k, "대댓글")} />
                                                                                }
                                                                            </ReReEditDeleteBox>
                                                                            : null
                                                                    }
                                                                </ReReFooter>
                                                            </CommentsRightBox>
                                                        </CommentsItems>
                                                    </ReReviewBox>
                                                </ReReviewOutBox>
                                            }
                                        </>
                                    ))
                                }
                            </>
                        </>
                    ))
                }
            </CommentsBox>
        </>
    );
}

export default Comments;
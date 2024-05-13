import styled from "styled-components";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { useRecoilValue } from 'recoil';
import { isDarkAtom } from '../atoms';
import themes from "../theme";
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Button from 'react-bootstrap/Button';
import React, { useRef } from "react"
import { MdOutlineReply } from "react-icons/md";

const ReviewsTitleBox = styled.div`
width: 88vw;
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
width: 88vw;
margin: 0 0 10px 0;
`
const CommentsInputs = styled.div`
margin: 20px 10px 0px 10px;
`
const CommentsItems = styled.div`
margin: 20px 10px;
display: flex;
justify-content: center;
padding-bottom: 5px;
border-bottom: 1px solid;
`
const CommentsRightBox = styled.div`
display: flex;
flex-direction: column;
justify-content: center;
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
`
const CommentsNickName = styled.div`
text-align: center;
`
const Date = styled.div`
margin: 10px 0;
display: flex;
justify-content: end;
`
const CommentsDate = styled.div`
`
const ButtonBox = styled.div`
display: flex;
justify-content: end;
`
const EditDeleteBox = styled.div`
margin: 10px 0;
display: flex;
justify-content: end;
`
const ReReviewOutBox = styled.div`
display: flex;
align-items: center;
justify-content: end;
`
const ReReviewBox = styled.div`
width: 90%;
`
const Replyd = styled.div`
display: flex;
transform: rotate( 180deg );
margin-right: 10px;
`

function Comments() {
    const baseUrl = "http://localhost:8080";
    const isDark = useRecoilValue(isDarkAtom); // 다크모드
    const switchColor = `${isDark ? themes.dark.color : themes.light.color}`
    const switchBgColor = `${isDark ? themes.dark.bgColor : themes.light.bgColor}`
    const params = useParams()
    const userInfo = JSON.parse(sessionStorage.getItem("logined"))
    const [getReview, setGetReview] = useState([{}])
    const [getReReview, setGetReReview] = useState([])
    useEffect(() => {
        axios.get(`${baseUrl}/board/review?boardId=${params.boardId}`)
            .then((res) => {
                setGetReview(res.data);
                console.log(res.data)
                for (let i = 0; i < res.data.length; i++) {
                    axios.get(`${baseUrl}/board/review/review?boardReviewNum=${res.data[i].boardReviewNum}`)
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
    const deleteReview = (e) => {
        axios.delete(`${baseUrl}/board/review/${e}`
        ).then(() => {
            axios.get(`${baseUrl}/board/review?boardId=${params.boardId}`)
                .then((res) => {
                    setGetReview(res.data);
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
            axios.patch(`${baseUrl}/board/review`, body
            ).then((response) => {
                // console.log(response)
                axios.get(`${baseUrl}/board/review?boardId=${params.boardId}`)
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
                    <Button style={{
                        color: switchColor,
                        backgroundColor: switchBgColor
                    }} className="recommendBtn" id="button-addon2"
                        onClick={edit ? uploadEditReview : uploadReview}
                    >
                        {
                            edit ? "댓글 수정" : "댓글 달기"
                        }
                    </Button>
                </ButtonBox>
            </>
        )
    }


    //대댓글
    const [isOpen, setIsOpen] = useState()
    const [isClose, setIsClose] = useState(false)
    const openReview = (e) => {
        console.log(e)
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
        console.log(e)
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
            console.log("보냄");	//정상 통신 후 응답된 메시지 출력
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
        console.log(e)
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
    const deleteReReview = (e) => {
        // console.log(e)
        axios.delete(`${baseUrl}/board/review/review?reviewId=${e.reviewId}&boardReviewNum=${e.boardReviewNum}`
        ).then((res) => {
            window.location.reload();
        }).catch((error) => {
            console.log(error);	//오류발생시 실행
        })
    }
    return (
        <>
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
                                        <Date>
                                            {
                                                e.createDate !== undefined &&
                                                <CommentsDate>{e.createDate.replace("T", ", ").slice(0, 17)}</CommentsDate>
                                            }
                                        </Date>

                                        <EditDeleteBox >
                                            <Button style={{
                                                color: switchColor,
                                                backgroundColor: switchBgColor
                                            }} className="recommendBtn"
                                                onClick={() => openReview(e.boardReviewNum)}
                                            >댓글 보기</Button>
                                            {
                                                userInfo !== null &&
                                                    userInfo.memberNo === e.memberNo ?
                                                    <>
                                                        <Button style={{
                                                            margin: "0 5px",
                                                            color: switchColor,
                                                            backgroundColor: switchBgColor
                                                        }} className="recommendBtn"
                                                            onClick={() => addReview(e.boardReviewNum)}
                                                        >댓글 달기</Button>
                                                        <Button style={{
                                                            margin: "0 5px",
                                                            color: switchColor,
                                                            backgroundColor: switchBgColor
                                                        }} className="recommendBtn"
                                                            onClick={() => editReview(e)}
                                                        >수정</Button>
                                                        <Button style={{
                                                            color: switchColor,
                                                            backgroundColor: switchBgColor
                                                        }} className="recommendBtn"
                                                            onClick={() => deleteReview(e.boardReviewNum)}
                                                        >삭제</Button>
                                                    </>
                                                    : null
                                            }
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
                                                    <Button style={{
                                                        margin: "0 5px",
                                                        color: switchColor,
                                                        backgroundColor: switchBgColor
                                                    }} className="recommendBtn" id="button-addon2"
                                                        onClick={() => upLoadReReview(e.boardReviewNum)}
                                                    >
                                                        댓글 등록
                                                    </Button>
                                                    <Button style={{
                                                        color: switchColor,
                                                        backgroundColor: switchBgColor
                                                    }} className="recommendBtn" id="button-addon2"
                                                        onClick={() => closeReReview(e.boardReviewNum)}
                                                    >
                                                        닫기
                                                    </Button>
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
                                                        <MdOutlineReply style={{ fontSize: "50px" }} />
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
                                                                <Date>
                                                                    {
                                                                        k.createDate !== undefined &&
                                                                        <CommentsDate>{k.createDate.replace("T", ", ").slice(0, 17)}</CommentsDate>
                                                                    }
                                                                </Date>
                                                                {
                                                                    userInfo !== null &&
                                                                        userInfo.memberNo === k.memberNo ?
                                                                        <EditDeleteBox >
                                                                            {
                                                                                reEdit === k.reviewId ?
                                                                                    <Button style={{
                                                                                        margin: "0 5px",
                                                                                        color: `${isDark ? themes.dark.color : themes.light.color}`,
                                                                                        backgroundColor: `${isDark ? themes.dark.bgColor : themes.light.bgColor}`
                                                                                    }} className="recommendBtn"
                                                                                        onClick={() => uploadEditReReview(k)}
                                                                                    >수정 완료</Button>
                                                                                    :
                                                                                    <Button style={{
                                                                                        margin: "0 5px",
                                                                                        color: `${isDark ? themes.dark.color : themes.light.color}`,
                                                                                        backgroundColor: `${isDark ? themes.dark.bgColor : themes.light.bgColor}`
                                                                                    }} className="recommendBtn"
                                                                                        onClick={() => editReReview(k)}
                                                                                    >수정</Button>
                                                                            }
                                                                            {
                                                                                reEdit === k.reviewId ?
                                                                                    <Button style={{
                                                                                        color: `${isDark ? themes.dark.color : themes.light.color}`,
                                                                                        backgroundColor: `${isDark ?
                                                                                            themes.dark.bgColor : themes.light.bgColor}`
                                                                                    }} className="recommendBtn"
                                                                                        onClick={() => cencelReEdit()}
                                                                                    >수정 취소</Button>
                                                                                    :
                                                                                    <Button style={{
                                                                                        color: `${isDark ? themes.dark.color : themes.light.color}`,
                                                                                        backgroundColor: `${isDark ?
                                                                                            themes.dark.bgColor : themes.light.bgColor}`
                                                                                    }} className="recommendBtn"
                                                                                        onClick={() => deleteReReview(k)}
                                                                                    >삭제</Button>
                                                                            }
                                                                        </EditDeleteBox>
                                                                        : null
                                                                }
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
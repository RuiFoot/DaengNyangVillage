import styled from "styled-components";
import Bumper from "../layout/bumper";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import DOMPurify from "dompurify"; //html 코드 번역
import { useRecoilValue } from 'recoil';
import { isDarkAtom } from '../atoms';
import themes from "../theme";
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Button from 'react-bootstrap/Button';
import React, { useRef } from "react"
import { MdOutlineReply } from "react-icons/md";
import defaultImg from '../img/defaultImg.png';

const Container = styled.div`
min-height: calc(100vh - 179px);
display: flex;
flex-direction: column;
align-items: center;
`
const CategoryTitle = styled.div`
font-size: 30px;
margin: 10px;
`
const Items = styled.div`
width: 100%;
 display: grid;
  grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
  grid-auto-rows: minmax(100px, auto);
`
const LeftItems = styled.div`
display: flex;
flex-direction: column;
justify-content: center;
align-items: center;
`
const RightItems = styled.div`
display: flex;
flex-direction: column;
justify-content: space-between;
`
const Title = styled.div`
font-size: 25px;
margin: 10px 0;
height: 40px;
`
const Img = styled.div`
height: 500px;
width: 95%;
background-position: center;
background-size: cover;
`
const Address = styled.div`
margin-bottom: 10px;
`
const TradeTime = styled.div`
margin-bottom: 10px;
`
const TradePrice = styled.div`
`
const CreateDate = styled.div`
text-align: end;
`
const ContentField = styled.div`
width: 88vw;
display: flex;
flex-direction: column;
align-items: center;
margin: 20px 0;
`
const ContentTitleBox = styled.div`
width: 88vw;
margin: 20px 0 10px 0;
display: flex;
justify-content: start;
border-bottom: 1px solid;
`
const ContentTitle = styled.div`
font-size: 20px;
`
const ContentBtns = styled.div`
display: flex;
justify-content: end;
`
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
const Comments = styled.div`
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

function UsedMarketDetail() {
    const baseUrl = "http://localhost:8080";
    const isDark = useRecoilValue(isDarkAtom); // 다크모드
    const params = useParams()
    const userInfo = JSON.parse(sessionStorage.getItem("logined"))
    // 윈도우 가로 사이즈에 따른 변화 적용
    const [windowSize, setWindowSiz] = useState(window.innerWidth);
    const handleResize = () => {
        setWindowSiz(window.innerWidth)
    }
    useEffect(() => {
        window.addEventListener('resize', handleResize);
        return () => {
            window.addEventListener('resize', handleResize)
        }
    }, [])

    // 스프링부트
    const [content, setContent] = useState({
        area: "",
        detailLocation: "",
        preface: "",
        price: "",
        tradeTime: "",
        boardId: 0,
        nickname: "",
        memberNo: 0,
        category: "",
        boardName: "",
        field: "",
        imgPath: "",
        createDate: ""
    })
    const [getReview, setGetReview] = useState({

    })
    useEffect(() => {
        axios.get(`/api/board/detail/${params.boardId}`)
            .then((res) => {
                setContent(res.data);
                console.log(res.data)
            })
    }, []);

    useEffect(() => {
        axios.get(`${baseUrl}/board/review?boardId=${params.boardId}`)
            .then((res) => {
                setGetReview(res.data);
                console.log(res.data)
            })
    }, []);
    //글에 이미지가 여러게 일경우 대표 이미지 가장 앞에 하나만 보여줌
    const representImg = (e) => {
        if (e !== null && e !== undefined) {
            const index = e.indexOf(",")
            return (
                <Img style={{ backgroundImage: `url(${e.slice(0, index)})` }} />
            )
        } else {
            return (
                <Img style={{ backgroundImage: `url(${defaultImg})` }} />
            )
        }
    }
    const editContentBtn = (e) => {
        window.location.href = `/edit/${e}/${userInfo.nickName}`
    }
    //글 삭제
    const deleteContentBtn = (e) => {
        axios.delete(`/api/board/${e}`)
            .then((res) => {
                setContent(res.data);
                window.location.href = `/used-market/${userInfo.nickName}`
            })
    }

    //댓글 입력
    const [userReviews, setUserReviews] = useState([])
    const [review, setReview] = useState("")
    const [reviewId, setReviewId] = useState()
    const today = new window.Date()
    const formattedDate = `${today.getFullYear()}년 ${today.getMonth() + 1}월 ${today.getDate()}일`;
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
                console.log(response.data);	//정상 통신 후 응답된 메시지 출력
            }).catch((error) => {
                console.log(error);	//오류발생시 실행
            })
            //내가단 댓글로
            const taget = document.getElementById("end");
            taget.scrollIntoView({ behavior: "smooth", block: "center" })
            setReview("")
        } else {
            alert("내용을 입력해주세요.")
        }
    }

    //삭제 백엔드 연결시 수정
    const deleteReview = (e) => {
        setUserReviews(userReviews.filter((item) => item.reviewId !== e))
        setUserReReviews([])
        console.log(userReviews)
    }

    //댓글 수정
    const [edit, setEdit] = useState(false)
    const [editIndex, setEditIndex] = useState()
    const scrollRef = useRef([]);

    //인풋 창으로 이동
    const handleScrollView = () => {
        scrollRef.input.scrollIntoView({ behavior: "smooth", block: "center" });
    };
    const editReview = (e, i) => {
        handleScrollView()
        setEdit(true)
        setReviewId(e.reviewId)
        setReview(e.review)
        setEditIndex(i)
    }
    const uploadEditReview = () => {
        if (review.length > 0) {
            userReviews[editIndex].review = review
            userReviews[editIndex].createDate = formattedDate
            const taget = document.getElementById(reviewId); //스크롤 이동
            taget.scrollIntoView({ behavior: "smooth", block: "center" })
            setReviewId()
            setReview("")
            setEditIndex()
            setEdit(false)
            console.log(userReviews)
        } else {
            alert("내용을 입력해주세요.")
        }
    }

    //댓글 입력
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
                        color: `${isDark ? themes.dark.color : themes.light.color}`,
                        backgroundColor: `${isDark ? themes.dark.bgColor : themes.light.bgColor}`
                    }} className="recommendBtn" id="button-addon2"
                        onClick={reviewId !== undefined ? uploadEditReview : uploadReview}
                    >
                        댓글
                    </Button>
                </ButtonBox>
            </>
        )
    }
    const goMyReview = () => {
        const taget = document.getElementById(JSON.parse(sessionStorage.getItem("logined")).memberNo); //스크롤 이동
        console.log(taget)
        taget.scrollIntoView({ behavior: "smooth", block: "center" })
    }

    //대댓글
    const [onReReview, setOnReReview] = useState(false)
    const [userReReviews, setUserReReviews] = useState([])
    const [reReview, setReReview] = useState()
    const addReview = (e) => {
        setOnReReview(e)
        console.log("이글에 댓글담 " + onReReview)
    }
    const upLoadReReview = (e) => {
        userReReviews.push({
            memberNo: userInfo.memberNo,
            reviewId: onReReview,
            nickName: userInfo.nickName,
            createDate: formattedDate,
            reReviewId: today.getTime(),
            profileImg: `${userInfo.profileImg}`,
            boardId: params.itemId,
            reReview: reReview
        })
        setReReview()
        setOnReReview()
        console.log(reReview)
        console.log(userReReviews)
    }

    const deleteReReview = (e) => {
        setUserReReviews(userReReviews.filter((item) => item.reReviewId !== e))
        console.log(userReReviews)
        console.log(e)
    }
    return (
        <>
            <Bumper />
            <Container style={{
                color: `${isDark ? themes.dark.color : themes.light.color}`,
                backgroundColor: `${isDark ? themes.dark.bgColor : themes.light.bgColor}`
            }}>
                <CategoryTitle>{content.category}</CategoryTitle>
                <Items>
                    <LeftItems style={{ margin: `${windowSize < 800 ? "0 6vw" : "0 10px 0 6vw"}` }}>
                        <Title>
                            [{content.preface}] {content.boardName}
                        </Title>
                        {representImg(content.imgPath)}
                    </LeftItems>
                    <RightItems style={{ margin: `${windowSize < 800 ? "0 6vw" : "0 6vw 0 10px"}` }}>
                        <div>
                            <Title>
                                {
                                    window.sessionStorage.getItem("logined") === null ?
                                        null :
                                        <ContentBtns>
                                            <Button style={{
                                                margin: "0 5px",
                                                color: `${isDark ? themes.dark.color : themes.light.color}`,
                                                backgroundColor: `${isDark ? themes.dark.bgColor : themes.light.bgColor}`
                                            }} className="recommendBtn"
                                                onClick={() => editContentBtn(content.boardId)}
                                            >수정</Button>
                                            <Button style={{
                                                color: `${isDark ? themes.dark.color : themes.light.color}`,
                                                backgroundColor: `${isDark ? themes.dark.bgColor : themes.light.bgColor}`
                                            }} className="recommendBtn"
                                                onClick={() => deleteContentBtn(content.boardId)}
                                            >삭제</Button>
                                        </ContentBtns>
                                }
                            </Title>
                            <Address>주소 : {content.area} {content.detailLocation}</Address>
                            <TradeTime>거래 가능 시간 : {content.tradeTime}</TradeTime>
                            <TradePrice>가격 : {content.price}</TradePrice>
                        </div>
                        <div>
                            {
                                content.createDate ?
                                    <CreateDate>{content.createDate.replace("T", ", ").slice(0, 17)}</CreateDate>
                                    :
                                    null
                            }
                        </div>
                    </RightItems>
                </Items>
                <ContentTitleBox>
                    <ContentTitle>상세 내용</ContentTitle>
                </ContentTitleBox>
                <ContentField dangerouslySetInnerHTML={{
                    __html: DOMPurify.sanitize(content.field)
                }} />
                <ReviewsTitleBox>
                    <ReviewsTitle>Reviews {userReviews.length}</ReviewsTitle>
                </ReviewsTitleBox>
                <Comments >
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
                                <CommentsItems key={i}>
                                    <CommentsLeftBox>
                                        <CommentsImg id={e.memberNo} style={{ backgroundImage: `url(${e.profileImg})` }} />
                                        <CommentsNickName>{e.nickname}</CommentsNickName>
                                    </CommentsLeftBox>
                                    <CommentsRightBox id={e.boardReviewNum}>
                                        <CommentsText>{e.review}</CommentsText>
                                        <Date>
                                            <CommentsDate>{e.createDate.replace("T", ", ").slice(0, 17)}</CommentsDate>
                                        </Date>
                                        {
                                            userInfo.memberNo === e.memberNo ?
                                                <EditDeleteBox >
                                                    <Button style={{
                                                        color: `${isDark ? themes.dark.color : themes.light.color}`,
                                                        backgroundColor: `${isDark ? themes.dark.bgColor : themes.light.bgColor}`
                                                    }} className="recommendBtn"
                                                        onClick={() => addReview(e.reviewId)}
                                                    >댓글 달기</Button>
                                                    <Button style={{
                                                        margin: "0 5px",
                                                        color: `${isDark ? themes.dark.color : themes.light.color}`,
                                                        backgroundColor: `${isDark ? themes.dark.bgColor : themes.light.bgColor}`
                                                    }} className="recommendBtn"
                                                        onClick={() => editReview(e, i)}
                                                    >수정</Button>
                                                    <Button style={{
                                                        color: `${isDark ? themes.dark.color : themes.light.color}`,
                                                        backgroundColor: `${isDark ? themes.dark.bgColor : themes.light.bgColor}`
                                                    }} className="recommendBtn"
                                                        onClick={() => deleteReview(e.reviewId)}
                                                    >삭제</Button>
                                                </EditDeleteBox>
                                                : null
                                        }
                                    </CommentsRightBox>
                                </CommentsItems>
                                {
                                    onReReview === e.reviewId ?
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
                                                        color: `${isDark ? themes.dark.color : themes.light.color}`,
                                                        backgroundColor: `${isDark ? themes.dark.bgColor : themes.light.bgColor}`
                                                    }} className="recommendBtn" id="button-addon2"
                                                        onClick={() => upLoadReReview(e.reviewId)}
                                                    >
                                                        댓글 등록
                                                    </Button>
                                                </ButtonBox>

                                            </>
                                        </>
                                        : null
                                }
                                {
                                    userReReviews.map((e, i) => (
                                        <ReReviewOutBox>
                                            <Replyd>
                                                <MdOutlineReply style={{ fontSize: "50px" }} />
                                            </Replyd>

                                            <ReReviewBox>
                                                <CommentsItems key={i}>
                                                    <CommentsLeftBox>
                                                        <CommentsImg id={e.memberNo} style={{ backgroundImage: `url(${e.profileImg})` }} />
                                                        <CommentsNickName>{e.nickName}</CommentsNickName>
                                                    </CommentsLeftBox>
                                                    <CommentsRightBox id={e.reviewId}>
                                                        <CommentsText>{e.reReview}</CommentsText>
                                                        <Date>
                                                            <CommentsDate>{e.createDate.replace("T", ", ").slice(0, 17)}</CommentsDate>
                                                        </Date>
                                                        {
                                                            userInfo.memberNo === e.memberNo ?
                                                                <EditDeleteBox >
                                                                    {/* <Button style={{
                                                                        margin: "0 5px",
                                                                        color: `${isDark ? themes.dark.color : themes.light.color}`,
                                                                        backgroundColor: `${isDark ? themes.dark.bgColor : themes.light.bgColor}`
                                                                    }} className="recommendBtn"
                                                                    // onClick={() => editReview(e, i)}
                                                                    >수정</Button> */}
                                                                    <Button style={{
                                                                        color: `${isDark ? themes.dark.color : themes.light.color}`,
                                                                        backgroundColor: `${isDark ? themes.dark.bgColor : themes.light.bgColor}`
                                                                    }} className="recommendBtn"
                                                                        onClick={() => deleteReReview(e.reReviewId)}
                                                                    >삭제</Button>

                                                                </EditDeleteBox>
                                                                : null
                                                        }
                                                    </CommentsRightBox>
                                                </CommentsItems>
                                            </ReReviewBox>
                                        </ReReviewOutBox>
                                    ))
                                }
                            </>
                        ))
                    }
                </Comments>
            </Container>
            <div id="end"></div>
        </>
    );
}

export default UsedMarketDetail;
import styled from "styled-components";
import Bumper from "../layout/bumper";
import wideHotPlaceArr from "../data";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useRecoilValue } from 'recoil';
import { isDarkAtom } from '../atoms';
import themes from "../theme";
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Button from 'react-bootstrap/Button';
import Dropdown from 'react-bootstrap/Dropdown';
import { FaStar, FaHeart } from "react-icons/fa6";
import React from "react"
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';
import "./placeRecommendStyle.css"

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
const Precautions = styled.div`
`

const Address = styled.div`
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
const CommentsRank = styled.div`
`
const DropdownBtn = styled.div`
margin-bottom: 10px;
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

function RecommendDetail() {
    const isDark = useRecoilValue(isDarkAtom); // 다크모드
    const params = useParams();
    const userInfo = JSON.parse(sessionStorage.getItem("logined"))
    // 현재 url에 맞는 글 가져오기 (현재 url에 id전송으로 대체)
    const test = wideHotPlaceArr.filter((e) => e[4] === Number(params.itemId))
    // console.log(test)
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

    //댓글 입력
    const [userReviews, setUserReviews] = useState([])
    const [review, setReview] = useState("")
    const [star, setStar] = useState()
    const [reviewId, setReviewId] = useState()
    const [isDuplication, setIsDuplication] = useState(false)
    const today = new window.Date()
    // console.log(today.getTime())
    const formattedDate = `${today.getFullYear()}년 ${today.getMonth() + 1}월 ${today.getDate()}일`;
    const uploadReview = () => {
        if (review.length > 0) {
            userReviews.push({
                reviewId: today.getTime(),
                profileImg: `${userInfo.profileImg}`,
                review: review,
                nickname: userInfo.nickName,
                createDate: formattedDate,
                rank: star,
                boardId: params.itemId,
                memberNo: userInfo.memberNo
            })
            setReview("")
            setStar()
            console.log(userReviews)
        } else {
            alert("내용을 입력해주세요.")
        }
    }
    //삭제 백엔드 연결시 수정
    const deleteReview = (e) => {
        setUserReviews(userReviews.filter((item) => item.reviewId !== e))
    }
    //수정
    const [edit, setEdit] = useState(false)
    const [newReviewId, setNewReviewId] = useState()
    const editReview = (e) => {
        console.log(e)
        if (e.rank !== undefined) {
            setEdit(true)
        }
        setReviewId(e.reviewId)
        setNewReviewId(e.reviewId)
        setStar(e.rank)
        setReview(e.review)
    }
    const uploadEditReview = () => {

        if (review.length > 0) {

            userReviews.push({
                reviewId: today.getTime(),
                profileImg: `${userInfo.profileImg}`,
                review: review,
                nickname: userInfo.nickName,
                createDate: formattedDate,
                rank: star,
                boardId: params.itemId,
                memberNo: userInfo.memberNo
            })
            setUserReviews(userReviews.filter((item) => item.reviewId !== reviewId))
            setReview("")
            setStar()
            console.log(userReviews)

        } else {
            alert("내용을 입력해주세요.")
        }

    }
    //댓글 별점 
    const starRank = (rankNum) => {
        let rankArr = []
        let starRank = []
        for (let i = 0; i < rankNum; i++) {
            rankArr.push("#F2D64B")
        }
        if (rankArr.length !== 5) {
            for (let i = 0; i < 5 - rankNum; i++) {
                rankArr.unshift("#F2F2F2")
            }
        }
        for (let i = 0; i < rankArr.length; i++) {
            starRank.push(<FaStar style={{ color: `${rankArr[i]}` }} />)
        }
        return starRank
    }

    //별점 중복 입력 방지
    const dropdown = () => {
        return (
            <DropdownBtn>
                <Dropdown>
                    <Dropdown.Toggle style={{
                        color: `${isDark ? themes.dark.color : themes.light.color}`,
                        backgroundColor: `${isDark ? themes.dark.bgColor : themes.light.bgColor}`
                    }} className="recommendBtn" id="dropdown-basic">
                        별점({star})
                    </Dropdown.Toggle>
                    <Dropdown.Menu>
                        <Dropdown.Item onClick={() => setStar(5)}>5</Dropdown.Item>
                        <Dropdown.Item onClick={() => setStar(4)}>4</Dropdown.Item>
                        <Dropdown.Item onClick={() => setStar(3)}>3</Dropdown.Item>
                        <Dropdown.Item onClick={() => setStar(2)}>2</Dropdown.Item>
                        <Dropdown.Item onClick={() => setStar(1)}>1</Dropdown.Item>
                    </Dropdown.Menu>
                </Dropdown>
            </DropdownBtn>
        )
    }
    const preventDuplication = () => {
        if (userReviews.length < 1) {
            return (dropdown())
        } else {
            for (let i = 0; i < userReviews.length; i++) {
                if (userReviews[i].memberNo === userInfo.memberNo) {
                    if (userReviews[i].rank !== undefined) {
                        return (
                            <OverlayTrigger overlay={<Tooltip id="tooltip-disabled">별점이 등록되어 있습니다</Tooltip>}>
                                <span className="d-inline-block">
                                    <Button className="recommendBtn" disabled style={{
                                        margin: "0 0 10px 0",
                                        pointerEvents: 'none', color: `${isDark ? themes.dark.color : themes.light.color}`,
                                        backgroundColor: `${isDark ? themes.dark.bgColor : themes.light.bgColor}`
                                    }}>
                                        별점
                                    </Button>
                                </span>
                            </OverlayTrigger>
                        )
                    }
                } else {
                    return (dropdown())
                }
            }
        }
    }


    //별점 평균
    const starRankAVG = () => {
        let starts = []
        let starRankAVGArr = []
        let starRankSum = 0
        for (let i = 0; i < userReviews.length; i++) {
            if (userReviews[i].rank !== undefined) {
                starRankSum += userReviews[i].rank
            }
        }
        let starRankAVG = Math.round(starRankSum / userReviews.filter((e) => e.rank !== undefined).length)
        for (let i = 0; i < starRankAVG; i++) {
            starts.push("#F2D64B")
        }
        if (starts.length !== 5) {
            for (let i = 0; i < 5 - starRankAVG; i++) {
                starts.unshift("#F2F2F2")
            }
        }
        for (let i = 0; i < starts.length; i++) {
            starRankAVGArr.push(<FaStar style={{ color: `${starts[i]}` }} />)
        }
        return starRankAVGArr
    }

    //찜
    const [heart, setHeart] = useState(false)
    const clickHeart = () => {
        setHeart(!heart)
        console.log(params)
    }

    return (
        <>
            <Bumper />
            <Container style={{
                color: `${isDark ? themes.dark.color : themes.light.color}`,
                backgroundColor: `${isDark ? themes.dark.bgColor : themes.light.bgColor}`
            }}>
                <CategoryTitle>장소 추천</CategoryTitle>
                <Items>
                    <LeftItems style={{ margin: `${windowSize < 800 ? "0 6vw" : "0 10px 0 6vw"}` }}>
                        <Title>
                            {test[0][0]}
                            <FaHeart style={{ cursor: "pointer", margin: "10px", color: `${heart ? "red" : "#F2F2F2"}` }} onClick={clickHeart} />
                        </Title>
                        <Img style={{ backgroundImage: `url(${test[0][3]})` }} />
                    </LeftItems>
                    <RightItems style={{ margin: `${windowSize < 800 ? "0 6vw" : "0 6vw 0 10px"}` }}>
                        <Title>{starRankAVG()}</Title>
                        <Address>주소 : {test[0][1]}</Address>
                        <Precautions>주의사항 : {test[0][2]}</Precautions>
                    </RightItems>
                </Items>
                <ReviewsTitleBox>
                    <ReviewsTitle>Reviews {userReviews.length}</ReviewsTitle>
                </ReviewsTitleBox>
                <Comments>
                    {
                        sessionStorage.getItem("logined") !== null
                            ?
                            <CommentsInputs>
                                {
                                    edit ? dropdown() :
                                        preventDuplication()
                                }
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
                            </CommentsInputs>
                            : null
                    }
                    {
                        userReviews.map((e, i) => (
                            <CommentsItems key={i}>
                                <CommentsLeftBox>
                                    <CommentsImg style={{ backgroundImage: `url(${e.profileImg})` }} />
                                    <CommentsNickName>{e.nickname}</CommentsNickName>
                                </CommentsLeftBox>
                                <CommentsRightBox>
                                    <CommentsRank>
                                        {starRank(e.rank)}
                                    </CommentsRank>
                                    <CommentsText>{e.review}</CommentsText>
                                    <Date>
                                        <CommentsDate>{e.createDate}</CommentsDate>
                                    </Date>
                                    {
                                        userInfo.memberNo === e.memberNo ?
                                            <EditDeleteBox>
                                                <Button style={{
                                                    margin: "0 5px",
                                                    color: `${isDark ? themes.dark.color : themes.light.color}`,
                                                    backgroundColor: `${isDark ? themes.dark.bgColor : themes.light.bgColor}`
                                                }} className="recommendBtn"
                                                    onClick={() => editReview(e)}
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
                        ))
                    }
                </Comments>
            </Container>
        </>
    );
}

export default RecommendDetail;
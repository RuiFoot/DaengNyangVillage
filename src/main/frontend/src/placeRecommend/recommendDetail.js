import styled from "styled-components";
import Bumper from "../layout/bumper";
import hotPlaceArr from "../components/imgDate";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useRecoilValue } from 'recoil';
import { isDarkAtom } from '../components/atoms';
import themes from "../components/theme";
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Button from 'react-bootstrap/Button';
import Dropdown from 'react-bootstrap/Dropdown';
import { FaStar, FaHeart } from "react-icons/fa6";
import React, { useRef } from "react"
import "./placeRecommendStyle.css"
import defaultImg from "../components/defaultImgs";
import axios from "axios";

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
font-size: clamp(100%, 2vw, 120%);
`
const Address = styled.div`
font-size: clamp(100%, 2vw, 120%);
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
const StarInput = styled.div`
display: flex;
align-items: center;
`

function RecommendDetail() {
    //다크모드
    const isDark = useRecoilValue(isDarkAtom);
    const switchColor = `${isDark ? themes.dark.color : themes.light.color}`
    const switchBgColor = `${isDark ? themes.dark.bgColor : themes.light.bgColor}`
    //스프링연동을 위한 url
    const baseUrl = "http://localhost:8080";
    const params = useParams();
    console.log(params)
    const userInfo = JSON.parse(sessionStorage.getItem("logined"))
    // 현재 url에 맞는 글 가져오기 (현재 url에 id전송으로 대체)
    const test = hotPlaceArr.filter((e) => e[4] === Number(params.itemId))

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

    //스프링 통신
    const [board, setBoard] = useState({
        animalNum: 0,
        largeClassification: "",
        facilityName: "",
        subClassification: "",
        sido: "",
        sigungu: "",
        eupmyeondong: "",
        ri: "",
        houseNumber: "",
        streetName: "",
        buildingNumber: "",
        latitude: "",
        longitude: "",
        star: 0,
        imgPath: "",
        roadAddress: "",
        numberAddress: ""
    })

    useEffect(() => {
        axios.get(`/api/animal/detail/${params.itemId}`)
            .then((res) => {
                setBoard(res.data);
                console.log(res.data)
            })
    }, []);
    // 디폴트 이미지
    const showImg = (e) => {
        if (e === "미용") return defaultImg.미용
        if (e === "문예회관" || e === "박물관" || e === "미술관") return defaultImg.박물관문예회관
        if (e === "동물병원") return defaultImg.병원
        if (e === "동물약국") return defaultImg.약국
        if (e === "식당") return defaultImg.식당
        if (e === "여행지") return defaultImg.여행지
        if (e === "반려동물용품") return defaultImg.애견용품
        if (e === "위탁관리") return defaultImg.유치원
        if (e === "카페") return defaultImg.카페
        if (e === "펜션" || e === "호텔") return defaultImg.호텔펜션
    }
    //댓글 입력
    const [userReviews, setUserReviews] = useState([])
    const [review, setReview] = useState("")
    const [star, setStar] = useState(1)
    const [reviewId, setReviewId] = useState()
    const [getReview, setGetReview] = useState([])
    const uploadReview = () => {
        if (review.length > 0) {
            let body = {
                animalNum: params.itemId,
                nickname: userInfo.nickName,
                memberNo: userInfo.memberNo,
                profileImg: userInfo.profileImg,
                review: review,
                star: star
            }
            axios.post(`${baseUrl}/animal/review`, body
            ).then((response) => {
                setReview("")
                console.log("됨?");
                console.log(response);	//오류발생시 실행
                // console.log(response.data);	//정상 통신 후 응답된 메시지 출력
                // axios.get(`${baseUrl}/animal/review?animalNum=${params.itemId}`)
                //     .then((res) => {
                //         setGetReview(res.data);
                //         // console.log(res.data)
                //     })
            }).catch((error) => {
                console.log(error);	//오류발생시 실행
            })
            //내가단 댓글로
            const taget = document.getElementById("end");
            taget.scrollIntoView({ behavior: "smooth", block: "center" })
            setReview("")
            setStar(1)
            console.log(userReviews)
            console.log(test)
        } else {
            alert("내용을 입력해주세요.")
        }
    }

    //삭제 백엔드 연결시 수정
    const deleteReview = (e) => {
        setUserReviews(userReviews.filter((item) => item.reviewId !== e))
        test[0][5].splice(test[0][5].findIndex((e) => e[2] === e), 1) // 별점 입력 삭제
        console.log(userReviews)
        console.log(test)
    }

    //수정
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
        setStar(e.rank)
        setReview(e.review)
        setEditIndex(i)
    }
    const uploadEditReview = () => {
        if (review.length > 0) {
            userReviews[editIndex].review = review
            userReviews[editIndex].rank = star
            if (star !== undefined) {
                test[0][5][test[0][5].findIndex((e) => e[0] === params.nickName)][1] = star // 별점 수정
            } else {
                test[0][5].push([userInfo.nickName, star])//별점을 줬다는 데이터
            }
            const taget = document.getElementById(reviewId); //스크롤 이동
            taget.scrollIntoView({ behavior: "smooth", block: "center" })
            setReviewId()
            setReview("")
            setEditIndex()
            setStar(1)
            setEdit(false)
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

    //댓글 인풋
    const dropdown = () => {
        return (
            <StarInput>
                <DropdownBtn>
                    <Dropdown>
                        <Dropdown.Toggle style={{
                            margin: "0 10px 0 0",
                            color: switchColor,
                            backgroundColor: switchBgColor
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
                <div>{starRank(star)}</div>
                {/* 지금 주려는 별점 */}
            </StarInput>
        )
    }
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
    //중복평가 방지
    const preventDuplication = () => {
        if (test[0][5].length === 0) {
            return (
                <>
                    {dropdown()}
                    {wrietReview()}
                </>
            )
        } else {
            for (let i = 0; i < test[0][5].length; i++) {
                if (test[0][5][i][0] === params.nickName) {
                    // console.log(test[0][5])
                    return (
                        <>
                            <div>이미 리뷰를 작성하셨습니다.</div>
                            <Button className="recommendBtn" style={{
                                margin: "10px 0 10px 0", color: switchColor,
                                backgroundColor: switchBgColor
                            }}
                                onClick={goMyReview}
                            >
                                내 리뷰 보러가기
                            </Button>
                        </>
                    )
                } else {
                    return (
                        <>
                            {dropdown()}
                            {wrietReview()}
                        </>
                    )
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
                color: switchColor,
                backgroundColor: switchBgColor
            }}>
                <CategoryTitle>장소 추천</CategoryTitle>
                <Items>
                    <LeftItems style={{ margin: `${windowSize < 800 ? "0 6vw" : "0 10px 0 6vw"}` }}>
                        <Title>
                            {board.facilityName}
                            <FaHeart style={{ cursor: "pointer", margin: "10px", color: `${heart ? "red" : "#F2F2F2"}` }} onClick={clickHeart} />
                        </Title>
                        <Img style={{ backgroundImage: board.imgPath === null ? `url(${showImg(board.subClassification)})` : `url(${showImg(board.imgPath)})` }} />
                    </LeftItems>
                    <RightItems style={{ margin: `${windowSize < 800 ? "0 6vw" : "0 6vw 0 10px"}` }}>
                        <Title>{starRankAVG()}</Title>
                        <Address>주소 : {board.roadAddress}</Address>
                        <Precautions>가격 : {board.payInfo}</Precautions>
                        <Precautions>휴일 : {board.holiday}</Precautions>
                        <Precautions>전화번호 : {board.tel}</Precautions>
                        <Precautions>주차 : {board.carInfo}</Precautions>
                        <Precautions>제한 사항 : {board.precautions}</Precautions>
                        <Precautions>반려동물 크기 제한 : {board.animalSize}</Precautions>
                        <Precautions>실내 동반 : {board.infield}</Precautions>
                        <Precautions>실외 동반 : {board.outfield}</Precautions>
                    </RightItems>
                </Items>
                <ReviewsTitleBox>
                    <ReviewsTitle>Reviews {userReviews.length}</ReviewsTitle>
                </ReviewsTitleBox>
                <Comments >
                    { //중복평가 방지
                        sessionStorage.getItem("logined") !== null
                            ?
                            <CommentsInputs ref={(el) => (scrollRef.input = el)}>
                                {
                                    edit ?
                                        <>
                                            {dropdown()}
                                            {wrietReview()}
                                        </>
                                        :
                                        preventDuplication()
                                }
                            </CommentsInputs>
                            : null
                    }
                    { //댓글 보여주기
                        userReviews.map((e, i) => (
                            <>
                                <CommentsItems key={i}>
                                    <CommentsLeftBox>
                                        <CommentsImg id={e.memberNo} style={{ backgroundImage: `url(${e.profileImg})` }} />
                                        <CommentsNickName>{e.nickname}</CommentsNickName>
                                    </CommentsLeftBox>
                                    <CommentsRightBox id={e.reviewId}>
                                        <CommentsRank>
                                            {starRank(e.rank)}
                                        </CommentsRank>
                                        <CommentsText>{e.review}</CommentsText>
                                        <Date>
                                            <CommentsDate>{e.createDate}</CommentsDate>
                                        </Date>
                                        {
                                            userInfo.memberNo === e.memberNo ?
                                                <EditDeleteBox >
                                                    <Button style={{
                                                        margin: "0 5px",
                                                        color: switchColor,
                                                        backgroundColor: switchBgColor
                                                    }} className="recommendBtn"
                                                        onClick={() => editReview(e, i)}
                                                    >수정</Button>
                                                    <Button style={{
                                                        color: switchColor,
                                                        backgroundColor: switchBgColor
                                                    }} className="recommendBtn"
                                                        onClick={() => deleteReview(e.reviewId)}
                                                    >삭제</Button>

                                                </EditDeleteBox>
                                                : null
                                        }
                                    </CommentsRightBox>
                                </CommentsItems>
                            </>
                        ))
                    }
                </Comments>
            </Container>
            <div id="end"></div>
        </>
    );
}

export default RecommendDetail;
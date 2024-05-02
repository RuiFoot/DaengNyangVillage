import styled from "styled-components";
import Bumper from "./layout/bumper";
import wideHotPlaceArr from "./data";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useRecoilValue } from 'recoil';
import { isDarkAtom } from './atoms';
import themes from "./theme";
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Button from 'react-bootstrap/Button';
import Dropdown from 'react-bootstrap/Dropdown';
import { FaStar } from "react-icons/fa6";
import React from "react"

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
margin: 10px;
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
const Comments = styled.div`
display: flex;
flex-direction: column;
width: 88vw;
margin: 20px 0;
border-top: 1px solid;
`

const CommentsInputs = styled.div`
margin: 20px 10px 0px 10px;
`
const CommentsItems = styled.div`
width: 100%;
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
const CommentsText = styled.div`

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


function PhotoDetail() {
    const isDark = useRecoilValue(isDarkAtom); // 다크모드
    const params = useParams();
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

    //더미 데이터
    const [userComments, setUserComments] = useState([])
    const [comment, setComment] = useState("")
    const [star, setStar] = useState(0)
    console.log(comment)
    const today = new window.Date()
    const formattedDate = `${today.getFullYear()}년 ${today.getMonth() + 1}월 ${today.getDate()}일`;
    const uploadComment = () => {
        userComments.push({
            profileImg: `${JSON.parse(sessionStorage.getItem("logined")).profileImg}`,
            comment: comment,
            nickName: `${JSON.parse(sessionStorage.getItem("logined")).nickName}`,
            date: formattedDate,
            rank: star
        })
        setComment("")
        setStar(0)
        console.log(userComments)
    }
    //별점 
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
        console.log(rankArr)
        for (let i = 0; i < rankArr.length; i++) {
            starRank.push(<FaStar style={{ color: `${rankArr[i]}` }} />)
        }
        return starRank
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
                        <Title>{test[0][0]}</Title>
                        <Img style={{ backgroundImage: `url(${test[0][3]})` }} />
                    </LeftItems>
                    <RightItems style={{ margin: `${windowSize < 800 ? "0 6vw" : "0 6vw 0 10px"}` }}>
                        <Title></Title>
                        <Address>주소 : {test[0][1]}</Address>
                        <Precautions>주의사항 : {test[0][2]}</Precautions>
                    </RightItems>
                </Items>
                <Comments>
                    {
                        sessionStorage.getItem("logined") !== null
                            ?
                            <CommentsInputs>
                                <InputGroup className="mb-3">
                                    <Dropdown>
                                        <Dropdown.Toggle id="dropdown-basic">
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
                                    <Form.Control
                                        value={comment}
                                        name="comment"
                                        onChange={(e) => setComment(e.target.value)}
                                        aria-label="Recipient's username"
                                        aria-describedby="basic-addon2"
                                    />
                                    <Button variant="outline-secondary" id="button-addon2"
                                        onClick={uploadComment}
                                    >
                                        댓글 달기
                                    </Button>
                                </InputGroup>
                            </CommentsInputs>
                            : null
                    }
                    {
                        userComments.map((e, i) => (
                            <CommentsItems key={i}>
                                <CommentsLeftBox>
                                    <CommentsImg style={{ backgroundImage: `url(${e.profileImg})` }} />
                                    <CommentsNickName>{e.nickName}</CommentsNickName>
                                </CommentsLeftBox>
                                <CommentsRightBox>
                                    <CommentsRank>
                                        {starRank(e.rank)}
                                    </CommentsRank>
                                    <CommentsText>{e.comment}</CommentsText>
                                    <Date>
                                        <CommentsDate>{e.date}</CommentsDate>
                                    </Date>
                                </CommentsRightBox>
                            </CommentsItems>
                        ))
                    }
                </Comments>
            </Container>
        </>
    );
}

export default PhotoDetail;
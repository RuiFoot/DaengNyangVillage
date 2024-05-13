import styled from "styled-components";
import { useEffect, useState } from "react";
import { BsCardText } from "react-icons/bs";
import { IoRestaurantOutline } from "react-icons/io5";
import { MdOutlineShoppingCart } from "react-icons/md";
import { HiOutlinePhoto } from "react-icons/hi2";
import axios from "axios";
import defaultImg from "../img/defaultImg.png"
import { useRecoilValue } from 'recoil';
import { isDarkAtom } from '../atoms';
import themes from "../theme";

const Communitylists = styled.div`
display: grid;
grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
grid-auto-rows: minmax(100px, auto);
gap: 15px;
`
const Communitylist = styled.div`

`
const CommunityTitle = styled.div`
display: flex;
align-items: center;
font-size: clamp(100%, 1.2vw, 120%);
font-weight: bold;
margin-bottom: 5px;
`
const ArticleTitle = styled.div`
font-weight: bold;
margin-bottom: 10px;
`
const Content = styled.a`
text-decoration: none;
cursor: pointer;
border-top : 1px solid ;
border-bottom : 1px solid ;
margin-bottom: 5px;
padding: 5px;
display: flex;
flex-direction: column;
justify-content: space-between;

`
const ImgContent = styled.a`
text-decoration: none;
cursor: pointer;
border-top : 1px solid ;
border-bottom : 1px solid ;
margin-bottom: 5px;
padding: 5px;
display: flex;
justify-content: space-between;
align-items: center;
`
const TextBox = styled.div`
width: 100%;
display: flex;
flex-direction: column;
`
const Writer = styled.div`
text-align: end;
`
const Date = styled.div`
text-align: end;
`
const Img = styled.div`
margin-right: 10px;
height: 80px;
width: 80px;
background-position: center;
background-size: cover;
`

function CommunityHome() {
    //다크모드
    const isDark = useRecoilValue(isDarkAtom);
    const switchColor = `${isDark ? themes.dark.color : themes.light.color}`
    const switchBgColor = `${isDark ? themes.dark.bgColor : themes.light.bgColor}`
    //현재 로그인한 유저 닉네임
    const [loginedNickName, setLoginedNickName] = useState("")
    useEffect(() => {
        if (sessionStorage.getItem("logined") !== null) {
            setLoginedNickName("/" + JSON.parse(sessionStorage.getItem("logined")).nickName)
        }
    });
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

    // 스프링 통신
    const [freeBoard, setFreeBoard] = useState({
        boardId: 0,
        memberNo: 0,
        nickname: "",
        category: "",
        preface: "",
        boardName: "",
        createDate: "",
        imgPath: "",
        reviewCnt: 0,
        area: "",
        price: ""
    })
    const [trainingBoard, setTrainingBoard] = useState({
        boardId: 0,
        memberNo: 0,
        nickname: "",
        category: "",
        preface: "",
        boardName: "",
        createDate: "",
        imgPath: "",
        reviewCnt: 0,
        area: "",
        price: ""
    })
    const [petBoastBoard, setPetBoastBoard] = useState({
        boardId: 0,
        memberNo: 0,
        nickname: "",
        category: "",
        preface: "",
        boardName: "",
        createDate: "",
        imgPath: "",
        reviewCnt: 0,
        area: "",
        price: ""
    })
    const [marketBoard, setMarketBoard] = useState({
        boardId: 0,
        memberNo: 0,
        nickname: "",
        category: "",
        preface: "",
        boardName: "",
        createDate: "",
        imgPath: "",
        reviewCnt: 0,
        area: "",
        price: ""
    })
    //최신순 정렬 백에서 정렬해서 주면 없애도됨
    // const sort = (e) => {
    //     if (e.length > 0) {
    //         let sorted = e.sort((a, b) => b.boardId - a.boardId)
    //         return e
    //     }
    // }
    useEffect(() => {
        axios.get('/api/board/자유 게시판')
            .then((res) => {
                setFreeBoard(res.data);
                console.log(res.data)
            })
        console.log(freeBoard)
        axios.get('/api/board/훈련 방법 공유')
            .then((res) => {
                setTrainingBoard(res.data);
            })
        console.log(trainingBoard)
        axios.get('/api/board/반려동물 자랑')
            .then((res) => {
                setPetBoastBoard(res.data);
            })
        console.log(petBoastBoard)
        axios.get('/api/board/댕냥 마켓')
            .then((res) => {
                setMarketBoard(res.data);
            })
        console.log(marketBoard)
    }, []);

    //글에 이미지가 여러게 일경우 대표 이미지 가장 앞에 하나만 보여줌
    const representImg = (e) => {
        if (e !== null) {
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
    return (
        // 화면 크기에 따라 계시판의 width가 달라짐
        <>
            <Communitylists style={{ gridTemplateColumns: `${windowSize > 943 ? 'repeat(auto-fit, minmax(300px, 1fr))' : 'repeat(auto-fit, minmax(195px, 1fr))'}` }}>
                <Communitylist>
                    <CommunityTitle><BsCardText style={{ marginRight: '5px' }} /> 자유게시판</CommunityTitle>
                    {
                        freeBoard.length > 0 &&
                        freeBoard.slice(0, 3).map((e, i) => (
                            <Content
                                style={{
                                    color: switchColor,
                                    backgroundColor: switchBgColor
                                }}
                                key={i}
                                href={`/free-board-detail/${e.boardId}${loginedNickName}`}
                            >
                                <ArticleTitle>[{e.preface}] {e.boardName}</ArticleTitle>
                                <Writer>{e.nickname}</Writer>
                                <Date>{e.createDate.replace("T", ", ").slice(0, 17)}</Date>
                            </Content>
                        ))
                    }
                </Communitylist>
                <Communitylist>
                    <CommunityTitle><HiOutlinePhoto style={{ marginRight: '5px' }} />반려동물 자랑</CommunityTitle>
                    {
                        petBoastBoard.length > 0 &&
                        petBoastBoard.slice(0, 3).map((e, i) => (
                            <ImgContent
                                style={{
                                    color: switchColor,
                                    backgroundColor: switchBgColor
                                }}
                                key={i}
                                href={`/pet-boast-detail/${e.boardId}${loginedNickName}`}
                            >
                                {representImg(e.imgPath)}
                                <TextBox>
                                    <ArticleTitle>{e.boardName}</ArticleTitle>
                                    <>
                                        <Writer>{e.nickname}</Writer>
                                        <Date>{e.createDate.replace("T", ", ").slice(0, 17)}</Date>
                                    </>
                                </TextBox>
                            </ImgContent>
                        ))
                    }
                </Communitylist>
                <Communitylist>
                    <CommunityTitle><BsCardText style={{ marginRight: '5px' }} /> 훈련 방법 공유</CommunityTitle>
                    {
                        trainingBoard.length > 0 &&
                        trainingBoard.slice(0, 3).map((e, i) => (
                            <Content
                                style={{
                                    color: switchColor,
                                    backgroundColor: switchBgColor
                                }}
                                key={i}
                                href={`/training-method-detail/${e.boardId}${loginedNickName}`}
                            >
                                <ArticleTitle>[{e.preface}] {e.boardName}</ArticleTitle>
                                <Writer>{e.nickname}</Writer>
                                <Date>{e.createDate.replace("T", ", ").slice(0, 17)}</Date>
                            </Content>
                        ))
                    }
                </Communitylist>
                <Communitylist>
                    <CommunityTitle><MdOutlineShoppingCart style={{ marginRight: '5px' }} /> 댕냥 마켓</CommunityTitle>
                    {
                        marketBoard.length > 0 &&
                        marketBoard.slice(0, 3).map((e, i) => (
                            <ImgContent
                                style={{
                                    color: switchColor,
                                    backgroundColor: switchBgColor
                                }}
                                key={i}
                                href={`/used-market-detail/${e.boardId}${loginedNickName}`}
                            >
                                {representImg(e.imgPath)}
                                <TextBox>
                                    <ArticleTitle>[{e.preface}] {e.boardName}</ArticleTitle>
                                    <>
                                        <Writer>{e.area} {e.nickname}</Writer>
                                        <Date>{e.createDate.replace("T", ", ").slice(0, 17)}</Date>
                                    </>
                                </TextBox>
                            </ImgContent>
                        ))
                    }
                </Communitylist>
            </Communitylists>
        </>
    );
}

export default CommunityHome;
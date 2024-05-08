import styled from "styled-components";
import { useEffect, useState } from "react";
import { BsCardText } from "react-icons/bs";
import { IoRestaurantOutline } from "react-icons/io5";
import { MdOutlineShoppingCart } from "react-icons/md";
import axios from "axios";

let freeArr = [["옆집 개가 너무 짖어요", "박현수", "2024-04-12"], ["우리집 고양이는 멍멍하고 울어요", "박현수", "2024-04-12"], ["우리집 멍멍이 보고가요", "송민영", "2024-04-12"]]

let marketArr = [["배변패드 팝니다", "경상북도", "정승호", "2024-04-12"], ["캣타워 중고 삽니다", "경기도", "이상빈", "2024-04-12"], ["멍멍이 모자 삽니다", "경기도", "송민영", "2024-04-12"]]

let trainingArr = [["고양이한태 손 받는 방법", "정승호", "2024-04-12"], ["배변 훈련", "이상빈", "2024-04-12"], ["햄스터 산책 방법", "송민영", "2024-04-12"]]

let shopArr = [["금남멧돼지", "경기도", "백진욱", "2024-04-12"], ["알베로", "경기도", "이상빈", "2024-04-12"], ["배롱정원", "제주도", "송민영", "2024-04-12"]]


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
const Content = styled.div`
border-top : 1px solid #B2BEBF;
border-bottom : 1px solid #B2BEBF;
margin-bottom: 5px;
padding: 5px;
`
const ImgContent = styled.div`
border-top : 1px solid #B2BEBF;
border-bottom : 1px solid #B2BEBF;
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
const Area = styled.div`
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
        boardName: "",
        createDate: "",
        imgPath: "",
        reviewCnt: 0,
        area: "",
        price: ""
    })
    //최신순 정렬 백에서 정렬해서 주면 없애도됨
    const sort = (e) => {
        if (e.length > 0) {
            let sorted = e.sort((a, b) => b.boardId - a.boardId)
            return sorted
        }
    }
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
        const index = e.indexOf(",")
        return (
            <Img style={{ backgroundImage: `url(${e.slice(0, index)})` }} />
        )
    }
    return (
        // 화면 크기에 따라 계시판의 width가 달라짐
        <>
            <Communitylists style={{ gridTemplateColumns: `${windowSize > 943 ? 'repeat(auto-fit, minmax(300px, 1fr))' : 'repeat(auto-fit, minmax(195px, 1fr))'}` }}>
                <Communitylist>
                    <CommunityTitle><BsCardText style={{ marginRight: '5px' }} /> 자유게시판</CommunityTitle>
                    {
                        freeBoard.length > 0 &&
                        sort(freeBoard).slice(0, 3).map((e, i) => (
                            <Content key={i}>
                                <ArticleTitle>{e.boardName}</ArticleTitle>
                                <Writer>{e.nickname}</Writer>
                                <Date>{e.createDate.replace("T", ", ").slice(0, 17)}</Date>
                            </Content>
                        ))
                    }
                </Communitylist>
                <Communitylist>
                    <CommunityTitle><BsCardText style={{ marginRight: '5px' }} /> 훈련 방법 공유</CommunityTitle>
                    {
                        trainingBoard.length > 0 &&
                        sort(trainingBoard).slice(0, 3).map((e, i) => (
                            <Content key={i}>
                                <ArticleTitle>{e.boardName}</ArticleTitle>
                                <Writer>{e.nickname}</Writer>
                                <Date>{e.createDate.replace("T", ", ").slice(0, 17)}</Date>
                            </Content>
                        ))
                    }
                </Communitylist>
                <Communitylist>
                    <CommunityTitle><IoRestaurantOutline style={{ marginRight: '5px' }} /> 반려동물 자랑</CommunityTitle>
                    {
                        petBoastBoard.length > 0 &&
                        sort(petBoastBoard).slice(0, 3).map((e, i) => (
                            <ImgContent key={i}>
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
                    <CommunityTitle><MdOutlineShoppingCart style={{ marginRight: '5px' }} /> 댕냥 마켓</CommunityTitle>
                    {
                        marketBoard.length > 0 &&
                        sort(marketBoard).slice(0, 3).map((e, i) => (
                            <ImgContent key={i}>
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
            </Communitylists>
        </>
    );
}

export default CommunityHome;
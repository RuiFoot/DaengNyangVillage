import { useRecoilValue } from 'recoil';
import { isDarkAtom, presentPage } from '../atoms';
import styled from "styled-components";
import themes from "../theme";
import CommunityNav from "./communityNav";
import CommunityHeader from './communityHeader';
import Pagination from "../pagination";
import { useEffect, useState } from 'react';
import { GoDotFill } from "react-icons/go";
import hotPlaceArr from '../imgDate';
import defaultImg from '../defaultImgs';
import axios from "axios";

const Container = styled.div`
min-height: calc(100vh - 86px);
`
const PetBoastItems = styled.div`
min-height: calc(100vh - 229px);
margin: 10px 6vw;
display: grid;
justify-content: center;
grid-template-columns: repeat(auto-fit, 300px);
grid-auto-rows: minmax(100px, auto);
gap: 15px;
`
const PetBoastItem = styled.div`

`
const PetBoastTitle = styled.div`
display: flex;
justify-content: center;
align-items: center;
font-size: clamp(100%, 1vw, 120%);
font-weight: bold;
`
const PetImg = styled.div`
height: 227px;
background-size: cover;
background-position: center;
margin: 10px 0;
`
const ListFooter = styled.div`
display: flex;
flex-direction: column;
align-items: end;
`
const ListItemWriter = styled.div`
`
const ListItemDate = styled.div`
`

function PetBoast() {
    const isDark = useRecoilValue(isDarkAtom);
    const nowPage = useRecoilValue(presentPage);
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

    //현재 로그인한 유저의 닉네임
    let url = ""
    if (window.sessionStorage.key(0) === "logined") {
        url = `/${JSON.parse(sessionStorage.getItem("logined")).nickName}`
    }

    //스프링 통신
    const [board, setBoard] = useState({
        boardId: 0,
        memberNo: 0,
        nickname: "",
        category: "",
        boardName: "",
        createDate: "",
        imgPath: "",
        reviewCnt: 0
    })
    useEffect(() => {
        axios.get('/api/board/반려동물 자랑')
            .then((res) => {
                setBoard(res.data);
                console.log(res.data)
            })
    }, []);

    const totalPost = board.length; // 총 게시물 수
    const pageRange = 12; // 페이지당 보여줄 게시물 수
    const totalPageNum = Math.ceil(board.length / pageRange)
    const btnRange = 5; // 보여질 페이지 버튼의 개수
    const startPost = (nowPage - 1) * pageRange + 1; // 시작 게시물 번호
    const endPost = startPost + pageRange - 1; // 끝 게시물 번호

    //글에 이미지가 여러게 일경우 대표 이미지 가장 앞에 하나만 보여줌
    const representImg = (e) => {
        const index = e.indexOf(",")
        return (
            <PetImg style={{ backgroundImage: `url(${e.slice(0, index)})` }} />
        )
    }
    return (
        <Container style={{
            color: `${isDark ? themes.dark.color : themes.light.color}`,
            backgroundColor: `${isDark ? themes.dark.bgColor : themes.light.bgColor}`
        }}>
            <CommunityNav />
            <CommunityHeader />
            < PetBoastItems style={{
                gridTemplateColumns: windowSize > 1790 ?
                    "repeat(auto-fit,250px)" : "repeat(auto-fit,350px)"
            }} >
                {board.length > 0 &&
                    board.slice(startPost - 1, endPost).map((e, i) => (
                        <PetBoastItem key={i}>
                            <PetBoastTitle>{e.boardName}</PetBoastTitle>
                            {representImg(e.imgPath)}
                            <ListFooter>
                                <ListItemWriter>작성자 : {e.nickname}</ListItemWriter>
                                <ListItemDate>{e.createDate.replace("T", ", ").slice(0, 17)}</ListItemDate>
                            </ListFooter>
                        </PetBoastItem>
                    ))}
            </PetBoastItems >
            <Pagination totalPost={totalPost} pageRange={pageRange} btnRange={btnRange} totalPageNum={totalPageNum} />
        </Container>
    );
}


export default PetBoast;
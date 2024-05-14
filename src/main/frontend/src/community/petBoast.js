import { useRecoilValue } from 'recoil';
import { isDarkAtom, presentPage } from '../components/atoms';
import styled from "styled-components";
import themes from "../components/theme";
import CommunityNav from "./communityNav";
import CommunityHeader from './communityHeader';
import Pagination from "../components/pagination";
import { useEffect, useState } from 'react';
import defaultImg from '../img/defaultImg.png';
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
const PetBoastItem = styled.a`
text-decoration: none;
cursor: pointer;
&:hover {
    transform: scale(1.02);
}
`
const PetBoastTitle = styled.div`
display: flex;
justify-content: center;
align-items: center;
font-size: clamp(100%, 5vw, 120%);
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
const ListHeader = styled.div`
display: flex;
align-items: center;
justify-content: center;
margin: 5px 0 5px 5px;
`
const CommentsCount = styled.div`
margin-left: 5px;
color: #f65151;
font-size: clamp(100%, 5vw, 120%);
`

function PetBoast() {
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

    // 화면 크기 확인
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
        boardId: 0,
        memberNo: 0,
        nickname: "",
        preface: "",
        category: "",
        boardName: "",
        createDate: "",
        imgPath: "",
        reviewCnt: 0
    })
    useEffect(() => {
        axios.get('/api/board/반려동물 자랑')
            .then((res) => {
                setBoard(res.data.content);
                console.log(res.data)
            })
    }, []);

    //페이지네이션
    const nowPage = useRecoilValue(presentPage);
    const pageRange = 12  //pageRange :한페이지에 보여줄 아이템 수
    const startPost = (nowPage - 1) * pageRange + 1; // 시작 게시물 번호
    const endPost = startPost + pageRange - 1; // 끝 게시물 번호

    //글에 이미지가 여러게 일경우 대표 이미지 가장 앞에 하나만 보여줌
    const representImg = (e) => {
        if (e !== null) {
            const index = e.indexOf(",")
            return (
                <PetImg style={{ backgroundImage: `url(${e.slice(0, index)})` }} />
            )
        } else {
            return (
                <PetImg style={{ backgroundImage: `url(${defaultImg})` }} />
            )
        }
    }
    return (
        <Container style={{
            color: switchColor,
            backgroundColor: switchBgColor
        }}>
            <CommunityNav />
            <CommunityHeader />
            < PetBoastItems style={{
                gridTemplateColumns: windowSize > 1790 ?
                    "repeat(auto-fit,250px)" : "repeat(auto-fit,350px)"
            }} >
                {board.length > 0 &&
                    board.slice(startPost - 1, endPost).map((e, i) => (
                        <PetBoastItem style={{
                            color: switchColor
                        }}
                            key={i}
                            href={`/pet-boast-detail/${e.boardId}${loginedNickName}`}
                        >
                            <ListHeader>
                                <PetBoastTitle>{e.boardName}</PetBoastTitle>
                                <CommentsCount>
                                    [{e.reviewCnt}]
                                </CommentsCount>
                            </ListHeader>
                            {representImg(e.imgPath)}
                            <ListFooter>
                                <ListItemWriter>작성자 : {e.nickname}</ListItemWriter>
                                <ListItemDate>{e.createDate.replace("T", ", ").slice(0, 17)}</ListItemDate>
                            </ListFooter>
                        </PetBoastItem>
                    ))}
            </PetBoastItems >
            <Pagination totalPost={board.length} pageRange={pageRange} btnRange={5} totalPageNum={Math.ceil(board.length / 12)} />
            {/*
             totalPageNum : 총 페이지내이션 수
             btnRange : 보여질 페이지 버튼의 개수
            */}
        </Container>
    );
}


export default PetBoast;
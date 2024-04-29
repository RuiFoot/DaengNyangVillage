import CommunityNav from "./communityNav";
import { useEffect, useState } from "react";
import axios from "axios";
import styled from "styled-components";
import ListGroup from 'react-bootstrap/ListGroup';
import { useRecoilValue } from 'recoil';
import { isDarkAtom, presentPage } from '../atoms';
import themes from "../theme";
import Pagination from "../pagination";
import Button from 'react-bootstrap/Button';
import Dropdown from 'react-bootstrap/Dropdown';
import "./communityStyle.css"

let free1 = {
    boardId: 0,
    memberNo: 0,
    boardName: "옆집 개가 너무 짖어요",
    nickname: "olzl",
    createDate: "2024-12-12",
    category: "자유게시판",
    reviewCnt: 210,
    text: "",
    img: ""
}

let free2 = {
    boardId: 1,
    memberNo: 0,
    boardName: "우리집 고양이는 멍멍하고 울어요",
    nickname: "olzl",
    createDate: "2024-12-13",
    category: "자유게시판",
    reviewCnt: 10,
    text: "",
    img: ""
}
let free3 = {
    boardId: 2,
    memberNo: 1,
    boardName: "우리집 멍멍이 보고가요",
    nickname: "송민영",
    createDate: "2024-11-12",
    category: "자유게시판",
    reviewCnt: 3,
    text: "",
    img: ""
}
let free4 = {
    boardId: 3,
    memberNo: 0,
    boardName: "옆집 개가 너무 짖어요",
    nickname: "olzl",
    createDate: "2024-10-12",
    category: "자유게시판",
    reviewCnt: 210,
    text: "",
    img: ""
}
let free5 = {
    boardId: 4,
    memberNo: 0,
    boardName: "옆집 개가 너무 짖어요",
    nickname: "olzl",
    createDate: "2024-09-12",
    category: "자유게시판",
    reviewCnt: 210,
    text: "",
    img: ""
}
let free6 = {
    boardId: 5,
    memberNo: 0,
    boardName: "옆집 개가 너무 짖어요",
    nickname: "olzl",
    createDate: "2024-08-12",
    category: "자유게시판",
    reviewCnt: 210,
    text: "",
    img: ""
}
let free7 = {
    boardId: 2,
    memberNo: 3,
    boardName: "우리집 멍멍이 보고가요",
    nickname: "정승호",
    createDate: "2024-07-12",
    category: "자유게시판",
    reviewCnt: 3,
    text: "",
    img: ""
}
let free8 = {
    boardId: 2,
    memberNo: 4,
    boardName: "우리집 멍멍이 보고가요",
    nickname: "이상빈",
    createDate: "2024-06-12",
    category: "자유게시판",
    reviewCnt: 3,
    text: "",
    img: ""
}
let free9 = {
    boardId: 2,
    memberNo: 2,
    boardName: "우리집 멍멍이 보고가요",
    nickname: "백진욱",
    createDate: "2024-05-12",
    category: "자유게시판",
    reviewCnt: 3,
    text: "",
    img: ""
}
let free10 = {
    boardId: 2,
    memberNo: 1,
    boardName: "우리집 멍멍이 보고가요",
    nickname: "송민영",
    createDate: "2024-04-12",
    category: "자유게시판",
    reviewCnt: 3,
    text: "",
    img: ""
}
let free11 = {
    boardId: 2,
    memberNo: 4,
    boardName: "우리집 멍멍이 보고가요",
    nickname: "이상빈",
    createDate: "2024-03-12",
    category: "자유게시판",
    reviewCnt: 3,
    text: "",
    img: ""
}
let free12 = {
    boardId: 2,
    memberNo: 3,
    boardName: "우리집 멍멍이 보고가요",
    nickname: "정승호",
    createDate: "2024-02-12",
    category: "자유게시판",
    reviewCnt: 3,
    text: "",
    img: ""
}
let free13 = {
    boardId: 2,
    memberNo: 2,
    boardName: "우리집 멍멍이 보고가요",
    nickname: "백진욱",
    createDate: "2024-01-12",
    category: "자유게시판",
    reviewCnt: 3,
    text: "",
    img: ""
}

const Container = styled.div`
min-height: calc(100vh - 86px);
`

const ListItem = styled.div`
display: flex;
justify-content: center;
height: 80px;
margin: 5px 0;
border-bottom: 1px solid rgba(0, 0, 0, 0.234);
flex-direction: column;
`
const ListHeader = styled.div`
display: flex;
align-items: center;
margin: 5px 0 5px 5px;
`
const ListFooter = styled.div`
display: flex;
align-items: center;
margin: 5px;
justify-content: end;
`
const ListTitle = styled.div`
margin: 0 5px 0 0;
font-size: clamp(100%, 5vw, 120%);
`
const CommentsCount = styled.div`
border: 1px solid ;
border-radius: 5px;
background-color: #F288CD;
color: white;
font-size: 14px;
padding: 0 5px;
`
const BoardHeader = styled.div`
margin: 10px 6vw 0 6vw;
display: flex;
justify-content: flex-end;
`

let freeArr = [free1, free2, free3, free4, free5, free6, free7, free8, free9, free10, free11, free12, free13]

function FreeBoard() {
    let nickName
    if (window.sessionStorage.key(0) === "logined") {
        nickName = JSON.parse(sessionStorage.getItem("logined")).nickName
    }

    const [board, setBoard] = useState({
        boardId: 0,
        memberNo: 0,
        nickname: "",
        category: "",
        boardName: "",
        createDate: "",
        reviewCnt: 0
    })

    useEffect(() => {
        axios.get('/api/board/잡담')
            .then((res) => {
                setBoard(res.data);
            })
    }, []);
    console.log(board)
    console.log(freeArr)
    const isDark = useRecoilValue(isDarkAtom);
    const nowPage = useRecoilValue(presentPage);
    const totalPost = freeArr.length; // 총 게시물 수
    const pageRange = 6; // 페이지당 보여줄 게시물 수
    const totalPageNum = Math.ceil(freeArr.length / pageRange)
    const btnRange = 5; // 보여질 페이지 버튼의 개수
    const startPost = (nowPage - 1) * pageRange + 1; // 시작 게시물 번호
    const endPost = startPost + pageRange - 1; // 끝 게시물 번호

    const goWrite = () => {
        window.location.href = `/text-write/${nickName}`
    }
    return (
        <Container style={{
            color: `${isDark ? themes.dark.color : themes.light.color}`,
            backgroundColor: `${isDark ? themes.dark.bgColor : themes.light.bgColor}`
        }}>
            <CommunityNav />
            <BoardHeader>
                <Dropdown >
                    <Dropdown.Toggle className="headerBtn" id="dropdown-basic" style={{
                        borderColor: "#F288CD",
                        color: `${isDark ? themes.dark.color : themes.light.color}`,
                        backgroundColor: `${isDark ? themes.dark.bgColor : themes.light.bgColor}`
                    }}>
                        정렬
                    </Dropdown.Toggle>
                    <Dropdown.Menu >
                        <Dropdown.Item href="#/action-1">날짜 오름차순</Dropdown.Item>
                        <Dropdown.Item href="#/action-2">날짜 내림차순</Dropdown.Item>
                    </Dropdown.Menu>
                </Dropdown>
                {
                    window.sessionStorage.key(0) === "logined" ?
                        <Button className="headerBtn" style={{
                            borderColor: "#F288CD",
                            color: `${isDark ? themes.dark.color : themes.light.color}`,
                            backgroundColor: `${isDark ? themes.dark.bgColor : themes.light.bgColor}`
                        }}
                            onClick={goWrite}
                        >글쓰기</Button>
                        :
                        null
                }
            </BoardHeader>
            <ListGroup style={{ margin: `10px 6vw` }}>
                {
                    freeArr.slice(startPost - 1, endPost).map((e, i) => (
                        <ListItem
                            key={i}
                            style={{ borderBottom: `${isDark ? "1px solid white" : "1px solid rgba(0, 0, 0, 0.234)"}` }}
                        >
                            <ListHeader>
                                <ListTitle className="fw-bold">{e.boardName}
                                </ListTitle>
                                <CommentsCount>
                                    {e.reviewCnt}
                                </CommentsCount>
                            </ListHeader>
                            <ListFooter>
                                {e.nickname}, {e.createDate}
                            </ListFooter>
                        </ListItem>
                    ))
                }
            </ListGroup>
            <Pagination totalPost={totalPost} pageRange={pageRange} btnRange={btnRange} totalPageNum={totalPageNum} />
        </Container>
    );
}


export default FreeBoard;
import CommunityNav from "./communityNav";
import { useEffect, useState } from "react";
import axios from "axios";
import styled from "styled-components";
import ListGroup from 'react-bootstrap/ListGroup';
import { useRecoilValue } from 'recoil';
import { isDarkAtom, presentPage } from '../atoms';
import themes from "../theme";
import Pagination from "../pagination";
import "./communityStyle.css"
import CommunityHeader from "./communityHeader";

const Container = styled.div`
min-height: calc(100vh - 86px);
`

const ListItem = styled.a`
cursor: pointer;
text-decoration: none;
display: flex;
justify-content: center;
border-bottom: 1px solid;
flex-direction: column;
&:hover {
    border-bottom: 1px solid #F288CD;
}
`
const ListHeader = styled.div`
display: flex;
align-items: center;
margin: 5px 0 5px 5px;
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
const ListFooter = styled.div`
display: flex;
flex-direction: column;
align-items: end;
`
const ListItemWriter = styled.div`
`
const ListItemDate = styled.div`
`


function FreeBoard() {

    //스프링 통신
    const [board, setBoard] = useState({
        boardId: 0,
        memberNo: 0,
        nickname: "",
        preface: "",
        category: "",
        boardName: "",
        createDate: "",
        reviewCnt: 0
    })

    useEffect(() => {
        axios.get('/api/board/자유 게시판')
            .then((res) => {
                setBoard(res.data);
            })
    }, []);

    const isDark = useRecoilValue(isDarkAtom);
    const nowPage = useRecoilValue(presentPage);
    const totalPost = board.length; // 총 게시물 수
    const pageRange = 10; // 페이지당 보여줄 게시물 수
    const totalPageNum = Math.ceil(board.length / pageRange)
    const btnRange = 5; // 보여질 페이지 버튼의 개수
    const startPost = (nowPage - 1) * pageRange + 1; // 시작 게시물 번호
    const endPost = startPost + pageRange - 1; // 끝 게시물 번호

    //현재 로그인한 유저의 닉네임
    let url = ""
    if (window.sessionStorage.key(0) === "logined") {
        url = `/${JSON.parse(sessionStorage.getItem("logined")).nickName}`
    }
    return (
        <Container style={{
            color: `${isDark ? themes.dark.color : themes.light.color}`,
            backgroundColor: `${isDark ? themes.dark.bgColor : themes.light.bgColor}`
        }}>
            <CommunityNav />
            <CommunityHeader />
            <ListGroup style={{ gap: "10px", margin: `10px 6vw` }}>
                {
                    board.length > 0 &&
                    board.slice(startPost - 1, endPost).map((e, i) => (
                        <ListItem
                            key={i}
                            href={`/free-board-detail/${e.boardId}${url}`}
                            style={{ color: `${isDark ? themes.dark.color : themes.light.color}`, borderBottom: `${isDark ? "1px solid white" : "1px solid rgba(0, 0, 0, 0.234)"}` }}
                        >
                            <ListHeader>
                                <ListTitle className="fw-bold">[{e.preface}] {e.boardName}
                                </ListTitle>
                                <CommentsCount>
                                    {e.reviewCnt}
                                </CommentsCount>
                            </ListHeader>
                            <ListFooter>
                                <ListItemWriter>작성자 : {e.nickname}</ListItemWriter>
                                <ListItemDate>{e.createDate.replace("T", ", ").slice(0, 17)}</ListItemDate>
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
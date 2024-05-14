import styled from "styled-components";
import themes from "../components/theme";
import CommunityNav from "./communityNav";
import CommunityHeader from './communityHeader';
import { useEffect, useState } from "react";
import axios from "axios";
import ListGroup from 'react-bootstrap/ListGroup';
import { useRecoilValue } from 'recoil';
import { isDarkAtom, presentPage } from '../components/atoms';
import Pagination from "../components/pagination";
import "./communityStyle.css"

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
margin-left: 5px;
color: #f65151;
font-size: clamp(100%, 5vw, 120%);
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

function TrainingMethod() {
    //다크모드
    const isDark = useRecoilValue(isDarkAtom);
    const switchColor = `${isDark ? themes.dark.color : themes.light.color}`
    const switchBgColor = `${isDark ? themes.dark.bgColor : themes.light.bgColor}`

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
        preface: "",
        category: "",
        boardName: "",
        createDate: "",
        reviewCnt: 0
    })

    useEffect(() => {
        axios.get('/api/board/훈련 방법 공유')
            .then((res) => {
                setBoard(res.data.content);
            })
    }, []);

    //페이지네이션
    const nowPage = useRecoilValue(presentPage); //현재 페이지내이션 페이지
    const pageRange = 12  //pageRange :한페이지에 보여줄 아이템 수
    const startPost = (nowPage - 1) * pageRange + 1; // 시작 게시물 번호
    const endPost = startPost + pageRange - 1; // 끝 게시물 번호
    return (
        <Container style={{
            color: switchColor,
            backgroundColor: switchBgColor
        }}>
            <CommunityNav />
            <CommunityHeader />
            <ListGroup style={{ margin: `10px 6vw` }}>
                {
                    board.length > 0 &&
                    board.slice(startPost - 1, endPost).map((e, i) => (
                        <ListItem
                            key={i}
                            href={`/training-method-detail/${e.boardId}${url}`}
                            style={{ color: switchColor, borderBottom: `${isDark ? "1px solid white" : "1px solid rgba(0, 0, 0, 0.234)"}` }}
                        >
                            <ListHeader>
                                <ListTitle className="fw-bold">[{e.preface}] {e.boardName}
                                </ListTitle>
                                <CommentsCount>
                                    [{e.reviewCnt}]
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
            <Pagination totalPost={board.length} pageRange={pageRange} btnRange={5} totalPageNum={Math.ceil(board.length / 12)} />
            {/*
             totalPageNum : 총 페이지내이션 수
             btnRange : 보여질 페이지 버튼의 개수
            */}
        </Container>
    );
}


export default TrainingMethod;
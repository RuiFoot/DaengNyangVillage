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
border-radius: 5px;
padding: 10px;
cursor: pointer;
text-decoration: none;
display: flex;
justify-content: center;
flex-direction: column;
&:hover {
    border-bottom: 1px solid #F2884B;
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
    const [board, setBoard] = useState({})
    const [page, setPage] = useState({})
    const nowPage = useRecoilValue(presentPage);
    useEffect(() => {
        axios.get(`/api/board/훈련 방법 공유?page=${nowPage - 1}`)
            .then((res) => {
                setBoard(res.data.content);
                setPage({
                    empty: res.data.empty,
                    first: res.data.first,
                    last: res.data.last,
                    number: res.data.number,
                    numberOfElements: res.data.numberOfElements,
                    pageable: res.data.pageable,
                    size: res.data.size,
                    sort: res.data.sort,
                    totalElements: res.data.totalElements,
                    totalPages: res.data.totalPages
                })
                console.log(res.data)
            })
    }, [nowPage]);
    // console.log(board)
    // console.log("지금 여기" + nowPage)
    const pageRange = page.size //pageRange :한페이지에 보여줄 아이템 수
    // console.log(board.category)
    return (
        <Container style={{
            color: switchColor,
            backgroundColor: switchBgColor
        }}>
            <CommunityNav />
            <CommunityHeader />
            <ListGroup style={{ gap: "20px", margin: `10px 10vw` }}>
                {
                    board.length > 0 &&
                    board.map((e, i) => (
                        <ListItem
                            key={i}
                            href={`/training-method-detail/${e.boardId}${url}`}
                            style={{ boxShadow: isDark ? `0px 5px 10px 2px black` : `0px 5px 10px 2px #E8E8E8`, color: switchColor }}
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
            {
                pageRange ? <Pagination totalPost={page.totalElements} pageRange={pageRange} btnRange={5} totalPageNum={page.totalPages} />
                    : null
            }
            {/*
             totalPageNum : 총 페이지내이션 수
             btnRange : 보여질 페이지 버튼의 개수
            */}
        </Container>
    );
}


export default TrainingMethod;
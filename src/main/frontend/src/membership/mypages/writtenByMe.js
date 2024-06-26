import styled from "styled-components";
import ListGroup from 'react-bootstrap/ListGroup';
import MypageNavbar from './mypageNavbar';
import { useRecoilValue } from 'recoil';
import { isDarkAtom, presentPage } from '../../components/atoms';
import themes from "../../components/theme";
import Pagination from "../../components/pagination";
import { useEffect, useState } from "react";
import axios from "axios";

const Container = styled.div`
min-height: calc(100vh - 229px);
display: flex;
flex-direction: column;
justify-content: center;
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
const ListFooter = styled.div`
display: flex;
flex-direction: column;
align-items: end;
margin: 5px;
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

function WrittenByMe() {
    //다크모드
    const isDark = useRecoilValue(isDarkAtom);
    const switchColor = `${isDark ? themes.dark.color : themes.light.color}`
    const switchBgColor = `${isDark ? themes.dark.bgColor : themes.light.bgColor}`
    //현재 로그인한 유저 닉네임
    let url = ""
    if (window.sessionStorage.key(0) === "logined") {
        url = `/${JSON.parse(sessionStorage.getItem("logined")).nickName}`
    }
    const baseUrl = "http://localhost:8080";
    //스프링 통신
    //알맞은 상세페이지 이동
    const checkCategory = (input) => {
        if (input.category === "댕냥 마켓") {
            window.location.href = `/used-market-detail/${input.boardId}${url}`
        } else if (input.category === "반려동물 자랑") {
            window.location.href = `/pet-boast-detail/${input.boardId}${url}`
        } else if (input.category === "자유 게시판") {
            window.location.href = `/free-board-detail/${input.boardId}${url}`
        } else if (input.category === "훈련 방법 공유") {
            window.location.href = `/training-method-detail/${input.boardId}${url}`
        }
    }

    //스프링 통신
    const [board, setBoard] = useState({})
    const [page, setPage] = useState({})
    const nowPage = useRecoilValue(presentPage);
    useEffect(() => {
        // `http://localhost:8080/member/post?memberNo=202400031&page=0`
        axios.get(`/api/member/post?memberNo=${JSON.parse(sessionStorage.getItem("logined")).memberNo}&page=${nowPage - 1}`)
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

    //페이지네이션
    const pageRange = page.size //pageRange :한페이지에 보여줄 아이템 수
    // console.log(board.category)

    return (
        <div>
            <MypageNavbar />
            <Container style={{
                color: switchColor,
                backgroundColor: switchBgColor
            }}>
                <ListGroup style={{ gap: "20px", margin: `30px 10vw 10px 10vw` }}>
                    {
                        board.length > 0 &&
                        board.map((e, i) => (
                            <ListItem
                                key={i}
                                onClick={() => { checkCategory(e) }}
                                style={{ boxShadow: isDark ? `0px 5px 10px 2px black` : `0px 5px 10px 2px #E8E8E8`, color: `${isDark ? themes.dark.color : themes.light.color}` }}
                            >
                                <ListHeader>
                                    <ListTitle className="fw-bold">{e.boardName}
                                    </ListTitle>
                                    <CommentsCount>
                                        [{e.reviewCnt}]
                                    </CommentsCount>
                                </ListHeader>
                                <ListFooter>
                                    <div>{e.category}</div>
                                    {e.nickname}, {e.createDate.replace("T", ", ").slice(0, 17)}
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
        </div>
    );
}

export default WrittenByMe;
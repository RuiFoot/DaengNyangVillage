import styled from "styled-components";
import ListGroup from 'react-bootstrap/ListGroup';
import MypageNavbar from './mypageNavbar';
import { useRecoilValue } from 'recoil';
import { isDarkAtom, presentPage } from '../../atoms';
import themes from "../../theme";
import Pagination from "../../pagination";
import { useEffect, useState } from "react";
import axios from "axios";

const Container = styled.div`
min-height: calc(100vh - 229px);
display: flex;
flex-direction: column;
justify-content: center;
`
const ListItem = styled.a`
cursor: pointer;
text-decoration: none;
display: flex;
justify-content: center;
margin: 5px 0;
border-bottom: 1px solid;
flex-direction: column;
&:hover {
    border-bottom: 1px solid #F2884B ;
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
    //현재 로그인한 유저 닉네임
    const [loginedNickName, setLoginedNickName] = useState("")

    const baseUrl = "http://localhost:8080";
    //스프링 통신
    const [board, setBoard] = useState({
        boardId: 0,
        memberNo: 0,
        nickname: "",
        category: "",
        boardName: "",
        createDate: "",
        imgPath: "",
        preface: "",
        reviewCnt: 0,
        price: "",
        area: ""
    })
    useEffect(() => {
        if (sessionStorage.getItem("logined") !== null) {
            setLoginedNickName("/" + JSON.parse(sessionStorage.getItem("logined")).nickName)
            axios.get(`${baseUrl}/member/post?memberNo=${JSON.parse(sessionStorage.getItem("logined")).memberNo}`)
                .then((res) => {
                    setBoard(res.data);
                })
        }
    }, []);


    //알맞은 상세페이지 이동
    const checkCategory = (input) => {
        if (input.category === "댕냥 마켓") {
            window.location.href = `/used-market-detail/${input.boardId}${loginedNickName}`
        } else if (input.category === "반려동물 자랑") {
            window.location.href = `/pet-boast-detail/${input.boardId}${loginedNickName}`
        } else if (input.category === "자유 게시판") {
            window.location.href = `/free-board-detail/${input.boardId}${loginedNickName}`
        } else if (input.category === "훈련 방법 공유") {
            window.location.href = `/training-method-detail/${input.boardId}${loginedNickName}`
        }
    }

    const isDark = useRecoilValue(isDarkAtom);
    const nowPage = useRecoilValue(presentPage);
    const totalPost = board.length; // 총 게시물 수
    const pageRange = 10; // 페이지당 보여줄 게시물 수
    const totalPageNum = Math.ceil(board.length / pageRange)
    const btnRange = 5; // 보여질 페이지 버튼의 개수
    const startPost = (nowPage - 1) * pageRange + 1; // 시작 게시물 번호
    const endPost = startPost + pageRange - 1; // 끝 게시물 번호
    return (
        <div>
            <MypageNavbar />
            <Container style={{
                color: `${isDark ? themes.dark.color : themes.light.color}`,
                backgroundColor: `${isDark ? themes.dark.bgColor : themes.light.bgColor}`
            }}>
                <ListGroup style={{ margin: `10px 6vw` }}>
                    <div style={{ margin: `20px 0` }}></div>
                    {
                        board.length > 0 &&
                        board.slice(startPost - 1, endPost).map((e, i) => (
                            <ListItem
                                key={i}
                                onClick={() => { checkCategory(e) }}
                                style={{ color: `${isDark ? themes.dark.color : themes.light.color}` }}
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
                <Pagination totalPost={totalPost} pageRange={pageRange} btnRange={btnRange} totalPageNum={totalPageNum} />
            </Container>
        </div>
    );
}

export default WrittenByMe;
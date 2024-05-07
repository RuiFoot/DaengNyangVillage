import styled from "styled-components";
import ListGroup from 'react-bootstrap/ListGroup';
import MypageNavbar from './mypageNavbar';
import { useRecoilValue } from 'recoil';
import { isDarkAtom, presentPage } from '../../atoms';
import themes from "../../theme";
import Pagination from "../../pagination";

let free1 = {
    title: "옆집 개가 너무 짖어요",
    writer: "olzl",
    date: "2024-04-12",
    category: "자유게시판",
    commentsCount: 210,
    text: "",
    img: ""
}

let free2 = {
    title: "우리집 고양이는 멍멍하고 울어요",
    writer: "olzl",
    date: "2024-04-13",
    category: "자유게시판",
    commentsCount: 10,
    text: "",
    img: ""
}
let free3 = {
    title: "우리집 멍멍이 보고가요",
    writer: "송민영",
    date: "2024-04-12",
    category: "자유게시판",
    commentsCount: 3,
    text: "",
    img: ""
}
let free4 = {
    title: "옆집 개가 너무 짖어요",
    writer: "olzl",
    date: "2024-04-12",
    category: "자유게시판",
    commentsCount: 210,
    text: "",
    img: ""
}
let free5 = {
    title: "옆집 개가 너무 짖어요",
    writer: "olzl",
    date: "2024-04-12",
    category: "자유게시판",
    commentsCount: 210,
    text: "",
    img: ""
}
let free6 = {
    title: "옆집 개가 너무 짖어요",
    writer: "olzl",
    date: "2024-04-12",
    category: "자유게시판",
    commentsCount: 210,
    text: "",
    img: ""
}
let market1 = {
    title: "배변패드 팝니다",
    location: "경상북도",
    writer: "olzl",
    date: "2024-04-12",
    category: "댕냥마켓",
    commentsCount: 1230,
    text: "",
    img: ""
}
let market2 = {
    title: "캣타워 중고 삽니다",
    location: "경기도",
    writer: "이상빈",
    date: "2024-04-12",
    category: "댕냥마켓",
    commentsCount: 10,
    text: "",
    img: ""
}
let market3 = {
    title: "멍멍이 모자 삽니다",
    location: "경기도",
    writer: "송민영",
    date: "2024-04-12",
    category: "댕냥마켓",
    commentsCount: 1230,
    text: "",
    img: ""
}

let training1 = {
    title: "고양이한태 손 받는 방법",
    writer: "olzl",
    date: "2024-04-12",
    category: "훈련방법공유",
    commentsCount: 0,
    text: "",
    img: ""
}
let training2 = {
    title: "배변 훈련",
    writer: "이상빈",
    date: "2024-04-12",
    category: "훈련방법공유",
    commentsCount: 120,
    text: "",
    img: ""
}
let training3 = {
    title: "햄스터 산책 방법",
    writer: "송민영",
    date: "2024-04-12",
    category: "훈련방법공유",
    commentsCount: 240,
    text: "",
    img: ""
}
let mypet1 = {
    title: "우리집 강아지",
    writer: "송민영",
    date: "2024-04-12",
    category: "반려동물자랑",
    commentsCount: 2110,
    text: "",
    img: ""
}
let mypet2 = {
    title: "우리집 고양이",
    writer: "olzl",
    date: "2024-04-12",
    category: "반려동물자랑",
    commentsCount: 12320,
    text: "",
    img: ""
}
let mypet3 = {
    title: "우리집 물고기",
    writer: "olzl",
    date: "2024-04-12",
    category: "반려동물자랑",
    commentsCount: 20,
    text: "",
    img: ""
}


const Container = styled.div`
min-height: calc(100vh - 229px);
display: flex;
flex-direction: column;
justify-content: center;
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

let freeArr = [free1, free2, free3, free4, free5, free6]

let marketArr = [market1, market2, market3]

let trainingArr = [training1, training2, training3]

let mypetArr = [mypet1, mypet2, mypet3]
let myArr = []
if (window.sessionStorage.key(0) === "logined") {
    const nickName = JSON.parse(sessionStorage.getItem("logined")).nickName
    myArr = freeArr.concat(marketArr, trainingArr, mypetArr).filter((e) => e.writer === nickName)
}


function WrittenByMe() {
    const isDark = useRecoilValue(isDarkAtom);
    const nowPage = useRecoilValue(presentPage);
    const totalPost = myArr.length; // 총 게시물 수
    const pageRange = 10; // 페이지당 보여줄 게시물 수
    const totalPageNum = Math.ceil(myArr.length / pageRange)
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
                        myArr.slice(startPost - 1, endPost).map((e, i) => (
                            <ListItem
                                key={i}
                                style={{ borderBottom: `${isDark ? "1px solid white" : "1px solid rgba(0, 0, 0, 0.234)"}` }}
                            >
                                <ListHeader>
                                    <ListTitle className="fw-bold">{e.title}
                                    </ListTitle>
                                    <CommentsCount>
                                        {e.commentsCount}
                                    </CommentsCount>
                                </ListHeader>
                                <ListFooter>
                                    {e.category}, {e.writer}, {e.date}
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
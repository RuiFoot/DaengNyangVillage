import { useRecoilValue } from 'recoil';
import { isDarkAtom, presentPage } from '../components/atoms';
import styled from "styled-components";
import themes from "../components/theme";
import CommunityNav from "./communityNav";
import CommunityHeader from './communityHeader';
import Pagination from "../components/pagination";
import HotdealBar from '../home/hotdeal';
import { useEffect, useState } from 'react';
import { GoDotFill } from "react-icons/go";
import axios from "axios";
import defaultImg from "../img/defaultImg.png"

const Container = styled.div`
min-height: calc(100vh - 86px);
`
const MarketItems = styled.div`
margin: 10px 10vw;
display: grid;
justify-content: center;
grid-template-columns: repeat(auto-fit, 300px);
grid-auto-rows: minmax(100px, auto);
gap: 20px;
`
const MarketItem = styled.a`
padding: 10px;
border-radius: 5px;
text-decoration: none;
cursor: pointer;
&:hover {
    transform: scale(1.02);
}
`
const MarketItemTitle = styled.div`
display: flex;
justify-content: center;
align-items: center;
font-size: clamp(100%, 5vw, 120%);
font-weight: bold;
`
const MarketItemImg = styled.div`
height: 227px;
background-size: cover;
background-position: center;
margin: 10px 0;
`
const MarketItemAddress = styled.div`
`
const MarketItemPrice = styled.div`
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

function UsedMarket() {
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
    //화면 가로 크기의 변화에 따라 보여주는 아이템 갯수 변화
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
    const [board, setBoard] = useState({})
    const [page, setPage] = useState({})
    const nowPage = useRecoilValue(presentPage);
    useEffect(() => {
        axios.get(`/api/board/댕냥 마켓?page=${nowPage - 1}`)
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
    //글에 이미지가 여러게 일경우 대표 이미지 가장 앞에 하나만 보여줌
    const representImg = (e) => {
        if (e !== null) {
            if (e.indexOf(`width`) !== -1) {
                return (
                    <MarketItemImg style={{ backgroundImage: `url(${e.substring(0, e.indexOf(`width`) - 2)})` }} />
                )
            } else {
                return (
                    <MarketItemImg style={{ backgroundImage: `url(${e})` }} />
                )
            }
        } else {
            return (
                <MarketItemImg style={{ backgroundImage: `url(${defaultImg})` }} />
            )
        }
    }

    return (
        <Container style={{
            color: switchColor,
            backgroundColor: switchBgColor
        }}>
            <CommunityNav />
            <HotdealBar />
            <CommunityHeader />
            < MarketItems style={{
                gridTemplateColumns: windowSize > 1790 ?
                    "repeat(auto-fit,220px)" : "repeat(auto-fit,350px)"
            }} >
                {
                    board.length > 0 &&
                    board.map((e, i) => (
                        <MarketItem style={{
                            boxShadow: isDark ? `0px 5px 10px 2px black` : `0px 5px 10px 2px #E8E8E8`,
                            color: switchColor
                        }}
                            key={i}
                            href={`/used-market-detail/${e.boardId}${loginedNickName}`}
                        >
                            <ListHeader>
                                <MarketItemTitle>[{e.preface}] {e.boardName}</MarketItemTitle>
                                <CommentsCount>
                                    [{e.reviewCnt}]
                                </CommentsCount>
                            </ListHeader>
                            {representImg(e.imgPath)}
                            <MarketItemAddress><GoDotFill />거래 장소 : {e.area}</MarketItemAddress>
                            <MarketItemPrice><GoDotFill />가격 : {e.price}</MarketItemPrice>
                            <ListFooter>
                                <ListItemWriter>작성자 : {e.nickname}</ListItemWriter>
                                <ListItemDate>{e.createDate.replace("T", ", ").slice(0, 17)}</ListItemDate>
                            </ListFooter>
                        </MarketItem>
                    ))}
            </MarketItems >
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


export default UsedMarket;
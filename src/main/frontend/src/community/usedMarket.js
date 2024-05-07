import { useRecoilValue } from 'recoil';
import { isDarkAtom, presentPage } from '../atoms';
import styled from "styled-components";
import themes from "../theme";
import CommunityNav from "./communityNav";
import CommunityHeader from './communityHeader';
import Pagination from "../pagination";
import HotdealBar from '../home/hotdeal';
import { useEffect, useState } from 'react';
import { GoDotFill } from "react-icons/go";
import hotPlaceArr from '../imgDate';
import axios from "axios";

const Container = styled.div`
min-height: calc(100vh - 86px);
`
const MarketItems = styled.div`
min-height: calc(100vh - 229px);
margin: 10px 6vw;
display: grid;
justify-content: center;
grid-template-columns: repeat(auto-fit, 300px);
grid-auto-rows: minmax(100px, auto);
gap: 15px;
`
const MarketItem = styled.div`

`
const MarketItemTitle = styled.div`
display: flex;
justify-content: center;
align-items: center;
font-size: clamp(100%, 1vw, 120%);
font-weight: bold;
`
const MarketItemImg = styled.div`
height: 227px;
background-size: cover;
background-position: center;
margin: 10px 0;
`
const MarketItemAddress = styled.div`
font-size: clamp(90%, 1vw, 100%);
`
const MarketItemPrice = styled.div`
font-size: clamp(90%, 1vw, 100%);
`

function UsedMarket() {
    const isDark = useRecoilValue(isDarkAtom); //다크모드
    const nowPage = useRecoilValue(presentPage); //페이지네이션
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

    const totalPost = hotPlaceArr.length; // 총 게시물 수
    const pageRange = 12; // 페이지당 보여줄 게시물 수
    const totalPageNum = Math.ceil(hotPlaceArr.length / pageRange)
    const btnRange = 5; // 보여질 페이지 버튼의 개수
    const startPost = (nowPage - 1) * pageRange + 1; // 시작 게시물 번호
    const endPost = startPost + pageRange - 1; // 끝 게시물 번호

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
        axios.get('/api/board/댕냥 마켓')
            .then((res) => {
                setBoard(res.data);
            })
    }, []);

    //글에 이미지가 여러게 일경우 대표 이미지 가장 앞에 하나만 보여줌
    const representImg = (e) => {
        const index = e.indexOf(",")
        return (
            <MarketItemImg style={{ backgroundImage: `url(${e.slice(0, index)})` }} />
        )
    }

    return (
        <Container style={{
            color: `${isDark ? themes.dark.color : themes.light.color}`,
            backgroundColor: `${isDark ? themes.dark.bgColor : themes.light.bgColor}`
        }}>
            <CommunityNav />
            <HotdealBar />
            <CommunityHeader />
            < MarketItems style={{
                gridTemplateColumns: windowSize > 1790 ?
                    "repeat(auto-fit,250px)" : "repeat(auto-fit,350px)"
            }} >
                {
                    board.length > 0 &&
                    board.slice(startPost - 1, endPost).map((e, i) => (
                        <MarketItem key={i}>
                            <MarketItemTitle>{e.boardName}</MarketItemTitle>
                            {representImg(e.imgPath)}
                            <MarketItemAddress><GoDotFill />거래 장소 : {e.area}</MarketItemAddress>
                            <MarketItemPrice><GoDotFill />가격 : {e.price}</MarketItemPrice>
                        </MarketItem>
                    ))}
            </MarketItems >
            <Pagination totalPost={totalPost} pageRange={pageRange} btnRange={btnRange} totalPageNum={totalPageNum} />
        </Container>
    );
}


export default UsedMarket;
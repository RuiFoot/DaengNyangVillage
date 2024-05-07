import styled from "styled-components";
import { GoDotFill } from "react-icons/go";
import { useEffect, useState } from "react";
import MypageNavbar from './mypageNavbar';
import { useRecoilValue } from 'recoil';
import { isDarkAtom, presentPage } from '../../atoms';
import themes from "../../theme";
import Pagination from "../../pagination";
import defaultImg from "../../defaultImgs";
import hotPlaceArr from "../../imgDate";

const Container = styled.div`
display: flex;
flex-direction: column;
`
const PlaceItems = styled.div`
min-height: calc(100vh - 229px);
margin: 10px 6vw;
display: grid;
justify-content: center;
grid-template-columns: repeat(auto-fit,250px);
grid-auto-rows: minmax(100px, auto);
gap: 15px;
`
const PlaceItem = styled.div`

`
const PlaceItemTitle = styled.div`
display: flex;
justify-content: center;
align-items: center;
font-size: clamp(100%, 1vw, 120%);
font-weight: bold;
`
const PlaceItemImg = styled.div`
height: 227px;
background-size: cover;
background-position: center;
margin-bottom: 5px;
`
const PlaceItemAddress = styled.div`
font-size: clamp(90%, 1vw, 100%);
`
const PlaceItemInfo = styled.div`
font-size: clamp(90%, 1vw, 100%);
`

function SelectedLocation() {
    const isDark = useRecoilValue(isDarkAtom);
    const nowPage = useRecoilValue(presentPage);
    const [windowSize, setWindowSiz] = useState(window.innerWidth);
    const handleResize = () => {
        setWindowSiz(window.innerWidth)
        console.log(window.innerWidth)
    }
    useEffect(() => {
        window.addEventListener('resize', handleResize);
        return () => {
            window.addEventListener('resize', handleResize)
        }
    }, [])
    const showImg = (e) => {
        if (e === "미용") return defaultImg.미용
        if (e === "박물관문예회관") return defaultImg.박물관문예회관
        if (e === "병원") return defaultImg.병원
        if (e === "약국") return defaultImg.약국
        if (e === "식당") return defaultImg.식당
        if (e === "여행지") return defaultImg.여행지
        if (e === "애견용품") return defaultImg.애견용품
        if (e === "유치원") return defaultImg.유치원
        if (e === "카페") return defaultImg.카페
        if (e === "호텔펜션") return defaultImg.호텔펜션
    }

    const totalPost = hotPlaceArr.length; // 총 게시물 수
    const pageRange = 12; // 페이지당 보여줄 게시물 수
    const totalPageNum = Math.ceil(hotPlaceArr.length / pageRange)
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
                < PlaceItems style={{
                    gridTemplateColumns: windowSize > 1790 ?
                        "repeat(auto-fit,250px)" : "repeat(auto-fit,350px)"
                }} >
                    {hotPlaceArr.slice(startPost - 1, endPost).map((e, i) => (
                        <PlaceItem key={i}>
                            <PlaceItemTitle>{e[0]}</PlaceItemTitle>
                            <PlaceItemImg style={{ backgroundImage: `url(${showImg(e[3])})` }} />
                            <PlaceItemAddress><GoDotFill />{e[1]}</PlaceItemAddress>
                            <PlaceItemInfo><GoDotFill />{e[2]}</PlaceItemInfo>
                        </PlaceItem>
                    ))}
                </PlaceItems >
                <Pagination totalPost={totalPost} pageRange={pageRange} btnRange={btnRange} totalPageNum={totalPageNum} />
            </Container>
        </div>
    );
}

export default SelectedLocation;
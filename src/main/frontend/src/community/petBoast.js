import { useRecoilValue } from 'recoil';
import { isDarkAtom, presentPage } from '../atoms';
import styled from "styled-components";
import themes from "../theme";
import CommunityNav from "./communityNav";
import CommunityHeader from './communityHeader';
import Pagination from "../pagination";
import { useEffect, useState } from 'react';
import { GoDotFill } from "react-icons/go";
import hotPlaceArr from '../imgDate';
import defaultImg from '../defaultImgs';

const Container = styled.div`
min-height: calc(100vh - 86px);
`
const PetBoastItems = styled.div`
min-height: calc(100vh - 229px);
margin: 10px 6vw;
display: grid;
justify-content: center;
grid-template-columns: repeat(auto-fit, 300px);
grid-auto-rows: minmax(100px, auto);
gap: 15px;
`
const PetBoastItem = styled.div`

`
const PetBoastTitle = styled.div`
display: flex;
justify-content: center;
align-items: center;
font-size: clamp(100%, 1vw, 120%);
font-weight: bold;
`
const PetImg = styled.div`
height: 227px;
background-size: cover;
background-position: center;
margin-bottom: 5px;
`

function PetBoast() {
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
    const totalPost = hotPlaceArr.length; // 총 게시물 수
    const pageRange = 12; // 페이지당 보여줄 게시물 수
    const totalPageNum = Math.ceil(hotPlaceArr.length / pageRange)
    const btnRange = 5; // 보여질 페이지 버튼의 개수
    const startPost = (nowPage - 1) * pageRange + 1; // 시작 게시물 번호
    const endPost = startPost + pageRange - 1; // 끝 게시물 번호

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

    return (
        <Container style={{
            color: `${isDark ? themes.dark.color : themes.light.color}`,
            backgroundColor: `${isDark ? themes.dark.bgColor : themes.light.bgColor}`
        }}>
            <CommunityNav />
            <CommunityHeader />
            < PetBoastItems style={{
                gridTemplateColumns: windowSize > 1790 ?
                    "repeat(auto-fit,250px)" : "repeat(auto-fit,350px)"
            }} >
                {hotPlaceArr.slice(startPost - 1, endPost).map((e, i) => (
                    <PetBoastItem key={i}>
                        <PetBoastTitle>{e[0]}</PetBoastTitle>
                        <PetImg style={{ backgroundImage: `url(${showImg(e[3])})` }} />
                    </PetBoastItem>
                ))}
            </PetBoastItems >
            <Pagination totalPost={totalPost} pageRange={pageRange} btnRange={btnRange} totalPageNum={totalPageNum} />
        </Container>
    );
}


export default PetBoast;
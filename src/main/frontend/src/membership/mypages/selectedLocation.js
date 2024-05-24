import styled from "styled-components";
import { GoDotFill } from "react-icons/go";
import { useEffect, useState } from "react";
import MypageNavbar from './mypageNavbar';
import { useRecoilValue } from 'recoil';
import { isDarkAtom, presentPage } from '../../components/atoms';
import themes from "../../components/theme";
import Pagination from "../../components/pagination";
import defaultImg from "../../components/defaultImgs";
import axios from "axios";
import { FaStar } from "react-icons/fa6";

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
const PlaceItem = styled.a`
text-decoration: none;
cursor: pointer;
&:hover {
    transform: scale(1.02);
}
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
    //다크모드
    const isDark = useRecoilValue(isDarkAtom);
    const switchColor = `${isDark ? themes.dark.color : themes.light.color}`
    const switchBgColor = `${isDark ? themes.dark.bgColor : themes.light.bgColor}`
    //스프링연동을 위한 url
    const baseUrl = "http://localhost:8080";
    //로그인 확인
    let url = ""
    if (window.sessionStorage.key(0) === "logined") {
        url = `/${JSON.parse(sessionStorage.getItem("logined")).nickName}`
    }

    //페이지네이션 현재 페이지
    const nowPage = useRecoilValue(presentPage);
    // 스프링 통신
    const [board, setBoard] = useState()
    const [page, setPage] = useState({})
    useEffect(() => {
        axios.get(`${baseUrl}/member/favorite?memberNo=${JSON.parse(sessionStorage.getItem("logined")).memberNo}&page=${nowPage - 1}`)
            .then((res) => {
                setBoard(res.data.content)
                console.log(res.data.content)
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

    // 디폴트 이미지
    const showImg = (e) => {
        if (e === "미용") return defaultImg.미용
        if (e === "문예회관" || e === "박물관" || e === "미술관") return defaultImg.박물관문예회관
        if (e === "동물병원") return defaultImg.병원
        if (e === "동물약국") return defaultImg.약국
        if (e === "식당") return defaultImg.식당
        if (e === "여행지") return defaultImg.여행지
        if (e === "반려동물용품") return defaultImg.애견용품
        if (e === "위탁관리") return defaultImg.유치원
        if (e === "카페") return defaultImg.카페
        if (e === "펜션" || e === "호텔") return defaultImg.호텔펜션
    }

    //별점 표시
    const starRankAVG = (e) => {
        let starts = []
        let starRank = []
        let starRankAVGArr = Math.round(e)
        for (let i = 0; i < starRankAVGArr; i++) {
            starts.push("#F2D64B")
        }
        if (starts.length !== 5) {
            for (let i = 0; i < 5 - starRankAVGArr; i++) {
                starts.unshift("#F2F2F2")
            }
        }
        for (let i = 0; i < starts.length; i++) {
            starRank.push(<FaStar style={{ color: `${starts[i]}` }} />)
        }
        return starRank
    }

    //페이지네이션
    const pageRange = page.size //pageRange :한페이지에 보여줄 아이템 수

    return (
        <div>
            <MypageNavbar />
            <Container style={{
                color: switchColor,
                backgroundColor: switchBgColor
            }}>
                < PlaceItems style={{
                    gridTemplateColumns: windowSize > 1790 ?
                        "repeat(auto-fit,250px)" : "repeat(auto-fit,350px)"
                }} >
                    {
                        board &&
                        board.map((e, i) => (
                            <PlaceItem key={i}
                                style={{
                                    color: switchColor,
                                    backgroundColor: switchBgColor
                                }}
                                href={`/recommend-place-detail/${e.animalNum}${url}`}
                            >
                                <PlaceItemTitle>{e.facilityName}</PlaceItemTitle>
                                <PlaceItemImg style={{ backgroundImage: e.imgPath !== null ? `url(${e.imgPath})` : `url(${showImg(e.subClassification)})` }} />
                                <PlaceItemInfo><GoDotFill />{starRankAVG(e.star)}</PlaceItemInfo>
                                <PlaceItemAddress><GoDotFill />{e.roadAddress}</PlaceItemAddress>
                            </PlaceItem>
                        ))}
                </PlaceItems >
                <Pagination totalPost={page.totalElements} pageRange={pageRange} btnRange={5} totalPageNum={page.totalPages} />
                {/*
             totalPageNum : 총 페이지내이션 수
             btnRange : 보여질 페이지 버튼의 개수
            */}
            </Container>
        </div>
    );
}

export default SelectedLocation;
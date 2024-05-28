import styled from "styled-components";
import { GoDotFill } from "react-icons/go";
import './homeStyle.css'
import { useEffect, useState } from "react";
import { useRecoilValue } from 'recoil';
import { isDarkAtom } from '../components/atoms';
import themes from "../components/theme";
import defaultImg from "../components/defaultImgs";
import axios from "axios";
const Container = styled.div`
`

const PlaceItems = styled.div`
display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  grid-auto-rows: minmax(100px, auto);
  gap: 20px;
  margin-bottom: 10px;
  padding: 10px;
`
const CategoryTitle = styled.div`
text-align: center;
font-size: 30px;
font-weight: bold;
margin-bottom: 5px;
padding-top: 10px;
`
const PlaceItem = styled.a`
text-decoration: none;
border: 1px solid #D0D0D0;
padding: 5px;
border-radius: 5px;
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
function HotPlaceList() {
    //다크모드
    const isDark = useRecoilValue(isDarkAtom);
    const switchColor = `${isDark ? themes.dark.color : themes.light.color}`
    const switchBgColor = `${isDark ? themes.dark.bgColor : themes.light.bgColor}`
    //화면크기에 따라서 보여주는 아이템 갯수 변화
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
    //로그인 확인
    let url = ""
    if (window.sessionStorage.key(0) === "logined") {
        url = `/${JSON.parse(sessionStorage.getItem("logined")).nickName}`
    }

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

    //스프링 통신
    const [board, setBoard] = useState({
        animalNum: 0,
        largeClassification: "",
        facilityName: "",
        subClassification: "",
        sido: "",
        sigungu: "",
        eupmyeondong: "",
        ri: "",
        houseNumber: "",
        streetName: "",
        buildingNumber: "",
        latitude: "",
        longitude: "",
        star: 0,
        imgPath: "",
        roadAddress: "",
        numberAddress: ""
    })

    useEffect(() => {
        axios.get('/api/animal/popular')
            .then((res) => {
                setBoard(res.data);
                console.log(res.data)
            })
    }, []);

    return (
        <Container style={{
            boxShadow: isDark ? `0px 5px 10px 2px black` : `0px 5px 10px 2px #E8E8E8`
        }} >
            <a href={`/place-recommend${url}`}>
                <CategoryTitle style={{
                    color: switchColor
                }}>인기장소</CategoryTitle></a>
            < PlaceItems >
                {
                    board.length > 0 &&
                    board.slice(0, windowSize > 979
                        ? 6 : 4).map((e, i) => (
                            <PlaceItem key={i} style={{
                                color: switchColor,
                                backgroundColor: switchBgColor
                            }}
                                href={`/recommend-place-detail/${e.animalNum}${url}`}
                            >
                                <PlaceItemTitle>{e.facilityName}</PlaceItemTitle>
                                <PlaceItemImg style={{ backgroundImage: e.imgPath === null ? `url(${showImg(e.subClassification)})` : `url(${showImg(e.imgPath)})` }} />
                                <PlaceItemAddress><GoDotFill />{e.roadAddress} {e.houseNumber
                                }</PlaceItemAddress>
                                <PlaceItemInfo><GoDotFill />{e.largeClassification}</PlaceItemInfo>
                            </PlaceItem>
                        ))
                }
            </PlaceItems >
        </Container>
    );
}

export default HotPlaceList;
import styled from "styled-components";
import { GoDotFill } from "react-icons/go";
import './homeStyle.css'
import { useEffect, useState } from "react";
import { useRecoilValue } from 'recoil';
import { isDarkAtom } from '../atoms';
import themes from "../theme";
import hotPlaceArr from "../imgDate";
import defaultImg from "../defaultImgs";
import axios from "axios";

const PlaceItems = styled.div`
display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  grid-auto-rows: minmax(100px, auto);
  gap: 15px;
  margin-bottom: 10px;
`

const PlaceItem = styled.a`
text-decoration: none;
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
    const isDark = useRecoilValue(isDarkAtom);
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
    let url = ""
    if (window.sessionStorage.key(0) === "logined") {
        url = `/${JSON.parse(sessionStorage.getItem("logined")).nickName}`
    }

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

    //스프링 통신
    // const [board, setBoard] = useState({
    //     animalNum: 0,
    //     largeClassification: "",
    //     facilityName: "",
    //     subClassification: "",
    //     sido: "",
    //     sigungu: "",
    //     eupmyeondong: "",
    //     ri: "",
    //     houseNumber: "",
    //     streetName: "",
    //     buildingNumber: "",
    //     latitude: "",
    //     longitude: "",
    //     star: 0,
    //     imgPath: "",
    //     roadAddress: "",
    //     numberAddress: ""
    // })

    // useEffect(() => {
    //     axios.get('/api/animal/favorite')
    //         .then((res) => {
    //             setBoard(res.data);
    //         })
    //     console.log(board)
    // }, []);

    return (

        < PlaceItems >
            {
                // 화면 크기에 따라 가져오는 배열이 다름
                windowSize > 979
                    ?
                    hotPlaceArr.slice(0, 6).map((e, i) => (
                        <PlaceItem key={i} style={{
                            color: `${isDark ? themes.dark.color : themes.light.color}`,
                            backgroundColor: `${isDark ? themes.dark.bgColor : themes.light.bgColor}`
                        }}
                            href={`/recommend-place-detail/${e[4]}${url}`}
                        >
                            <PlaceItemTitle>{e[0]}</PlaceItemTitle>
                            <PlaceItemImg style={{ backgroundImage: `url(${showImg(e[3])})` }} />
                            <PlaceItemAddress><GoDotFill />{e[1]}</PlaceItemAddress>
                            <PlaceItemInfo><GoDotFill />{e[2]}</PlaceItemInfo>
                        </PlaceItem>
                    ))
                    :
                    hotPlaceArr.slice(0, 4).map((e, i) => (
                        <PlaceItem key={i} style={{
                            color: `${isDark ? themes.dark.color : themes.light.color}`,
                            backgroundColor: `${isDark ? themes.dark.bgColor : themes.light.bgColor}`
                        }}
                            href={`/recommend-place-detail/${e[4]}${url}`}
                        >
                            <PlaceItemTitle>{e[0]}</PlaceItemTitle>
                            <PlaceItemImg style={{ backgroundImage: `url(${showImg(e[3])})` }} />
                            <PlaceItemAddress><GoDotFill />{e[1]}</PlaceItemAddress>
                            <PlaceItemInfo><GoDotFill />{e[2]}</PlaceItemInfo>
                        </PlaceItem>
                    ))
            }
        </PlaceItems >
    );
}

export default HotPlaceList;
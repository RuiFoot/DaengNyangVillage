import styled from "styled-components";
import { GoDotFill } from "react-icons/go";
import './homeStyle.css'
import { useEffect, useState } from "react";
import { useRecoilValue } from 'recoil';
import { isDarkAtom } from '../atoms';
import themes from "../theme";
import wideHotPlaceArr from "../data";

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
    return (

        < PlaceItems >
            {
                // 화면 크기에 따라 가져오는 배열이 다름
                windowSize > 979
                    ?
                    wideHotPlaceArr.map((e, i) => (
                        <PlaceItem key={i} style={{
                            color: `${isDark ? themes.dark.color : themes.light.color}`,
                            backgroundColor: `${isDark ? themes.dark.bgColor : themes.light.bgColor}`
                        }}
                            href={`/detail-photo/${e[4]}${url}`}
                        >
                            <PlaceItemTitle>{e[0]}</PlaceItemTitle>
                            <PlaceItemImg style={{ backgroundImage: `url(${e[3]})` }} />
                            <PlaceItemAddress><GoDotFill />{e[1]}</PlaceItemAddress>
                            <PlaceItemInfo><GoDotFill />{e[2]}</PlaceItemInfo>
                        </PlaceItem>
                    ))
                    :
                    wideHotPlaceArr.slice(0, 4).map((e, i) => (
                        <PlaceItem key={i} style={{
                            color: `${isDark ? themes.dark.color : themes.light.color}`,
                            backgroundColor: `${isDark ? themes.dark.bgColor : themes.light.bgColor}`
                        }}
                            href={`/detail-photo/${e[4]}${url}`}
                        >
                            <PlaceItemTitle>{e[0]}</PlaceItemTitle>
                            <PlaceItemImg style={{ backgroundImage: `url(${e[3]})` }} />
                            <PlaceItemAddress><GoDotFill />{e[1]}</PlaceItemAddress>
                            <PlaceItemInfo><GoDotFill />{e[2]}</PlaceItemInfo>
                        </PlaceItem>
                    ))
            }
        </PlaceItems >
    );
}

export default HotPlaceList;
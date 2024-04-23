import styled from "styled-components";
import { GoDotFill } from "react-icons/go";
import { useState } from "react";
import MypageNavbar from './MypageNavbar';

const PlaceItems = styled.div`
margin: 10px 6vw;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  grid-auto-rows: minmax(100px, auto);
  gap: 15px;
  margin-bottom: 10px;
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
    // 더미 데이터
    const [hotPlaceArr, setHotPlaceArr] = useState([["춘천 삼악산 호수 케이블카", "강원 춘천시 스포츠타운길 245", "리드줄, 매너벨트 필수 착용", "https://files.ban-life.com/content/2024/04/body_1711961501.jpg"], ["청도 프로방스", "경북 청도군 화양읍 이슬미로 272-23", "리쉬필수! 댕댕이들은 모~두 입장 가능!", "https://files.ban-life.com/content/2024/04/body_1712306959.jpg"], ["양평 레몬과오렌지", "경기도 양평군 단월면 양동로 229", "독채 숙소라 마당에서 프라이빗하게 뛰뛰하고 우리끼리 즐길 수 있어요", "https://files.ban-life.com/content/2024/04/body_1712301999.jpg"], ["캔버스 스테이 외관", "부산광역시 해운대구 해운대해변로197번길 13", " 강아지 수영장+루프탑", "https://files.ban-life.com/content/2024/04/body_1712316724.jpg"], ["태안 코리아 플라워 파크", "충남 태안 안면읍 꽃지해안로 400", "견종 무관하게 모두 동반 가능해요", "https://files.ban-life.com/content/2024/04/body_1712595967.jpg"], ["감성스테이 산아래", "충청남도 당진시 송산면 칠절길 95-17", "견종, 무게 제한 없음", "https://files.ban-life.com/content/2024/04/body_1712079373.jpg"]])

    return (
        <div>
            <MypageNavbar />
            < PlaceItems >
                {hotPlaceArr.map((e, i) => (
                    <PlaceItem key={i}>
                        <PlaceItemTitle>{e[0]}</PlaceItemTitle>
                        <PlaceItemImg style={{ backgroundImage: `url(${e[3]})` }} />
                        <PlaceItemAddress><GoDotFill />{e[1]}</PlaceItemAddress>
                        <PlaceItemInfo><GoDotFill />{e[2]}</PlaceItemInfo>
                    </PlaceItem>
                ))}
            </PlaceItems >
        </div>
    );
}

export default SelectedLocation;
import Bumper from "../layout/Bumper";
import styled from "styled-components";
import { GoDotFill } from "react-icons/go";
import './PlaceRecommendStyle.css'
import { useEffect, useState } from "react";
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';

const Container = styled.div`
  display: grid;
  gap: 15px;
`;
const ContantTitle = styled.div`
text-align: center;
font-size: clamp(90%, 5vw, 160%);
margin: 10px 6vw;
`
const TopContants = styled.div`
margin: 10px 6vw;
display: grid;
  grid-template-columns: 1fr 2fr;
  grid-auto-rows: minmax(100px, auto);
  gap: 15px;
`
const CheckBoxs = styled.div`
display: flex;
justify-content: center;
height: 500px;
`
const Map = styled.div`
height: 500px;
background-color: red;
`

const PlaceItems = styled.div`
display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  grid-auto-rows: minmax(100px, auto);
  gap: 15px;
  margin: 10px 6vw;
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

const CheckBox = styled.input`
margin-right: 5px;
`

const CheckBoxLabel = styled.label`
`

//6개
let wideHotPlaceArr = [["춘천 삼악산 호수 케이블카", "강원 춘천시 스포츠타운길 245", "리드줄, 매너벨트 필수 착용", "https://files.ban-life.com/content/2024/04/body_1711961501.jpg"], ["청도 프로방스", "경북 청도군 화양읍 이슬미로 272-23", "리쉬필수! 댕댕이들은 모~두 입장 가능!", "https://files.ban-life.com/content/2024/04/body_1712306959.jpg"], ["양평 레몬과오렌지", "경기도 양평군 단월면 양동로 229", "독채 숙소라 마당에서 프라이빗하게 뛰뛰하고 우리끼리 즐길 수 있어요", "https://files.ban-life.com/content/2024/04/body_1712301999.jpg"], ["캔버스 스테이 외관", "부산광역시 해운대구 해운대해변로197번길 13", " 강아지 수영장+루프탑", "https://files.ban-life.com/content/2024/04/body_1712316724.jpg"], ["태안 코리아 플라워 파크", "충남 태안 안면읍 꽃지해안로 400", "견종 무관하게 모두 동반 가능해요", "https://files.ban-life.com/content/2024/04/body_1712595967.jpg"], ["감성스테이 산아래", "충청남도 당진시 송산면 칠절길 95-17", "견종, 무게 제한 없음", "https://files.ban-life.com/content/2024/04/body_1712079373.jpg"]]

let categoryList = ["동물병원", "동물약국", "반려동물용품", "미용", "위탁관리", "식당", "카페", "호텔", "팬션", "여행지", "박물관", "문예회관"]

function PlaceRecommend() {
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
    return (
        <Container>
            <Bumper />
            <ContantTitle>장소 추천</ContantTitle>
            {
                windowSize > 999
                    ?
                    <TopContants>
                        <CheckBoxs>
                            <Card className="card">
                                <Card.Header className="cardHeader">
                                    <InputGroup className="inputGroup mb-3">
                                        <Form.Control
                                            placeholder="🔍지역을 입력해주세요"
                                            aria-label="Recipient's username"
                                            aria-describedby="basic-addon2"
                                        />
                                        <Button variant="outline-secondary" id="button-addon2">
                                            검색
                                        </Button>
                                    </InputGroup>
                                </Card.Header>
                                <ListGroup className="listGroup" variant="flush">
                                    {categoryList.map((e, i) => (
                                        <ListGroup.Item key={i}>
                                            <CheckBox id={i} type="checkbox"></CheckBox>
                                            <CheckBoxLabel>{e}</CheckBoxLabel>
                                        </ListGroup.Item>
                                    ))}
                                </ListGroup>
                            </Card>
                        </CheckBoxs>
                        <Map></Map>
                    </TopContants>
                    :
                    <TopContants style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))' }}>
                        <CheckBoxs>
                            <Card className="card">
                                <Card.Header className="cardHeader">
                                    <InputGroup className="inputGroup mb-3">
                                        <Form.Control
                                            placeholder="🔍지역을 입력해주세요"
                                            aria-label="Recipient's username"
                                            aria-describedby="basic-addon2"
                                        />
                                        <Button variant="outline-secondary" id="button-addon2">
                                            검색
                                        </Button>
                                    </InputGroup>
                                </Card.Header>
                                <ListGroup className="listGroup" variant="flush">
                                    {categoryList.map((e, i) => (
                                        <ListGroup.Item key={i}>
                                            <CheckBox id={i} type="checkbox"></CheckBox>
                                            <CheckBoxLabel>{e}</CheckBoxLabel>
                                        </ListGroup.Item>
                                    ))}
                                </ListGroup>
                            </Card>
                        </CheckBoxs>
                        <Map></Map>
                    </TopContants>
            }
            < PlaceItems >
                {
                    // 화면 크기에 따라 가져오는 배열이 다름
                    windowSize > 979
                        ?
                        wideHotPlaceArr.map((e, i) => (
                            <PlaceItem key={i}>
                                <PlaceItemTitle>{e[0]}</PlaceItemTitle>
                                <PlaceItemImg style={{ backgroundImage: `url(${e[3]})` }} />
                                <PlaceItemAddress><GoDotFill />{e[1]}</PlaceItemAddress>
                                <PlaceItemInfo><GoDotFill />{e[2]}</PlaceItemInfo>
                            </PlaceItem>
                        ))
                        :
                        wideHotPlaceArr.slice(0, 4).map((e, i) => (
                            <PlaceItem key={i}>
                                <PlaceItemTitle>{e[0]}</PlaceItemTitle>
                                <PlaceItemImg style={{ backgroundImage: `url(${e[3]})` }} />
                                <PlaceItemAddress><GoDotFill />{e[1]}</PlaceItemAddress>
                                <PlaceItemInfo><GoDotFill />{e[2]}</PlaceItemInfo>
                            </PlaceItem>
                        ))
                }
            </PlaceItems >
        </Container>
    );
}

export default PlaceRecommend;
import Bumper from "../layout/bumper";
import styled from "styled-components";
import { GoDotFill } from "react-icons/go";
import './placeRecommendStyle.css'
import React ,{ useEffect, useState } from "react";
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';

import { useRecoilValue } from 'recoil';
import { isDarkAtom } from '../atoms';
import themes from "../theme";

import axios from "axios";


const baseUrl = "http://localhost:8080";

const Container = styled.div`
  display: grid;
  gap: 15px;
`;
const ContantTitle = styled.div`
text-align: center;
font-size: clamp(90%, 5vw, 160%);
margin: 10px 6vw;
`
// 체크박스 css
const TopContants = styled.div`
margin: 10px 3vw;
display: grid;
  grid-template-columns: repeat(2, 1fr) 5fr;
  grid-auto-rows: minmax(100px, auto);
  gap: 5px;
`
const CheckBoxs = styled.div`
display: flex;
justify-content: center;
height: 500px;
// width: 300px;

`

const Map = styled.div`
height: 500px;
grid-column: 3 / span 1;
`

const PlaceItems = styled.div`
display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  grid-auto-rows: minmax(100px, auto);
  gap: 15px;
  margin: 10px 3vw;
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

const { kakao } = window;

//6개
let wideHotPlaceArr = [["춘천 삼악산 호수 케이블카", "강원 춘천시 스포츠타운길 245", "리드줄, 매너벨트 필수 착용", "https://files.ban-life.com/content/2024/04/body_1711961501.jpg"], ["청도 프로방스", "경북 청도군 화양읍 이슬미로 272-23", "리쉬필수! 댕댕이들은 모~두 입장 가능!", "https://files.ban-life.com/content/2024/04/body_1712306959.jpg"], ["양평 레몬과오렌지", "경기도 양평군 단월면 양동로 229", "독채 숙소라 마당에서 프라이빗하게 뛰뛰하고 우리끼리 즐길 수 있어요", "https://files.ban-life.com/content/2024/04/body_1712301999.jpg"], ["캔버스 스테이 외관", "부산광역시 해운대구 해운대해변로197번길 13", " 강아지 수영장+루프탑", "https://files.ban-life.com/content/2024/04/body_1712316724.jpg"], ["태안 코리아 플라워 파크", "충남 태안 안면읍 꽃지해안로 400", "견종 무관하게 모두 동반 가능해요", "https://files.ban-life.com/content/2024/04/body_1712595967.jpg"], ["감성스테이 산아래", "충청남도 당진시 송산면 칠절길 95-17", "견종, 무게 제한 없음", "https://files.ban-life.com/content/2024/04/body_1712079373.jpg"]]

//let categoryList = ["동물병원", "동물약국", "반려동물용품", "미용", "위탁관리", "식당", "카페", "호텔", "팬션", "여행지", "박물관", "문예회관"]

function PlaceRecommend() {
    const [map,setMap] = useState([null])
    const [markers,setMarkers] = useState([])
    const [categoryList,setCategoryList] = useState([]);
    const [areaList,setAreaList] = useState([]);
    const [address,setAddress] = useState([]);
    const isDark = useRecoilValue(isDarkAtom); //다크모드
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

     // 지역 리스트 받아오기
     useEffect(() => {
        axios.get(`${baseUrl}/animal`)
            .then((res) => {
                setAreaList(res.data)
                console.log(res.data)
            }).catch(error => {
                console.error('Request failed : ', error);
        })
    }, [])

    //카테고리 리스트 받아오기
    useEffect(() => {
        axios.get(`${baseUrl}/animal`)
            .then((res) => {
                setCategoryList(res.data)
                console.log(res.data)
            }).catch(error => {
                console.error('Request failed : ', error);
        })
    }, []);
   
    // 맵에 띄울 마커 정보 받기
    useEffect(() => {
        let searchLocation = "서울특별시";
        let classification = "동물병원";
        axios.get(`${baseUrl}/animal/location/${searchLocation}?classification=${classification}`)
            .then((res) => {
                setAddress(res.data)
                // console.log(res.data)
            }).catch(error => {
                console.error('Request failed : ', error);
        })
    }, [])

    // 카카오맵 초기화
    useEffect(() => {
        const container = document.getElementById('map');
        const options = {
            center: new kakao.maps.LatLng(37.5664056, 126.9778222),
            level: 8
        };
        const newMap = new kakao.maps.Map(container, options);
        setMap(newMap);
    }, []);

    // useEffect(() => {
    const handleButtonClick = () => {
        // 주소 정보를 이용하여 마커 표시
        if (address && Object.keys(address).length > 0 && map) {
            // 이전에 생성된 마커들 제거
            markers.forEach(marker => {
                marker.setMap(null);
            });
            // 새로운 마커들 생성
            var newMarkers = [];
            for(var j=0; j<Object.keys(address).length; j++){
                var content = {
                    title: address[j].facilityName,
                    LatLng: new kakao.maps.LatLng(address[j].latitude, address[j].longitude),
                    roadAddress: address[j].roadAddress,
                }
                var newMarker = new kakao.maps.Marker({
                    map: map,
                    position: content.LatLng,
                    title: content.title
                });
                newMarkers.push(newMarker);
                // 마커 클릭 시 오버레이 표시
                (function(marker, place) {
                    kakao.maps.event.addListener(marker, 'click', function() {
                        var overlay = new kakao.maps.CustomOverlay({
                            content: '<div class="wrap">' +
                                '    <div class="info">' +
                                '        <div class="title">' + place.title + '</div>' +
                                '        <div class="body">' +
                                '            <div class="desc">' +
                                '                <div class="ellipsis">' + place.roadAddress + '</div>' +
                                '            </div>' +
                                '        </div>' +
                                '    </div>' +
                                '</div>',
                            map: map,
                            position: marker.getPosition()
                        });
                        kakao.maps.event.addListener(map, 'click', function(mouseEvent) {
                            overlay.setMap(null);
                        });
                        overlay.setMap(map);
                    });
                })(newMarker, content);
            }
            // 새로운 마커들을 저장하여 나중에 제거할 수 있도록 함
            setMarkers(newMarkers);
        }
    };

    return (
        <Container style={{
            color: `${isDark ? themes.dark.color : themes.light.color}`,
            backgroundColor: `${isDark ? themes.dark.bgColor : themes.light.bgColor}`
        }}>

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
                                            placeholder="지역을 선택해주세요"
                                            aria-label="Recipient's username"
                                            aria-describedby="basic-addon2"
                                        />
                                        <Button variant="outline-secondary" id="button-addon2" onClick={handleButtonClick}>
                                            검색
                                        </Button>
                                    </InputGroup>
                                </Card.Header>
                                <ListGroup className="listGroup" variant="flush">
                                    {areaList.map((e, i) => (
                                        <ListGroup.Item key={i}>
                                            <CheckBox id={i} type="checkbox"></CheckBox>
                                            <CheckBoxLabel>{e}</CheckBoxLabel>
                                        </ListGroup.Item>
                                    ))}
                                </ListGroup>
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
                        <Map>
                            <div id="map" style={{
                                width: '100%',
                                height: '500px'
                            }}></div>
                        </Map>
                    </TopContants>
                    :
                    <TopContants style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))' }}>
                        <CheckBoxs>
                            <Card className="card">
                                <Card.Header className="cardHeader">
                                    <InputGroup className="inputGroup mb-3">
                                        <Form.Control
                                            placeholder="지역을 선택해주세요"
                                            aria-label="Recipient's username"
                                            aria-describedby="basic-addon2"
                                        />
                                        <Button variant="outline-secondary" id="button-addon2" onClick={handleButtonClick}>
                                            검색
                                        </Button>
                                    </InputGroup>
                                </Card.Header>
                                <ListGroup className="listGroup" variant="flush">
                                    {areaList.map((e, i) => (
                                        <ListGroup.Item key={i}>
                                            <CheckBox id={i} type="checkbox"></CheckBox>
                                            <CheckBoxLabel>{e}</CheckBoxLabel>
                                        </ListGroup.Item>
                                    ))}
                                </ListGroup>
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
                        <Map>
                            <div id="map" style={{
                                width: '100%',
                                height: '500px'
                            }}></div>
                        </Map>
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
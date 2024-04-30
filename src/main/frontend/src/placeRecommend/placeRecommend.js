import Bumper from "../layout/bumper";
import styled from "styled-components";
import { GoDotFill } from "react-icons/go";
import './placeRecommendStyle.css'
import { useEffect, useState } from "react";
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

const { kakao } = window;

//6개
let wideHotPlaceArr = [["춘천 삼악산 호수 케이블카", "강원 춘천시 스포츠타운길 245", "리드줄, 매너벨트 필수 착용", "https://files.ban-life.com/content/2024/04/body_1711961501.jpg"], ["청도 프로방스", "경북 청도군 화양읍 이슬미로 272-23", "리쉬필수! 댕댕이들은 모~두 입장 가능!", "https://files.ban-life.com/content/2024/04/body_1712306959.jpg"], ["양평 레몬과오렌지", "경기도 양평군 단월면 양동로 229", "독채 숙소라 마당에서 프라이빗하게 뛰뛰하고 우리끼리 즐길 수 있어요", "https://files.ban-life.com/content/2024/04/body_1712301999.jpg"], ["캔버스 스테이 외관", "부산광역시 해운대구 해운대해변로197번길 13", " 강아지 수영장+루프탑", "https://files.ban-life.com/content/2024/04/body_1712316724.jpg"], ["태안 코리아 플라워 파크", "충남 태안 안면읍 꽃지해안로 400", "견종 무관하게 모두 동반 가능해요", "https://files.ban-life.com/content/2024/04/body_1712595967.jpg"], ["감성스테이 산아래", "충청남도 당진시 송산면 칠절길 95-17", "견종, 무게 제한 없음", "https://files.ban-life.com/content/2024/04/body_1712079373.jpg"]]

//let categoryList = ["동물병원", "동물약국", "반려동물용품", "미용", "위탁관리", "식당", "카페", "호텔", "팬션", "여행지", "박물관", "문예회관"]

function PlaceRecommend() {
    const [map,setMap] = useState([null])

    const [markers,setMarkers] = useState([])

    const [categoryList,setCategoryList] = useState([]);
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

    useEffect(() => {
<<<<<<< HEAD:src/main/frontend/src/PlaceRecommend/PlaceRecommend.js
        const container = document.getElementById('map');
        const options = {
            center: new kakao.maps.LatLng(33.450701, 126.570667),
            level: 5
        };
        const map = new kakao.maps.Map(container, options);
        
        var positions = [
            {
                title: '카카오', 
                latlng: new kakao.maps.LatLng(33.450705, 126.570677)
            },
            {
                title: '생태연못', 
                latlng: new kakao.maps.LatLng(33.450936, 126.569477)
            },
            {
                title: '텃밭', 
                latlng: new kakao.maps.LatLng(33.450879, 126.569940)
            },
            {
                title: '근린공원',
                latlng: new kakao.maps.LatLng(33.451393, 126.570738)
            }
        ];
        
        for (var i = 0; i < positions.length; i ++) {
            // 마커를 생성합니다
            var marker = new kakao.maps.Marker({
                map: map, // 마커를 표시할 지도
                position: positions[i].latlng, // 마커를 표시할 위치
                title : positions[i].title, // 마커의 타이틀, 마커에 마우스를 올리면 타이틀이 표시됩니다
            });
        }


        // 마커를 클릭했을 때 해당 장소의 상세정보를 보여줄 커스텀오버레이입니다
        // var placeOverlay = new kakao.maps.CustomOverlay({zIndex:1}), 
        // contentNode = document.createElement('div'), // 커스텀 오버레이의 컨텐츠 엘리먼트 입니다 
        // markers = [], // 마커를 담을 배열입니다
        // currCategory = ''; // 현재 선택된 카테고리를 가지고 있을 변수입니다
        
        // // 장소 검색 객체를 생성합니다
        // var ps = new kakao.maps.services.Places(map); 

        // // 지도에 idle 이벤트를 등록합니다
        // kakao.maps.event.addListener(map, 'idle', searchPlaces);

        // // 커스텀 오버레이의 컨텐츠 노드에 css class를 추가합니다 
        // contentNode.className = 'placeinfo_wrap';

        // // 커스텀 오버레이의 컨텐츠 노드에 mousedown, touchstart 이벤트가 발생했을때
        // // 지도 객체에 이벤트가 전달되지 않도록 이벤트 핸들러로 kakao.maps.event.preventMap 메소드를 등록합니다 
        // addEventHandle(contentNode, 'mousedown', kakao.maps.event.preventMap);
        // addEventHandle(contentNode, 'touchstart', kakao.maps.event.preventMap);

        // // 커스텀 오버레이 컨텐츠를 설정합니다
        // placeOverlay.setContent(contentNode);  

        // // 각 카테고리에 클릭 이벤트를 등록합니다
        // addCategoryClickEvent();

        // // 엘리먼트에 이벤트 핸들러를 등록하는 함수입니다
        // function addEventHandle(target, type, callback) {
        //     if (target.addEventListener) {
        //         target.addEventListener(type, callback);
        //     } else {
        //         target.attachEvent('on' + type, callback);
        //     }
        // }

        // // 카테고리 검색을 요청하는 함수입니다
        // function searchPlaces() {
        //     if (!currCategory) {
        //         return;
        //     }
            
        //     // 커스텀 오버레이를 숨깁니다 
        //     placeOverlay.setMap(null);

        //     // 지도에 표시되고 있는 마커를 제거합니다
        //     removeMarker();
            
        //     ps.categorySearch(currCategory, placesSearchCB, {useMapBounds:true}); 
        // }

        // // 장소검색이 완료됐을 때 호출되는 콜백함수 입니다
        // function placesSearchCB(data, status, pagination) {
        //     if (status === kakao.maps.services.Status.OK) {

        //         // 정상적으로 검색이 완료됐으면 지도에 마커를 표출합니다
        //         displayPlaces(data);
        //     } else if (status === kakao.maps.services.Status.ZERO_RESULT) {
        //         // 검색결과가 없는경우 해야할 처리가 있다면 이곳에 작성해 주세요

        //     } else if (status === kakao.maps.services.Status.ERROR) {
        //         // 에러로 인해 검색결과가 나오지 않은 경우 해야할 처리가 있다면 이곳에 작성해 주세요
                
        //     }
        // }

        // // 지도에 마커를 표출하는 함수입니다
        // function displayPlaces(places) {

        //     // 몇번째 카테고리가 선택되어 있는지 얻어옵니다
        //     // 이 순서는 스프라이트 이미지에서의 위치를 계산하는데 사용됩니다
        //     var order = document.getElementById(currCategory).getAttribute('data-order');

            

        //     for ( var i=0; i<places.length; i++ ) {

        //             // 마커를 생성하고 지도에 표시합니다
        //             var marker = addMarker(new kakao.maps.LatLng(places[i].y, places[i].x), order);

        //             // 마커와 검색결과 항목을 클릭 했을 때
        //             // 장소정보를 표출하도록 클릭 이벤트를 등록합니다
        //             (function(marker, place) {
        //                 kakao.maps.event.addListener(marker, 'click', function() {
        //                     displayPlaceInfo(place);
        //                 });
        //             })(marker, places[i]);
        //     }
        // }

        // // 마커를 생성하고 지도 위에 마커를 표시하는 함수입니다
        // function addMarker(position, order) {
        //     var imageSrc = 'https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/places_category.png', // 마커 이미지 url, 스프라이트 이미지를 씁니다
        //         imageSize = new kakao.maps.Size(27, 28),  // 마커 이미지의 크기
        //         imgOptions =  {
        //             spriteSize : new kakao.maps.Size(72, 208), // 스프라이트 이미지의 크기
        //             spriteOrigin : new kakao.maps.Point(46, (order*36)), // 스프라이트 이미지 중 사용할 영역의 좌상단 좌표
        //             offset: new kakao.maps.Point(11, 28) // 마커 좌표에 일치시킬 이미지 내에서의 좌표
        //         },
        //         markerImage = new kakao.maps.MarkerImage(imageSrc, imageSize, imgOptions),
        //             marker = new kakao.maps.Marker({
        //             position: position, // 마커의 위치
        //             image: markerImage 
        //         });

        //     marker.setMap(map); // 지도 위에 마커를 표출합니다
        //     markers.push(marker);  // 배열에 생성된 마커를 추가합니다

        //     return marker;
        // }

        // // 지도 위에 표시되고 있는 마커를 모두 제거합니다
        // function removeMarker() {
        //     for ( var i = 0; i < markers.length; i++ ) {
        //         markers[i].setMap(null);
        //     }   
        //     markers = [];
        // }

        // // 클릭한 마커에 대한 장소 상세정보를 커스텀 오버레이로 표시하는 함수입니다
        // function displayPlaceInfo (place) {
        //     var content = '<div class="placeinfo">' +
        //                     '   <a class="title" href="' + place.place_url + '" target="_blank" title="' + place.place_name + '">' + place.place_name + '</a>';   

        //     if (place.road_address_name) {
        //         content += '    <span title="' + place.road_address_name + '">' + place.road_address_name + '</span>' +
        //                     '  <span class="jibun" title="' + place.address_name + '">(지번 : ' + place.address_name + ')</span>';
        //     }  else {
        //         content += '    <span title="' + place.address_name + '">' + place.address_name + '</span>';
        //     }                
        
        //     content += '    <span class="tel">' + place.phone + '</span>' + 
        //                 '</div>' + 
        //                 '<div class="after"></div>';

        //     contentNode.innerHTML = content;
        //     placeOverlay.setPosition(new kakao.maps.LatLng(place.y, place.x));
        //     placeOverlay.setMap(map);  
        // }


        // // 각 카테고리에 클릭 이벤트를 등록합니다
        // function addCategoryClickEvent() {
        //     var category = document.getElementById('category'),
        //         children = category.children;

        //     for (var i=0; i<children.length; i++) {
        //         children[i].onclick = onClickCategory;
        //     }
        // }

        // // 카테고리를 클릭했을 때 호출되는 함수입니다
        // function onClickCategory() {
        //     var id = this.id,
        //         className = this.className;

        //     placeOverlay.setMap(null);

        //     if (className === 'on') {
        //         currCategory = '';
        //         changeCategoryClass();
        //         removeMarker();
        //     } else {
        //         currCategory = id;
        //         changeCategoryClass(this);
        //         searchPlaces();
        //     }
        // }

        // // 클릭된 카테고리에만 클릭된 스타일을 적용하는 함수입니다
        // function changeCategoryClass(el) {
        //     var category = document.getElementById('category'),
        //         children = category.children,
        //         i;

        //     for ( i=0; i<children.length; i++ ) {
        //         children[i].className = '';
        //     }

        //     if (el) {
        //         el.className = 'on';
        //     } 
        // } 

        
=======
        axios.get(`${baseUrl}/animal`)
            .then((res) => {
                setCategoryList(res.data)
                console.log(res.data)
            }).catch(error => {
                console.error('Request failed : ', error);
        })
    }, []);

    useEffect(() => {
        let searchLocation = "서울특별시";
        let classification = "동물병원";
        axios.get(`${baseUrl}/animal/location/${searchLocation}?classification=${classification}`)
            .then((res) => {
                setAddress(res.data)
                console.log(res.data)
            }).catch(error => {
                console.error('Request failed : ', error);
        })
>>>>>>> 2b918f7adb311329d3a32cf7dfcbe659a73d9f14:src/main/frontend/src/placeRecommend/placeRecommend.js
    }, [])

    useEffect(() => {
        // 카카오맵 초기화
        const container = document.getElementById('map');
        const options = {
            center: new kakao.maps.LatLng(37.5664056, 126.9778222),
            level: 10
        };
        const newMap = new kakao.maps.Map(container, options);
        setMap(newMap);
    }, []);

    useEffect(() => {
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
    }, [address, map]);

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
                        <Map>
                            <div id="map" style={{
                                width: '500px',
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
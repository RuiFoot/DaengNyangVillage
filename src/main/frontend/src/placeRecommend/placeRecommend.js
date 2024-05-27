import Bumper from "../layout/bumper";
import styled from "styled-components";
import { GoDotFill } from "react-icons/go";
import './placeRecommendStyle.css'
import React, { useEffect, useState } from "react";
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import Button from 'react-bootstrap/Button';
import InputGroup from 'react-bootstrap/InputGroup';
import { useRecoilValue } from 'recoil';
import { isDarkAtom, presentPage } from '../components/atoms';
import themes from "../components/theme";
import axios from "axios";
import defaultImg from "../components/defaultImgs";
import { FaStar } from "react-icons/fa6";
import Pagination from "../components/pagination";

const baseUrl = "http://localhost:8080";

const Container = styled.div`
min-height: calc(100vh - 86px);
`;

const Contents = styled.div`
margin: 0 10vw;
display: grid;
justify-content: center;
`;

const ContantTitle = styled.div`
margin: 20px 0 0 0;
text-align: center;
font-size: clamp(90%, 5vw, 160%);
`
const ContantSubTitle = styled.div`
display: flex;
justify-content: center;
align-items: center;
margin: 0 0 20px 0;
`

// 체크박스 css
const TopContants = styled.div`
display: grid;
  grid-template-columns: 1fr 3fr;
  grid-auto-rows: minmax(100px, auto);
  gap: 40px;
`
const CheckBoxs = styled.div`
display: flex;
justify-content: center;
height: 500px;
width: 360px;
`
const List = styled.div`
display: flex;
flex-direction: row;
height: 420px;
justify-content: center;
`

const Map = styled.div`
height: 500px;
width: 100%;
`

const PlaceItems = styled.div`
min-height: 130px;
display: grid;
justify-content: center;
grid-auto-rows: minmax(100px, auto);
gap: 20px;
`

const PlaceItem = styled.a`
padding: 10px;
border-radius: 5px;
text-decoration: none;
cursor: pointer;
&:hover {
    transform: scale(1.02);
}
`
const PlaceItemTitle = styled.div`
height: 50px;
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
margin: 10px 0;
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
const GoBack = styled.div`
text-align: center;
cursor: pointer;
&:hover {
    font-size: 17px;
}
`
const SiGun = styled.div`
display: flex;
flex-direction: column;
width: 100%;
`
const Selected = styled.div`
gap : 10px;
width: 100%;
display: flex;
justify-content: center;
align-items: center;
`



const { kakao } = window;


function PlaceRecommend() {
    const [map, setMap] = useState([null])
    const [markers, setMarkers] = useState([])
    const [categoryList, setCategoryList] = useState([]);
    const [areaList, setAreaList] = useState([]);
    const [address, setAddress] = useState([]);
    const [sido, setSido] = useState("시,도")
    const [checkedArea, setCheckedArea] = useState("시,군")
    const [checkedCategory, setCheckedCategory] = useState("카테고리")
    //다크모드
    const isDark = useRecoilValue(isDarkAtom);
    const switchColor = `${isDark ? themes.dark.color : themes.light.color}`
    const switchBgColor = `${isDark ? themes.dark.bgColor : themes.light.bgColor}`
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

    const getRecommend = () => {
        let recommendSido = "서울"
        let recommendSigungu = "송파구"
        axios.get(`${baseUrl}/animal/recommend?sido=${recommendSido}&sigungu=${recommendSigungu}`)
        .then((res)=>{
            console.log(res.data);
            setAddress(res.data);
            kakaomapMarker(res.data);
        })
    }

    // 카카오맵 초기화. 카테고리 리스트 생성
    useEffect(() => {
        const container = document.getElementById('map');
        const options = {
            center: new kakao.maps.LatLng(37.5664056, 126.9778222),
            level: 5
        };
        const newMap = new kakao.maps.Map(container, options);
        setMap(newMap);
        axios.get(`${baseUrl}/animal`)
            .then((res) => {
                setCategoryList(res.data)
                // console.log(res.data)
            }).catch(error => {
                console.error('Request failed : ', error);
            })
    }, []);

    

    // 마커 생성 및 범위 재설정
    const kakaomapMarker = (data) => {
        if (data && Object.keys(data).length > 0 && map) { // 주소 정보를 이용하여 마커 표시
            // 이전에 생성된 마커들 제거
            markers.forEach(marker => {
                marker.setMap(null);
            });
            // 새로운 마커들 생성
            var newMarkers = [];
            var bounds = new kakao.maps.LatLngBounds(); //재설정 범위정보를 가지고 있을
            for (var j = 0; j < Object.keys(data).length; j++) {
                var content = { // 객체 정보 저장
                    title: data[j].facilityName,
                    LatLng: new kakao.maps.LatLng(data[j].latitude, data[j].longitude),
                    roadAddress: data[j].roadAddress,
                    animalNum: data[j].animalNum,
                    largeClassification: data[j].largeClassification,
                    subClassification: data[j].subClassification,
                    buildingNumber: data[j].buildingNumber,
                    star: data[j].star
                }
                var newMarker = new kakao.maps.Marker({ //새로운 마커 생성 및 표시
                    map: map,
                    position: content.LatLng,
                    title: content.title,
                    animalNum: content.animalNum,
                    largeClassification: content.largeClassification,
                    subClassification: content.subClassification,
                    buildingNumber: content.buildingNumber,
                    star: content.star
                });
                newMarkers.push(newMarker); //새로 생성된 마커를 배열에 추가
                bounds.extend(content.LatLng); //latlngbound 객체에 좌표 추가
                (function (marker, place) { // 마커 클릭 시 오버레이 표시
                    kakao.maps.event.addListener(marker, 'click', function () {
                        const placeStar = place.star === 0 ? "아직 평가가 없습니다." : place.star
                        var overlay = new kakao.maps.CustomOverlay({
                            content:
                                '<div class="wrap">' +
                                '    <div class="info">' +
                                '        <div class="title">' + place.title +
                                '        </div>' +
                                '        <div class="body">' +
                                '            <div class="desc">' +
                                '                <div class="ellipsis">' + place.subClassification + '</div>' +
                                '                <div class="ellipsis">' + place.roadAddress + '</div>' +
                                '                <div class="jibun ellipsis">평점 : ' + placeStar +
                                '            </div>' +
                                '        </div>' +
                                '    </div>' +
                                '</div>',
                            map: map,
                            position: marker.getPosition()
                        });
                        kakao.maps.event.addListener(map, 'click', function (mouseEvent) {
                            overlay.setMap(null);
                        });
                        overlay.setMap(map);
                    });
                })(newMarker, content);
            }
            map.setBounds(bounds); // 지도 범위 재설정
            setMarkers(newMarkers); // 새로운 마커들을 저장하여 나중에 제거할 수 있도록 함
        }
    }

    const [page, setPage] = useState({})
    const nowPage = useRecoilValue(presentPage);
    useEffect(() => {
        axios.get(`${baseUrl}/animal/location/${sido}?sigungu=${checkedArea}&classification=${checkedCategory}&page=${nowPage - 1}`)
            .then((res) => {
                setAddress(res.data.content);
                kakaomapMarker(res.data.content)
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

    const handleButtonClick = (e) => {
        e.preventDefault();
        axios.get(`${baseUrl}/animal/location/${sido}?sigungu=${checkedArea}&classification=${checkedCategory}&page=0`)
            .then((res) => {
                setAddress(res.data.content)
                console.log(res.data)
                kakaomapMarker(res.data.content)
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
                //getList(res.data.content)
            })
            .catch((error) => {
                console.error('가져오기 실패', error);
            })
    };

    //시, 도 배열
    const bigAreaList = [
        "서울특별시", "인천광역시", "대전광역시", "광주광역시", "대구광역시", "울산광역시", "부산광역시",
        "경기도", "강원특별자치도", "충청남도", "세종특별자치시", "충청북도",
        "전북특별자치도", "전라남도", "경상북도", "경상남도", "제주특별자치도","전체"]

    //시도 선택시 상세 군,구 또는 시, 군 선택가능 하게
    const bigAreaClicked = (e) => {
        console.log(e)
        setSido(e)
        // console.log(e[e.length - 1]) //유저가 클릭한 채크박스의 마지막 글자(시, 도 구분)
        axios.get(`${baseUrl}/animal/area?sido=${e}`)
            .then((res) => {
                if (e[e.length - 1] === "도") {
                    //시도 선택에서 도를 선택했을 경우 상세 선택에서 시, 군만 나오게
                    setAreaList(res.data.filter((e) => e[e.length - 1] === "시" || e[e.length - 1] === "군"))
                } else {
                    //시도 선택에서 시를 선택했을 경우 다 나오게.
                    setAreaList(res.data)
                }
                console.log(res.data)
            }).catch(error => {
                console.error('Request failed : ', error);
            })

    }
    //상세 군, 구 또는 시, 군 선택에서 시, 도 선택으로 돌아갈때
    const goBack = () => {
        setCheckedArea("시,군")
        setAreaList([])
    }

    //에리어 선택시 값 전달, 채크해제 시 중복값 입력방지
    const clickedArea = (e) => {
        console.log(e)
        const checkboxes = document.getElementsByName('cityOption')
        console.log(checkboxes)
        for (let i = 0; i < checkboxes.length; i++) {
            if (checkboxes[i] !== e) {
                checkboxes[i].checked = false
            }
            setCheckedArea(e.value);
        }
        console.log("상세주소 : " + checkedArea)
    }

    //카테고리 선택시 값 전달, 채크해제 시 중복값 입력방지
    const clickedCategory = (e) => {
        console.log(e)
        const checkboxes = document.getElementsByName('categoryOption')
        console.log(checkboxes)
        for (let i = 0; i < checkboxes.length; i++) {
            if (checkboxes[i] !== e) {
                checkboxes[i].checked = false
            }
            setCheckedCategory(e.value);
        }
        console.log("카테고리 : " + checkedCategory)
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

    //별점 표시
    const starRankAVG = (e) => {
        let starts = []
        let starRank = []
        let starRankAVGArr = Math.round(e)
        console.log(starRankAVGArr)
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
        <Container style={{
            color: switchColor,
            backgroundColor: switchBgColor
        }}>
            <Bumper />
            <ContantTitle>장소 추천</ContantTitle>
            <ContantSubTitle>반려동물과 함께 할 수 있는 공간을 추천해드립니다!</ContantSubTitle>
            {
                windowSize > 999
                    ?
                    <TopContants >
                        <CheckBoxs style={{ boxShadow: isDark ? `0px 10px 20px 4px black` : `0px 10px 20px 4px #E8E8E8` }}>
                           <Card style={{ width: "100%" }} className="card">
                                <Card.Header style={{
                                    color: switchColor,
                                    backgroundColor: switchBgColor
                                }} className="cardHeader">
                                    <InputGroup className="inputGroup mb-3" >
                                            <Selected>
                                                <InputGroup.Text style={{
                                                    color: switchColor,
                                                    backgroundColor: switchBgColor,
                                                    borderColor: switchColor
                                                }} id="basic-addon1">{sido}</InputGroup.Text>
                                                <InputGroup.Text style={{
                                                    color: switchColor,
                                                    backgroundColor: switchBgColor,
                                                    borderColor: switchColor
                                                }} id="basic-addon1">{checkedArea}</InputGroup.Text>
                                                <InputGroup.Text style={{
                                                    color: switchColor,
                                                    backgroundColor: switchBgColor,
                                                    borderColor: switchColor
                                                }} id="basic-addon1">{checkedCategory}</InputGroup.Text>
                                                <Button style={{
                                                    color: switchColor,
                                                    backgroundColor: switchBgColor,
                                                    borderColor: switchColor
                                                }} className="searchBtn" id="button-addon2" onClick={handleButtonClick}>
                                                    검 색
                                                </Button>
                                            </Selected>
                                    </InputGroup>
                                </Card.Header>
                                <List style={{
                                        color: switchColor, backgroundColor: switchBgColor
                                    }}>
                                    {
                                        areaList.length < 1 ?
                                            <ListGroup className="areaListGroup" variant="flush">
                                                {bigAreaList.map((e, i) => (
                                                    <ListGroup.Item key={i}
                                                        style={{
                                                            color: switchColor,
                                                            backgroundColor: switchBgColor
                                                        }}
                                                    >
                                                        <Button
                                                            style={{
                                                                color: switchColor,
                                                                backgroundColor: switchBgColor,
                                                                borderColor: switchColor
                                                            }}
                                                            value={e}
                                                            onClick={(e) => bigAreaClicked(e.target.value)}
                                                            id={i} type="button">{e}</Button>
                                                    </ListGroup.Item>
                                                ))}
                                            </ListGroup>
                                            :
                                            <SiGun>
                                                <GoBack style={{
                                                    color: switchColor, backgroundColor: switchBgColor
                                                }} onClick={() => { goBack() }} >시, 도로 돌아가기</GoBack>
                                                <ListGroup className="areaListGroup" variant="flush">
                                                    {bigAreaList.map((e, i) => (
                                                        <ListGroup.Item key={i}
                                                            style={{
                                                                color: switchColor,
                                                                backgroundColor: switchBgColor
                                                            }}
                                                        >
                                                            <Button
                                                                style={{
                                                                    color: switchColor,
                                                                    backgroundColor: switchBgColor,
                                                                    borderColor: switchColor
                                                                }}
                                                                value={e}
                                                                name="cityOption"
                                                                onClick={(e) => clickedArea(e.target)}
                                                                id={i} type="button">{e}</Button>

                                                        </ListGroup.Item>
                                                    ))}
                                                </ListGroup>
                                            </SiGun>
                                    }
                                    <ListGroup className="categoryListGroup" variant="flush">
                                        {categoryList.map((e, i) => (
                                            <ListGroup.Item key={i} style={{
                                                color: switchColor,
                                                backgroundColor: switchBgColor
                                            }}>
                                                <Button
                                                    style={{
                                                        color: switchColor,
                                                        backgroundColor: switchBgColor,
                                                        borderColor: switchColor
                                                    }}
                                                    value={e}
                                                    name="categoryOption"
                                                    onClick={(e) => clickedCategory(e.target)}
                                                    id={i} type="button">{e}</Button>
                                            </ListGroup.Item>
                                        ))}
                                    </ListGroup>
                                </List>

                            </Card>
                        </CheckBoxs>
                        <Map style={{ boxShadow: isDark ? `0px 10px 20px 4px black` : `0px 10px 20px 4px #E8E8E8` }} id="map">
                        </Map>
                    </TopContants>
                    :
                    <TopContants style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))' }}>
                        <CheckBoxs >
                            <Card className="card" >
                                <Card.Header style={{
                                    color: switchColor,
                                    backgroundColor: switchBgColor
                                }} className="cardHeader">
                                    <InputGroup className="inputGroup mb-3" >
                                        <Selected>
                                            <InputGroup.Text id="basic-addon1">{sido}</InputGroup.Text>
                                            <InputGroup.Text id="basic-addon1">{checkedArea}</InputGroup.Text>
                                            <InputGroup.Text id="basic-addon1">{checkedCategory}</InputGroup.Text>
                                            <Button style={{
                                                color: switchColor,
                                                backgroundColor: switchBgColor,
                                                borderColor: switchColor
                                            }} className="searchBtn" id="button-addon2" onClick={handleButtonClick}>
                                                검색
                                            </Button>
                                        </Selected>
                                    </InputGroup>
                                </Card.Header>
                                <List>
                                    {
                                        areaList.length < 1 ?
                                            <ListGroup className="areaListGroup" variant="flush">
                                                {bigAreaList.map((e, i) => (
                                                    <ListGroup.Item key={i}
                                                        style={{
                                                            color: switchColor,
                                                            backgroundColor: switchBgColor
                                                        }}
                                                    >
                                                        <Button
                                                            value={e}
                                                            onClick={(e) => bigAreaClicked(e.target.value)}
                                                            id={i} type="button">{e}</Button>
                                                    </ListGroup.Item>
                                                ))}
                                            </ListGroup>
                                            :
                                            <SiGun>
                                                <GoBack style={{
                                                    color: switchColor, backgroundColor: switchBgColor
                                                }} id="basic-addon1">{checkedCategory}</InputGroup.Text>
                                                <Button style={{
                                                    color: switchColor,
                                                    backgroundColor: switchBgColor,
                                                    borderColor: switchColor
                                                }} className="searchBtn" id="button-addon2" onClick={handleButtonClick}>
                                                    검 색
                                                </Button>
                                            </Selected>
                                        </InputGroup>
                                    </Card.Header>
                                    <List style={{
                                        color: switchColor, backgroundColor: switchBgColor
                                    }}>
                                        {
                                            areaList.length < 1 ?
                                                <ListGroup className="areaListGroup" variant="flush">
                                                    {bigAreaList.map((e, i) => (
                                                        <ListGroup.Item key={i}
                                                            style={{
                                                                color: switchColor,
                                                                backgroundColor: switchBgColor
                                                            }}
                                                        >
                                                            <Button
                                                                value={e}
                                                                name="cityOption"
                                                                onClick={(e) => clickedArea(e.target)}
                                                                id={i} type="button">{e}</Button>
                                                        </ListGroup.Item>
                                                    ))}
                                                </ListGroup>
                                            </SiGun>
                                    }
                                    <ListGroup className="categoryListGroup" variant="flush">
                                        {categoryList.map((e, i) => (
                                            <ListGroup.Item key={i} style={{
                                                color: switchColor,
                                                backgroundColor: switchBgColor
                                            }}>
                                                <Button
                                                    value={e}
                                                    name="categoryOption"
                                                    onClick={(e) => clickedCategory(e.target)}
                                                    id={i} type="button">{e}</Button>
                                            </ListGroup.Item>
                                        ))}
                                    </ListGroup>
                                </List>
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
            <Pagination totalPost={page.totalElements} pageRange={pageRange} btnRange={5} totalPageNum={page.totalPages} />
            {/*
             totalPageNum : 총 페이지내이션 수
             btnRange : 보여질 페이지 버튼의 개수
            */}
                < PlaceItems style={{
                    gridTemplateColumns: windowSize > 1790 ?
                        "repeat(auto-fit,230px)" : "repeat(auto-fit,350px)"
                }}  >
                    {
                        address.map((e, i) => (
                            <PlaceItem key={i}
                                style={{
                                    boxShadow: isDark ? `0px 5px 10px 2px black` : `0px 5px 10px 2px #E8E8E8`,
                                    color: switchColor,
                                    backgroundColor: switchBgColor
                                }}
                                href={`/recommend-place-detail/${e.animalNum}${url}`}>
                                <PlaceItemTitle>{e.facilityName}</PlaceItemTitle>
                                <PlaceItemImg style={{ backgroundImage: e.imgPath === null ? `url(${showImg(e.subClassification)})` : `url(${showImg(e.imgPath)})` }} />
                                <PlaceItemInfo><GoDotFill />평점 : {e.star === 0 ? "아직 평가가 없습니다." : starRankAVG(e.star)}</PlaceItemInfo>
                                <PlaceItemAddress><GoDotFill />{e.roadAddress}</PlaceItemAddress>
                            </PlaceItem>
                        ))
                    }
                </PlaceItems >
                {
                    pageRange ? <Pagination totalPost={page.totalElements} pageRange={pageRange} btnRange={5} totalPageNum={page.totalPages} />
                        : null
                }
                {/*
             totalPageNum : 총 페이지내이션 수
             btnRange : 보여질 페이지 버튼의 개수
            */}
            </Contents>
        </Container>
    );
}

export default PlaceRecommend;
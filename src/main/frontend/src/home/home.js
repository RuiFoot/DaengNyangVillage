import styled from "styled-components";
import DarkCarousel from "./carousel";
import './homeStyle.css'
import HotdealBar from "./hotdeal";
import HotPlaceList from "./hotPlace";
import CommunityHome from "./communityHome";
import Bumper from "../layout/bumper";
import { useRecoilValue } from 'recoil';
import { isDarkAtom } from '../atoms';
import themes from "../theme";

const Container = styled.div`
  display: grid;
  gap: 15px;
`;
const Carousel = styled.div`
  width: 88vw;
  grid-column: 1 / 5;
  display: flex;
  margin: auto;
  `
const Hotdeal = styled.div`
  grid-column: 1 / 5;
  `
const Contants = styled.div`
  margin: 0 6vw 20px 6vw;
  grid-column: 1 / 5;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  grid-auto-rows: minmax(100px, auto);
  gap: 15px;
  & a {
    text-decoration: none;
    color: black;
  }
  `
const Place = styled.div`
  `
const Community = styled.div`
  `
const PlaceTitle = styled.div`
  margin-bottom:15px;
  font-size: 30px;
  font-weight: bold;
  text-align: center;
  `
const CommunityTitle = styled.div`
  margin-bottom:15px;
  font-size: 30px;
  font-weight: bold;
  text-align: center;
  `
const DivideLine = styled.div`
  margin: 20px 6vw 0 6vw;
  border: 2px solid #F2884B;
  `


let url = ""

function Home() {
  const isDark = useRecoilValue(isDarkAtom);

  if (window.sessionStorage.key(0) === "logined") {
    url = `/${JSON.parse(sessionStorage.getItem("logined")).nickName}`
  }

  return (
    <Container className="Container"
      style={{
        color: `${isDark ? themes.dark.color : themes.light.color}`,
        backgroundColor: `${isDark ? themes.dark.bgColor : themes.light.bgColor}`
      }}>
      <Bumper />
      <Carousel>
        <DarkCarousel />
      </Carousel>
      <Hotdeal>
        <HotdealBar />
        <DivideLine />
      </Hotdeal>
      <Contants>
        {/* <Test/> */}
        <Place>
          <a href={`/place-recommend${url}`}>
            <PlaceTitle style={{
              color: `${isDark ? themes.dark.color : themes.light.color}`
            }}>인기장소</PlaceTitle></a>
          <HotPlaceList />
        </Place>
        <Community>
          <a href={`/free-board${url}`}>
            <CommunityTitle style={{
              color: `${isDark ? themes.dark.color : themes.light.color}`
            }}>커뮤니티</CommunityTitle></a>
          <CommunityHome />
        </Community>
      </Contants>
    </Container>
  );
}

export default Home;
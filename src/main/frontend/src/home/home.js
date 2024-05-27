import styled from "styled-components";
import DarkCarousel from "./carousel";
import './homeStyle.css'
import HotdealBar from "./hotdeal";
import HotPlaceList from "./hotPlace";
import CommunityHome from "./communityHome";
import Bumper from "../layout/bumper";
import { useRecoilValue } from 'recoil';
import { isDarkAtom } from '../components/atoms';
import themes from "../components/theme";

const Container = styled.div`
  display: grid;
  gap: 20px;
`;
const Carousel = styled.div`
  width: 80vw;
  grid-column: 1 / 5;
  display: flex;
  margin: auto;
  `
const Hotdeal = styled.div`
  grid-column: 1 / 5;
  `
const Contants = styled.div`
  margin: 0 10vw 20px 10vw;
  grid-column: 1 / 5;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  grid-auto-rows: minmax(100px, auto);
  gap: 20px;
  & a {
    text-decoration: none;
    color: black;
  }
  `
const Place = styled.div`
  `
const Community = styled.div`
  `
const DivideLine = styled.div`
  margin: 20px 10vw 10px 10vw;
  border: 1px solid #A1A1A1;
  `

function Home() {
  //다크모드
  const isDark = useRecoilValue(isDarkAtom);
  const switchColor = `${isDark ? themes.dark.color : themes.light.color}`
  const switchBgColor = `${isDark ? themes.dark.bgColor : themes.light.bgColor}`
  let url = ""
  if (window.sessionStorage.key(0) === "logined") {
    url = `/${JSON.parse(sessionStorage.getItem("logined")).nickName}`
  }

  return (
    <Container className="Container"
      style={{
        color: switchColor,
        backgroundColor: switchBgColor
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
          <HotPlaceList />
        </Place>
        <Community>
          <CommunityHome />
        </Community>
      </Contants>
    </Container>
  );
}

export default Home;
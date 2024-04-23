import styled from "styled-components";
import DarkCarousel from "./Carousel";
import './homeStyle.css'
import HotdealBar from "./Hotdeal";
import HotPlaceList from "./HotPlace";
import CommunityHome from "./CommunityHome";
import Test from "../test";
import Bumper from "../layout/Bumper";
import { useEffect, useState } from "react";

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
margin-left: 6vw;
margin-right: 6vw;
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

function Home() {
  return (
    <Container className="Container">
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
          <a href="/PlaceRecommend"><PlaceTitle>인기장소</PlaceTitle></a>
          <HotPlaceList />
        </Place>
        <Community>
          <a href="/Community"><CommunityTitle>커뮤니티</CommunityTitle></a>
          <CommunityHome />
        </Community>
      </Contants>
    </Container>
  );
}

export default Home;
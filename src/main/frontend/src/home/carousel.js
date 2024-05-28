import Carousel from 'react-bootstrap/Carousel';
import styled from "styled-components";
import "./homeStyle.css"
import { useRecoilValue } from 'recoil';
import { isDarkAtom } from '../components/atoms';
import main1 from '../img/main1.jpg';
import main2 from '../img/main2.jpg';
import main3 from '../img/main3.jpg';

let carouselItems = [[main1, "반려동물의 다양한 정보", " 반려인이이 쉽고 편리하게 정보를 얻고 소통할 수 있는 공간"], [main2, "반려동물과 함께 할 수 있는 장소", "반려인과 반려동물이 즐거운 경험과 추억을 만들 수 있도록"], [main3, "반려동물에게 좋은 것만", "반려인과 반려동물의 행복한 삶을 위해 가장 좋은 상품 제공"]]

const CarouselImg = styled.div`
height: 20vw;
min-height: 300px;
width: 80vw;
background-size: cover;
background-position: center;
`

const CarouselTitle = styled.h2`

font-size: clamp(60%, 4vw, 200%);
color: white;
padding: 5px;
`
const CarouselText = styled.p`
font-size: clamp(70%, 1vw, 100%);
color: white;
padding: 5px;
`

function DarkCarousel() {
    //다크모드
    const isDark = useRecoilValue(isDarkAtom);

    return (
        <Carousel style={{
            boxShadow: isDark ? `0px 5px 10px 2px black` : `0px 5px 10px 2px #E8E8E8`
        }} data-bs-theme="light">
            {carouselItems.map((e, i) => (
                <Carousel.Item key={i}>
                    <CarouselImg
                        style={{ backgroundImage: `url(${e[0]})` }}
                    >
                        <Carousel.Caption className='caption'>
                            <CarouselTitle>{e[1]}</CarouselTitle>
                            <CarouselText>{e[2]}</CarouselText>
                        </Carousel.Caption>
                    </CarouselImg>
                </Carousel.Item>
            ))}
        </Carousel>
    );
}

export default DarkCarousel;
import Carousel from 'react-bootstrap/Carousel';
import styled from "styled-components";
import "./homeStyle.css"

let carouselSrcs = ["https://www.vietnamairlines.com/~/media/ContentImage/Buy-tickets-and-other-products/Vanchuyen_Thucung.jpg", "https://img1.daumcdn.net/thumb/R800x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdn%2FATJ3E%2FbtrGE4tjB5k%2Fw1b3iR71kAg1oMFrOy1k20%2Fimg.jpg", "https://img1.daumcdn.net/thumb/R658x0.q70/?fname=https://t1.daumcdn.net/news/202110/27/holapet/20211027051857338hff8.jpeg"]

const CarouselImg = styled.div`
height: 20vw;
min-height: 300px;
margin: 13px 6vw 0 6vw;
background-size: cover;
background-position: center;

`

const CarouselTitle = styled.h2`

font-size: clamp(80%, 5vw, 200%);
background-color: rgba(0, 0, 0, 0.5);
border-radius: 5px;
width: fit-content;
color: white;
padding: 5px;
`
const CarouselText = styled.p`
background-color: rgba(0, 0, 0, 0.5);
border-radius: 5px;
width: fit-content;
font-size: clamp(80%, 1vw, 100%);
color: white;
padding: 5px;
`

function DarkCarousel() {
    return (
        <Carousel data-bs-theme="light">
            <Carousel.Item>
                <CarouselImg
                    style={{ backgroundImage: `url(${carouselSrcs[0]})` }}
                />
            </Carousel.Item>
            <Carousel.Item>
                <CarouselImg
                    style={{ backgroundImage: `url(${carouselSrcs[1]})` }}
                />
            </Carousel.Item>
            <Carousel.Item>
                <CarouselImg
                    style={{ backgroundImage: `url(${carouselSrcs[2]})` }}
                />
                {/* <Carousel.Caption>
                    <CarouselTitle>너에게 좋은것만 주고 싶어</CarouselTitle>
                    <CarouselText>
                        반려인과 반려동물의 행복한 삶을 위해 가장 인기 있고 좋은 상품 정보
                    </CarouselText>
                </Carousel.Caption> */}
            </Carousel.Item>
        </Carousel>
    );
}

export default DarkCarousel;
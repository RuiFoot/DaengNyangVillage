import Carousel from 'react-bootstrap/Carousel';
import styled from "styled-components";
import "./homeStyle.css"

let carouselItems = [["https://www.vietnamairlines.com/~/media/ContentImage/Buy-tickets-and-other-products/Vanchuyen_Thucung.jpg", "반려동물의 다양한 정보", " 반려인이이 쉽고 편리하게 정보를 얻고 소통할 수 있는 공간"], ["https://img1.daumcdn.net/thumb/R800x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdn%2FATJ3E%2FbtrGE4tjB5k%2Fw1b3iR71kAg1oMFrOy1k20%2Fimg.jpg", "반려동물과 함께 할 수 있는 장소", "반려인과 반려동물이 즐거운 경험과 추억을 만들 수 있도록"], ["https://img1.daumcdn.net/thumb/R658x0.q70/?fname=https://t1.daumcdn.net/news/202110/27/holapet/20211027051857338hff8.jpeg", "반려동물에게 좋은 것만", "반려인과 반려동물의 행복한 삶을 위해 가장 좋은 상품 제공"]]

const CarouselImg = styled.div`
height: 20vw;
min-height: 300px;
width: 88vw;
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
    return (
        <Carousel data-bs-theme="light">
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
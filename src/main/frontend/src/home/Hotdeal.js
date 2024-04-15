import styled from "styled-components";
import { FaArrowRight } from "react-icons/fa6";
import "./homeStyle.css"
import { useEffect, useState } from "react";

const Container = styled.div`
margin: 0 6vw;
`
const HotdealTitle = styled.div`
margin-bottom: 15px;
font-size: 30px;
font-weight: bold;
text-align: center;
`
const HotdealItems = styled.div`
display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  grid-auto-rows: minmax(250px, auto);
  gap: 20px;
`

const HotdealItem = styled.div`

`
const HotdealItemImg = styled.div`
height: 227px;
background-size: cover;
background-position: center;
`
const HotdealItemPrice = styled.span`
display: flex;
justify-content: center;
align-items: center;
`

let hotdealArr4 = [["20,000원", "16,480원", "https://images.pet-friends.co.kr/storage/pet_friends/product/id/e/c/d/2/f/b/5/ecd2fb5d9531994c2053c502d7ff7cf1/10001/ab1525a4a2f1ae8c1d47a637f514e9cd.jpeg"], ["144,000원", "108,500원", "https://images.pet-friends.co.kr/storage/pet_friends/product/id/3/b/1/e/d/6/4/3b1ed64dea3bcfc2668763627c59428e/10001/0dce90ded8d2bed795119672a3264f65.jpeg"], ["1,500원", "1,200원", "https://images.pet-friends.co.kr/storage/pet_friends/product/id/f/2/5/1/0/6/6/f251066576af93fbdbd2a89cb9d04a9e/10001/3536d93bdc2418c36388ee5e08263aac.png"], ["50,000원", "34,900원", "https://images.pet-friends.co.kr/storage/pet_friends/product/id/d/e/6/0/4/c/6/de604c6e55fdad469c4d168fe9959278/10000/e7d6ac6e0553c168d8fb6a54f9c952ce.jpeg"]]

let hotdealArr3 = [["20,000원", "16,480원", "https://images.pet-friends.co.kr/storage/pet_friends/product/id/e/c/d/2/f/b/5/ecd2fb5d9531994c2053c502d7ff7cf1/10001/ab1525a4a2f1ae8c1d47a637f514e9cd.jpeg"], ["144,000원", "108,500원", "https://images.pet-friends.co.kr/storage/pet_friends/product/id/3/b/1/e/d/6/4/3b1ed64dea3bcfc2668763627c59428e/10001/0dce90ded8d2bed795119672a3264f65.jpeg"], ["1,500원", "1,200원", "https://images.pet-friends.co.kr/storage/pet_friends/product/id/f/2/5/1/0/6/6/f251066576af93fbdbd2a89cb9d04a9e/10001/3536d93bdc2418c36388ee5e08263aac.png"]]

function HotdealBar() {
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
            <HotdealTitle>오늘의 인기상품</HotdealTitle>
            <HotdealItems>
                {
                    // 화면 크기에 따라 가져오는 배열이 다름
                    windowSize > 997 || windowSize < 747 ?
                        hotdealArr4.map((e, i) => (
                            <HotdealItem key={i}>
                                <HotdealItemImg style={{ backgroundImage: `url(${e[2]})` }} />
                                <HotdealItemPrice>{e[0]} <FaArrowRight style={{ margin: "0 5px", color: "red" }} /> {e[1]}</HotdealItemPrice>
                            </HotdealItem>
                        ))
                        :
                        hotdealArr3.map((e, i) => (
                            <HotdealItem key={i}>
                                <HotdealItemImg style={{ backgroundImage: `url(${e[2]})` }} />
                                <HotdealItemPrice>{e[0]} <FaArrowRight style={{ margin: "0 5px", color: "red" }} /> {e[1]}</HotdealItemPrice>
                            </HotdealItem>
                        ))
                }



            </HotdealItems>
        </Container>
    );
}

export default HotdealBar;
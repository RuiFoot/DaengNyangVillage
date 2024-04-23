import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { FaArrowRight } from "react-icons/fa";

const Container = styled.div`
  margin: 0 6vw;
`;

const HotdealTitle = styled.div`
  margin-bottom: 15px;
  font-size: 30px;
  font-weight: bold;
  text-align: center;
`;

const HotdealItems = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr); /* 4개의 칼럼으로 설정 */
  gap: 20px;
`;

const HotdealItem = styled.div``;

const HotdealItemImg = styled.div`
  height: 227px;
  background-size: cover;
  background-position: center;
`;

const HotdealItemPrice = styled.span`
  display: flex;
  justify-content: center;
  align-items: center;
`;

async function fetchRandomProducts(count) {
  try {
    const apiUrl = "http://localhost:22000/"; // 실제 API의 URL
    const response = await fetch(apiUrl);
    const data = await response.json();

    if (data && data.length > 0) {
      const randomProducts = [];
      for (let i = 0; i < count; i++) {
        const randomIndex = Math.floor(Math.random() * data.length);
        const selectedProduct = data[randomIndex];
        randomProducts.push({
          name: selectedProduct.ProductName[0],
          price: `${selectedProduct.ProductPrice[0]}원`,
          image: selectedProduct.ProductImage[0],
        });
      }
      return randomProducts;
    } else {
      throw new Error("상품 정보가 없습니다.");
    }
  } catch (error) {
    console.error("상품 정보를 가져오지 못했습니다.", error);
    return Array.from({ length: count }, () => ({
      name: "상품 정보를 가져오지 못했습니다.",
      price: "가격 정보 없음",
      image: "기본 이미지 URL",
    }));
  }
}

function HotdealBar() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const intervalId = setInterval(async () => {
      const randomProducts = await fetchRandomProducts(4); // 4개의 제품 가져오기
      setProducts(randomProducts);
    }, 10000); // 10초마다 제품 업데이트

    // 컴포넌트가 언마운트될 때 clearInterval을 호출하여 메모리 누수를 방지합니다.
    return () => clearInterval(intervalId);
  }, []);

  return (
    <Container>
      <HotdealTitle>오늘의 인기 반려동물 제품</HotdealTitle>
      <HotdealItems>
        {products.map((product, index) => (
          <HotdealItem key={index}>
            <HotdealItemImg style={{ backgroundImage: `url(${product.image})` }} />
            <HotdealItemPrice>
              {product.name} <FaArrowRight style={{ margin: "0 5px", color: "red" }} /> {product.price}
            </HotdealItemPrice>
          </HotdealItem>
        ))}
      </HotdealItems>
    </Container>
  );
}

export default HotdealBar;

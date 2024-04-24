import React, { useEffect, useState } from "react";
import styled from "styled-components";

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
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  justify-content: center; /* 상품 아이템 가운데 정렬 */
`;

const HotdealItem = styled.div`
  width: 300px; /* 아이템 너비 고정 */
`;

const HotdealItemImg = styled.div`
  height: 300px; /* 이미지 높이를 300px로 설정 */
  width: 100%; /* 이미지 너비를 100%로 설정하여 부모 너비에 맞게 */
  background-image: url(${props => props.image}); /* 이미지를 배경으로 설정 */
  background-size: cover; /* 이미지를 컨테이너에 맞게 조정 */
  background-position: center; /* 이미지를 가운데 정렬 */
`;


const HotdealItemName = styled.span`
  font-weight: bold;
  margin-bottom: 5px;
`;

const HotdealItemPrice = styled.span`
  display: flex;
  justify-content: center;
  align-items: center;
`;
async function fetchRandomProducts(count) {
  try {
    const apiUrl = "http://localhost:22000/";
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
          image: selectedProduct.ProductImage300[0],
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
      const randomProducts = await fetchRandomProducts(4);
      setProducts(randomProducts);
    }, 10000);

    return () => clearInterval(intervalId);
  }, []);

  return (
    <Container>
      <HotdealTitle>오늘의 인기 반려동물 제품</HotdealTitle>
      <HotdealItems>
        {products.map((product, index) => (
          <HotdealItem key={index}>
            <HotdealItemImg style={{ backgroundImage: `url(${product.image})` }} />
            <HotdealItemName>{product.name}</HotdealItemName>
            <HotdealItemPrice>{product.price}</HotdealItemPrice>
          </HotdealItem>
        ))}
      </HotdealItems>
    </Container>
  );
}

export default HotdealBar;

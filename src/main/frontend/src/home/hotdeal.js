import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { Spinner } from "react-bootstrap";

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
  row-gap: 20px;
  column-gap: 30px;
  justify-content: center;
  height: 350px;
  overflow: hidden;
`;

const HotdealItem = styled.div`
  width: 200px;
  height: 350px;
  cursor: pointer; /* 클릭 가능하도록 커서 설정 */
`;

const HotdealItemImg = styled.div`
  height: 200px;
  width: 100%;
  background-image: url(${props => props.image});
  background-size: cover;
  background-position: center;
`;

const HotdealItemName = styled.span`
  font-weight: bold;
  margin-bottom: 5px;
`;

const HotdealItemPrice = styled.span`
  display: flex;
  justify-content: center;
  align-items: center;
  color: #D91A2A;
  font-weight: 800;
  font-size: 25px;
`;

const LoadingContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
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
        randomProducts.push({ //localhost:22000에서 불러온 데이터
          name: selectedProduct.ProductName[0],
          price: `${selectedProduct.ProductPrice[0]}원`,
          image: selectedProduct.ProductImage300[0],
          link: selectedProduct.DetailPageUrl[0], // DetailPageUrl 사용
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
      link: "기본 링크 URL", // 에러 시 기본 링크 추가
    }));
  }
}

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


  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      const randomProducts = await fetchRandomProducts(7);
      setProducts(randomProducts);
      setIsLoading(false);
    };

    const intervalId = setInterval(fetchData, 10000);

    // 컴포넌트가 언마운트될 때 인터벌을 클리어해야 합니다.
    return () => clearInterval(intervalId);
  }, []);

  const handleProductClick = (link) => {
    window.open(link, "_blank"); // 새 창에서 링크 열기
  };

  return (
    <Container>
      {isLoading ? (
        <LoadingContainer>
          <HotdealTitle>상품 정보 로딩중...</HotdealTitle>
          <div style={{ display: "flex", alignItems: "center", height: "350px" }}>
            <Spinner animation="border" role="status">
              <span className="visually-hidden">Loading...</span>
            </Spinner>
          </div>
        </LoadingContainer>
      ) : (
        <>
          <HotdealTitle>오늘의 인기 상품</HotdealTitle>
          <HotdealItems>
            {products.map((product, index) => (
              <HotdealItem key={index} onClick={() => handleProductClick(product.link)}>
                <HotdealItemImg style={{ backgroundImage: `url(${product.image})` }} />
                <HotdealItemName>{product.name}</HotdealItemName>
                <HotdealItemPrice>{product.price}</HotdealItemPrice>
              </HotdealItem>
            ))}
          </HotdealItems>
        </>
      )}
    </Container>
  );
}

export default HotdealBar;

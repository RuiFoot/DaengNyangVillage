import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { Spinner } from "react-bootstrap";
import axios from "axios";
import xmljs from 'xml-js';

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
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 200px;
  height: 350px;
  cursor: pointer;
`;

const HotdealItemImg = styled.div`
  height: 200px;
  width: 100%;
  background-image: url(${props => props.image});
  background-size: cover; /* 변경된 부분 */
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
  color: #f65151;
  font-weight: 800;
  font-size: 25px;
`;

const LoadingContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

axios.defaults.withCredentials = true;

function HotdealBar() {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchProducts = async () => {
    const apiUrl = "/openapi/OpenApiService.tmall";
    const apiKey = "ec85dc7117b8f778becbc434db04d1c9";
    const keyword = "반려동물";
    const url = `/11api${apiUrl}?key=${apiKey}&apiCode=ProductSearch&keyword=${keyword}`;

    try {
      const res = await axios.get(url);
      const jsonData = xmljs.xml2json(res.data, { compact: true });
      const jsonParsed = JSON.parse(jsonData);
      const productList = jsonParsed.ProductSearchResponse.Products.Product;

      if (Array.isArray(productList)) {
        const selectedProducts = [];
        const totalProducts = productList.length;
        const selectedIndices = new Set();

        while (selectedIndices.size < 7) {
          const randomIndex = Math.floor(Math.random() * totalProducts);
          if (!selectedIndices.has(randomIndex)) {
            selectedIndices.add(randomIndex);
            const product = productList[randomIndex];
            selectedProducts.push({
              name: product.ProductName._cdata,
              price: `${product.ProductPrice._text}원`,
              image: product.ProductImage200._cdata,
              link: product.DetailPageUrl._cdata,
            });
          }
        }

        setProducts(selectedProducts);
      } else {
        const product = productList;
        setProducts([{
          name: product.ProductName._cdata,
          price: `${product.ProductPrice._text}원`,
          image: product.ProductImage._cdata,
          link: product.DetailPageUrl._cdata,
        }]);
      }

      setIsLoading(false);
    } catch (error) {
      console.error("상품 정보를 가져오는 동안 오류가 발생했습니다.", error);
      setIsLoading(false);
      setProducts(Array.from({ length: 6 }, () => ({
        name: "상품 정보를 가져오지 못했습니다.",
        price: "가격 정보 없음",
        image: "기본 이미지 URL",
        link: "기본 링크 URL",
      })));
    }
  };

  useEffect(() => {
    fetchProducts();
    const intervalId = setInterval(fetchProducts, 10000);
    return () => clearInterval(intervalId);
  }, []);

  const handleProductClick = (link) => {
    window.open(link, "_blank");
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
                <div>
                  <HotdealItemImg image={product.image} />
                  <HotdealItemName>{product.name.slice(0, 40)}</HotdealItemName>
                </div>
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

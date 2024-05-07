const express = require("express");
//const cors = require("cors");
const axios = require("axios");
const { parseStringPromise } = require("xml2js");
const iconv = require("iconv-lite");

// Express 앱 선언
const app = express();

//app.use(cors()); // 모든 도메인에서의 요청 허용
// json 요청을 파싱할 수 있음
app.use(express.json());

app.get("/", async (req, res) => {
    try {
        const apiUrl = "https://openapi.11st.co.kr/openapi/OpenApiService.tmall";
        const apiKey = "ec85dc7117b8f778becbc434db04d1c9";
        const keyword = "반려동물";
        const url = `${apiUrl}?key=${apiKey}&apiCode=ProductSearch&keyword=${keyword}`;

        // URL fetch해오기
        const response = await axios.get(url, { responseType: 'arraybuffer' }); // arraybuffer로 변경
        const data = iconv.decode(Buffer.from(response.data), 'euc-kr'); // 데이터를 euc-kr로 디코딩

        console.log(data); // XML 데이터 확인

        // XML형식을 Object Promise로 변환
        const result = await parseStringPromise(data);

        // 중복된 상품 제거
        const products = result.ProductSearchResponse.Products[0].Product;
        const uniqueProducts = removeDuplicates(products, "ProductCode");

        // Object로 변환된 유일한 제품 목록 응답으로 반환
        res.json(uniqueProducts);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error" });
    }
});

// 중복 제거 함수
function removeDuplicates(array, key) {
    return array.filter((item, index, self) =>
        index === self.findIndex((t) => (
            t[key][0] === item[key][0]
        ))
    );
}

// 22000번 포트에서 서버 시작
app.listen(22000, () => {
    console.log("SERVER IS RUNNING ON PORT 22000");
});

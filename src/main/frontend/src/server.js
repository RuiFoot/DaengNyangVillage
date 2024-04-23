const express = require("express");
const cors = require("cors");
const { parseStringPromise } = require("xml2js");


// Express 앱 선언
const app = express();

app.use(cors()); // 모든 도메인에서의 요청 허용

// json 요청을 파싱할 수 있음
app.use(express.json());

app.get("/", async (req, res) => {
    try {
        const apiUrl = "https://openapi.11st.co.kr/openapi/OpenApiService.tmall";
        const apiKey = "ec85dc7117b8f778becbc434db04d1c9";
        const keyword = "반려동물";
        const url = `${apiUrl}?key=${apiKey}&apiCode=ProductSearch&keyword=${keyword}`;

        // URL fetch해오기
        const response = await fetch(url,{headers:{'Content-Type':'text/xml; charset=utf-8'}});
        const data = await response.text({encoding:'utf-8'});
        console.log(data);

        // XML형식을 Object Promise로 변환
        const result = await parseStringPromise(data);
        console.log(result);
        // Object로 변환된 제품 목록 응답으로 반환
        res.json(result.ProductSearchResponse.Products[0].Product);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error" });
    }
});

// 22000번 포트에서 서버 시작
app.listen(22000, () => {
    console.log("SERVER IS RUNNING ON PORT 22000");
});

const fetch = require('node-fetch');
const { parseString } = require('xml2js');



// OpenAPI URL
const apiUrl = "https://openapi.11st.co.kr/openapi/OpenApiService.tmall";
const apiKey = "ec85dc7117b8f778becbc434db04d1c9";
const keyword = "반려동물";
const url = `${apiUrl}?key=${apiKey}&apiCode=ProductSearch&keyword=${keyword}`;

// API 요청 및 XML 파싱
fetch(url)
  .then(response => response.text())
  .then(xmlData => {
    parseString(xmlData, (err, result) => {
      if (err) {
        console.error(err);
      } else {
        // JSON 데이터 출력
        console.log(JSON.stringify(result, null, 2));
      }
    });
  })
  .catch(error => {
    console.error("Error fetching data:", error);
  });

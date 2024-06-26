# 댕냥빌리지
## 정보
- 멀티캠퍼스 부트캠프 프로젝트

## 소개
- 반려동물 정보 플랫폼

## 기능
- Home, 커뮤니티, 장소 추천, 마이페이지 4가지 파트로 나눠져 있음
- Home : 상품추천(11번가 API), 커뮤니티 최신글, 별점 높은 추천장소
- 커뮤니티 : 자유게시판, 반려동물 자랑, 훈련방법 공유, 댕냥 마켓 모든 게시판 이미지를 포함한 CRUD 기능(quill, firebase)
- 장소 추천 : 카카오맵 API, 공공데이터 포털을 이용한 지역별 장소 추천 기능
- 마이페이지 : 회원 정보확인, 회원 정보수정, 비밀번호 변경, 내가 찜한 장소, 내가 쓴글
- 로그인, 회원가입(카카오 postcode API, 정규식이용 유효성 검사) 기능
- 소셜 로그인 (카카오, 네이버, 구글) 기능
- Chatbot 기능

## 개발 기간
- 2024.03.28 ~ 2024.05.30 (진행중)

## API
- 카카오맵 API
- 공공데이터 포털
- 11번가 API
- Naver Cloud API (Clova Chatbot)
- 소셜 로그인 API (카카오, 네이버, 구글)
- emailjs(비밀번호 변경 링크 메일 전송)
- 카카오 postcode API(회원가입시 주소 입력)
- quill(글쓰기 에디터)

## 언어 및 개발 환경
- 프론트엔드
    - React
- 백엔드
    - SpringBoot
- DBMS
    - Oracle
    - Mybatis
- 클라우드
    - firebase
- 개발 환경
    - Visual Studio Code
    - IntelliJ
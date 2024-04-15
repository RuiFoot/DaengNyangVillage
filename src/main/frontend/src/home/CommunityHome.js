import styled from "styled-components";
import { useEffect, useState } from "react";
import { BsCardText } from "react-icons/bs";
import { IoRestaurantOutline } from "react-icons/io5";
import { MdOutlineShoppingCart } from "react-icons/md";

const Communitylists = styled.div`
display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  grid-auto-rows: minmax(100px, auto);
  gap: 15px;
`
const Communitylist = styled.div`

`
const CommunityTitle = styled.div`
display: flex;
align-items: center;
font-size: clamp(100%, 1.2vw, 120%);
font-weight: bold;
margin-bottom: 5px;
`
const ArticleTitle = styled.div`
font-weight: bold;
margin-bottom: 10px;
`
const Content = styled.div`
border-top : 1px solid #B2BEBF;
border-bottom : 1px solid #B2BEBF;
margin-bottom: 5px;
padding: 5px;
`
const Writer = styled.div`
text-align: end;
`
const Area = styled.div`
text-align: end;

`
const Date = styled.div`
text-align: end;
`

let freeArr = [["옆집 개가 너무 짖어요", "박현수", "2024-04-12"], ["우리집 고양이는 멍멍하고 울어요", "박현수", "2024-04-12"], ["우리집 멍멍이 보고가요", "송민영", "2024-04-12"]]

let marketArr = [["배변패드 팝니다", "경상북도", "정승호", "2024-04-12"], ["캣타워 중고 삽니다", "경기도", "이상빈", "2024-04-12"], ["멍멍이 모자 삽니다", "경기도", "송민영", "2024-04-12"]]

let trainingArr = [["고양이한태 손 받는 방법", "정승호", "2024-04-12"], ["배변 훈련", "이상빈", "2024-04-12"], ["햄스터 산책 방법", "송민영", "2024-04-12"]]

let shopArr = [["금남멧돼지", "경기도", "백진욱", "2024-04-12"], ["알베로", "경기도", "이상빈", "2024-04-12"], ["배롱정원", "제주도", "송민영", "2024-04-12"]]

function CommunityHome() {
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
        // 화면 크기에 따라 계시판의 width가 달라짐
        <>
            {
                windowSize > 943 ?
                    <Communitylists>
                        <Communitylist>
                            <CommunityTitle><BsCardText style={{ marginRight: '5px' }} /> 자유게시판</CommunityTitle>
                            {
                                freeArr.map((e, i) => (
                                    <Content key={i}>
                                        <ArticleTitle>{e[0]}</ArticleTitle>
                                        <Writer>{e[1]}</Writer>
                                        <Date>{e[2]}</Date>
                                    </Content>

                                ))
                            }
                        </Communitylist>
                        <Communitylist>
                            <CommunityTitle><BsCardText style={{ marginRight: '5px' }} /> 훈련 방법 공유</CommunityTitle>
                            {
                                trainingArr.map((e, i) => (
                                    <Content key={i}>
                                        <ArticleTitle>{e[0]}</ArticleTitle>
                                        <Writer>{e[1]}</Writer>
                                        <Date>{e[2]}</Date>
                                    </Content>
                                ))
                            }
                        </Communitylist>
                        <Communitylist>
                            <CommunityTitle><IoRestaurantOutline style={{ marginRight: '5px' }} /> 식당, 카페 추천</CommunityTitle>
                            {
                                shopArr.map((e, i) => (
                                    <Content key={i}>
                                        <ArticleTitle>{e[0]}</ArticleTitle>
                                        <Area>{e[1]}</Area>
                                        <Writer>{e[2]}</Writer>
                                        <Date>{e[3]}</Date>
                                    </Content>
                                ))
                            }
                        </Communitylist>

                        <Communitylist>
                            <CommunityTitle><MdOutlineShoppingCart style={{ marginRight: '5px' }} /> 댕냥 마켓</CommunityTitle>
                            {
                                marketArr.map((e, i) => (
                                    <Content key={i}>
                                        <ArticleTitle>{e[0]}</ArticleTitle>
                                        <Area>{e[1]}</Area>
                                        <Writer>{e[2]}</Writer>
                                        <Date>{e[3]}</Date>
                                    </Content>
                                ))
                            }
                        </Communitylist>
                    </Communitylists>
                    :
                    <Communitylists style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(195px, 1fr))' }} >
                        <Communitylist>
                            <CommunityTitle><BsCardText style={{ marginRight: '5px' }} /> 자유게시판</CommunityTitle>
                            {
                                freeArr.map((e, i) => (
                                    <Content key={i}>
                                        <ArticleTitle>{e[0]}</ArticleTitle>
                                        <Writer>{e[1]}</Writer>
                                        <Date>{e[2]}</Date>
                                    </Content>

                                ))
                            }
                        </Communitylist>
                        <Communitylist>
                            <CommunityTitle><BsCardText style={{ marginRight: '5px' }} /> 훈련 방법 공유</CommunityTitle>
                            {
                                trainingArr.map((e, i) => (
                                    <Content key={i}>
                                        <ArticleTitle>{e[0]}</ArticleTitle>
                                        <Writer>{e[1]}</Writer>
                                        <Date>{e[2]}</Date>
                                    </Content>
                                ))
                            }
                        </Communitylist>
                        <Communitylist>
                            <CommunityTitle><IoRestaurantOutline style={{ marginRight: '5px' }} /> 식당, 카페 추천</CommunityTitle>
                            {
                                shopArr.map((e, i) => (
                                    <Content key={i}>
                                        <ArticleTitle>{e[0]}</ArticleTitle>
                                        <Area>{e[1]}</Area>
                                        <Writer>{e[2]}</Writer>
                                        <Date>{e[3]}</Date>
                                    </Content>
                                ))
                            }
                        </Communitylist>

                        <Communitylist>
                            <CommunityTitle><MdOutlineShoppingCart style={{ marginRight: '5px' }} /> 댕냥 마켓</CommunityTitle>
                            {
                                marketArr.map((e, i) => (
                                    <Content key={i}>
                                        <ArticleTitle>{e[0]}</ArticleTitle>
                                        <Area>{e[1]}</Area>
                                        <Writer>{e[2]}</Writer>
                                        <Date>{e[3]}</Date>
                                    </Content>
                                ))
                            }
                        </Communitylist>
                    </Communitylists>
            }
        </>

    );
}

export default CommunityHome;
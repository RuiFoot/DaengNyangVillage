import styled from "styled-components";
import Bumper from "../layout/bumper";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import DOMPurify from "dompurify"; //html 코드 번역
import { useRecoilValue } from 'recoil';
import { isDarkAtom } from '../atoms';
import themes from "../theme";
import Button from 'react-bootstrap/Button';
import React from "react"
import { MdOutlineReply } from "react-icons/md";
import defaultImg from '../img/defaultImg.png';
import { storage } from "../firebase";
import { deleteObject, ref } from "firebase/storage";
import Comments from "./comments";
import CommunityNav from "./communityNav";

const Container = styled.div`
min-height: calc(100vh - 179px);
display: flex;
flex-direction: column;
align-items: center;
`
const CategoryTitle = styled.div`
font-size: 30px;
margin: 10px;
`
const Items = styled.div`
width: 100%;
 display: grid;
  grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
  grid-auto-rows: minmax(100px, auto);
`
const LeftItems = styled.div`
display: flex;
flex-direction: column;
justify-content: center;
align-items: center;
`
const RightItems = styled.div`
display: flex;
flex-direction: column;
justify-content: space-between;
`
const Title = styled.div`
font-size: 25px;
margin: 10px 0;
height: 40px;
`
const Img = styled.div`
height: 500px;
width: 95%;
background-position: center;
background-size: cover;
`
const Address = styled.div`
margin-bottom: 10px;
`
const TradeTime = styled.div`
margin-bottom: 10px;
`
const TradePrice = styled.div`
`

const ContentField = styled.div`
width: 88vw;
display: flex;
flex-direction: column;
align-items: center;
margin: 20px 0;
`
const ContentTitleBox = styled.div`
width: 88vw;
margin: 20px 0 10px 0;
display: flex;
justify-content: start;
border-bottom: 1px solid;
`
const ContentTitle = styled.div`
font-size: 20px;
`
const ContentBtns = styled.div`
display: flex;
justify-content: end;
`
const ContentFooter = styled.div`
`
const Writer = styled.div`
text-align: end;
`
const CreateDate = styled.div`
text-align: end;
`
function UsedMarketDetail() {
    //다크모드
    const isDark = useRecoilValue(isDarkAtom);
    const switchColor = `${isDark ? themes.dark.color : themes.light.color}`
    const switchBgColor = `${isDark ? themes.dark.bgColor : themes.light.bgColor}`
    const params = useParams()// 파라메터 가져오기
    const userInfo = JSON.parse(sessionStorage.getItem("logined"))
    //현재 로그인한 유저 닉네임
    const [loginedNickName, setLoginedNickName] = useState("")
    useEffect(() => {
        if (sessionStorage.getItem("logined") !== null) {
            setLoginedNickName(JSON.parse(sessionStorage.getItem("logined")).nickName)
        }
    });
    // 윈도우 가로 사이즈에 따른 변화 적용
    const [windowSize, setWindowSiz] = useState(window.innerWidth);
    const handleResize = () => {
        setWindowSiz(window.innerWidth)
    }
    useEffect(() => {
        window.addEventListener('resize', handleResize);
        return () => {
            window.addEventListener('resize', handleResize)
        }
    }, [])

    // 스프링부트
    const [content, setContent] = useState({
        area: "",
        detailLocation: "",
        preface: "",
        price: "",
        tradeTime: "",
        boardId: 0,
        nickname: "",
        memberNo: 0,
        category: "",
        boardName: "",
        field: "",
        imgPath: "",
        createDate: ""
    })

    useEffect(() => {
        axios.get(`/api/board/detail/${params.boardId}`)
            .then((res) => {
                setContent(res.data);
                console.log(res.data)
            })
    }, []);

    //글에 이미지가 여러게 일경우 대표 이미지 가장 앞에 하나만 보여줌
    const representImg = (e) => {
        if (e !== null && e !== undefined) {
            const index = e.indexOf(",")
            return (
                <Img style={{ backgroundImage: `url(${e.slice(0, index)})` }} />
            )
        } else {
            return (
                <Img style={{ backgroundImage: `url(${defaultImg})` }} />
            )
        }
    }
    const editContentBtn = (e) => {
        window.location.href = `/edit/${e}/${userInfo.nickName}`
    }
    //글 삭제
    const deleteImgArr = []
    const deleteContentBtn = (e) => {
        console.log(content)
        //내용안에서 이미지만 추출
        let count = content.field.split('http').length - 1;
        let newStartIndex = 0
        let startIndex = 0
        console.log(count)
        for (let i = 0; i < count; i++) {
            if (content.field.indexOf(`"></p>`) !== -1) {
                startIndex = content.field.indexOf("http", newStartIndex);
                newStartIndex = content.field.indexOf(`"></p>`, startIndex);
                deleteImgArr.push(content.field.slice(startIndex, newStartIndex))
            }
            console.log(deleteImgArr)
        }
        for (let i = 0; i < deleteImgArr.length; i++) {
            deleteObject(ref(storage, deleteImgArr[i]));
        }
        axios.delete(`/api/board/${e}`)
            .then((res) => {
                setContent(res.data);
                window.location.href = `/used-market/${userInfo.nickName}`
            })
    }
    return (
        <>
            <CommunityNav />
            <Container style={{
                color: switchColor,
                backgroundColor: switchBgColor
            }}>
                <CategoryTitle>{content.category}</CategoryTitle>
                <Items>
                    <LeftItems style={{ margin: `${windowSize < 800 ? "0 6vw" : "0 10px 0 6vw"}` }}>
                        <Title>
                            [{content.preface}] {content.boardName}
                        </Title>
                        {representImg(content.imgPath)}
                    </LeftItems>
                    <RightItems style={{ margin: `${windowSize < 800 ? "0 6vw" : "0 6vw 0 10px"}` }}>
                        <div>
                            <Title>
                                {
                                    window.sessionStorage.getItem("logined") === null ?
                                        null :
                                        loginedNickName === content.nickname ?
                                            <ContentBtns>
                                                <Button style={{
                                                    margin: "0 5px",
                                                    color: switchColor,
                                                    backgroundColor: switchBgColor
                                                }} className="recommendBtn"
                                                    onClick={() => editContentBtn(content.boardId)}
                                                >수정</Button>
                                                <Button style={{
                                                    color: switchColor,
                                                    backgroundColor: switchBgColor
                                                }} className="recommendBtn"
                                                    onClick={() => deleteContentBtn(content.boardId)}
                                                >삭제</Button>
                                            </ContentBtns>
                                            : null
                                }
                            </Title>
                            <Address>주소 : {content.area} {content.detailLocation}</Address>
                            <TradeTime>거래 가능 시간 : {content.tradeTime}</TradeTime>
                            <TradePrice>가격 : {content.price}</TradePrice>
                        </div>
                        <div>
                            {
                                content.createDate ?
                                    <ContentFooter>
                                        <Writer>작성자 : {content.nickname} </Writer>
                                        <CreateDate>작성 날짜 : {content.createDate.replace("T", ", ").slice(0, 17)}</CreateDate>
                                    </ContentFooter>
                                    :
                                    null
                            }
                        </div>
                    </RightItems>
                </Items>
                <ContentTitleBox>
                    <ContentTitle>상세 내용</ContentTitle>
                </ContentTitleBox>
                <ContentField dangerouslySetInnerHTML={{
                    __html: DOMPurify.sanitize(content.field)
                }} />
                <Comments />
            </Container>
            <div id="end"></div>
        </>
    );
}

export default UsedMarketDetail;
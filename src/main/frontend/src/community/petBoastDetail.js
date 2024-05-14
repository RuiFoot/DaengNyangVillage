import styled from "styled-components";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import DOMPurify from "dompurify"; //html 코드 번역
import { useRecoilValue } from 'recoil';
import { isDarkAtom } from '../components/atoms';
import themes from "../components/theme";
import Button from 'react-bootstrap/Button';
import React from "react"
import { storage } from "../servers/firebase";
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
const Title = styled.div`
font-size: 25px;
margin: 10px 0;
height: 40px;
`
const ContentField = styled.div`
width: 88vw;
display: flex;
flex-direction: column;
align-items: center;
margin: 20px 0;
`
const ContentBtns = styled.div`
display: flex;
justify-content: end;
`
const ContentFooter = styled.div`
gap: 10px;
width: 88vw;
display: flex;
flex-direction: column;
align-items: end;
justify-content: end;
`
const Writer = styled.div`
text-align: end;
`
const CreateDate = styled.div`
text-align: end;
`
function PetBoastDetail() {
    //다크모드
    const isDark = useRecoilValue(isDarkAtom);
    const switchColor = `${isDark ? themes.dark.color : themes.light.color}`
    const switchBgColor = `${isDark ? themes.dark.bgColor : themes.light.bgColor}`
    const params = useParams() //파라메터 가져오기
    const userInfo = JSON.parse(sessionStorage.getItem("logined"))
    //현재 로그인한 유저 닉네임
    const [loginedNickName, setLoginedNickName] = useState("")
    useEffect(() => {
        if (sessionStorage.getItem("logined") !== null) {
            setLoginedNickName(JSON.parse(sessionStorage.getItem("logined")).nickName)
        }
    });

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
    // 수정으로 이동
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
                window.location.href = `/pet-boast/${userInfo.nickName}`
            })
    }
    console.log(loginedNickName)
    return (
        <>
            <CommunityNav />
            <Container style={{
                color: switchColor,
                backgroundColor: switchBgColor
            }}>
                <CategoryTitle>{content.category}</CategoryTitle>

                <Title>
                    {content.boardName}
                </Title>
                <ContentField dangerouslySetInnerHTML={{
                    __html: DOMPurify.sanitize(content.field)
                }} />
                <ContentFooter>
                    {
                        content.createDate ?
                            <>
                                <Writer>작성자 : {content.nickname} </Writer>
                                <CreateDate>작성 날짜 : {content.createDate.replace("T", ", ").slice(0, 17)}</CreateDate>
                            </>
                            :
                            null
                    }
                    <>
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
                    </>
                </ContentFooter>
                <Comments />
            </Container>
            <div id="end"></div>
        </>
    );
}

export default PetBoastDetail;
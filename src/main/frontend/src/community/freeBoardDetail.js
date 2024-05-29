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
import Modal from 'react-bootstrap/Modal';
import { MdModeEdit } from "react-icons/md";
import { MdDelete } from "react-icons/md";

const Container = styled.div`
min-height: calc(100vh - 179px);
display: flex;
flex-direction: column;
align-items: center;
`
const Title = styled.div`
font-size: 25px;
margin: 25px 0 20px 0;
height: 40px;
`
const BoarderLine = styled.div`
width: 80vw;
border-bottom: 1px solid #D0D0D0;
margin-bottom: 5px;
`
const ContentField = styled.div`
width: 80vw;
display: flex;
flex-direction: column;
align-items: center;
margin: 20px 0;
`
const ContentBtns = styled.div`
margin: 10px 0;
display: flex;
justify-content: end;
`
const ContentFooter = styled.div`
gap: 10px;
width: 80vw;
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

function FreeBoardDetail() {
  //다크모드
  const isDark = useRecoilValue(isDarkAtom);
  const switchColor = `${isDark ? themes.dark.color : themes.light.color}`
  const switchBgColor = `${isDark ? themes.dark.bgColor : themes.light.bgColor}`
  const params = useParams()
  const userInfo = JSON.parse(sessionStorage.getItem("logined"))
  //현재 로그인한 유저 넘버
  const [loginedMemberNo, setLoginedMemberNo] = useState("")
  useEffect(() => {
    if (sessionStorage.getItem("logined") !== null) {
      setLoginedMemberNo(JSON.parse(sessionStorage.getItem("logined")).memberNo)
    }
  });
  //스프링 부트 통신
  const [content, setContent] = useState({
    boardId: 0,
    nickname: "",
    memberNo: 0,
    category: "",
    boardName: "",
    field: "",
    imgPath: "",
    createDate: "",
  });

  useEffect(() => {
    axios.get(`/api/board/detail/${params.boardId}`)
      .then((res) => {
        setContent(res.data);
        // console.log(res.data)
      });
  }, [params.boardId]);
  // 글 수정으로 이동
  const editContentBtn = (e) => {
    window.location.href = `/edit/${e}/${userInfo.nickName}`
  }
  //글 삭제
  const [show, setShow] = useState(false);
  const [taget, setTaget] = useState()
  const handleClose = () => setShow(false);
  const handleShow = (e) => {
    setShow(true)
    setTaget(e)
  };
  function DeleteModal() {
    return (
      <>
        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>삭제 확인</Modal.Title>
          </Modal.Header>
          <Modal.Body>정말 삭제 하시겠습니까?</Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              취소
            </Button>
            <Button variant="primary" onClick={deleteContentBtn}>
              삭제
            </Button>
          </Modal.Footer>
        </Modal>
      </>
    );
  }

  const deleteImgArr = []
  const deleteContentBtn = () => {
    // console.log(content)
    //내용안에서 이미지만 추출
    let count = content.field.split('http').length - 1;
    let newStartIndex = 0
    let startIndex = 0
    // console.log(count)
    for (let i = 0; i < count; i++) {
      if (content.field.indexOf(`"></p>`) !== -1) {
        startIndex = content.field.indexOf("http", newStartIndex);
        newStartIndex = content.field.indexOf(`"></p>`, startIndex);
        deleteImgArr.push(content.field.slice(startIndex, newStartIndex))
      }
      // console.log(deleteImgArr)
    }
    for (let i = 0; i < deleteImgArr.length; i++) {
      deleteObject(ref(storage, deleteImgArr[i]));
    }
    axios.delete(`/api/board/${taget}`)
      .then((res) => {
        setContent(res.data);
        setShow(false)
        setTaget()
        window.location.href = `/free-board/${userInfo.nickName}`
      })
  }

  return (
    <>
      <DeleteModal show={show}
        onHide={() => setShow(false)} />
      <CommunityNav />
      <Container style={{
        color: switchColor,
        backgroundColor: switchBgColor
      }}>
        <Title>
          {content.boardName}
        </Title>
        <BoarderLine />
        <ContentField dangerouslySetInnerHTML={{
          __html: DOMPurify.sanitize(content.field)
        }} />
        <ContentFooter>
          {
            content.createDate ?
              <>
                <Writer>작성자 : {content.nickname} </Writer>
                <CreateDate>{content.createDate.replace("T", ", ").slice(0, 17)}</CreateDate>
              </>
              :
              null
          }
          <>
            {
              window.sessionStorage.getItem("logined") === null ?
                null :
                loginedMemberNo === content.memberNo ?
                  <ContentBtns>
                    <MdModeEdit className="mdModeEdit" style={{
                      cursor: "pointer",
                      fontSize: "20px"
                      , margin: "0 5px",
                      color: switchColor,
                      backgroundColor: switchBgColor
                    }}
                      onClick={() => editContentBtn(content.boardId)} />
                    <MdDelete style={{
                      marginLeft: "10PX",
                      cursor: "pointer",
                      fontSize: "20px",
                      color: switchColor,
                      backgroundColor: switchBgColor
                    }} className="mdDelete"
                      onClick={() => handleShow(content.boardId)} />
                  </ContentBtns>
                  : null
            }
          </>
        </ContentFooter>
        <Comments />
      </Container>
    </>
  );
}

export default FreeBoardDetail;

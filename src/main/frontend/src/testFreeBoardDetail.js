import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import CommunityNav from './community/communityNav';
import Bumper from "./layout/bumper";
import DOMPurify from "dompurify";

const Container = styled.div`
  margin: 10px 20px 20px 20px; 
`;

const Category = styled.div`
  font-weight: bold;
  margin-bottom: 10px;
  text-align: center;
  font-size: 35px;
`;

const BoardName = styled.div`
  text-align: left;
  font-size: 35px;
  margin-bottom: 10px;
`;

const Field = styled.div`
  margin-bottom: 20px;

  p {
    margin-bottom: 10px;
    font-size: 25px;
  }

  img {
    max-width: 100%;
    height: auto;
    margin-bottom: 10px;
  }
`;

const ListFooter = styled.div`
  position: fixed; /* 고정 위치 설정 */
  bottom: 50%; /* 페이지 중간으로 이동 */
  right: 10px;
  transform: translateY(50%); /* 수직으로 정렬 */
  font-size: 14px;
  color: #888;
  padding-top: 0px; /* 위쪽 간격 추가 */
`;

const ButtonContainer = styled.div`
  position: fixed; /* 고정 위치 설정 */
  bottom: 50%; /* 페이지 중간으로 이동 */
  right: 10px;
  transform: translateY(50%); /* 수직으로 정렬 */
  padding-top: 50px; /* 위쪽 간격 추가 */
  z-index: 1; /* 다른 요소 위에 표시되도록 z-index 추가 */
`;


const Button = styled.button`
  margin-right: 10px;
  padding: 5px 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  background-color: #f0f0f0;
  cursor: pointer;

  &:hover {
    background-color: #e0e0e0;
  }
`;

const CommentContainer = styled.div`
  position: absolute;
  top: calc(50% + 60px); /* 수정 삭제 버튼 밑에서 아래로 20px 이동 */
  right: 0;
  transform: translateY(-50%);
  width: 100%;
`;

const CommentInput = styled.input`
  width: calc(100% - 20px); /* 좌우 10px 여백 제거 */
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  box-sizing: border-box;
  margin: 70px 10px 0; /* 위에 여백을 20px로 설정 */
`;


const Divider = styled.div`
  width: 100%;
  height: 1px;
  background-color: #ccc;
  margin-top: 20px;
`;

function TestFreeBoardDetail() {
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
  const params = useParams();

  useEffect(() => {
    axios.get(`/api/board/detail/${params.boardId}`)
      .then((res) => {
        setContent(res.data);
      });
  }, [params.boardId]);

  return (
    <Container>
      <CommunityNav />
      <Category>{content.category}</Category>
      <BoardName>{content.boardName}</BoardName>
      <ListFooter>
        {content.nickname}, {content.createDate.replace("T", ", ").slice(0, 17)}
      </ListFooter>
      <ButtonContainer>
        <Button>수정</Button>
        <Button>삭제</Button>
      </ButtonContainer>
      <CommentContainer>
        <CommentInput type="text" placeholder="댓글을 입력하세요..." />
      </CommentContainer>
      <Divider />
      <Field
        dangerouslySetInnerHTML={{
          __html: DOMPurify.sanitize(content.field),
        }}
      />
    </Container>
  );
}

export default TestFreeBoardDetail;

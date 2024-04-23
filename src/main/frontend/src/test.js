import { useEffect, useState } from "react";
import axios from "axios";

function Test() {

  const [hello, setHello] = useState();


  //회원가입시 받을 값들
  const [board, setBoard] = useState({
    boardId: 0,
    memberNo: 0,
    nickname: "",
    category: "",
    boardName: "",
    createDate: "",
    reviewCnt: 0
  })

  useEffect(() => {
    axios.get('/api/board/잡담')
      .then((res) => {
        setBoard(res.data);
      })
  }, []);
  console.log(hello)
  console.log(board)
  // const { email, password, passwordCheck, profileImg, mypet, nickName, phoneNumber, inputAddress, inputZonecode, detailedAddress } = memberInfo; // 비구조화 할당

  // function onChange(e) {
  //   const { value, name } = e.target;
  //   setMemberInfo({
  //     ...memberInfo,
  //     [name]: value
  //   });
  // }


  return (
    <div>
      홈화면입니다. 백엔드 데이터 헹 : {hello}
      홈화면입니다. 백엔드 데이터 :
      루이보테 {hello}
      {/* <div>{board[0].boardId}</div>
      <div>{board[0].boardName}</div>
      <div>{board[0].category}</div>
      <div>{board[0].createDate}</div>
      <div>{board[0].memberNo}</div>
      <div>{board[0].reviewCnt}</div> */}
    </div>
  );
}

export default Test;
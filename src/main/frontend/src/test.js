import { useEffect, useState } from "react";
import axios from "axios";

function Test() {

  const [hello, setHello] = useState('');

  useEffect(() => {
    axios.get('/api/test')
      .then((res) => {
        setHello(res.data);
      })
  }, []);

  return (
    <div>
      홈화면입니다. 백엔드 데이터 헹 : {hello}
      홈화면입니다. 백엔드 데이터 :
      루이보테 {hello}
    </div>
  );
}

export default Test;
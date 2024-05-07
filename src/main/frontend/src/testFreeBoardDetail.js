import styled from "styled-components";
import Bumper from "./layout/bumper";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import DOMPurify from "dompurify"; //html 코드 번역?

function TestFreeBoardDetail() {
    const [content, setContent] = useState({
        boardId: 0,
        nickname: "",
        memberNo: 0,
        category: "",
        boardName: "",
        field: "",
        imgPath: "",
        createDate: ""
    })
    const params = useParams()
    console.log(params)
    useEffect(() => {
        axios.get(`/api/board/detail/${params.boardId}`)
            .then((res) => {
                setContent(res.data);
            })
    }, []);
    console.log(content)
    return (
        <div>
            <Bumper />
            <div>
                {content.category}
            </div>
            <div>
                {content.boardName}
            </div>
            <div dangerouslySetInnerHTML={{
                __html: DOMPurify.sanitize(content.field)
            }}>
            </div>
            <div>
                {content.createDate}
            </div>
        </div>
    );
}

export default TestFreeBoardDetail;
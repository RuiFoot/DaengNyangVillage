import { useRecoilValue } from 'recoil';
import { isDarkAtom } from '../atoms';
import styled from "styled-components";
import themes from "../theme";
import Bumper from '../layout/bumper';
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { useState } from 'react';

const Container = styled.div`
min-height: calc(100vh - 86px);
`

const InputForm = styled.div`
margin: 20px 6vw;
`
/* & .ql-stroke  {
stroke : ${isDark ? themes.dark.color : themes.light.color}
}
& .ql-picker  {
color : ${isDark ? themes.dark.color : themes.light.color}
}
& .ql-fill {
fill : ${isDark ? themes.dark.color : themes.light.color}
} */

function TextWrite() {

    const isDark = useRecoilValue(isDarkAtom);
    const [quillValue, setQuillValue] = useState("");

    const handleQuillChange = (content, delta, source, editor) => {
        setQuillValue(editor.getContents());
    };
    const modules = {
        toolbar: [
            [{ header: [1, 2, false] }],
            ["bold", "italic", "underline", "strike", "blockquote"],
            [
                { list: "ordered" },
                { list: "bullet" },
                { indent: "-1" },
                { indent: "+1" },
            ],
            ["link"],
            [{ align: [] }, { color: [] }, { background: [] }], // dropdown with defaults from theme
            ["clean"],
        ],
    };

    const formats = [
        "header",
        "bold",
        "italic",
        "underline",
        "strike",
        "blockquote",
        "list",
        "bullet",
        "indent",
        "link",
        "align",
        "color",
        "background",
    ];


    return (
        <Container style={{
            color: `${isDark ? themes.dark.color : themes.light.color}`,
            backgroundColor: `${isDark ? themes.dark.bgColor : themes.light.bgColor}`
        }}>
            <Bumper />
            <InputForm>
                글쓰기 페이지입니다.

                <ReactQuill
                    theme="snow"
                    modules={modules}
                    formats={formats}
                    value={quillValue || ""}
                    style={{ height: "400px" }}
                    onChange={handleQuillChange}
                />

            </InputForm>
        </Container>
    );
}

export default TextWrite;
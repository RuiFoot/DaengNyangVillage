import { useRecoilValue } from 'recoil';
import { isDarkAtom } from '../atoms';
import styled from "styled-components";
import themes from "../theme";
import Button from 'react-bootstrap/Button';
import Dropdown from 'react-bootstrap/Dropdown';


const BoardHeader = styled.div`
margin: 10px 6vw 0 6vw;
display: flex;
justify-content: flex-end;
`

function CommunityHeader() {
    const isDark = useRecoilValue(isDarkAtom);

    let nickName
    if (window.sessionStorage.key(0) === "logined") {
        nickName = JSON.parse(sessionStorage.getItem("logined")).nickName
    }

    const goWrite = () => {
        window.location.href = `/write/${nickName}`
    }
    return (
        <BoardHeader>
            <Dropdown >
                <Dropdown.Toggle className="headerBtn" id="dropdown-basic" style={{
                    color: `${isDark ? themes.dark.color : themes.light.color}`,
                    backgroundColor: `${isDark ? themes.dark.bgColor : themes.light.bgColor}`
                }}>
                    정렬
                </Dropdown.Toggle>
                <Dropdown.Menu >
                    <Dropdown.Item href="#/action-1">날짜 오름차순</Dropdown.Item>
                    <Dropdown.Item href="#/action-2">날짜 내림차순</Dropdown.Item>
                </Dropdown.Menu>
            </Dropdown>
            {
                window.sessionStorage.key(0) === "logined" ?
                    <Button className="headerBtn" style={{
                        color: `${isDark ? themes.dark.color : themes.light.color}`,
                        backgroundColor: `${isDark ? themes.dark.bgColor : themes.light.bgColor}`
                    }}
                        onClick={goWrite}
                    >글쓰기</Button>
                    :
                    null
            }
        </BoardHeader>
    );
}

export default CommunityHeader;
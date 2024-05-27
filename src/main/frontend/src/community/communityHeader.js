import { useRecoilValue } from 'recoil';
import { isDarkAtom } from '../components/atoms';
import styled from "styled-components";
import themes from "../components/theme";
import Button from 'react-bootstrap/Button';
import Dropdown from 'react-bootstrap/Dropdown';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';

const BoardHeader = styled.div`
margin: 10px 6vw 10px 6vw;
display: flex;
justify-content: flex-end;
`

function CommunityHeader() {
    const isDark = useRecoilValue(isDarkAtom);
    const switchColor = `${isDark ? themes.dark.color : themes.light.color}`
    const switchBgColor = `${isDark ? themes.dark.bgColor : themes.light.bgColor}`
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
                    color: switchColor,
                    backgroundColor: switchBgColor
                }}>
                    정렬
                </Dropdown.Toggle>
                <Dropdown.Menu >
                    <Dropdown.Item href="#/action-1">최신순</Dropdown.Item>
                    <Dropdown.Item href="#/action-2">오래된순</Dropdown.Item>
                </Dropdown.Menu>
            </Dropdown>
            {
                window.sessionStorage.key(0) === "logined" ?
                    <Button className="headerBtn" style={{
                        color: switchColor,
                        backgroundColor: switchBgColor
                    }}
                        onClick={goWrite}
                    >글쓰기</Button>
                    :
                    <OverlayTrigger overlay={<Tooltip id="tooltip-disabled">로그인 해주세요</Tooltip>}>
                        <span className="d-inline-block">
                            <Button className="headerBtn" disabled style={{
                                pointerEvents: 'none', color: switchColor,
                                backgroundColor: switchBgColor
                            }}>
                                글쓰기
                            </Button>
                        </span>
                    </OverlayTrigger>
            }
        </BoardHeader>
    );
}

export default CommunityHeader;
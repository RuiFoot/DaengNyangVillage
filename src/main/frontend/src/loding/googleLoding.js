import styled from "styled-components";
import Spinner from 'react-bootstrap/Spinner';
import Bumper from "../layout/bumper";
import { useRecoilValue } from 'recoil';
import { isDarkAtom } from '../components/atoms';
import themes from "../components/theme";

const Container = styled.div`
min-height: calc(100vh - 184px);
display: flex;
flex-direction: column;
justify-content: center;
align-items: center;
`;

function GoogleLoding() {
    //다크모드
    const isDark = useRecoilValue(isDarkAtom);
    const switchColor = `${isDark ? themes.dark.color : themes.light.color}`
    const switchBgColor = `${isDark ? themes.dark.bgColor : themes.light.bgColor}`
    return (
        <div>
            <Bumper />
            <Container style={{
                color: switchColor,
                backgroundColor: switchBgColor
            }}>
                <div style={{ margin: "10px 0" }}>구글 아이디로 로그인 중입니다.</div>
                <Spinner animation="border" />
            </Container>
        </div>
    );
}

export default GoogleLoding;
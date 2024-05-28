import styled from "styled-components";
import Bumper from "../layout/bumper";
import Spinner from 'react-bootstrap/Spinner';
import { useRecoilValue } from 'recoil';
import { isDarkAtom } from '../components/atoms';
import themes from "../components/theme";

const Container = styled.div`
min-height: calc(100vh - 86px);
display: flex;
flex-direction: column;
align-items: center;
justify-content: center;
`
function KakaoLoding() {
    const isDark = useRecoilValue(isDarkAtom);
    const switchColor = `${isDark ? themes.dark.color : themes.light.color}`
    const switchBgColor = `${isDark ? themes.dark.bgColor : themes.light.bgColor}`
    return (
        <>
            <Bumper />
            <Container style={{
                color: switchColor,
                backgroundColor: switchBgColor
            }}>
                <div>카카로 계정으로 로그인 중 입니다...</div>
                <Spinner style={{ margin: "20px" }} animation="border" variant="warning" />
            </Container>
        </>
    );
}

export default KakaoLoding;
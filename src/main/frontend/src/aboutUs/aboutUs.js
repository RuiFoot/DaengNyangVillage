import Bumper from "../layout/bumper";
import { useRecoilValue } from 'recoil';
import { isDarkAtom } from '../atoms';
import styled from "styled-components";
import themes from "../theme";

const Container = styled.div`
min-height: calc(100vh - 86px);
`
function AboutUs() {
    const isDark = useRecoilValue(isDarkAtom);
    const switchColor = `${isDark ? themes.dark.color : themes.light.color}`
    const switchBgColor = `${isDark ? themes.dark.bgColor : themes.light.bgColor}`
    return (
        <Container style={{
            color: switchColor,
            backgroundColor: switchBgColor
        }}>
            <Bumper />
            AboutUs입니다.
        </Container >
    );
}

export default AboutUs;
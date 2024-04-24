import Bumper from "../layout/Bumper";
import {
    RecoilRoot,
    atom,
    selector,
    useRecoilState,
    useRecoilValue,
} from 'recoil';
import { isDarkAtom } from '../atoms';
import styled from "styled-components";
import themes from "../theme";


function AboutUs() {
    const isDark = useRecoilValue(isDarkAtom);

    const Container = styled.div`
    min-height: calc(100vh - 86px);
    color: ${isDark ? themes.dark.color : themes.light.color};
    background-color: ${isDark ? themes.dark.bgColor : themes.light.bgColor};
    `
    console.log(isDark)
    return (
        <Container>
            <Bumper />
            AboutUs입니다.
        </Container>
    );
}

export default AboutUs;
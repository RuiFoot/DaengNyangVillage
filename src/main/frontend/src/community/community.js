import Bumper from "../layout/bumper";
import { useRecoilValue } from 'recoil';
import { isDarkAtom } from '../atoms';
import styled from "styled-components";
import themes from "../theme";
import Test from "../test";

const Container = styled.div`
min-height: calc(100vh - 86px);
`
function Community() {
    const isDark = useRecoilValue(isDarkAtom);
    return (
        <Container style={{
            color: `${isDark ? themes.dark.color : themes.light.color}`,
            backgroundColor: `${isDark ? themes.dark.bgColor : themes.light.bgColor}`
        }}>
            <Bumper />
            커뮤니티입니다.
            <Test />
        </Container>
    );
}


export default Community;
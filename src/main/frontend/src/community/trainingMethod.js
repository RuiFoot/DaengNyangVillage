import { useRecoilValue } from 'recoil';
import { isDarkAtom } from '../atoms';
import styled from "styled-components";
import themes from "../theme";
import CommunityNav from "./communityNav";

const Container = styled.div`
min-height: calc(100vh - 86px);
`
function TrainingMethod() {
    const isDark = useRecoilValue(isDarkAtom);
    return (
        <Container style={{
            color: `${isDark ? themes.dark.color : themes.light.color}`,
            backgroundColor: `${isDark ? themes.dark.bgColor : themes.light.bgColor}`
        }}>
            <CommunityNav />
            트레이닝 방법 공유
        </Container>
    );
}


export default TrainingMethod;
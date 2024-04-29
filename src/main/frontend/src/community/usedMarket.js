import { useRecoilValue } from 'recoil';
import { isDarkAtom } from '../atoms';
import styled from "styled-components";
import themes from "../theme";
import CommunityNav from "./communityNav";
import CommunityHeader from './communityHeader';

const Container = styled.div`
min-height: calc(100vh - 86px);
`
function UsedMarket() {
    const isDark = useRecoilValue(isDarkAtom);
    return (
        <Container style={{
            color: `${isDark ? themes.dark.color : themes.light.color}`,
            backgroundColor: `${isDark ? themes.dark.bgColor : themes.light.bgColor}`
        }}>
            <CommunityNav />
            <CommunityHeader />
            댕냥 마켓
        </Container>
    );
}


export default UsedMarket;
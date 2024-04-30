import { useRecoilValue } from 'recoil';
import { isDarkAtom } from '../atoms';
import styled from "styled-components";
import themes from "../theme";
import CommunityNav from "./communityNav";
import CommunityHeader from './communityHeader';

const Container = styled.div`
min-height: calc(100vh - 86px);
`

function PetBoast() {
    const isDark = useRecoilValue(isDarkAtom);

    let nickName
    if (window.sessionStorage.key(0) === "logined") {
        nickName = JSON.parse(sessionStorage.getItem("logined")).nickName
    }

    return (
        <Container style={{
            color: `${isDark ? themes.dark.color : themes.light.color}`,
            backgroundColor: `${isDark ? themes.dark.bgColor : themes.light.bgColor}`
        }}>
            <CommunityNav />
            <CommunityHeader />
            반려동물 자랑
        </Container>
    );
}


export default PetBoast;
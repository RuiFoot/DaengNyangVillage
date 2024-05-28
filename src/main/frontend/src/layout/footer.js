import styled from "styled-components";
import "../style.css"
import { FaGithub } from "react-icons/fa6";
import { RxNotionLogo } from "react-icons/rx";
import { useRecoilValue } from 'recoil';
import { isDarkAtom } from '../components/atoms';
import themes from "../components/theme";

const FooterContainer = styled.div`
display: flex;
flex-direction: column;
align-items: center;
justify-content: center;
width: 100%;
height: 89px;
border-top: 2px solid #F2884B;
`
const Icons = styled.div`
margin: 18px;
`
const Copyright = styled.div`
`

function Footer() {
    //다크모드
    const isDark = useRecoilValue(isDarkAtom);
    const switchColor = `${isDark ? themes.dark.color : themes.light.color}`
    const switchBgColor = `${isDark ? themes.dark.bgColor : themes.light.bgColor}`

    return (
        <FooterContainer style={{
            color: switchColor,
            backgroundColor: switchBgColor
        }}>
            <Icons>
                <a style={{
                    color: switchColor,
                    backgroundColor: switchBgColor
                }} href="https://mysterious-airedale-6dc.notion.site/637c5c7ba79e43f5985d09125092b2b4?pvs=74"><RxNotionLogo className="footerIcon" /></a>
                <a style={{
                    color: switchColor,
                    backgroundColor: switchBgColor
                }} href="https://github.com/RuiFoot/DaengNyangVillage"><FaGithub className="footerIcon" /></a>
            </Icons>
            <Copyright>
                © Copyright 2024, All Rights Reserved by 오루보
            </Copyright>
        </FooterContainer>
    );
}

export default Footer;
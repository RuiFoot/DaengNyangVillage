import styled from "styled-components";
import "../style.css"
import { FaXTwitter, FaFacebookF, FaInstagram, FaGithub } from "react-icons/fa6";
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
                <FaXTwitter className="footerIcon" />
                <FaFacebookF className="footerIcon" />
                <FaInstagram className="footerIcon" />
                <FaGithub className="footerIcon" />
            </Icons>
            <Copyright>
                © Copyright 2024, All Rights Reserved by 오루보
            </Copyright>
        </FooterContainer>
    );
}

export default Footer;
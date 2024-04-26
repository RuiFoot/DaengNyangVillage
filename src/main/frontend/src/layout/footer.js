import styled from "styled-components";
import "../style.css"
import { FaXTwitter, FaFacebookF, FaInstagram, FaGithub } from "react-icons/fa6";
import { useRecoilValue } from 'recoil';
import { isDarkAtom } from '../atoms';
import themes from "../theme";

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
    const isDark = useRecoilValue(isDarkAtom);

    return (
        <FooterContainer style={{
            color: `${isDark ? themes.dark.color : themes.light.color}`,
            backgroundColor: `${isDark ? themes.dark.navFooterBgColor : themes.light.bgColor}`
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
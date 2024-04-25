import styled from "styled-components";
import "../style.css"
import { FaXTwitter, FaFacebookF, FaInstagram, FaGithub } from "react-icons/fa6";
import {
    RecoilRoot,
    atom,
    selector,
    useRecoilState,
    useRecoilValue,
} from 'recoil';
import { isDarkAtom } from '../atoms';
import themes from "../theme";



function Footer() {
    const isDark = useRecoilValue(isDarkAtom);

    const FooterContainer = styled.div`
    background-color: ${isDark ? themes.dark.bgColor : themes.light.bgColor};
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 86px;
    border-top: 2px solid #F2884B;
    `
    const Icons = styled.div`
    color: ${isDark ? themes.dark.color : themes.light.color};
    margin: 18px;
    `
    const Copyright = styled.div`
    color: ${isDark ? themes.dark.color : themes.light.color};
    `

    return (
        <FooterContainer>
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
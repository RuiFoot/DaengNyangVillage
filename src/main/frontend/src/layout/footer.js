import styled from "styled-components";
import "../style.css"
import { FaXTwitter, FaFacebookF, FaInstagram, FaGithub } from "react-icons/fa6";

const FooterContainer = styled.div`

background-color: white;
display: flex;
flex-direction: column;
align-items: center;
justify-content: center;
width: 100%;
height: 86px;
border-top: 2px solid #F2884B;
`
const Icons = styled.div`
margin: 18px;
`
const Copyright = styled.div`
`

function Footer() {
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
import styled from "styled-components";
import { FaSquareXTwitter } from "react-icons/fa6";
import { FaGithubSquare, FaInstagramSquare, FaFacebookSquare } from "react-icons/fa";
import "./style.css"

const FooterContainer = styled.div`
position: fixed;
bottom: 0;
display: flex;
justify-content: center;
width: 100%;
height: 80px;
border-top: 2px solid black;
`

function Footer() {
    return (
        <FooterContainer>
            <div>
                <FaSquareXTwitter className="footerIcon" />
                <FaFacebookSquare className="footerIcon" />
                <FaInstagramSquare className="footerIcon" />
                <FaGithubSquare className="footerIcon" />
            </div>
            <p>© Copyright 2024, All Rights Reserved by 오루보</p>
        </FooterContainer>
    );
}

export default Footer;
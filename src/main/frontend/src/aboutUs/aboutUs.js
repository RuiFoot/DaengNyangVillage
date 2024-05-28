import Bumper from "../layout/bumper";
import { useRecoilValue } from 'recoil';
import { isDarkAtom } from '../components/atoms';
import styled from "styled-components";
import themes from "../components/theme";
import Card from 'react-bootstrap/Card';
import usInfo from "./aboutUsInfo";
import defaultImg from "../img/defaultImg.png";
import { FaInstagram, FaGithub } from "react-icons/fa6";
import { RxNotionLogo } from "react-icons/rx";

const Container = styled.div`
min-height: calc(100vh - 86px);
display: flex;
align-items: center;
justify-content: center;
`
const Contents = styled.div`
margin: 150px 0 50px 0;
width: 80vw;
display: grid;
place-items: center;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  grid-auto-rows: minmax(100px, auto);
  gap: 10px;
`
const Content = styled.div`
width: 250px;

`
const CardImg = styled.div`
display: flex;
justify-content: center;
`

function AboutUs() {
    const isDark = useRecoilValue(isDarkAtom);
    const switchColor = `${isDark ? themes.dark.color : themes.light.color}`
    const switchBgColor = `${isDark ? themes.dark.bgColor : themes.light.bgColor}`
    console.log(usInfo)
    return (
        <Container style={{
            color: switchColor,
            backgroundColor: switchBgColor
        }}>
            <Bumper />
            <Contents>
                {usInfo.map((e, i) => (
                    <Content key={i}>
                        <Card style={{ width: "100%" }}>
                            <CardImg>
                                <Card.Img variant="top" src={e.img ? e.img : defaultImg} style={{ height: "150px", width: "150px", borderRadius: "50%", margin: "10px" }} />
                            </CardImg>
                            <Card.Body>
                                <Card.Title>{e.name}</Card.Title>
                                <Card.Text>
                                    MBTI : {e.mbti}
                                </Card.Text>
                                <Card.Text>
                                    Position : {e.position}
                                </Card.Text>
                                <Card.Text>
                                    TMI : {e.TMI}
                                </Card.Text>
                                <Card.Text>
                                    Like : {e.취미}
                                </Card.Text>
                                <Card.Text>
                                    {e.email}
                                </Card.Text>
                                <Card.Text style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
                                    <a style={{
                                        color: "black"
                                    }} href={e.insta} target="_blank" ><FaInstagram className="footerIcon" /></a>
                                    <a style={{
                                        color: "black"
                                    }} href={e.git} target="_blank" ><FaGithub className="footerIcon" /></a>
                                    <a style={{
                                        color: "black"
                                    }} href={e.notion} target="_blank" ><RxNotionLogo className="footerIcon" /></a>
                                </Card.Text>
                            </Card.Body>
                        </Card>
                    </Content>
                ))}
            </Contents>
        </Container >
    );
}

export default AboutUs;
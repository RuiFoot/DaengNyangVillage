import Bumper from "../layout/bumper";
import { useRecoilValue } from 'recoil';
import { isDarkAtom } from '../components/atoms';
import styled from "styled-components";
import themes from "../components/theme";
import Card from 'react-bootstrap/Card';
import usInfo from "./aboutUsInfo";
import defaultImg from "../img/defaultImg.png";

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
                                <Card.Img variant="top" src={defaultImg} style={{ height: "150px", width: "150px" }} />
                            </CardImg>
                            <Card.Body>
                                <Card.Title>{e.name}</Card.Title>
                                <Card.Text>
                                    {e.position}
                                </Card.Text>
                                <Card.Text>
                                    {e.aboutMe}
                                </Card.Text>
                                <Card.Text>
                                    {e.Contact}
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
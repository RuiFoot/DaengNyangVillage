import styled from "styled-components";
import MypageNavbar from "./mypageNavbar";
import { useRecoilValue } from 'recoil';
import { isDarkAtom } from '../../atoms';
import themes from "../../theme";
import Button from 'react-bootstrap/Button';
import '../membershipStyle.css'

const Container = styled.div`
min-height: calc(100vh - 229px);
display: flex;
flex-direction: column;
align-items: center;
`

const UserInfo = styled.div`
`
const Boxs = styled.div`
margin: 20px;
border-bottom: 1px solid #F2884B;
padding: 10px 0;
`
const UserTitle = styled.div`
font-size: 20px;
margin-bottom: 5px;
`
const UserNickname = styled.div`

`
const UserImgBox = styled.div`
margin: 20px;
display: flex;
justify-content: center;
`

const UserImg = styled.div`
height: 200px;
width: 200px;
background-position: center;
background-size: cover;
border-radius: 40px;
`

const UserPet = styled.div`
`

const UserNum = styled.div`
`

const UserAddress = styled.div`
`

function MyInfo() {
    const isDark = useRecoilValue(isDarkAtom);
    const userData = JSON.parse(sessionStorage.getItem("logined"))
    console.log(userData)
    return (
        <>
            <MypageNavbar />
            <Container style={{
                color: `${isDark ? themes.dark.color : themes.light.color}`,
                backgroundColor: `${isDark ? themes.dark.bgColor : themes.light.bgColor}`
            }}>
                <UserInfo>
                    <Boxs>
                        <UserTitle>닉네임</UserTitle>
                        <UserNickname>{userData.nickName}</UserNickname>
                    </Boxs>
                    <Boxs>
                        <UserTitle>프로필 이미지</UserTitle>
                        <UserImgBox>
                            <UserImg style={{ backgroundImage: `url(${userData.profileImg})` }} />
                        </UserImgBox>
                    </Boxs>
                    <Boxs>
                        <UserTitle>나의 반려동물</UserTitle>
                        <UserPet>{userData.mypet}</UserPet>
                    </Boxs>
                    <Boxs>
                        <UserTitle>전화번호</UserTitle>
                        <UserNum>{userData.phoneNumber}</UserNum>
                    </Boxs>
                    <Boxs>
                        <UserTitle>주소</UserTitle>
                        <UserAddress>{userData.inputAddress} {userData.detailedAddress}</UserAddress>
                    </Boxs>
                </UserInfo>
                <Button className="changBtn"
                    onClick={() => window.location.href = `/my-info-change/${userData.nickName}`}
                >회원 정보 수정</Button>
            </Container>
        </>
    )
}

export default MyInfo
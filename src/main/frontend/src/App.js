import { Route, Routes } from "react-router-dom";
import Home from "./home/Home"
import Community from "./community/Community"
import PlaceRecommend from "./PlaceRecommend/PlaceRecommend"
import AboutUs from "./aboutUs/AboutUs";
import JoinMembership from "./membership/JoinMembership";
import Mypage from "./membership/mypages/MypageNavbar";
import ForgetIdPassWd from "./membership/ForgetIdPassWd";
import ChangePasswd from "./membership/mypages/ChangePasswd";
import SelectedLocation from "./membership/mypages/SelectedLocation";
import WrittenByMe from "./membership/mypages/WrittenByMe";
import MyInfo from "./membership/mypages/MyInfo";
import ChangePasswdLick from "./membership/mypages/ChangePasswdLick";

function App() {
  return (
    <div id="App">
      {
        window.sessionStorage.key(0) !== "logined"
          ?
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/Community" element={<Community />} />
            <Route path="/PlaceRecommend" element={<PlaceRecommend />} />
            <Route path="/AboutUs" element={<AboutUs />} />
            <Route path="/JoinMembership" element={<JoinMembership />} />
            <Route path="/ForgetIdPassWd" element={<ForgetIdPassWd />}
            />
            <Route path="/ChangePasswdLick/:nickNameLink" element={<ChangePasswdLick />} />
          </Routes>
          : <Routes>
            <Route path="/:nickName" element={<Home />} />
            <Route path="/Community/:nickName" element={<Community />} />
            <Route path="/PlaceRecommend/:nickName" element={<PlaceRecommend />} />
            <Route path="/AboutUs/:nickName" element={<AboutUs />} />
            <Route path="/MyInfo/:nickName" element={<MyInfo />} />
            <Route path="/ChangePasswd/:nickName" element={<ChangePasswd />} />
            <Route path="/SelectedLocation/:nickName" element={<SelectedLocation />} />
            <Route path="/WrittenByMe/:nickName" element={<WrittenByMe />} />
          </Routes>
      }
    </div>
  );
}

export default App;
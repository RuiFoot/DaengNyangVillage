import { Route, Routes } from "react-router-dom";
import Home from "./home/Home"
import Community from "./community/Community"
import PlaceRecommend from "./placeRecommend/placeRecommend"
import AboutUs from "./aboutUs/AboutUs";
import JoinMembership from "./membership/JoinMembership";
import Mypage from "./membership/Mypage";
import ForgetIdPassWd from "./membership/ForgetIdPassWd";
import ChangePasswd from "./membership/ChangePasswd";
import SelectedLocation from "./membership/SelectedLocation";
import WrittenByMe from "./membership/WrittenByMe";

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
            <Route path="/ForgetIdPassWd" element={<ForgetIdPassWd />} />
          </Routes>
          : <Routes>
            <Route path="/logined" element={<Home />} />
            <Route path="/Community/logined" element={<Community />} />
            <Route path="/PlaceRecommend/logined" element={<PlaceRecommend />} />
            <Route path="/AboutUs/logined" element={<AboutUs />} />
            <Route path="/Mypage/logined" element={<Mypage />} />
            <Route path="/ChangePasswd/logined" element={<ChangePasswd />} />
            <Route path="/SelectedLocation/logined" element={<SelectedLocation />} />
            <Route path="/WrittenByMe/logined" element={<WrittenByMe />} />
          </Routes>
      }
    </div>
  );
}

export default App;
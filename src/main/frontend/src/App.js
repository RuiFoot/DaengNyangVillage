import { Route, Routes } from "react-router-dom";
import Home from "./home/Home"
import Community from "./community/Community"
import PlaceRecommend from "./placeRecommend/PlaceRecommend"
import AboutUs from "./aboutUs/AboutUs";
import JoinMembership from "./membership/JoinMembership";
import Mypage from "./membership/Mypage";

function App() {
  return (
    <div id="App">
      {
        window.localStorage.key(0) !== "logined"
          ?
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/Community" element={<Community />} />
            <Route path="/PlaceRecommend" element={<PlaceRecommend />} />
            <Route path="/AboutUs" element={<AboutUs />} />
            <Route path="/JoinMembership" element={<JoinMembership />} />
            <Route path="/Mypage" element={<Mypage />} />
          </Routes>
          : <Routes>
            <Route path="/logined" element={<Home />} />
            <Route path="/Community/logined" element={<Community />} />
            <Route path="/PlaceRecommend/logined" element={<PlaceRecommend />} />
            <Route path="/AboutUs/logined" element={<AboutUs />} />
            <Route path="/JoinMembership/logined" element={<JoinMembership />} />
            <Route path="/Mypage" element={<Mypage />} />
          </Routes>
      }
    </div>
  );
}

export default App;
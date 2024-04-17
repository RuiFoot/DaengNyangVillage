import { Route, Routes } from "react-router-dom";
import Home from "./home/Home"
import Community from "./Community"
import PlaceRecommend from "./PlaceRecommend/PlaceRecommend";
import AboutUs from "./AboutUs";
import JoinMembership from "./membership/JoinMembership";
import Mypage from "./Mypage";

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
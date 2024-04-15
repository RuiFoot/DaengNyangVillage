import { Route, Routes } from "react-router-dom";
import Home from "./home/Home"
import Community from "./Community"
import PlaceRecommend from "./PlaceRecommend";
import AboutUs from "./AboutUs";
import JoinMembership from "./JoinMembership";

function App() {
  return (
    <div className="App">

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/Community" element={<Community />} />
        <Route path="/PlaceRecommend" element={<PlaceRecommend />} />
        <Route path="/AboutUs" element={<AboutUs />} />
        <Route path="/JoinMembership" element={<JoinMembership />} />
      </Routes>
    </div>
  );
}

export default App;
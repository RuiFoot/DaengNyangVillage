import { Route, Routes } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.css';
import Home from "./home/home"
import Community from "./community/community"
import PlaceRecommend from "./placeRecommend/placeRecommend"
import AboutUs from "./aboutUs/aboutUs";
import JoinMembership from "./membership/joinMembership";
import FindIdPasswd from "./membership/findIdPasswd";
import ChangePasswd from "./membership/mypages/changePasswd";
import SelectedLocation from "./membership/mypages/selectedLocation";
import WrittenByMe from "./membership/mypages/writtenByMe";
import MyInfo from "./membership/mypages/myInfo";
import ChangePasswdLick from "./membership/mypages/changePasswdLick";

function Router() {
    if (window.sessionStorage.key(0) !== "logined") {
        return (
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/community" element={<Community />} />
                <Route path="/place-recommend" element={<PlaceRecommend />} />
                <Route path="/about-us" element={<AboutUs />} />
                <Route path="/join-membership" element={<JoinMembership />} />
                <Route path="/find-id-passwd" element={<FindIdPasswd />}
                />
                <Route path="/change-passwd-lick/:nickNameLink" element={<ChangePasswdLick />} />
            </Routes>
        )
    } else {
        return (
            <Routes>
                <Route path="/:nickName" element={<Home />} />
                <Route path="/community/:nickName" element={<Community />} />
                <Route path="/place-recommend/:nickName" element={<PlaceRecommend />} />
                <Route path="/about-us/:nickName" element={<AboutUs />} />
                <Route path="/my-info/:nickName" element={<MyInfo />} />
                <Route path="/change-passwd/:nickName" element={<ChangePasswd />} />
                <Route path="/selected-location/:nickName" element={<SelectedLocation />} />
                <Route path="/written-by-me/:nickName" element={<WrittenByMe />} />
            </Routes>
        )
    }
}

export default Router;
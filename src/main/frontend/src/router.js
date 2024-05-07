import React from 'react';
import { Route, Routes } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.css';
import Home from "./home/home"
import PlaceRecommend from "./placeRecommend/placeRecommend"
import AboutUs from "./aboutUs/aboutUs";
import JoinMembership from "./membership/joinMembership";
import FindIdPasswd from "./membership/findIdPasswd";
import ChangePasswd from "./membership/mypages/changePasswd";
import SelectedLocation from "./membership/mypages/selectedLocation";
import WrittenByMe from "./membership/mypages/writtenByMe";
import MyInfo from "./membership/mypages/myInfo";
import ChangePasswdLick from "./membership/mypages/changePasswdLick";
import FreeBoard from "./community/FreeBoard";
import PetBoast from "./community/petBoast";
import TrainingMethod from "./community/trainingMethod";
import UsedMarket from "./community/usedMarket";
import TextWrite from "./community/textWrite";
import PostDetail from "./community/PostDetail"; // PostDetail 컴포넌트 import

function Router() {
    if (window.sessionStorage.key(0) !== "logined") {
        return (
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/place-recommend" element={<PlaceRecommend />} />
                <Route path="/about-us" element={<AboutUs />} />
                <Route path="/join-membership" element={<JoinMembership />} />
                <Route path="/find-id-passwd" element={<FindIdPasswd />} />
                <Route path="/free-board" element={<FreeBoard />} />
                <Route path="/pet-boast" element={<PetBoast />} />
                <Route path="/training-method" element={<TrainingMethod />} />
                <Route path="/used-market" element={<UsedMarket />} />
                <Route path="/change-passwd-lick/:nickNameLink" element={<ChangePasswdLick />} />
                <Route path="/post/:id" element={<PostDetail />} /> {/* PostDetail 라우트 추가 */}
            </Routes>
        )
    } else {
        return (
            <Routes>
                <Route path="/:nickName" element={<Home />} />
                <Route path="/place-recommend/:nickName" element={<PlaceRecommend />} />
                <Route path="/about-us/:nickName" element={<AboutUs />} />
                <Route path="/my-info/:nickName" element={<MyInfo />} />
                <Route path="/change-passwd/:nickName" element={<ChangePasswd />} />
                <Route path="/selected-location/:nickName" element={<SelectedLocation />} />
                <Route path="/written-by-me/:nickName" element={<WrittenByMe />} />
                <Route path="/free-board/:nickName" element={<FreeBoard />} />
                <Route path="/pet-boast/:nickName" element={<PetBoast />} />
                <Route path="/training-method/:nickName" element={<TrainingMethod />} />
                <Route path="/used-market/:nickName" element={<UsedMarket />} />
                <Route path="/text-write/:nickName" element={<TextWrite />} />
                <Route path="/post/:postId" element={<PostDetail />} /> {/* PostDetail 라우트 추가 */}
            </Routes>
        )
    }
}

export default Router;

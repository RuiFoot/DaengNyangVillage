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
import FreeBoard from "./community/freeBoard";
import PetBoast from "./community/petBoast";
import TrainingMethod from "./community/trainingMethod";
import UsedMarket from "./community/usedMarket";
import Write from "./community/write";
import MyInfoChange from "./membership/mypages/myInfoChange";
import RecommendDetail from "./placeRecommend/recommendDetail";
import FreeBoardDetail from "./community/freeBoardDetail";
import UsedMarketDetail from "./community/usedMarketDetail";
import Edit from "./community/edit";
import PetBoastDetail from "./community/petBoastDetail";
import TrainingBoardDetail from "./community/trainingBoardDetail";

function Router() {
    if (window.sessionStorage.key(0) !== "logined") {
        return (
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/place-recommend" element={<PlaceRecommend />} />
                <Route path="/about-us" element={<AboutUs />} />
                <Route path="/join-membership" element={<JoinMembership />} />
                <Route path="/find-id-passwd" element={<FindIdPasswd />}
                />
                <Route path="/free-board" element={<FreeBoard />}
                />
                <Route path="/pet-boast" element={<PetBoast />}
                />
                <Route path="/training-method" element={<TrainingMethod />}
                />
                <Route path="/used-market" element={<UsedMarket />}
                />
                <Route path="/recommend-place-detail/:itemId" element={<RecommendDetail />}
                />
                <Route path="/change-passwd-lick/:nickNameLink" element={<ChangePasswdLick />} />
                <Route path="/free-board-detail/:boardId" element={<FreeBoardDetail />} />

                <Route path="/training-method-detail/:boardId" element={<TrainingBoardDetail />} />
                <Route path="/used-market-detail/:boardId" element={<UsedMarketDetail />} />
                <Route path="/pet-boast-detail/:boardId" element={<PetBoastDetail />} />
                <Route path="/edit/:boardId" element={<Edit />} />
            </Routes>
        )
    } else {
        return (
            <Routes>
                <Route path="/:nickName" element={<Home />} />
                <Route path="/place-recommend/:nickName" element={<PlaceRecommend />} />
                <Route path="/about-us/:nickName" element={<AboutUs />} />
                <Route path="/my-info/:nickName" element={<MyInfo />} />
                <Route path="/my-info-change/:nickName" element={<MyInfoChange />} />
                <Route path="/change-passwd/:nickName" element={<ChangePasswd />} />
                <Route path="/selected-location/:nickName" element={<SelectedLocation />} />
                <Route path="/written-by-me/:nickName" element={<WrittenByMe />} />
                <Route path="/free-board/:nickName" element={<FreeBoard />}
                />
                <Route path="/pet-boast/:nickName" element={<PetBoast />}
                />
                <Route path="/training-method/:nickName" element={<TrainingMethod />}
                />
                <Route path="/used-market/:nickName" element={<UsedMarket />}
                />
                <Route path="/write/:nickName" element={<Write />}
                />
                <Route path="/recommend-place-detail/:itemId/:nickName" element={<RecommendDetail />}
                />
                <Route path="/free-board-detail/:boardId/:nickName" element={<FreeBoardDetail />} />
                <Route path="/training-method-detail/:boardId/:nickName" element={<TrainingBoardDetail />} />
                <Route path="/used-market-detail/:boardId/:nickName" element={<UsedMarketDetail />} />
                <Route path="/pet-boast-detail/:boardId/:nickName" element={<PetBoastDetail />} />
                <Route path="/edit/:boardId/:nickName" element={<Edit />} />
            </Routes>
        )
    }
}

export default Router;
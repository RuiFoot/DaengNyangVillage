import 'bootstrap/dist/css/bootstrap.css';
import NavVillage from "./layout/navVillage";
import SideBar from "./layout/sideBar";
import Footer from "./layout/footer";
import Router from "./router";
import "./style.css"
import { RecoilRoot } from 'recoil';




function App() {
  return (
    <>
      <RecoilRoot>
        <div id="app">
          <NavVillage />
          <SideBar />
          <Router />
        </div>
        <Footer />
      </RecoilRoot>
    </>
  );
}

export default App;
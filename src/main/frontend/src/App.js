import 'bootstrap/dist/css/bootstrap.css';
import NavVillage from "./layout/NavVillage";
import SideBar from "./layout/SideBar";
import Footer from "./layout/footer";
import Router from "./Router";
import "./style.css"
import { RecoilRoot } from 'recoil';

function App() {
  return (
    <>
      <RecoilRoot>
        <div id="App">
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
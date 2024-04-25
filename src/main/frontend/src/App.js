import 'bootstrap/dist/css/bootstrap.css';
import NavVillage from "./layout/NavVillage";
import SideBar from "./layout/SideBar";
import Footer from "./layout/footer";
import Router from "./Router";
import "./style.css"
import {
  RecoilRoot,
  atom,
  selector,
  useRecoilState,
  useRecoilValue,
} from 'recoil';
import { isDarkAtom } from './atoms';
import styled from "styled-components";
import themes from "./theme";




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
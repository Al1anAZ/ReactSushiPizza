import Header from "./components/Header";
import Footer from "./components/Footer";
import { Home } from "./pages/Home";
import "./App.scss"
import { Route, Routes } from "react-router-dom";
import { useAppDispatch } from "./store/hooks/redux";
import { popupSlice } from "./store/reducers/PopupSlice";

function App() {
const {setVisiblePopup} = popupSlice.actions;
const dispatch = useAppDispatch()
  return (
    <div className="App">
      <div className="Body" onClick={()=> dispatch(setVisiblePopup(false))}>
        <Header/>
          <Routes>
            <Route path="/" element={<Home/>}/>
          </Routes>
          <Footer/>
      </div>
    </div>
  );
}


export default App;

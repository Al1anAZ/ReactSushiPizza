import Header from "./components/Header";
import Footer from "./components/Footer";
import { Home } from "./pages/Home";
import "./App.scss"
import { Route, Routes } from "react-router-dom";
import Search from "./pages/Search";
import { Cart } from "./pages/Cart";

function App() {
  return (
    <div className="App">
      <div className="Body">
        <Header/>
          <Routes>
            <Route path="/" element={<Home/>}/>
            <Route path="/search/:codeddishes" element={<Search/>}/>
            <Route path="/cart" element={<Cart/>}/>
          </Routes>
          <Footer/>
      </div>
    </div>
  );
}


export default App;

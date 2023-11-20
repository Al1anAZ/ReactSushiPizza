import Header from "./components/Header";
import Footer from "./components/Footer";
import { Home } from "./pages/Home";
import "./App.scss"
import { Route, Routes } from "react-router-dom";
import Search from "./pages/Search";
import { Cart } from "./pages/Cart";
import { useEffect } from "react";
import { useAppDispatch } from "./store/hooks/redux";
import { fetchDishes } from "./store/reducers/AsyncAction";
import {cartSlice } from "./store/reducers/CartSlice";
import { ICartDish } from "./types/models/ICartDish";
import Order from "./pages/Order";
import NotFound from "./pages/NotFound";

function App() {
  const dispatch = useAppDispatch()
  const {updateCart} = cartSlice.actions

  //Получаем блюда при первом рендеренге и получаем корзину из локал стораджа если она есть
  useEffect(()=>{
    dispatch(fetchDishes())
    const cardItemsInStore : ICartDish[] | null = JSON.parse(localStorage.getItem('cartDishes')  || 'null');
    if(cardItemsInStore)
     if(cardItemsInStore.length)
         dispatch(updateCart(cardItemsInStore))
 },[])
  return (
    <div className="App">
      <div className="Body">
        <Header/>
          <Routes>
            <Route path="/" element={<Home/>}/>
            <Route path="/search/:codeddishes" element={<Search/>}/>
            <Route path="/cart" element={<Cart/>}/>
            <Route path="/cart/order" element={<Order/>}/>
            <Route path="*" element={<NotFound />} />
          </Routes>
          <Footer/>
      </div>
    </div>
  );
}


export default App;

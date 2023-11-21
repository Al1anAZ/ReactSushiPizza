import { Navigate, useNavigate } from "react-router-dom"
import MyButton from "../../components/UI/MyButton";
import classes from "./Order.module.scss"
import { useAppDispatch, useAppSelector } from "../../store/hooks/redux";
import { ICartDish } from "../../types/models/ICartDish";
import React, { useState } from "react";
import axios from "axios";
import { cartSlice } from "../../store/reducers/CartSlice";

type Order = {
    id: number | null;
    dishes: ICartDish[];
    totalpice: number;
    name: string;
    phone: string;
    email: string;
    address: string;
} 
type OrderStatus =  {
    status: "inactive"|"pending" | "done" | "error";
    orderId: number;
}
type valid ={
    name: "valid" | "invalid";
    phone: "valid" | "invalid";
    email: "valid" | "invalid";
    address: "valid" | "invalid";
}
export default function Order() {
    const navigator = useNavigate();
    const {dishes,totalprice} = useAppSelector(state=> state.cartReducer)
    const dispatch = useAppDispatch();
    const {clearCart} = cartSlice.actions;
    //Стейт для валидации инпута
    const [validInputs, setValidInputs] = useState<valid>({name: 'valid', phone: 'valid', email: 'valid', address: 'valid'})
    //Стейт для отслеживания статуса отправки на бэк заказа
    const [orderStatus, setOrderStatus] = useState<OrderStatus>({status: "inactive", orderId: 0})
    const [order, setOrder]  = useState<Order>(
        {id: null,
         dishes: dishes,
         totalpice: totalprice, 
         name: "", 
         phone: "", 
         email: "", 
         address: ""})
    if(!dishes.length && orderStatus.status === 'inactive')
       return  <Navigate to={"/ReactSushiPizza/"}/>
  return (
    <>
     {orderStatus.status === "inactive" ?
        <div className={classes.OrderBody}>
        <h2>Оформлення замовлення</h2>
        <div className={classes.FormAndOrderDishes}>
         <form>
           <input type="text" name="name" placeholder="Ім'я*" 
            onFocus={()=>{
                setValidInputs({...validInputs, name: 'valid'})
               }}
              onBlur={(e : React.ChangeEvent<HTMLInputElement>)=>{ 
                if(e.target.value)
                setOrder({...order, name: e.target.value})
                else
                setValidInputs({...validInputs, name: 'invalid'})
                }}
           className={validInputs.name === "invalid" ? classes.invalid : ''}/>
           <input type="text" name="phone" placeholder="Телефон*" 
            onFocus={()=>{
                setValidInputs({...validInputs, phone: 'valid'})
               }}
              onBlur={(e : React.ChangeEvent<HTMLInputElement>)=>{ 
                const validator = /^\+\d{1,4}\d{10}$/;
                   if(validator.test(e.target.value))
                setOrder({...order, phone: e.target.value})
                else
                setValidInputs({...validInputs, phone: 'invalid'})
                }}
           className={validInputs.phone === "invalid" ? classes.invalid : ''}/>
           <input type="email" name="email" placeholder="Email*"
            onFocus={()=>{
                setValidInputs({...validInputs, email: 'valid'})
               }}
              onBlur={(e : React.ChangeEvent<HTMLInputElement>)=>{ 
                const validator = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
                if(validator.test(e.target.value))
                setOrder({...order, email: e.target.value})
                else
                setValidInputs({...validInputs, email: 'invalid'})
                }}
           className={validInputs.email === "invalid" ? classes.invalid : ''}/>
           <input type="text" name="address" placeholder="Адреса*" 
            onFocus={()=>{
                setValidInputs({...validInputs, address: 'valid'})
               }}
              onBlur={(e : React.ChangeEvent<HTMLInputElement>)=>{ 
                if(e.target.value)
                setOrder({...order, address: e.target.value})
                else
                setValidInputs({...validInputs, address: 'invalid'})
                }}
           className={validInputs.address === "invalid" ? classes.invalid : ''}/>
         </form>
        <div className={classes.OrderDishes}>
           <h3>Ваше замовлення: <span>{totalprice}</span> ₴</h3>
           <div>
            {dishes.map(item => <><br /><hr /><b>{item.dish.name}:</b> <br/><p>{item.dish.pizzaProps?.dough === 'thin' ? 'тонке тісто' : item.dish.pizzaProps?.dough === 'trad' ? 'традиційне тісто,': null} {item.dish.pizzaProps?.size ? `${item.dish.pizzaProps?.size} см.`: null} {item.dish.count} шт.</p></>)}
           </div>
        </div>
        </div>
        <div className={classes.OrderButtons}>
           <MyButton handler={()=>navigator('/ReactSushiPizza/cart')} inlinestyle={ButtonStyle}> <b>Повернутися</b></MyButton>
           <MyButton handler={async()=>{
             try{
                setOrderStatus({...orderStatus,status: "pending"})
                const {data} =  await axios.post<Order>('https://6554d80863cafc694fe71543.mockapi.io/Order',order)
                setOrderStatus({...orderStatus,status: "done", orderId: data.id as number})
                dispatch(clearCart())
             }
             catch(e : any){
                setOrderStatus({ ...orderStatus,status: "error"})
             }

           }} inlinestyle={ButtonStyle} disabled= {!(validInputs.name === "valid" && validInputs.phone === "valid" && validInputs.email === "valid" && validInputs.address === "valid" && order.address && order.name && order.email && order.phone )}> <b>Підтвердити <br />замовлення</b></MyButton>
        </div>
       </div>
       :
       orderStatus.status === "pending" ? 
       <div className={classes.StatusPages}>
         <img src="/imgs/UI/Loading.svg" alt="loading" width={300} height={300}/>
       </div>
       :
       orderStatus.status === "done" ? 
       <div  className={classes.StatusPages}>
             <h2 style={{marginBottom: 100}}>Ваше замовлення №<span style={{color: "rgba(0, 82, 204, 0.767) "}}>{orderStatus.orderId}</span> успішно оформлене &#129395;</h2>
             <MyButton handler={()=>navigator('/ReactSushiPizza/')} inlinestyle={ButtonStyle}> <b>На головну</b></MyButton>
       </div> 
       :
       orderStatus.status === "error" ?
       <div className={classes.StatusPages}>
             <h2 style={{marginBottom: 100}}>Не вдалось оформити замовлення &#128546;</h2>
             <MyButton handler={()=>navigator('/ReactSushiPizza/')} inlinestyle={ButtonStyle}> <b>На головну</b></MyButton>
       </div> 
       : 
       null
    }
    </>

  )
}
const ButtonStyle : React.CSSProperties = {
    width: 200,
    height: 55,
    borderRadius: 30,
    fontSize: 16,
}

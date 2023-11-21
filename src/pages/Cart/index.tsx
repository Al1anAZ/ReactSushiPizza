
import { useNavigate } from "react-router-dom"
import MyButton from "../../components/UI/MyButton"
import { useAppDispatch, useAppSelector } from "../../store/hooks/redux"
import classes from "./Cart.module.scss"
import { ICartDish } from "../../types/models/ICartDish"
import { cartSlice } from "../../store/reducers/CartSlice"

type DishInCartProps = {
    dish: ICartDish
}

const DishInCart : React.FC<DishInCartProps> = ({dish}) =>{
    const dispatch = useAppDispatch();
    const {changeAmmount,deletefromCart} = cartSlice.actions;
   return(
     <div className={classes.dishInCard}>
           <div className={classes.RightSide}>
           <img src={dish.dish.imgSrc} alt="DihsImg" width={80} height={80}/>
            <span>
            <h3>{dish.dish.name}</h3>
            {dish.dish.pizzaProps?.dough && <p className={classes.PizzaProps}>{dish.dish.pizzaProps?.dough === "thin" ? "тонке" : "традиційне"} тісто, {dish.dish.pizzaProps.size}см.</p>}
            </span>
           </div>
           <div className={classes.ChangeAmmount}> 
               <MyButton handler={()=>{if(dish.dish.count>1) dispatch(changeAmmount({action: "-", dish : dish}))}}><b>-</b></MyButton>
               <b>{dish.dish.count}</b>
               <MyButton handler={()=>dispatch(changeAmmount({action: "+", dish: dish}))}><b>+</b></MyButton>
           </div>
           <b style={{display: "flex",justifyContent: "center",alignItems: "center", fontSize: 22}}>{dish.dish.price * dish.dish.count} ₴</b>
           <img style={{cursor: "pointer"}} src="/imgs/UI/removebtn.svg" alt="removebtn" onClick={()=> dispatch(deletefromCart(dish))}/>
     </div>
   )
}



export const Cart: React.FC = ()=>{
  const {totalprice,dishes} = useAppSelector(state => state.cartReducer)
  const dispatch = useAppDispatch()
  const {clearCart} = cartSlice.actions;
  const navigator = useNavigate()
    return (
        <div className={classes.CartBox}>
            {dishes.length ? 
            <>
             <div className={classes.CartTop}>
                <span><img src="/imgs/UI/CartIconv2.svg" alt="CartIconv2" width={29} height={29}/><b>Кошик</b></span>
                <span onClick={()=>dispatch(clearCart())}><img src="/imgs/UI/clearCart.svg" alt="clearCart" />Очистити кошик</span>
                </div>
            <div className={classes.CartDishes}>
                {dishes.map(dish => <DishInCart dish={dish}/>)}
            </div>
            <div className={classes.CartBottom}>
                <span>Всього страв: <b>{dishes.length} шт.</b></span>
                <span>Сума замовлення: <b>{totalprice} ₴</b></span>
            </div>
            <div className={classes.CartButtons}>
                 <MyButton handler={()=>navigator("/ReactSushiPizza/")} inlinestyle={ButtonStyle}><b>Повернутися</b></MyButton>
                 <MyButton handler={()=>navigator("/ReactSushiPizza/cart/order")} inlinestyle={ButtonStyle}> <b>Замовити</b></MyButton>
            </div>
            </>
            :
           <div className={classes.EmptyCart}>
            <h2>Кошик пустий &#128546;</h2>
            <p>Найімовірніше, ви ще не замовляли страву. <br />
           Щоб замовити страву, перейди на головну сторінку.</p>
           <img src="/imgs/UI/cartempty.svg" alt="cartempty" />
           <br />
           <br />
           <MyButton handler={()=>navigator("/ReactSushiPizza/")} inlinestyle={ButtonStyle}><b>Повернутися</b></MyButton>
           </div>   
        }
        </div>
    )
}
const ButtonStyle : React.CSSProperties = {
    width: 200,
    height: 55,
    borderRadius: 30,
    fontSize: 16,
}
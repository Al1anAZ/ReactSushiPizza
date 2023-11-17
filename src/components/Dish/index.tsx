import { useState } from "react";
import { IDish } from "../../types/models/IDish";
import ContentLoader from "react-content-loader"
import classes from "./Dish.module.scss"
import MyButton from "../UI/MyButton";

type DishProp = {
   dish: IDish;
}
type DishToCard ={
   dish: IDish;
   pizzaProps?: {
    dough?: string;
    size?:  number;
   }
}

export const LoadingDish: React.FC = ()=>{
    return(
      <ContentLoader 
      speed={2}
      width={290}
      height={459}
      viewBox="0 0 290 459"
      backgroundColor="#f3f3f3"
      foregroundColor="#b3b2b2"
      style={{marginBottom: 30}}
    >
      <rect x="12" y="6" rx="43" ry="43" width="259" height="260" /> 
      <rect x="17" y="289" rx="5" ry="5" width="250" height="26" /> 
      <rect x="4" y="326" rx="13" ry="13" width="280" height="85" /> 
      <rect x="11" y="428" rx="8" ry="8" width="89" height="27" /> 
      <rect x="149" y="416" rx="18" ry="18" width="132" height="40" />
    </ContentLoader>
    )
}

const Dish: React.FC<DishProp> = ({dish})=>{
  //Для кастомизации пицц, хранит в себе саму пиццу и параметры к ней, в зависимости что доступно для кастомизации(true/false с бд)
  const [pizzaProp, setPizzaProp] = useState<DishToCard>({
    dish: dish, 
    pizzaProps: {dough: dish.pizzaprops?.thin ? 'thin' : dish.pizzaprops?.trad ? 'trad' : '', 
    size: dish.pizzaprops?.small ? 26 : dish.pizzaprops?.medium ? 30 : dish.pizzaprops?.large ? 40 : 0}})

//Обработчик кастомизатора для пиццы
 const handleChangePizzaProps = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.name.includes("breadType")) {
      setPizzaProp({
        ...pizzaProp,
        pizzaProps: { dough: e.target.value, size: pizzaProp.pizzaProps?.size }
      });
    } else if (e.target.name.includes("size")) {
      setPizzaProp({
        ...pizzaProp,
        pizzaProps: { dough: pizzaProp.pizzaProps?.dough, size: Number(e.target.value) }
      });
    }
  };
    return(
         <div className={classes.Body}>
          <div className={classes.ImgAndDiscr}>
             <img src={dish.imgSrc} alt="DishImg" />
             <span>{dish.composition}</span>
          </div>
            <h3 style={{marginTop: 11,textAlign: "center"}}>{dish.name}</h3>
            {dish.category === "pizza" ? 
                      <form className={classes.Customize}>
                      <div>
                      <input type="radio" id={`thin${dish.id}`} name={`breadType${dish.id}`} value={`thin`} disabled={!dish.pizzaprops?.thin} checked={pizzaProp.pizzaProps?.dough === 'thin'} onChange={handleChangePizzaProps}/>
                        <label htmlFor={`thin${dish.id}`} className={classes.radioLabel}><b>Тонке</b></label>
                        <input type="radio" id={`trad${dish.id}`}  name={`breadType${dish.id}`} value={`trad`} disabled={!dish.pizzaprops?.trad} checked={ pizzaProp.pizzaProps?.dough === 'trad'} onChange={handleChangePizzaProps}/>
                        <label htmlFor={`trad${dish.id}`} className={classes.radioLabel}><b>Традиційне</b></label>
                      </div>
                      <div>
                      <input type="radio" name={`size${dish.id}`} value="26"  id={`26${dish.id}`} disabled={!dish.pizzaprops?.small} checked={pizzaProp.pizzaProps?.size === 26} onChange={handleChangePizzaProps}/>
                        <label htmlFor={`26${dish.id}`} className={classes.radioLabel}><b>26 см.</b></label>
                        <input type="radio" name={`size${dish.id}`} value="30"  id={`30${dish.id}`} disabled={!dish.pizzaprops?.medium} checked={pizzaProp.pizzaProps?.size === 30} onChange={handleChangePizzaProps}/>
                        <label htmlFor={`30${dish.id}`} className={classes.radioLabel}><b>30 см.</b></label>
                        <input type="radio" name={`size${dish.id}`} value="40"  id={`40${dish.id}`} disabled={!dish.pizzaprops?.large} checked={pizzaProp.pizzaProps?.size === 40} onChange={handleChangePizzaProps}/>
                        <label htmlFor={`40${dish.id}`} className={classes.radioLabel}><b>40 см.</b></label>
                      </div>
                     </form>
            : 
            <div className={classes.Customize}>
              <h3><span>Вміст:</span></h3>
              <b>{dish.composition.length > 50 ? `${dish.composition.slice(0,50)}...`  : dish.composition }</b>
            </div>
            
          }

            <div className={classes.Bottom}>
                <span><b>{dish.category === "pizza" ? 'від' : null} {dish.price} ₴</b></span>
                <MyButton handler={()=>{}} inlinestyle={AddToCartButton}><b>+ Додати </b></MyButton>
            </div>
         </div>
    );
}
const AddToCartButton : React.CSSProperties = {
    padding: "0 15px 0 15px",
    width: 132,
    height: 40,
    fontSize: 16,
    borderRadius: 30
}
export default Dish
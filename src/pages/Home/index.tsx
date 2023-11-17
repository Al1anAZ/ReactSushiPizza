import { useMemo, useState,useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../store/hooks/redux";
import Dish from "../../components/Dish";
import { popupSlice } from "../../store/reducers/PopupSlice";
import { fetchDishes } from "../../store/reducers/AsyncAction";
import { LoadingDish } from "../../components/Dish";
import classes from "./Home.module.scss"
export const Home: React.FC = ()=>{
    //Массив блоков загрузки
    const loadingElements = [<LoadingDish key={0}/>,<LoadingDish key={1}/>,<LoadingDish key={2}/>,<LoadingDish key={3}/>,<LoadingDish key={4}/>,<LoadingDish key={5}/>,<LoadingDish key={6}/>,<LoadingDish key={7}/>]
     //Все блюда, статус загрузки, текст ошибки, состояние попапа(t/f)
    const {dishes,isLoading,error} = useAppSelector(state => state.dishReducer)
    const popupvisible = useAppSelector(state => state.popupReducer.popupVisible);
    //Диструктуризация екшенов
    const {setVisiblePopup} = popupSlice.actions;
    const dispatch = useAppDispatch();
    //Стейты хранящие в себе какую фильтр. и сорт. выбрал юзер
    const [Sort,setSort] = useState<String>('');
    const [activeCategories, setActiveCategories] = useState<String>('all');
    //Фильтрация по категориям и сортировка 
  const activeDishes = useMemo(() => {
    if (Sort === 'найдешевшому') {
      if (activeCategories === 'all') {
        return [...dishes].sort((a, b) => a.price - b.price);
      }
      return [...dishes].filter(dish => dish.category === activeCategories).sort((a, b) => a.price - b.price);
    }
    if (Sort === 'найдорожчому') {
      if (activeCategories === 'all') {
        return [...dishes].sort((a, b) => b.price - a.price);
      }
      return [...dishes].filter(dish => dish.category === activeCategories).sort((a, b) => b.price - a.price);
    }
    if (Sort === 'абеткою') {
      if (activeCategories === 'all') {
        return [...dishes].sort((a, b) => a.name.localeCompare(b.name));
      }
      return [...dishes].filter(dish => dish.category === activeCategories).sort((a, b) => a.name.localeCompare(b.name));
    }
    if (activeCategories === 'all') {
      return [...dishes];
    }
    return [...dishes].filter(dish => dish.category === activeCategories);
  }, [activeCategories, Sort, dishes]);
  //Получаем блюда при первом рендеренге
  useEffect(()=>{
     dispatch(fetchDishes())
  },[])
    return (
        <>
         {error ? 
           <div style={{textAlign: "center"}}>
             <h1>{error} <br /> Спробуйте перезаванажити сторінку &#128549;</h1>
           </div>
           :
           isLoading ? 
           <div className={classes.Dishes}>{loadingElements}</div>
           :
           <>
            <div className={classes.CategoriesAndSordBar}>
        <ul className={classes.Categories}>
          <li className={activeCategories === "all" ? classes.active : ''} onClick={()=> setActiveCategories("all")}><b>Всі</b></li>
          <li className={activeCategories === "pizza" ? classes.active : ''} onClick={()=> setActiveCategories("pizza")}><b>Піци</b></li>
          <li className={activeCategories === "sushi" ? classes.active : ''} onClick={()=> setActiveCategories("sushi")}><b>Суши</b></li>
          <li className={activeCategories === "rolls" ? classes.active : ''} onClick={()=> setActiveCategories("rolls")}><b>Ролли</b></li>
        </ul>
        <div className={classes.Sort}>
             <div>
                <img src="./imgs/UI/popup.svg" alt="popupimg" className={popupvisible ? classes.rotate : ''} onClick={(e: React.MouseEvent<HTMLImageElement, MouseEvent>)=> {e.stopPropagation();dispatch(setVisiblePopup(!popupvisible))}}/>
                <b>Сорутвати за:</b>
                <span onClick={(e : React.MouseEvent<HTMLSpanElement,MouseEvent>)=>{e.stopPropagation(); dispatch(setVisiblePopup(!popupvisible))}}>{Sort ? Sort : 'найдешевшому'}</span>
             </div>
            {popupvisible &&  <div className={classes.Sort_popup}>
              <ul>
                <li onClick={()=>setSort("найдешевшому")} className={Sort === 'найдешевшому' ? classes.active : ''}><b>найдешевшому</b></li>
                <li onClick={()=>setSort("найдорожчому")} className={Sort === 'найдорожчому' ? classes.active : ''}><b>найдорожчому</b></li>
                <li onClick={()=>setSort("абеткою")} className={Sort === 'абеткою' ? classes.active : ''}><b>абеткою</b></li>
              </ul>
             </div>}
        </div>
        </div>
        <h2>{activeCategories === "all" ? `Всі страви` : activeCategories === "pizza" ? `Піци` : activeCategories === "sushi" ? `Суши` : activeCategories === "rolls"? `Ролли` : null}</h2>
        <div className={classes.Dishes}>
           {activeDishes.map(dish=> <Dish 
           key={dish.id}
           dish={dish}
           />)}
        </div>
           </>
         }
        </>
    )
}
import { useMemo, useState,useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../store/hooks/redux";
import Dish from "../../components/Dish";
import { popupSlice } from "../../store/reducers/PopupSlice";
import { fetchDishes } from "../../store/reducers/AsyncAction";
import { LoadingDish } from "../../components/Dish";
import classes from "./Home.module.scss"
import { searchSlice } from "../../store/reducers/SearchSlice";
import MyButton from "../../components/UI/MyButton";
import Pagination from "../../components/Pagination";


export const Home: React.FC = ()=>{
    //Массив блоков загрузки
    const loadingElements = [<LoadingDish key={0}/>,<LoadingDish key={1}/>,<LoadingDish key={2}/>,<LoadingDish key={3}/>,<LoadingDish key={4}/>,<LoadingDish key={5}/>,<LoadingDish key={6}/>,<LoadingDish key={7}/>]
    
    //Все блюда, статус загрузки, текст ошибки, состояние попапа(t/f)
    const {dishes,isLoading,error} = useAppSelector(state => state.dishReducer)
    const popupvisible = useAppSelector(state => state.popupReducer.popupVisible);
    const search = useAppSelector(state => state.searchReducer.inputVal)
    
    //Диструктуризация екшенов
    const {setSearch} = searchSlice.actions;
    const {setVisiblePopup} = popupSlice.actions;
    const dispatch = useAppDispatch();
    
    //Стейты  и переменный для пагинации 
    const [currentPage,setCurrentPage] = useState<number>(1);
    const [dishesPerPage] = useState<number>(8)
    const lastDishIndex = currentPage * dishesPerPage;
    const firstDishIndex = lastDishIndex - dishesPerPage;
    const paginate = (pagenumber:number) => setCurrentPage(pagenumber)
    
    //Стейты хранящие в себе какую фильтр. и сорт. выбрал юзер
    const [Sort,setSort] = useState<String>('');
    const [activeCategories, setActiveCategories] = useState<String>('all');
    
    //Фильтрация по категориям и сортировка  и поиск
  const activeDishes = useMemo(() => {
    if(search && !Sort)
      return [...dishes].filter(item => item.name.toLocaleLowerCase().includes(search.toLocaleLowerCase()))

    if (Sort === 'найдешевшому') {
      if(search)
         return [...dishes].filter(item => item.name.toLocaleLowerCase().includes(search.toLocaleLowerCase())).sort((a, b) => a.price - b.price);
      if (activeCategories === 'all') {
        return [...dishes].sort((a, b) => a.price - b.price);
      }
      return [...dishes].filter(dish => dish.category === activeCategories).sort((a, b) => a.price - b.price);
    }

    if (Sort === 'найдорожчому') {
      if(search)
         return [...dishes].filter(item => item.name.toLocaleLowerCase().includes(search.toLocaleLowerCase())).sort((a, b) => b.price - a.price);
      if (activeCategories === 'all') {
        return [...dishes].sort((a, b) => b.price - a.price);
      }
      return [...dishes].filter(dish => dish.category === activeCategories).sort((a, b) => b.price - a.price);
    }

    if (Sort === 'абеткою') {
      if(search)
        return [...dishes].filter(item => item.name.toLocaleLowerCase().includes(search.toLocaleLowerCase())).sort((a, b) => a.name.localeCompare(b.name));
      if (activeCategories === 'all') {
        return [...dishes].sort((a, b) => a.name.localeCompare(b.name));
      }
      return [...dishes].filter(dish => dish.category === activeCategories).sort((a, b) => a.name.localeCompare(b.name));
    }

    if (activeCategories === 'all') {
      return [...dishes];
    }
    return [...dishes].filter(dish => dish.category === activeCategories);
  }, [activeCategories, Sort, dishes,search]);

  // Отображения текущ кол блюд на стр.
  const currentDish = activeDishes.slice(firstDishIndex, lastDishIndex)

  //Получаем блюда при первом рендеренге
  useEffect(()=>{
     dispatch(fetchDishes())
  },[])

    return (
        <>
         {error ? 
           <div style={{textAlign: "center", height: "60vh"}}>
             <h1>{error} <br /> Спробуйте перезаванажити сторінку &#128549;</h1>
           </div>
           :
           isLoading ? 
           <div className={classes.Dishes}>{loadingElements}</div>
           :
           <>
            <div className={classes.CategoriesAndSordBar}>
        {search ? 
        <MyButton handler={()=> dispatch(setSearch(''))} inlinestyle={ButtonBack}><b>Назад</b></MyButton> 
        : 
        <ul className={classes.Categories}>
          <li className={activeCategories === "all" ? classes.active : ''} onClick={()=> setActiveCategories("all")}><b>Всі</b></li>
          <li className={activeCategories === "pizza" ? classes.active : ''} onClick={()=> setActiveCategories("pizza")}><b>Піци</b></li>
          <li className={activeCategories === "sushi" ? classes.active : ''} onClick={()=> setActiveCategories("sushi")}><b>Суши</b></li>
          <li className={activeCategories === "rolls" ? classes.active : ''} onClick={()=> setActiveCategories("rolls")}><b>Ролли</b></li>
          <li className={activeCategories === "rollsSet" ? classes.active : ''} onClick={()=> setActiveCategories("rollsSet")}><b>Сети</b></li>
        </ul>
      }
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
        {search ?  <h2><span className={classes.textblue}>Результати пошуку: </span>"{search}"</h2>
         : 
         <h2>{activeCategories === "all" ? `Всі страви` : activeCategories === "pizza" ? `Піци` : activeCategories === "sushi" ? `Суши` : activeCategories === "rolls"? `Ролли` :  activeCategories === "rollsSet"?  `Сети` :  null}</h2>
         }
        <div className={classes.Dishes}>
          {currentDish.length ? currentDish.map(dish=> <Dish 
           key={dish.id}
           dish={dish}
           />) : <h2>Нічого <span className={classes.textblue}>не знайдено</span> &#128528;</h2>}
        </div>
        <Pagination
        paginate={paginate}
        dishesPerPage={dishesPerPage}
        totalDishes={activeDishes}
        currPage = {currentPage}
        />
           </>
         }
        </>
    )
}
const ButtonBack : React.CSSProperties ={
  borderRadius: 20,
  width: 200,
  padding: 10,
  fontSize: 26
}
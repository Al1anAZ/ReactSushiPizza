import { useMemo, useState } from "react";
import { useAppSelector } from "../../store/hooks/redux";
import Dish from "../../components/Dish";
import { LoadingDish } from "../../components/Dish";
import classes from "./Home.module.scss"
import Pagination from "../../components/Pagination";
import MyPopup from "../../components/UI/MyPopup";


export const Home: React.FC = ()=>{
    //Массив блоков загрузки
    const loadingElements = [<LoadingDish key={0}/>,<LoadingDish key={1}/>,<LoadingDish key={2}/>,<LoadingDish key={3}/>,<LoadingDish key={4}/>,<LoadingDish key={5}/>,<LoadingDish key={6}/>,<LoadingDish key={7}/>]
    
    //Все блюда, статус загрузки, текст ошибки, состояние попапа(t/f)
    const {dishes,isLoading,error} = useAppSelector(state => state.dishReducer)
  
    
    //Стейты  и переменный для пагинации 
    const [currentPage,setCurrentPage] = useState<number>(1);
    const [dishesPerPage] = useState<number>(8)
    const lastDishIndex = currentPage * dishesPerPage;
    const firstDishIndex = lastDishIndex - dishesPerPage;
    const paginate = (pagenumber:number) => setCurrentPage(pagenumber)
    
    //Стейты хранящие в себе какую фильтр. и сорт. выбрал юзер
    const [Sort,setSort] = useState<string>('')
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

  // Отображения текущ кол блюд на стр.
  const currentDish = activeDishes.slice(firstDishIndex, lastDishIndex)

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
        <ul className={classes.Categories}>
          <li className={activeCategories === "all" ? classes.active : ''} onClick={()=> {setActiveCategories("all"); setCurrentPage(1)}}><b>Всі</b></li>
          <li className={activeCategories === "pizza" ? classes.active : ''} onClick={()=> {setActiveCategories("pizza"); setCurrentPage(1)}}><b>Піци</b></li>
          <li className={activeCategories === "sushi" ? classes.active : ''} onClick={()=> {setActiveCategories("sushi");setCurrentPage(1)}}><b>Суши</b></li>
          <li className={activeCategories === "rolls" ? classes.active : ''} onClick={()=> {setActiveCategories("rolls");setCurrentPage(1)}}><b>Ролли</b></li>
          <li className={activeCategories === "rollsSet" ? classes.active : ''} onClick={()=> {setActiveCategories("rollsSet");setCurrentPage(1)}}><b>Сети</b></li>
        </ul>
        <MyPopup
        sort={Sort}
        handle={(val)=> setSort(val)}
        />
        </div>
         <h2>{activeCategories === "all" ? `Всі страви` : activeCategories === "pizza" ? `Піци` : activeCategories === "sushi" ? `Суши` : activeCategories === "rolls"? `Ролли` :  activeCategories === "rollsSet"?  `Сети` :  null}</h2>
        <div className={classes.Dishes}>
        { currentDish.map(dish=> <Dish 
           key={dish.id}
           dish={dish}
           />)}
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
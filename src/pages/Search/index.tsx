import { useMemo, useState } from "react";
import classes from "../Home/Home.module.scss"
import MyPopup from "../../components/UI/MyPopup";
import { useParams } from "react-router-dom";
import { useAppSelector } from "../../store/hooks/redux";
import Dish from "../../components/Dish";
import Pagination from "../../components/Pagination";


export default function Search() {
    const dishes = useAppSelector(state => state.dishReducer.dishes)
    //Получение поискового запроса как параметр
    const { codeddishes } = useParams<{ codeddishes?: string }>();
    const searchquerry: string = codeddishes ? JSON.parse(decodeURIComponent(codeddishes)) : '';
    //Стейты  и переменный для пагинации 
    const [currentPage,setCurrentPage] = useState<number>(1);
    const [dishesPerPage] = useState<number>(8)
    const lastDishIndex = currentPage * dishesPerPage;
    const firstDishIndex = lastDishIndex - dishesPerPage;
    const paginate = (pagenumber:number) => setCurrentPage(pagenumber)
    const [sort, setSort]  = useState<string>('');
    //Поиск
    const activeDishes = useMemo(()=>{
      if (sort === 'найдешевшому') 
           return [...dishes].filter(item => item.name.toLocaleLowerCase().includes(searchquerry.toLocaleLowerCase())).sort((a, b) => a.price - b.price);
      if (sort === 'найдорожчому') 
           return [...dishes].filter(item => item.name.toLocaleLowerCase().includes(searchquerry.toLocaleLowerCase())).sort((a, b) => b.price - a.price);
      if (sort === 'абеткою') 
          return [...dishes].filter(item => item.name.toLocaleLowerCase().includes(searchquerry.toLocaleLowerCase())).sort((a, b) => a.name.localeCompare(b.name));
        
     return [...dishes].filter(item => item.name.toLocaleLowerCase().includes(searchquerry.toLocaleLowerCase()))
    },[searchquerry,sort])
    
    const currentDish = activeDishes.slice(firstDishIndex, lastDishIndex)

  return (
    <>
    <div className={classes.CategoriesAndSordBar}>
    <h2>Результати пошуку: <span className={classes.textblue}>"{searchquerry}"</span></h2>
     <MyPopup sort={sort}
     handle={setSort}/>
    </div>
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
        currPage={currentPage}
        />
    </>
  )
}


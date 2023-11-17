import { IDish } from "../../types/models/IDish";
import classes from "./Pagination.module.scss"
type PaginationProps ={
    dishesPerPage: number;
    totalDishes: IDish[];
    paginate: (pagenumber: number)=>void;
    currPage: number
}

const  Pagination : React.FC<PaginationProps> = ({dishesPerPage,totalDishes,paginate,currPage}) =>{
    const pageNumbers : number[] = [];
    // Получаем количество страниц
    for(let i = 1; i <= Math.ceil((totalDishes.length/dishesPerPage));i++){
        pageNumbers.push(i)
    }
    
  return(
     <>
     {pageNumbers.length > 1 ? <ul className={classes.Pagination}>
        <li onClick={()=> {
            if(currPage<=1)
              paginate(pageNumbers.length)
            else
             paginate(currPage-1)}}>{"<"}</li>
        {pageNumbers.map(number=> <li key={number} className={currPage === number ? classes.selected : ''} onClick={()=> paginate(number)}>{number}</li>)}
        <li onClick={()=> {
             if(currPage>=pageNumbers.length)
               paginate(1)
             else 
              paginate(currPage+1)}}>{">"}</li>
      </ul> : null}
     </>)
}
export default Pagination
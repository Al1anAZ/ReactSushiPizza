import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import {ICartDish } from "../../types/models/ICartDish";


type AmmountChange  = {
    action: string;
    dish: ICartDish;
}

type ICartState = {
    dishes: ICartDish[];
    totalprice: number;
}
const initialState : ICartState  = {
    dishes : [],
    totalprice: 0
}

export const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addToCart (state, action: PayloadAction<ICartDish>){
            const dish = state.dishes.find(item => item.dish.id === action.payload.dish.id)
            if(dish){
                if(dish.dish.pizzaProps?.dough){
                    let flag = false;
                    state.dishes.map(item => { 
                        if(item.dish.pizzaProps?.size === action.payload.dish.pizzaProps?.size && item.dish.pizzaProps?.dough === action.payload.dish.pizzaProps?.dough && item.dish.id === action.payload.dish.id){
                           flag = true;
                            return  item.dish.count++  
                        } 
                        else 
                         return item.dish})
                    if(!flag)
                      state.dishes.push(action.payload)
                }
                else
                 state.dishes.map(item => { if(item.dish.id === dish.dish.id) item.dish.count++; return item})
            }
            else
              state.dishes.push(action.payload)
            state.totalprice = state.dishes.reduce((prev,curr)=> prev + curr.dish.price*curr.dish.count,0);
            localStorage.setItem('cartDishes',JSON.stringify(state.dishes))
        },
        changeAmmount (state, action : PayloadAction<AmmountChange>){
            switch(action.payload.action){
                case '+':
                    if(action.payload.dish.dish.pizzaProps?.dough)
                        state.dishes.map(item =>{
                            if(item.dish.id === action.payload.dish.dish.id && item.dish.pizzaProps?.dough === action.payload.dish.dish.pizzaProps?.dough && item.dish.pizzaProps?.size === action.payload.dish.dish.pizzaProps?.size)
                             return item.dish.count++
                          return item
                        })
                    else
                        state.dishes.map(item => {if(item.dish.id === action.payload.dish.dish.id) item.dish.count++; return item})
                    break;
                case '-':
                    if(action.payload.dish.dish.pizzaProps?.dough)
                        state.dishes.map(item =>{
                            if(item.dish.id === action.payload.dish.dish.id && item.dish.pizzaProps?.dough === action.payload.dish.dish.pizzaProps?.dough && item.dish.pizzaProps?.size === action.payload.dish.dish.pizzaProps?.size)
                             return item.dish.count--
                        return item
                        })
                    else
                        state.dishes.map(item => {if(item.dish.id === action.payload.dish.dish.id) item.dish.count--; return item})
                    break;
                default:
                    break;
            }
            state.totalprice = state.dishes.reduce((prev,curr)=> prev + curr.dish.price*curr.dish.count,0);
            localStorage.setItem('cartDishes',JSON.stringify(state.dishes))
        },
        deletefromCart (state, action: PayloadAction<ICartDish>){
            if(action.payload.dish.pizzaProps?.dough)
            state.dishes = state.dishes.filter(item => !(item.dish.id === action.payload.dish.id && 
                item.dish.pizzaProps?.dough === action.payload.dish.pizzaProps?.dough && 
                item.dish.pizzaProps?.size === action.payload.dish.pizzaProps?.size));
            else
              state.dishes = state.dishes.filter(item => item.dish.id !== action.payload.dish.id);
            state.totalprice = state.dishes.reduce((prev,curr)=> prev + curr.dish.price*curr.dish.count,0);
            localStorage.setItem('cartDishes',JSON.stringify(state.dishes))
        },
        clearCart (state){
            state.dishes = [];
            state.totalprice = 0;
            localStorage.setItem('cartDishes',JSON.stringify(state.dishes))
        },
        updateCart (state, action : PayloadAction<ICartDish[]>){
            state.dishes = action.payload;
            state.totalprice = state.dishes.reduce((prev,curr)=> prev + curr.dish.price*curr.dish.count,0);
        } 
    }
})

export default cartSlice.reducer
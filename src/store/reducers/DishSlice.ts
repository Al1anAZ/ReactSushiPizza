import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { IDish } from "../../types/models/IDish";
import { fetchDishes } from "./AsyncAction";

type DishState = {
    dishes: IDish[];
    isLoading: boolean;
    error: string;
}
const initialState : DishState = {
    dishes: [],
    isLoading: false,
    error: ''
}
export const dishSlice = createSlice({
    name: 'dish',
    initialState,
    reducers: {
        
    },
    //extraReducers специально для асинхронных екшенов, работает с createAsyncThunk, созадет 3 состояния
    extraReducers: {
        [fetchDishes.pending.type]: (state)=>{
            state.isLoading = true;
        },
        [fetchDishes.fulfilled.type]: (state, action : PayloadAction<IDish[]>)=>{
            state.isLoading = false;
            state.error = '';
            state.dishes = action.payload;
        },
        [fetchDishes.rejected.type] : (state, action : PayloadAction<string>)=>{
            state.isLoading = false;
            state.error = action.payload;
        }
    }
}) 


export default dishSlice.reducer
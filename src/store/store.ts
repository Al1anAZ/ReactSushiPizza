import { combineReducers,configureStore } from "@reduxjs/toolkit";
import dishReducer from "./reducers/DishSlice"
import popupReducer from "./reducers/PopupSlice"
import searchReducer from "./reducers/SearchSlice"

const rootReducer = combineReducers({
   dishReducer,
   popupReducer,
   searchReducer
})

export const setupStore = ()=>{
    return configureStore({
       reducer: rootReducer
    })
}

//Получаем тип состояния
export type RootState = ReturnType<typeof rootReducer>
//Получаем тип стора
export type AppStore = ReturnType<typeof setupStore>
//Получаем тип диспатча
export type AppDispatch = AppStore['dispatch']
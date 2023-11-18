import axios from "axios";
import { IDish } from "../../types/models/IDish";
import {createAsyncThunk} from "@reduxjs/toolkit"
import { Id } from "@reduxjs/toolkit/dist/tsHelpers";

export const fetchDishes = createAsyncThunk(
  'dish/fetchAll',
  async(_,thunkAPI)=>{
    try{
      const response = await axios.get<IDish[]>("https://6554d80863cafc694fe71543.mockapi.io/Dish")
      return shuffleArray(response.data) 
    }
    catch(e){
      return thunkAPI.rejectWithValue("Не вдалось завантажити з серверу")
    }
  }
)
// для имитации хаотичного заполениня бд
function shuffleArray(arr: IDish[]): IDish[] {
  const shuffledArray = arr.slice();
  for (let i = shuffledArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]];
  }
  return shuffledArray;
}
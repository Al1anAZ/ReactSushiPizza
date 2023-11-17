import axios from "axios";
import { IDish } from "../../types/models/IDish";
import {createAsyncThunk} from "@reduxjs/toolkit"

export const fetchDishes = createAsyncThunk(
  'dish/fetchAll',
  async(_,thunkAPI)=>{
    try{
      const response = await axios.get<IDish[]>("https://6554d80863cafc694fe71543.mockapi.io/Dish")
      return response.data
    }
    catch(e){
      return thunkAPI.rejectWithValue("Не вдалось завантажити з серверу")
    }
  }
)
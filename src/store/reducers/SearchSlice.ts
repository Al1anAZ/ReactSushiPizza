import { PayloadAction, createSlice } from "@reduxjs/toolkit"

type SeacrhState = {
    inputVal: string;
} 
const initialState : SeacrhState = {
    inputVal: ''
}

export const searchSlice = createSlice({
    name: 'search',
    initialState,
    reducers: {
        setSearch(state, action: PayloadAction<string>){
            state.inputVal = action.payload;
        }
    }
})

export default searchSlice.reducer
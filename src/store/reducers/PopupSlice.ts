import { PayloadAction, createSlice } from "@reduxjs/toolkit";

type PopupState = { 
    popupVisible: boolean;
}
const initialState : PopupState = {
    popupVisible: false,
}

export const popupSlice = createSlice({
    name: 'popup',
    initialState,
    reducers: {
       setVisiblePopup(state, action: PayloadAction<boolean>){
        state.popupVisible = action.payload;
       }
    }
}) 

export default popupSlice.reducer
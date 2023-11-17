import { useDispatch,useSelector,TypedUseSelectorHook } from "react-redux"
import { AppDispatch, RootState } from "../store"

//Кастомыне хуки для типизации
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
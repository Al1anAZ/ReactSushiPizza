import React, { ChangeEvent, useEffect, useState } from "react";
import classes from './MySearchInput.module.scss'
import { useAppDispatch, useAppSelector } from "../../store/hooks/redux";
import { searchSlice } from "../../store/reducers/SearchSlice";
import MyButton from "../UI/MyButton";


const MySearchInput : React.FC = () =>{
  const {setSearch} = searchSlice.actions;
  const dispatch = useAppDispatch();
  const search = useAppSelector(state=> state.searchReducer.inputVal)
  const [input, setInput] = useState<string>('')
  function handleInput(e : ChangeEvent<HTMLInputElement>){
    setInput(e.target.value)
  }
  useEffect(() => {
    setInput(search)
  }, [search])
  
  return (
    <div className={classes.MyInputBox}>
           <div style={{position: "relative"}}>
           <input type="text" className={classes.MyInput} placeholder="Я шукаю...." onChange={handleInput} value={input}/>
            <button className={classes.ButtonClear} disabled={!Boolean(input)} onClick={()=> setInput('')}>
                <img src="./imgs/UI/clearbutton.webp" alt="clear button" width={24} height={24}/></button>
           </div>
            <MyButton disabled={!Boolean(input)} handler={()=> dispatch(setSearch(input))} inlinestyle={ButtonSearch}><b>Пошук</b></MyButton>
    </div>
  )
}
const ButtonSearch : React.CSSProperties = {
  paddingLeft: 10,
  paddingRight: 10,
  borderRadius: '0 10px 10px 0'
}
export default MySearchInput

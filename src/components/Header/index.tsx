import classes from './Header.module.scss';
import { useNavigate } from 'react-router-dom';
import { ChangeEvent, useState } from 'react';
import MyButton from '../UI/MyButton';

const Header: React.FC = () => {
  const navigate = useNavigate();
  const [input, setInput] = useState<string>('')
  function handleSearch(){
    const serializedSearchQuerry = encodeURIComponent(JSON.stringify(input));
    navigate(`search/${serializedSearchQuerry}`)
 }
 function handleInput(e : ChangeEvent<HTMLInputElement>){
  setInput(e.target.value)
}
  return (
    <header className={classes.Header}>
      <div className={classes.Left} onClick={()=>{navigate('/'); setInput('')}}>
        <img src="/imgs/Logo.svg" alt="logo" width={50} height={50}/>
         <span>
           <h2>React TS Sushi Pizza</h2>
           <b>Best Sushi and Pizza in the universe</b>
         </span>
      </div>
      <div className={classes.MyInputBox}>
           <div style={{position: "relative"}}>
           <input type="text" className={classes.MyInput} placeholder="Я шукаю...." onChange={handleInput} value={input}/>
            <button className={classes.ButtonClear} disabled={!Boolean(input)} onClick={()=> setInput('')}>
                <img src="/imgs/UI/clearbutton.webp" alt="clear button" width={24} height={24}/></button>
           </div>
            <MyButton disabled={!Boolean(input)} handler={handleSearch} inlinestyle={ButtonSearch}><b>Пошук</b></MyButton>
    </div>
      <div className={classes.Right}>
         <ul>
            <li><b>1000 ₴</b></li>
            <li><div></div></li>
            <li><img src="/imgs/UI/cart.svg" alt="CartImg" /><b style={{marginLeft: 6, marginTop: 2}}>2</b></li>
         </ul>
      </div>
    </header>
  );
};
const ButtonSearch : React.CSSProperties = {
  paddingLeft: 10,
  paddingRight: 10,
  borderRadius: '0 10px 10px 0'
}
export default Header;
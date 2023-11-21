import { useEffect, useRef, useState } from "react";
import classes from "./MyPopup.module.scss"

type PopUpProps ={
    handle: (val : string)=>void;
    sort: string;
}

const MyPopup: React.FC<PopUpProps> = ({handle,sort}) =>{
    const [popupvisible, setPopupvisible] = useState<boolean>(false)
    const popupRef = useRef<HTMLDivElement | null>(null);
    //скрывать меню при клике на другие елементы
    useEffect(() => {
        if (popupvisible && popupRef.current) {
          popupRef.current.focus();
        }
      }, [popupvisible]);
  return (
    <div className={classes.Sort} tabIndex={0} onBlur={()=>setPopupvisible(false)} ref={popupRef}>
             <div>
                <img src="/ReactSushiPizza/imgs/UI/popup.svg" alt="popupimg" className={popupvisible ? classes.rotate : ''} onClick={(e: React.MouseEvent<HTMLImageElement, MouseEvent>)=> {
                    e.stopPropagation();
                      setPopupvisible(!popupvisible)}}/>
                <b>Сорутвати за:</b>
                <span onClick={(e : React.MouseEvent<HTMLSpanElement,MouseEvent>)=>{
                    e.stopPropagation(); 
                      setPopupvisible(!popupvisible)}}>{sort ? sort : 'найдешевшому'}</span>
             </div>
            {popupvisible &&  <div className={classes.Sort_popup}>
              <ul>
                <li onClick={()=>{handle("найдешевшому"); setPopupvisible(!popupvisible) }} className={sort === 'найдешевшому' ? classes.active : ''}><b>найдешевшому</b></li>
                <li onClick={()=>{handle("найдорожчому");setPopupvisible(!popupvisible)}} className={sort === 'найдорожчому' ? classes.active : ''}><b>найдорожчому</b></li>
                <li onClick={()=>{handle("абеткою");setPopupvisible(!popupvisible)}} className={sort === 'абеткою' ? classes.active : ''}><b>абеткою</b></li>
              </ul>
             </div>}
         </div>
  )
}
export default MyPopup
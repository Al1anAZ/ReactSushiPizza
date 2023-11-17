import classes from './Header.module.scss';

const Header: React.FC = () => {
  return (
    <header className={classes.Header}>
      <div className={classes.Left}>
        <img src="./imgs/Logo.svg" alt="logo" width={50} height={50}/>
         <span>
           <h2>React TS Sushi Pizza</h2>
           <b>Best Sushi and Pizza in the universe</b>
         </span>
      </div>
      <div className={classes.Right}>
         <ul>
            <li><b>1000 ₴</b></li>
            <li><div></div></li>
            <li><img src="./imgs/UI/cart.svg" alt="CartImg" /><b style={{marginLeft: 6, marginTop: 2}}>2</b></li>
         </ul>
      </div>
    </header>
  );
};

export default Header;
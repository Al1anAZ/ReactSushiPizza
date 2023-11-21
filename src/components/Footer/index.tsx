import classes from "./Footer.module.scss"

const Footer : React.FC = ()=> {
  return (
    <footer className={classes.FooterBody}>
      <div className={classes.LeftFooter}>
          <img src="/ReactSushiPizza/imgs/Logo.svg" alt="Logoimg" width={50} height={50}/>
          <b>© {new Date().getFullYear()} <span>React TS Sushi Pizza.</span> Всі права захищені.</b>
      </div>
      <div className={classes.RightFooter}>
        <b><span>Мої</span> соціальні мережі: </b>
               <div className={classes.Contacts}>
               <a href="https://www.instagram.com/al1_a_n_rtz/"  target="_blank" rel="noreferrer"><img src="/ReactSushiPizza/imgs/UI/instagram.svg" height={50} width={50} alt="InstagramLogo"/></a>
               <a href="https://github.com/Al1anAZ"   target="_blank" rel="noreferrer"><img src="/ReactSushiPizza/imgs/UI/github.svg" height={37} width={37} alt="GitHubLogo"/></a>
        </div>
      </div>
    </footer>
  )
}

export default Footer

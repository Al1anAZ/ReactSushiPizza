import classes from "./MyButton.module.scss"

type MyButtonProps ={
    inlinestyle?: object;
    children: React.ReactNode;
    handler: ()=>void;
    disabled?: boolean
}

const  MyButton: React.FC<MyButtonProps> = ({inlinestyle,children,handler,disabled}) =>{
  return <button className={classes.Button} onClick={handler} disabled={disabled} style={inlinestyle}>{children}</button>
}

export default MyButton
export  type ICartDish = {
    dish: {
        id: number;
        name: string;
        price: number;
        imgSrc: string;
        pizzaProps? : {
             size?: number;
             dough?: string;
        }
       count: number,
    }
}
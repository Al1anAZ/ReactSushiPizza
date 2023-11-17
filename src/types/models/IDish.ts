interface IPizzaProps{
    thin: boolean;
    trad: boolean;
    small: boolean;
    medium: boolean;
    large: boolean;
}

export interface IDish{
        id: number;
        name: string;
        price: number;
        category: string;
        imgSrc: string;
        pizzaprops?: IPizzaProps;
        composition: string;
}
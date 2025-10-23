import { categoria } from "../dto/create_product_dto";

export interface Card {
    id: number;
    name: string;
    price: number;
    category: categoria;
    inStock: boolean;
}
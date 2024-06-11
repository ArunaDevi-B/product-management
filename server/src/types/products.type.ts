export type productTypes = {
    product_name: string;
    quantity: number;
    price: number;
    number: number;
}
export type productTypesResponse = {
    product_name: string;
    quantity: number;
    price: number;
    number: number;
    _id: string;
    createdAt: Date;
    updatedAt: Date;
}
export type productItemTypes = {
    product_name: string;
    product_id: string;
    count: number;
}

export type cartTypes = {
    user_id: string;
    products: productItemTypes[];
}

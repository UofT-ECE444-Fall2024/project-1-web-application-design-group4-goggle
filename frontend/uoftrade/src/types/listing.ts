type Seller = {
    name: string;
    username?: string;
    image: string;
    rating: number;
};
  
export type Listing = {
    id: number;
    title: string;
    price: string;
    description: string;
    images: Array<any>;
    seller: Seller;
    tags: string[];
    publishDate: string;
};
type Seller = {
    name: string;
    image: string;
    rating: number;
};
  
export type Listing = {
    id: number;
    title: string;
    price: string;
    description: string;
    image: string;
    seller: Seller;
    tags: string[];
    publishDate: string;
};
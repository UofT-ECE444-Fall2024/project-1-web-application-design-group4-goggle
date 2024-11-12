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
    location: string;
    image: string;
    seller: Seller;
    tags: string[];
    publishDate: string;
};
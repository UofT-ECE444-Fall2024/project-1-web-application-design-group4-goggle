import ChairIcon from '@mui/icons-material/Chair';
import BookIcon from '@mui/icons-material/MenuBook';
import LaptopIcon from '@mui/icons-material/Laptop';
import SportsEsportsIcon from '@mui/icons-material/SportsEsports';
import KitchenIcon from '@mui/icons-material/Kitchen';
import MiscellaneousServicesIcon from '@mui/icons-material/MiscellaneousServices';

export interface Category {
  name: string;
  icon: JSX.Element;
  link: string;
}

export const categories: Category[] = [
  { name: "Textbooks", icon: <BookIcon fontSize="large" />, link: "/listing/textbooks" },
  { name: "Furniture", icon: <ChairIcon fontSize="large" />, link: "/listing/furniture" },
  { name: "Electronics", icon: <LaptopIcon fontSize="large" />, link: "/listing/electronics" },
  { name: "Gaming", icon: <SportsEsportsIcon fontSize="large" />, link: "/listing/gaming" },
  { name: "Appliances", icon: <KitchenIcon fontSize="large" />, link: "/listing/appliances" },
  { name: "Misc", icon: <MiscellaneousServicesIcon fontSize="large" />, link: "/listing/misc" },
  ];
  
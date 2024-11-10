import Image from "next/image";
import Link from "next/link";

import { Rating } from '@mui/material';
import { Listing } from "@/types/listing";
import EditIcon from '@mui/icons-material/Edit';

const ListingCard = ({ listing }: { listing: Listing }) => {
  const { id, title, price, image, description, seller, tags, publishDate } = listing;
  return (
    <>
      <div className="group rounded-2xl border border-solid border-outline-grey relative overflow-hidden rounded-sm bg-white shadow-one duration-300 hover:shadow-two dark:bg-dark dark:hover:shadow-gray-dark">
        <Link
          href={`/view-listing/${id}`} //to be changed
          className="relative block aspect-[37/22] w-full"
        >
          <span className="absolute right-6 top-6 z-20 inline-flex items-center justify-center rounded-full bg-primary px-4 py-2 text-sm font-semibold capitalize text-white-bg">
            {tags[0]}
          </span>
          <Link href={`/edit-listing/${id}`} className="absolute top-6 left-6 z-20 flex items-center justify-center p-2 bg-white rounded-full shadow-md transition-transform hover:scale-125">
            <EditIcon className="text-primary" />
          </Link>
          <Image src={image} alt="image" fill />
        </Link>
        <div className="p-6 sm:p-8 md:px-6 md:py-8 lg:p-8 xl:px-5 xl:py-8 2xl:p-8">
          <Link
              href="/listing-details" //to be changed
          >
            <h3 className="block text-xl font-bold text-heading-1 hover:underline hover:text-primary dark:text-white dark:hover:text-primary sm:text-2xl">        
                {title}
            </h3>
            <h4 className="mb-4 block text-l font-bold text-heading-1 hover:text-primary dark:text-white dark:hover:text-primary sm:text-xl">
                {price}
            </h4>
          </Link>
          <p className="mb-6 border-b border-outline-grey pb-6 text-base font-medium text-subheading dark:border-white dark:border-opacity-10">
            {description}
          </p>
          <div className="flex items-center">
            <Link 
              href={"/profile/user-XXXX" //to be changed
            }>
              <div className="mr-5 flex items-center border-r border-outline-grey pr-5 dark:border-white dark:border-opacity-10 xl:mr-3 xl:pr-3 2xl:mr-5 2xl:pr-5">
                <div className="mr-4">
                  <div className="relative h-10 w-10 overflow-hidden rounded-full">
                    <Image src={seller.image} alt="seller" fill />
                  </div>
                </div>
                <div className="w-full">
                  <h4 className="mb-1 text-sm font-medium text-subheading dark:text-white">
                    By {seller.name}
                  </h4>
                    <Rating
                      name="seller-rating"
                      value={seller.rating}
                      readOnly
                      precision={0.5}
                      className="text-yellow-500 text-xs"
                    />
                </div>
              </div>
            </Link>
            <div className="inline-block">
              <h4 className="mb-1 text-sm font-medium text-subheading dark:text-white">
                Date
              </h4>
              <p className="text-xs text-subheading ">{publishDate}</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ListingCard;
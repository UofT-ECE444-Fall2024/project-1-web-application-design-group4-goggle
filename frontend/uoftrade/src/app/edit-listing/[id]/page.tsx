// "use client";

// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import NavBar from "@/components/NavBar/NavBar";
// import ImageUpload from "@/components/ImageUpload/ImageUpload";
// import CreatePostTextBoxes from "@/components/CreatePostTextBoxes/CreatePostTextBoxes";
// import Header from "@/components/Header/Header";
// import Footer from "@/components/Footer/Footer";
// import Loading from "@/components/Loading/Loading";
// import { useParams } from "next/navigation";
// import LabelledCheckbox from "@/components/Checkbox/LabelledCheckbox";
// import { Listing } from "@/types/listing";
// import { Seller } from "@/types/seller";

// const EditListingPage = () => {
//   const [uploadedImages, setUploadedImages] = useState<File[]>([]);
//   const [imagePreviews, setImagePreviews] = useState<string[]>([]);
//   const [sold, setSold] = useState(false); // State for "Mark as Sold" checkbox
//   const { id } = useParams();
//   const [loading, setLoading] = useState<boolean>(true); // Manage loading state for data fetching
//   const [listing, setListing] = useState<Listing>();
//   const [seller, setSeller] = useState<Seller>();

//   /** This function gets the current users data and optionally gets their listings if the parameter is true 
//   * then it sets the appropriate states
//  */
//   const getData = async () => {
//     const currentUser = localStorage.getItem('currentUser');
//     const token = localStorage.getItem('token');

//     setLoading(true); // Start loading before the request
//     try {
//       // get current user details
//       const userDetails = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}identity/info/${currentUser}`, {
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//       });

//       const userImages = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}identity/UserImages/`, {
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//         params: {
//           user_name: currentUser,
//         }
//       });

//       setSeller({
//         firstName: userDetails.data?.first_name,
//         lastName: userDetails.data?.last_name,
//         username: userDetails.data?.user_name,
//         rating: userDetails.data?.rating,
//         profilePic: userImages.data[0]?.image || '',
//       });

//       const userListings = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}marketplace/products/`, {
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//         params: {
//           user_name: currentUser,
//         }
//       });

//       const listingsArr: Listing[] = userListings.data?.map((product: any) => {
//         let sellerName = `${seller?.firstName} ${seller?.lastName}`;
//         return {
//           id: product?.id,
//           title: product?.title,
//           price: product?.price,
//           description: product?.description,
//           images: product?.images || '',
//           location: product?.location,
//           seller: {
//             name: sellerName || 'Unknown Seller',
//             username: seller?.username || '',
//             image: seller?.profilePic || '',
//             rating: seller?.rating || 0,
//           },
//           tags: product?.category ? [product.category] : [],
//           publishDate: product?.date_posted,
//         };
//       });

//       // Convert `id` to a number for comparison if it's a string
//       const listingId = typeof id === 'string' ? parseInt(id, 10) : id;

//       const matchedListing = listingsArr.find((listing) => listing.id === listingId);

//       // Update the listing state with the matched listing
//       if (matchedListing) {
//         setListing(matchedListing);
//       } else {
//         throw new Error("Listing not found");
//       }

//     } catch (error) {
//       console.error('Error fetching user details:', error);
//     } finally {
//       setLoading(false); // Stop loading after the request is done
//     }
//   };

//   // Fetch user details once the component mounts if requiredData is true
//   useEffect(() => {
//     getData();
//   }, []);


//   // const { title, price, images, description, category, location, campus } = listing;

//   const handleImagesChange = (newImages: File[]) => {
//     setUploadedImages((prevImages) => {
//       const uniqueNewImages = newImages.filter(
//         (newImage) =>
//           !prevImages.some(
//             (existingImage) =>
//               existingImage.name === newImage.name &&
//               existingImage.lastModified === newImage.lastModified
//           )
//       );
//       return [...prevImages, ...uniqueNewImages];
//     });

//     setImagePreviews((prevPreviews) => {
//       const uniquePreviews = newImages
//         .filter(
//           (newImage) =>
//             !uploadedImages.some(
//               (existingImage) =>
//                 existingImage.name === newImage.name &&
//                 existingImage.lastModified === newImage.lastModified
//             )
//         )
//         .map((file) => URL.createObjectURL(file));

//       return [...prevPreviews, ...uniquePreviews];
//     });
//   };

//   const handlePublish = async (textData: any) => {
//     const imageFormData = new FormData();
//     const token = localStorage.getItem('token');
//     uploadedImages.forEach((image, index) => imageFormData.append(`${index}`, image));

//     try {
//       const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}marketplace/product-images/`, imageFormData, {
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//       });
//       alert(response.data.message || "Image upload successful!");
//     } catch (error) {
//       console.error("Image upload failed:", error);
//     }

//     const textFormData = new FormData();
//     textFormData.append("title", textData.title);
//     textFormData.append("price", textData.price);
//     textFormData.append("description", textData.description);
//     textFormData.append("location", textData.location.replace(/\s+/g, ''));
//     textFormData.append("category", textData.category);
//     textFormData.append("sold", String(sold)); // Include the "sold" status

//     try {
//       const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/marketplace/products`, textFormData, {
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//       });
//       alert(response.data.message || "Text upload successful!");
//     } catch (error) {
//       console.error("Text upload failed:", error);
//     }
//   };

//   return (
//     <>
//       <Loading loading={loading} />
//       <div className="flex flex-col min-h-screen w-full">
//         <NavBar />
//         <Header title="Edit Listing" />
//         <div className="w-full flex flex-col items-center p-4 gap-8 flex-grow">
//           <div className="container mx-auto px-4 sm:px-8 w-full flex flex-col lg:flex-row gap-8">
//             <div className="xl:w-[40%] lg:w-[40%] w-full">
//               <ImageUpload onImagesChange={handleImagesChange} imagePreviews={imagePreviews} />
//             </div>
//             <div className="xl:w-[60%] lg:w-[60%] w-full">
//               <LabelledCheckbox
//                 label="Mark as Sold"
//                 name="sold"
//                 checked={sold}
//                 onChange={(e) => setSold(e.target.checked)}
//               />
//               <CreatePostTextBoxes
//                 onPublish={handlePublish}
//                 isEdit={true}
//                 titleValue={listing?.title || ''}
//                 priceValue={listing?.price || ''}
//                 descriptionValue={listing?.description || ''}
//                 pickup_locationValue={listing?.location || ''}
//                 categoryValue={listing?.tags[0] || ''}
//               />
//             </div>
//           </div>
//         </div>
//         <Footer />
//       </div>
//     </>
//   );
// };

// export default EditListingPage;


"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import NavBar from "@/components/NavBar/NavBar";
import ImageUpload from "@/components/ImageUpload/ImageUpload";
import CreatePostTextBoxes from "@/components/CreatePostTextBoxes/CreatePostTextBoxes";
import Header from "@/components/Header/Header";
import Footer from "@/components/Footer/Footer";
import Loading from "@/components/Loading/Loading";
import { useParams } from "next/navigation";
import { Listing } from "@/types/listing";
import LabelledCheckbox from "@/components/Checkbox/LabelledCheckbox";

const EditListingPage = () => {
  const [uploadedImages, setUploadedImages] = useState<File[]>([]);
  const [imagePreviews, setImagePreviews] = useState<string[]>([]);
  // const [product_id, setProduct_id] = useState<string>("");
  const { id } = useParams();
  const [listing, setListing] = useState<Listing>();
  const [sold, setSold] = useState(false); // State for "Mark as Sold" checkbox

  useEffect(() => {
    console.log(uploadedImages)
  }, [uploadedImages])

  const handleImagesChange = (newImages: File[]) => {
    setUploadedImages((prevImages) => {
      // Filter out duplicates based on 'name' and 'lastModified' properties
      const uniqueNewImages = newImages.filter(
        (newImage) =>
          !prevImages.some(
            (existingImage) =>
              existingImage.name === newImage.name &&
              existingImage.lastModified === newImage.lastModified
          )
      );

      // Append only the unique new images to existing images
      return [...prevImages, ...uniqueNewImages];
    });

    setImagePreviews((prevPreviews) => {
      // Generate previews only for unique new images
      const uniquePreviews = newImages
        .filter(
          (newImage) =>
            !uploadedImages.some(
              (existingImage) =>
                existingImage.name === newImage.name &&
                existingImage.lastModified === newImage.lastModified
            )
        )
        .map((file) => URL.createObjectURL(file));

      return [...prevPreviews, ...uniquePreviews];
    });
    console.log("Uplaoded Images", uploadedImages);
  };

  // const postUserImages = async (images: File[]) => {
  //   const token = localStorage.getItem('token');
  //   const currentUser = localStorage.getItem('currentUser');
  //   console.log("current user", currentUser);

  //   const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}marketplace/product-images/`, images, {
  //     headers: {
  //       'Content-Type': 'multipart/form-data',
  //       Authorization: `Bearer ${token}`,
  //     },
  //   });
  //   console.log("response data:", response.data);
  // }

  const postUserImages = async (image: File, id: number) => {
    const token = localStorage.getItem('token');
    console.log("image:", image);
    const currentUser = localStorage.getItem('currentUser');
    console.log("current user", currentUser);
    const payload: Object = {
      image: image,
      product: id
    };
    const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}marketplace/product-images/`, payload, {
      headers: {
        'Content-Type': 'multipart/form-data',
        Authorization: `Bearer ${token}`,
      },
    });
    console.log("response data:", response.data);
  }

  const postTextData = async (textData: any, images: File[], useImages: boolean) => {
    const token = localStorage.getItem('token');
    const currentUser = localStorage.getItem('currentUser');
    const payload: Object = {
      title: textData.title,
      price: textData.price,
      description: textData.description,
      location: textData.location.replace(/\s+/g, ''),
      category: textData.category,
      ...(useImages ? { images: images } : {}), // Conditionally include images field
      user_name: currentUser
    };
    return await axios.put(`${process.env.NEXT_PUBLIC_API_URL}marketplace/product-detail/${id}`, payload, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });

    // alert(response.data.message || "Text upload successful!");
  }

  const handlePublish = async (textData: any) => {
    console.log(uploadedImages);
    uploadedImages.forEach((image, index) => console.log(`image${index}`, image));
    const imageFormData = new FormData();
    uploadedImages.forEach((image, index) => imageFormData.append(`${index}`, image));
    console.log(imageFormData);

    try {
      const response = await postTextData(textData, uploadedImages, false);

      for (const image of uploadedImages) {
        await postUserImages(image, Number(id));
      }
    } catch (error) {
      console.error("Text upload failed:", error);
    }
  };

  return (
    <>
      <Loading />
      <div className="flex flex-col min-h-screen w-full">
        <NavBar />
        <Header title="Create a Post!" />
        <div className="w-full flex flex-col items-center p-4 gap-8 flex-grow">
          <div className="container mx-auto px-4 sm:px-8 w-full flex flex-col lg:flex-row gap-8">
            <div className="xl:w-[40%] lg:w-[40%] w-full">
              <ImageUpload onImagesChange={handleImagesChange} imagePreviews={imagePreviews} />
            </div>
            <div className="xl:w-[60%] lg:w-[60%] w-full">
              <LabelledCheckbox
                label="Mark as Sold"
                name="sold"
                checked={sold}
                onChange={(e) => setSold(e.target.checked)}
              />
              <CreatePostTextBoxes
                onPublish={handlePublish}
                isEdit={true}
                titleValue={listing?.title || ''}
                priceValue={listing?.price || ''}
                descriptionValue={listing?.description || ''}
                pickup_locationValue={listing?.location || ''}
                categoryValue={listing?.tags[0] || ''}
              />
            </div>
          </div>
        </div>
        <Footer />
      </div>
    </>

  );
};

export default EditListingPage;

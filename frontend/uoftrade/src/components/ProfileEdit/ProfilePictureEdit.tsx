import React, { useRef, useState } from 'react';
import Image from 'next/image';
import { Seller } from "@/types/seller";
import axios from 'axios';

const ProfilePictureEdit: React.FC<{ seller: Seller | undefined }> = ({ seller }) => {
    const fileInputRef = useRef<HTMLInputElement>(null);
    const [profilePicUrl, setProfilePicUrl] = useState<string>(
        seller?.profilePic || '/images/logo/UTrade_small.svg'
    );

    // Function to handle "Change Picture" button click
    const handleChangePictureClick = () => {
        if (fileInputRef.current) {
            fileInputRef.current.click();  // Open file input dialog
        }
    };

    // Function to handle file selection
    const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file && (file.type === 'image/png' || file.type === 'image/jpeg')) {
            // Update profile picture locally
            const newProfilePicUrl = URL.createObjectURL(file);
            setProfilePicUrl(newProfilePicUrl);

            const formData = new FormData();
            formData.append('profilePic', file);

            try {
                // Send file to server
                const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/identity/UserImages/`, formData, {
                    headers: { 'Content-Type': 'multipart/form-data' },
                });

                console.log(response.data.message);  // Log success message from server
            } catch (error) {
                console.error('Error uploading profile picture:', error);
            }
        }
    };

    // Function to handle "Delete Picture" button click
    const handleDeletePicture = async () => {
        // Reset to the default image locally
        setProfilePicUrl('/images/logo/UTrade_small.svg');

        // Send a delete request to the server to reset the profile picture
        try {
            const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/identity/UserImages/`, {
                profilePic: '/images/logo/UTrade_small.svg',
            });

            console.log(response.data.message);  // Log success message from server
        } catch (error) {
            console.error('Error deleting profile picture:', error);
        }
    };

    return (
        <div className="container my-8 flex flex-row">
            <div className="w-40 h-40 rounded-full flex items-center justify-center">
                <Image
                    src={profilePicUrl}
                    alt="Profile Picture"
                    width={0}
                    height={0}
                    className={`my-5 w-full h-full ${profilePicUrl === '/images/logo/UTrade_small.svg' ? 'object-scale-down' : 'object-cover'} rounded-full border-4 border-primary flex `}
                />
            </div>
            <div className="ml-16 flex flex-col justify-around">
                <button
                    className="bg-primary text-white-bg px-4 py-2 rounded"
                    onClick={handleChangePictureClick}
                >
                    Change Picture
                </button>
                <button
                    className="bg-dark-grey text-white-bg px-4 py-2 rounded"
                    onClick={handleDeletePicture}
                >
                    Delete Picture
                </button>
                <input
                    ref={fileInputRef}
                    type="file"
                    accept=".png, .jpeg, .jpg"
                    style={{ display: 'none' }}
                    onChange={handleFileChange}
                />
            </div>
        </div>
    );
};

export default ProfilePictureEdit;

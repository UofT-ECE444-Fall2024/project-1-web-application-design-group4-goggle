import React from 'react';
import Image from 'next/image';

const ProfilePictureEdit = () => {
    return (
        <div className="container my-8 flex flex-row">
            <div className="w-40 h-40 rounded-full flex items-center justify-center">
                <Image
                    src="/images/logo/UTrade_small.svg" 
                    alt="logo"
                    width={0}
                    height={0}
                    className="my-5 w-full h-full"
                />
            </div>
            <div className="ml-16 flex flex-col justify-around">
                <button className="bg-primary text-white-bg px-4 py-2 rounded">
                    Change Picture
                </button>
                <button className="bg-dark-grey text-white-bg px-4 py-2 rounded">
                    Delete Picture
                </button>
            </div>
        </div>
    );
};

export default ProfilePictureEdit;
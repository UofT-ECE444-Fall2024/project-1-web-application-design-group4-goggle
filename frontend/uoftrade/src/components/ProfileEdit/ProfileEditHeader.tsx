import React from 'react';
import { Rating } from '@mui/material';

const ProfileEditHeader = () => {
    return (
        <div className="container flex flex-row justify-between">
            <div className="flex items-center">
                <h3 className="text-3xl leading-8 mr-8 font-bold text-heading-1 dark:text-white-bg sm:text-xl" style={{fontSize: '2.5rem', lineHeight: '1'}}>
                    Public Profile
                </h3>
                
                <Rating
                    name="profile-rating"
                    value={5} // You can change this value dynamically if needed
                    readOnly
                    precision={0.5}
                    className="text-yellow-500 text-3xl"
            />
            </div>
            <button className="ml-6 bg-primary text-white-bg px-8 py-2 rounded-xl">
                See What Others See
            </button>     
        </div>
    );
};

export default ProfileEditHeader;
'use client'

import React from "react";
import Link from "next/link";

import "../../types/inputs"
import ProfileEditForm from "./ProfileEditForm";
import ProfileEditHeader from "./ProfileEditHeader";
import ProfilePictureEdit from "./ProfilePictureEdit";

const ProfileEdit = () => {

    return (
        <div className="p-4 mt-16 flex flex-col justify-around">
            <ProfileEditHeader/>
            <ProfilePictureEdit/>
            <ProfileEditForm/>
        </div>
    )   

}

export default ProfileEdit


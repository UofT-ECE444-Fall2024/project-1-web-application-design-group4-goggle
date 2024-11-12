'use client'

import React from "react";
import "../../types/inputs"
import ProfileEditForm from "./ProfileEditForm";
import ProfileEditHeader from "./ProfileEditHeader";
import ProfilePictureEdit from "./ProfilePictureEdit";
import { Seller } from "@/types/seller";

const ProfileEdit:React.FC<{ seller: Seller | undefined }> = ({ seller }) => {

    return (
        <div className="p-4 mt-16 flex flex-col justify-around">
            <ProfileEditHeader seller={seller}/>
            <ProfilePictureEdit seller={seller}/>
            <ProfileEditForm/>
        </div>
    )   

}

export default ProfileEdit


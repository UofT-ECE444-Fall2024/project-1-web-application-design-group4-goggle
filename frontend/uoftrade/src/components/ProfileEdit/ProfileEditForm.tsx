'use client'

import React, { useState, useEffect } from "react";
import { useForm, SubmitHandler } from "react-hook-form"
import TextBox from "../TextBox/TextBox";
import axios from "axios";

import "../../types/inputs"

const ProfileEditForm = () => {
    const [showNotif, setShowNotif] = useState<boolean>(false);
    const [notifMessage, setNotifMessage] = useState<string>("");
    const [fadeOut, setFadeOut] = useState<boolean>(false);

    //fade out the notification
    useEffect(() => {
        if (showNotif) {
            const timer = setTimeout(() => {
                setFadeOut(true); // Start fade-out after 5 seconds
                setTimeout(() => {
                    setShowNotif(false); // Hide the notification after fade-out
                    setFadeOut(false)
                }, 500); // Wait for the fade transition to complete
            }, 5000); // Set timeout for 5 seconds
            return () => clearTimeout(timer); // Cleanup the timer if the component is unmounted
        }
    }, [showNotif]);

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<ProfileEditInputs>();

    const onSubmit: SubmitHandler<ProfileEditInputs> = async (data: ProfileEditInputs) => {
        setShowNotif(false);
        const token = localStorage.getItem('token');
        const currentUser = localStorage.getItem('currentUser');

        let updateUser;

        try {
            
            updateUser = await axios.put(`${process.env.NEXT_PUBLIC_API_URL}identity/user-update/${currentUser}`, data, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            if (updateUser?.status && updateUser.status < 300) {
                setNotifMessage("Profile updated successfully!");
                setShowNotif(true);
                localStorage.setItem('currentUser', data.user_name);
            } else {
                setNotifMessage("Failed to update profile. Please try again.");
                setShowNotif(true);
            }
        } catch (e: unknown) {
            console.error(e);
            setNotifMessage("An error occurred while updating your profile.");
            setShowNotif(true);
        }
    }

    return (
        <div className="container">
            <h3 className="mb-3 text-center text-2xl font-bold text-heading-1 dark:text-white-bg">
                Edit Profile Information
            </h3>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="mt-5 flex flex-col justify-between items-top gap-5 sm:flex-row">
                    <TextBox<ProfileEditInputs>
                        placeholder="First Name"
                        name="first_name"
                        register={register}
                        errors={errors}
                        topText="First Name"
                        divClassNames="flex-grow"
                    />
                    <TextBox<ProfileEditInputs>
                        placeholder="Last Name"
                        name="last_name"
                        register={register}
                        errors={errors}
                        topText="Last Name"
                        divClassNames="flex-grow"
                    />
                </div>
                <TextBox<ProfileEditInputs>
                    placeholder="Username"
                    type="text"
                    name="user_name"
                    register={register}
                    options={{
                        pattern: {
                            value: /^[a-zA-Z0-9_]+$/,
                            message: "Username can only contain letters, numbers, and underscores"
                        }
                    }}
                    divClassNames={"mt-3"}
                    errors={errors}
                    topText="Username"
                />
                <button type="submit" className="mt-5 mb-2 rounded-xl w-2/5 h-full border border-solid border-black/[.08] dark:border-white/[.145] transition-colors 
                text-white-bg bg-primary dark:hover:bg-[#1a1a1a] hover:border-transparent text-l sm:text-base sm:h-12 ">
                    Save Changes
                </button>
            </form>

            {/* Notification */}
            {showNotif && (
                <div
                    className={`mt-4 p-3 rounded-md ${notifMessage.includes("successfully") ? 'bg-light-green' : 'bg-dark-red'} text-white-bg text-center 
                        ${fadeOut ? 'opacity-0 transition-opacity duration-500' : 'opacity-100'}`}
                >
                    {notifMessage}
                </div>
            )}
        </div>
    );
}

export default ProfileEditForm;

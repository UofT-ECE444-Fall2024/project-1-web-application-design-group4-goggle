'use client'

import React, { useState } from "react";
import LabelledCheckbox from "../Checkbox/LabelledCheckbox";

const NotificationsSettings = () => {
  // State to manage checkbox values
  const [checkboxes, setCheckboxes] = useState({
    newListings: false,
    messages: false,
    profileInteractions: false,
  });

  // Handle checkbox change
  const handleCheckboxChange = (event:any) => {
    const { name, checked } = event.target;
    setCheckboxes((prev) => ({
      ...prev,
      [name]: checked,
    }));
  };

  // Reset checkboxes to their default state
  const resetCheckboxes = () => {
    setCheckboxes({
      newListings: false,
      messages: false,
      profileInteractions: false,
    });
  };

  return (
    <div className="container flex flex-col justify-around">
      <h3 className="mt-12 text-3xl font-bold text-heading-1 dark:text-white-bg sm:text-xl" style={{ fontSize: '2.5rem', lineHeight: '1' }}>
        Notifications
      </h3>
      <h4 className="my-4 text-3xl text-subheading text-heading-1 dark:text-white-bg sm:text-xl">
        Configure the notifications you would like to receive.
      </h4>
      <div className="flex flex-col items-start">
        <LabelledCheckbox
          label="Messages"
          name="messages"
          checked={checkboxes.messages}
          onChange={handleCheckboxChange}
        />
        <LabelledCheckbox
          label="New Listings"
          name="newListings"
          checked={checkboxes.newListings}
          onChange={handleCheckboxChange}
        />
        <LabelledCheckbox
          label="Profile Interactions"
          name="profileInteractions"
          checked={checkboxes.profileInteractions}
          onChange={handleCheckboxChange}
        />
      </div>
      <button
        onClick={resetCheckboxes}
        className="text-xl mt-6 bg-primary w-2/5 text-white-bg px-8 py-4 rounded-xl"
      >
        Reset Notifications
      </button>
    </div>
  );
};

export default NotificationsSettings;

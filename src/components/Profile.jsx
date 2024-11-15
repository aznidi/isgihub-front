// src/pages/ProfilePage.jsx
import React from "react";
import UserInfos from "./UserInfos";


const ProfilePage = () => {

  return (
    
    <div className="flex flex-col items-center min-h-screenp-6">
      {/* Profile Header with Horizontal Information */}
      <UserInfos />
    </div>
  );
};

export default ProfilePage;

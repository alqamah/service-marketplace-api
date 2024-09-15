import React from 'react';
import { useSelector } from 'react-redux';

const Profile = () => {
  const { user } = useSelector((state) => state.auth);

  if (!user) return <div>Please log in to view your profile.</div>;

  return (
    <div className="profile">
      <h1>My Profile</h1>
      <div className="profile-info">
        <p><strong>Name:</strong> {user.name}</p>
        <p><strong>Email:</strong> {user.email}</p>
        <p><strong>Role:</strong> {user.role}</p>
      </div>
      {user.role === 'provider' && (
        <div className="provider-stats">
          <h2>Provider Statistics</h2>
          {/* Add provider-specific stats here */}
        </div>
      )}
    </div>
  );
};

export default Profile;
import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import styles from '../styles/Profile.module.css';

function Profile() {
  const [user, setUser] = useState(null);
  const { user: authUser } = useAuth();
  const [isEditing, setIsEditing] = useState(false);

  const handleEditProfile = () => {
    console.log("Edit profile clicked");
    setIsEditing(true);
  };

  const handleSaveProfile = async () => {
    try {
      const response = await fetch('/api/auth/profile', {
        method: 'POST', // Use POST since the route is defined as POST in routes/auth.js
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}` // Assuming you're using JWT for authentication
        },
        body: JSON.stringify({
          address: user.address,
          phone: user.phone
        })
      });

      const data = await response.json();

      if (response.ok) {
        console.log("Profile saved successfully:", data);
        setUser(data.user); // Update the user state with the new data
        setIsEditing(false);
      } else {
        console.error("Error saving profile:", data.error);
      }
    } catch (error) {
      console.error("An error occurred while saving the profile:", error);
    }
  };

  useEffect(() => {
    const fetchProfile = () => {
      if (authUser) {
        setUser(authUser);
      }
    };
    fetchProfile();
  }, [authUser]);

  if (!user) return <div className={styles.loadingMessage}>Loading...</div>;

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>My Profile</h2>
      <div className={styles.profileCard}>
        {isEditing ? (
          <>
            <p className={styles.profileInfo}>
              <span className={styles.profileLabel}>Phone:</span>
              <input 
                type="text" 
                defaultValue={user.phone} 
                onChange={(e) => setUser({ ...user, phone: e.target.value })} 
              />
            </p>
            <p className={styles.profileInfo}>
              <span className={styles.profileLabel}>Address:</span>
              <input 
                type="text" 
                defaultValue={user.address} 
                onChange={(e) => setUser({ ...user, address: e.target.value })} 
              />
            </p>
            <button className={styles.editButton} onClick={handleSaveProfile}>Save</button>
          </>
        ) : (
          <>
            <p className={styles.profileInfo}>
              <span className={styles.profileLabel}>Name:</span>
              <span className={styles.profileValue}>{user.name}</span>
            </p>
            <p className={styles.profileInfo}>
              <span className={styles.profileLabel}>Email:</span>
              <span className={styles.profileValue}>{user.email}</span>
            </p>
            <p className={styles.profileInfo}>
              <span className={styles.profileLabel}>Role:</span>
              <span className={styles.profileValue}>{user.role}</span>
            </p>
            <p className={styles.profileInfo}>
              <span className={styles.profileLabel}>Phone:</span>
              <span className={styles.profileValue}>{user.phone || "Not provided"}</span>
            </p>
            <p className={styles.profileInfo}>
              <span className={styles.profileLabel}>Address:</span>
              <span className={styles.profileValue}>{user.address || "Not provided"}</span>
            </p>
            <button className={styles.editButton} onClick={handleEditProfile}>Edit Profile</button>
          </>
        )}
      </div>
    </div>
  );
}

export default Profile;
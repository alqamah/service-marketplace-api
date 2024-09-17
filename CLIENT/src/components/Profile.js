import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import styles from '../styles/Profile.module.css';

function Profile() {
  const [user, setUser] = useState(null);
  const { user: authUser } = useAuth();

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
      </div>
    </div>
  );
}

export default Profile;
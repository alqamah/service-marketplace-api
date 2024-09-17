import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Profile() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await axios.get('/api/users/me');
        setUser(response.data.data);
      } catch (error) {
        console.error('Error fetching profile', error);
      }
    };
    fetchProfile();
  }, []);

  if (!user) return <div>Loading...</div>;

  return (
    <div>
      <h2>My Profile</h2>
      <p>Name: {user.name}</p>
      <p>Email: {user.email}</p>
      <p>Role: {user.role}</p>
    </div>
  );
}

export default Profile;
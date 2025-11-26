import React from 'react';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import type { User } from '../types';

interface UserDetailsProps {
  userId: number;
}

const fetchUserById = async (userId: number): Promise<User> => {
  const response = await axios.get(`http://localhost:3001/api/users/${userId}`);
  return response.data;
};

const UserDetails: React.FC<UserDetailsProps> = ({ userId }) => {
  const {
    data: user,
    isLoading,
    error,
  } = useQuery<User, Error>({
    queryKey: ['user', userId],
    queryFn: () => fetchUserById(userId),
    enabled: !!userId, // Only fetch if userId is available
  });

  if (isLoading) {
    return <div className="p-5">Loading user details...</div>;
  }

  if (error) {
    return <div className="p-5 text-red-500">Error: {error.message}</div>;
  }

  if (!user) {
    return <div className="p-5">User not found.</div>;
  }

  return (
    <div className="p-5">
      <h1 className="text-2xl font-bold mb-4">User Details</h1>
      <div className="bg-gray-100 p-4 rounded-lg shadow-md">
        <p><strong>ID:</strong> {user.id}</p>
        <p><strong>Name:</strong> {user.name}</p>
        <p><strong>Username:</strong> {user.username}</p>
        <p><strong>Email:</strong> {user.email}</p>
        <p><strong>Phone:</strong> {user.phone}</p>
        {user.address && (
          <div className="mt-4">
            <h2 className="text-xl font-semibold">Address</h2>
            <p><strong>Street:</strong> {user.address.street}</p>
            <p><strong>City:</strong> {user.address.city}</p>
            <p><strong>State:</strong> {user.address.state}</p>
            <p><strong>Zipcode:</strong> {user.address.zipcode}</p>
          </div>
        )}
      </div>
      <button
        onClick={() => window.history.back()}
        className="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
      >
        Go Back
      </button>
    </div>
  );
};

export default UserDetails;

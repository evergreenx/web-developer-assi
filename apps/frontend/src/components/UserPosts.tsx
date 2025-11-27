import React from 'react';
import { usePosts } from '../hooks/usePosts'; // Import the usePosts hook
import { useUser } from '../hooks/useUser'; // Import the useUser hook

interface UserPostsProps {
  userId: number;
}

const UserPosts: React.FC<UserPostsProps> = ({ userId }) => {
  const { posts, totalPosts, isLoading: isLoadingPosts, error: postsError, deletePost } = usePosts(userId);
  // const { user, isLoading: isLoadingUser, error: userError } = useUser(userId);

  const isLoading = isLoadingPosts;
  const error = postsError ;

  if (isLoading) {
    return <div className="p-5">Loading user and posts...</div>;
  }

  if (error) {
    return <div className="p-5 text-red-500">Error: {error.message}</div>;
  }



  return (
    <div className="p-5">
      <h1 className="text-2xl font-bold mb-4">User Details and Posts</h1>

      {/* <div className="bg-gray-100 p-4 rounded-lg shadow-md mb-6">
        <h2 className="text-xl font-semibold mb-2">User: {user.name}</h2>
        <p><strong>Email:</strong> {user.email}</p>
        {user.address && (
          <p>
            <strong>Address:</strong> {user.address.street}, {user.address.city}, {user.address.state}, {user.address.zipcode}
          </p>
        )}
        <p className="mt-2"><strong>Total Posts:</strong> {totalPosts}</p>
      </div> */}

      {posts && posts.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {posts.map((post) => (
            <div key={post.id} className="relative bg-gray-100 p-4 rounded-lg shadow-md">
              <button
                onClick={() => deletePost(post.id)}
                className="absolute top-2 right-2 text-red-500 hover:text-red-700 font-bold"
              >
                X
              </button>
              <h2 className="text-xl font-semibold">{post.title}</h2>
              <p className="text-gray-700 mt-2">{post.body}</p>
              <p className="text-sm text-gray-500 mt-2">Created: {new Date(post.created_at).toLocaleDateString()}</p>
            </div>
          ))}
        </div>
      ) : (
        <p>No posts found for this user.</p>
      )}
      <button
        onClick={() => window.history.back()}
        className="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
      >
        Go Back
      </button>
    </div>
  );
};

export default UserPosts;

import React, { useState } from 'react';
import { usePosts } from '../hooks/usePosts';
import { useUser } from '../hooks/useUser';
import NewPostModal from './new-post-modal'; // Import the new modal component
import NewPostButton from './new-post-button'; // Import the new button component

interface UserPostsProps {
  userId: string; // Changed to string
}

const UserPosts: React.FC<UserPostsProps> = ({ userId }) => {
  const { posts, totalPosts, isLoading: isLoadingPosts, error: postsError, deletePost, createPost } = usePosts(userId);
  // const { user, isLoading: isLoadingUser, error: userError } = useUser(userId);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [createPostError, setCreatePostError] = useState<Error | null>(null);
  const [isCreatingPost, setIsCreatingPost] = useState(false);


  const isLoading = isLoadingPosts || isCreatingPost;
  const error = postsError || createPostError;

  const handleOpenModal = () => {
    setIsModalOpen(true);
    setCreatePostError(null); // Clear previous errors
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleSubmitNewPost = async (title: string, body: string) => {
    setIsCreatingPost(true);
    setCreatePostError(null);
    try {
      await createPost({ title, body });
      setIsModalOpen(false); // Close modal on success
      // The usePosts hook will automatically invalidate queries and refetch posts
    } catch (err) {
      setCreatePostError(err as Error);
    } finally {
      setIsCreatingPost(false);
    }
  };


  if (isLoading && !isCreatingPost) { // Only show full loading if not just creating a post
    return <div className="p-5">Loading user and posts...</div>;
  }

  if (error) {
    return <div className="p-5 text-red-500">Error: {error.message}</div>;
  }

  return (
    <div className="p-5">
      <h1 className="text-2xl font-bold mb-4">User Details and Posts</h1>

      <div className="mb-4">
        <NewPostButton onClick={handleOpenModal} />
      </div>


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

      <NewPostModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onSubmit={handleSubmitNewPost}
        isLoading={isCreatingPost}
        error={createPostError}
      />
    </div>
  );
};

export default UserPosts;

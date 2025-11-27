import React, { useState } from "react";
import { usePosts } from "../hooks/usePosts";
import NewPostModal from "./new-post-modal";
import { PageLoader } from "./loader";
import { UserPostDetails } from "./user-post-count";
import NewPostButton from "./new-post-button";
import Breadcrumb from "./user-breadcrumb"; 

interface UserPostsProps {
  userId: string; 
  email: string;
  userName: string; 
  onBackClick: () => void; 
}

const UserPosts: React.FC<UserPostsProps> = ({ userId, email, userName, onBackClick }) => {
  const {
    posts,
    totalPosts,
    isLoading: isLoadingPosts,
    isCreatingPost,
    createPostError,
    error: postsError,
    deletePost,
    createPost,
  } = usePosts(userId);

  const [isModalOpen, setIsModalOpen] = useState(false);

  const isLoading = isLoadingPosts || isCreatingPost;
  const error = postsError || createPostError;

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleSubmitNewPost = async (title: string, body: string) => {
    await createPost({ title, body });

    if (!createPostError) {
      setIsModalOpen(false);
    }
  };

  const handleNewPostSuccess = () => {
    setIsModalOpen(false);
  };

  const truncateText = (text: string, maxLength: number) => {
    if (text.length > maxLength) {
      return text.substring(0, maxLength) + "...";
    }
    return text;
  };

  if (isLoading && !isCreatingPost) {
    return (
      <div className="">
        <PageLoader />
      </div>
    );
  }

  if (error) {
    return <div className="p-5 text-red-500">Error: {error.message}</div>;
  }

  return (
    <div className="p-5">
      <Breadcrumb userName={userName} onBackClick={onBackClick} /> {/* Render Breadcrumb */}
      <UserPostDetails
        email={email} 
        count={totalPosts}
        userName={userName}
      />

      <div className="grid  grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <NewPostButton onClick={handleOpenModal} />
        {posts && posts.length > 0 ? (
          <>
            {posts.map((post) => (
              <div
                key={post.id}
                className="relative overflow-hidden bg-background p-6 rounded-lg  border border-border w-[270px] shadow-md h-[293px]"
              >
                <button
                  onClick={() => deletePost(post.id)}
                  className="absolute top-2 right-2 cursor-pointer text-red-500 hover:text-red-700 font-bold"
                >
                  <svg
                    width="12"
                    height="12"
                    viewBox="0 0 12 12"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M1.5 3H10.5"
                      stroke="#F9566A"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                    <path
                      d="M9.5 3V10C9.5 10.5 9 11 8.5 11H3.5C3 11 2.5 10.5 2.5 10V3"
                      stroke="#F9566A"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                    <path
                      d="M4 3V2C4 1.5 4.5 1 5 1H7C7.5 1 8 1.5 8 2V3"
                      stroke="#F9566A"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                    <path
                      d="M5 5.5V8.5"
                      stroke="#F9566A"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                    <path
                      d="M7 5.5V8.5"
                      stroke="#F9566A"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                  </svg>
                </button>
                <h2 className="text-lg text-foreground font-medium my-3 pr-5">
                  {truncateText(post.title, 50)}{" "}
              
                </h2>
                <p className="text-foreground text-sm mt-2 break-all">
                  {truncateText(post.body, 200)}{" "}
                  {/* Truncate body for display */}
                </p>
              </div>
            ))}
          </>
        ) : null}
      </div>

      <NewPostModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onSubmit={handleSubmitNewPost}
        isLoading={isCreatingPost}
        error={createPostError}
        onSuccess={handleNewPostSuccess}
      />
    </div>
  );
};

export default UserPosts;

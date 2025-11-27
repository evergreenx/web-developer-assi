import React from "react";

interface NewPostButtonProps {
  onClick: () => void;
}

const NewPostButton: React.FC<NewPostButtonProps> = ({ onClick }) => {
  return (
    <button
      onClick={onClick}
      className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
    >
      Add New Post
    </button>
  );
};

export default NewPostButton;

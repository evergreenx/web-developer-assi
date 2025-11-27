import React, { useState } from "react";

interface NewPostModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (title: string, body: string) => void;
  isLoading: boolean;
  error: Error | null;
}

const NewPostModal: React.FC<NewPostModalProps> = ({
  isOpen,
  onClose,
  onSubmit,
  isLoading,
  error,
}) => {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (title.trim() && body.trim()) {
      onSubmit(title, body);
    }
  };

  if (!isOpen) {
    return null;
  }

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full flex justify-center items-center">
      <div className="bg-white p-6 rounded-lg shadow-xl w-96">
        <h2 className="text-xl font-bold mb-4">Create New Post</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="title" className="block text-gray-700 text-sm font-bold mb-2">
              Title:
            </label>
            <input
              type="text"
              id="title"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              disabled={isLoading}
            />
          </div>
          <div className="mb-4">
            <label htmlFor="body" className="block text-gray-700 text-sm font-bold mb-2">
              Body:
            </label>
            <textarea
              id="body"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline h-32"
              value={body}
              onChange={(e) => setBody(e.target.value)}
              disabled={isLoading}
            ></textarea>
          </div>
          {error && <p className="text-red-500 text-xs italic mb-4">{error.message}</p>}
          <div className="flex items-center justify-between">
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              disabled={isLoading}
            >
              {isLoading ? "Submitting..." : "Submit"}
            </button>
            <button
              type="button"
              onClick={onClose}
              className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              disabled={isLoading}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default NewPostModal;

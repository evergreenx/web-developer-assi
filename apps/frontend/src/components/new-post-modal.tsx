import React, { useState } from "react";

interface NewPostModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (title: string, body: string) => void;
  isLoading: boolean;
  error: Error | null;
  onSuccess?: () => void;
}

const NewPostModal: React.FC<NewPostModalProps> = ({
  isOpen,
  onClose,
  onSubmit,
  isLoading,
  error,
  onSuccess,
}) => {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (title.trim() && body.trim()) {
      await onSubmit(title, body);
      if (!error) { // Only clear if no error
        setTitle("");
        setBody("");
        onSuccess?.();
      }
    }
  };

  if (!isOpen) {
    return null;
  }

  return (
    <div className="fixed inset-0 bg-gray-600/50 bg-opacity-50 overflow-y-auto h-full w-full flex justify-center items-center">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full md:w-[679px]">
        <h2 className="text-4xl font-medium leading-10 tracking-normal mb-4">
          New post
        </h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label
              htmlFor="title"
              className="block text-gray-700 text-sm font-bold mb-2"
            >
              Post title
            </label>
            <input
              required
              type="text"
              id="title"
              className=" border border-border text-sm appearance-none  rounded w-full py-2 px-3 text-foreground leading-normal focus:outline-none focus:shadow-outline"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              disabled={isLoading}
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="body"
              className="block  text-sm text-foreground font-medium mb-2"
            >
              Post body
            </label>
            <textarea
              id="body"
              required
              className=" appearance-none border text-sm border-border rounded w-full py-2 px-3 text-foreground leading-tight focus:outline-none focus:shadow-outline h-32"
              value={body}
              onChange={(e) => setBody(e.target.value)}
              disabled={isLoading}
            ></textarea>
          </div>
          {error && (
            <p className="text-red-500 text-xs italic mb-4">{error.message}</p>
          )}
          <div className="flex items-center justify-end space-x-5 ">
            <button
              type="button"
              onClick={onClose}
              className="bg-background text-sm shadow-xs cursor-pointer rounded-lg border hover:bg-gray-100 text-foreground border-border font-medium py-2 px-4 focus:outline-none focus:shadow-outline"
              disabled={isLoading}
            >
              Cancel
            </button>

            <button
              type="submit"
              className="bg-primary text-sm cursor-pointer shadow-xs hover:bg-blue-700 text-[#F8FAFC] font-medium py-2 px-4 rounded-lg focus:outline-none focus:shadow-outline"
              disabled={isLoading || !title.trim() || !body.trim()}
            >
              {isLoading ? "Publishing..." : "Publish"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default NewPostModal;

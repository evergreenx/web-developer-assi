import { useState, useEffect } from "react";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

import UserPosts from "./components/UserPosts"; // Import the UserPosts component
import UserTable from "./components/table/user/users-table";

function App() {
  const [currentPath, setCurrentPath] = useState(window.location.pathname);
  const [currentQuery, setCurrentQuery] = useState(window.location.search);

  useEffect(() => {
    const handlePopState = () => {
      setCurrentPath(window.location.pathname);
      setCurrentQuery(window.location.search);
    };

    window.addEventListener('popstate', handlePopState);
    return () => {
      window.removeEventListener('popstate', handlePopState);
    };
  }, []);

  const handleNavigate = (path: string, query?: string) => {
    const newUrl = query ? `${path}${query}` : path;
    window.history.pushState({}, '', newUrl);
    setCurrentPath(path);
    setCurrentQuery(query || '');
  };

  const renderContent = () => {
    if (currentPath === '/user-posts') {
      const urlParams = new URLSearchParams(currentQuery);
      const userId = urlParams.get('userId');

      if (userId) {
        return <UserPosts userId={userId} />;
      }
      return <div>Invalid User ID</div>; // Handle case where userId is missing
    } else {
      return <UserTable onUserClick={(userId) => handleNavigate('/user-posts', `?userId=${userId}`)} />;
    }
  };

  return (
    <>
      {renderContent()}
      <ReactQueryDevtools initialIsOpen={false} />
    </>
  );
}

export default App;

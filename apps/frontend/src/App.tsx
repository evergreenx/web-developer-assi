import { useState } from "react";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

import UserPosts from "./components/user-posts";
import UserTable from "./components/table/user/users-table";

function App() {
  const [currentPath, setCurrentPath] = useState(window.location.pathname);
  const [currentQuery, setCurrentQuery] = useState(window.location.search);
  const [selectedUserEmail, setSelectedUserEmail] = useState<string | null>(
    null
  );
  const [selectedUserName, setSelectedUserName] = useState<string | null>(null);

  // useEffect(() => {
  //   const handlePopState = () => {
  //     setCurrentPath(window.location.pathname);
  //     setCurrentQuery(window.location.search);
  //   };

  //   window.addEventListener("popstate", handlePopState);
  //   return () => {
  //     window.removeEventListener("popstate", handlePopState);
  //   };
  // }, []);

  const handleNavigate = (path: string, query?: string) => {
    const newUrl = query ? `${path}${query}` : path;
    window.history.pushState({}, "", newUrl);
    setCurrentPath(path);
    setCurrentQuery(newUrl.substring(newUrl.indexOf("?")));
  };

  const renderContent = () => {
    if (currentPath === "/user-posts") {
      const urlParams = new URLSearchParams(currentQuery);
      const userId = urlParams.get("userId");

      if (userId) {
        return (
          <UserPosts
            userId={userId}
            email={selectedUserEmail || ""}
            userName={selectedUserName || ""}
            onBackClick={() => handleNavigate("/")}
          />
        );
      }
      return <div>Invalid User ID</div>;
    } else {
      return (
        <UserTable
          onUserClick={(userId, email, userName) => {
            setSelectedUserEmail(email);
            setSelectedUserName(userName);
            handleNavigate("/user-posts", `?userId=${userId}`);
          }}
        />
      );
    }
  };

  return (
    <main className="md:max-w-[880px] w-full mx-auto justify-center flex mt-20  bg-background h-screen">
      {renderContent()}
      <ReactQueryDevtools initialIsOpen={false} />
    </main>
  );
}

export default App;

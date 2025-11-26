import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { useUsers } from "./hooks/useUsers";

function App() {
  const {
    users,
    totalUsers,
    isLoading,
    error,
    pageNumber,
    setPageNumber,
    pageSize,
  } = useUsers();

  const handleNextPage = () => {
    setPageNumber((prevPageNumber) => prevPageNumber + 1);
  };

  const handlePreviousPage = () => {
    setPageNumber((prevPageNumber) => Math.max(0, prevPageNumber - 1));
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>User List</h1>
      {isLoading && <p>Loading users...</p>}
      {error && <p style={{ color: "red" }}>Error: {error.message}</p>}

      {!isLoading && !error && users && (
        <>
          <ul>
            {users.map((user: any) => (
              <li key={user.id}>
                {user.id} - {user.name} ({user.email})
              </li>
            ))}
          </ul>
          {totalUsers !== undefined && (
            <p>
              Page {pageNumber + 1} of {Math.ceil(totalUsers / pageSize)} (Total{" "}
              {totalUsers} users)
            </p>
          )}
          <button onClick={handlePreviousPage} disabled={pageNumber === 0}>
            Previous
          </button>
          <button
            onClick={handleNextPage}
            disabled={
              totalUsers === undefined || (pageNumber + 1) * pageSize >= totalUsers
            }
          >
            Next
          </button>
        </>
      )}
      <ReactQueryDevtools initialIsOpen={false} />
    </div>
  );
}

export default App;


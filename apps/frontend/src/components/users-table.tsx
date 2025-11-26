import { useEffect } from "react";
import { useUsers } from "../hooks/useUsers";
import Pagination from "./Pagination"; // Import the new Pagination component
import type { User } from "../types"; // Import the User interface
 // Import the User interface

function UserTable() {
  const {
    users,
    totalUsers,
    isLoading,
    error,
    pageNumber,
    setPageNumber,
    pageSize,
    setPageSize,
  } = useUsers();

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    if (!urlParams.has("pageSize")) {
      setPageSize(4);
    }
  }, [setPageSize]);

  const totalPages = totalUsers !== undefined ? Math.ceil(totalUsers / pageSize) : 0;

  return (
    <div className="p-5">
      <h1 className="text-2xl font-bold mb-4">User List</h1>
      {isLoading && <p>Loading users...</p>}
      {error && <p className="text-red-500">Error: {error.message}</p>}

      {!isLoading && !error && users && (
        <>
          <table className="w-full border-collapse">
            <thead>
              <tr>
                <th className="border border-gray-300 px-2 py-2 text-left">
                  Full Name
                </th>
                <th className="border border-gray-300 px-2 py-2 text-left">
                  Email
                </th>
                <th className="border border-gray-300 px-2 py-2 text-left w-[392px]">
                  Address
                </th>
              </tr>
            </thead>
            <tbody>
              {users.map((user: User) => (
                <tr key={user.id}>
                  <td className="border border-gray-300 px-2 py-2">
                    <strong>{user.name}</strong>
                  </td>
                  <td className="border border-gray-300 px-2 py-2">
                    {user.email}
                  </td>
                  <td
                    className="border border-gray-300 px-2 py-2 w-[392px] whitespace-nowrap overflow-hidden text-ellipsis"
                    title={`${user.address.street}, ${user.address.city}, ${user.address.state}, ${user.address.zipcode}`}
                  >
                    {user.address.street}, {user.address.city},{" "}
                    {user.address.state}, {user.address.zipcode}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {totalUsers !== undefined && (
            <p className="mt-4">
              Page {pageNumber + 1} of {totalPages} (Total{" "}
              {totalUsers} users)
            </p>
          )}
          <Pagination
            currentPage={pageNumber}
            totalPages={totalPages}
            onPageChange={setPageNumber}
          />
        </>
      )}
    </div>
  );
}

export default UserTable;

import { useUsers } from "../../../hooks/useUsers";
import Pagination from "../user/pagination";
import type { User } from "../../../types";
import { PageLoader } from "../../loader";

interface UserTableProps {
  onUserClick: (userId: string, email: string, userName: string) => void;
}

function UserTable({ onUserClick }: UserTableProps) {
  const { users, totalUsers, isLoading, error, pageNumber, setPageNumber } =
    useUsers();

  const totalPages =
    totalUsers !== undefined ? Math.ceil(totalUsers / 4) : 0;

  return (
    <div className="p-5 bg-background w-full md:w-[880px]">
      <h1 className="text-6xl text-foreground font-medium mb-7">Users </h1>

      {error && <p className="text-red-500">Error: {error.message}</p>}

      {isLoading && (
        <div className="border border-border  rounded-lg flex items-center px-4 mb-4 h-[220px]">
          <PageLoader />
        </div>
      )}
      {!isLoading && !error && users && (
        <>
          <div className="border border-border rounded-lg border-b-0">
            <table className="w-full table-auto h-[220px]">
              <thead className="text-muted-foreground text-sm  rounded-lg">
                <tr className="border-b border-border">
                  <th className=" px-2 py-2 text-left font-medium  rounded-lg">
                    Full name
                  </th>
                  <th className=" px-2 py-2 text-left  font-medium rounded-lg">
                    Email address
                  </th>
                  <th className=" px-2 py-2 text-left w-[392px] font-medium rounded-lg">
                    Address
                  </th>
                </tr>
              </thead>
              <tbody>
                {users.map((user: User) => (
                  <tr
                    key={user.id}
                    onClick={() => onUserClick(user?.id, user.email, user.name)}
                    className="cursor-pointer border-0 hover:bg-gray-50 leading-5 tracking-normal text-sm text-foreground font-normal rounded-lg"
                  >
                    <td className="border-b border-border px-2 py-2 w-[179px]">
                      {user.name}
                    </td>
                    <td className="border-b border-border px-2 py-2 w-[226px]">
                      {user.email}
                    </td>
                    <td
                      className="border-b border-border truncate px-2 py-2 "
                      title={`${user.address.street}, ${user.address.city}, ${user.address.state}, ${user.address.zipcode}`}
                    >
                      <span className=" block truncate text-ellipsis w-[300px]">
                        {user.address.street}, {user.address.city},{" "}
                        {user.address.state}, {user.address.zipcode}{" "}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

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

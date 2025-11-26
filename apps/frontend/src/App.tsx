import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import UserTable from "./components/users-table";

function App() {
  return (
    <>
      <UserTable />
      <ReactQueryDevtools initialIsOpen={false} />
    </>
  );
}

export default App;

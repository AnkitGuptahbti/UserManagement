import useUsers from "../hooks/useUsers";
import UserList from "../views/UserList";
import MainLayout from "../layouts/MainLayout";
import { Link } from "react-router-dom";

export default function Home() {
  const { users, loading, addUser, removeUser } = useUsers();

  return (
    <MainLayout>
      <div className="w-[60%] mx-auto">
        <div className="w-100% h-[50px] border- mt-4 mb-4 flex justify-between items-center p-2">
          <h2 className=" font-bold text-xl">Users</h2>
          <Link
            to="/create"
            className="bg-blue-500 px-4 py-1 rounded hover:bg-blue-600 "
          >
            <div className="   text-white  "> + Add User</div>
          </Link>
        </div>
        {loading ? (
          <p>Loading users...</p>
        ) : (
          <UserList users={users} onDelete={removeUser} />
        )}
      </div>
    </MainLayout>
  );
}

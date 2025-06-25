import useUsers from "../hooks/useUsers";
import UserList from "./UserList";
import Main from "../layouts/Main";
import { Link } from "react-router-dom";
import Button from "../components/Button";

export default function Home() {
  const { users, loading, addUser, removeUser } = useUsers();

  return (
    <Main>
      <div className="w-[60%] mx-auto">
        <div className="w-100% h-[50px] border- mt-4 mb-4 flex justify-between items-center p-2">
          <h2 className=" font-bold text-xl">Users</h2>
          <Link to="/create">
            <Button className="  g-blue-600 text-white px-2 py-1 rounded ">
              + Add User
            </Button>
          </Link>
        </div>
        {loading ? (
          <p>Loading users...</p>
        ) : (
          <UserList users={users} onDelete={removeUser} />
        )}
      </div>
    </Main>
  );
}

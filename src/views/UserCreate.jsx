import CreateUserForm from "../components/CreateUserForm";
import useUser from "../hooks/useUser";
import MainLayout from "../layouts/Main";
import { useNavigate } from "react-router-dom";

export default function CreateUser() {
  const { addUser } = useUser();
  const navigate = useNavigate();

  const handleCreate = async (data) => {
    await addUser(data);
    navigate("/");
  };

  return (
    <MainLayout>
      <div className="max-w-2xl mx-auto">
        <h1 className="text-2xl font-bold mb-4">Add New User</h1>
        <CreateUserForm onSubmit={handleCreate} buttonText="Create User" />
      </div>
    </MainLayout>
  );
}

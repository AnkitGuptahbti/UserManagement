import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import Form from "../shared/Form";
import { getUserById, updateUser } from "../services/userApi";
import MainLayout from "../layouts/MainLayout";

export default function EditUser() {
  const { id } = useParams();
  console.log(id, " t;hisi is params");
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const data = await getUserById(id);
        console.log(data, "data from edit user");
        setUser(data);
      } catch (err) {
        console.error("Error fetching user", err);
      } finally {
        setLoading(false);
      }
    };
    fetchUser();
  }, [id]);

  const handleUpdate = async (updatedUser) => {
    await updateUser(id, updatedUser);
    navigate("/");
  };

  if (loading) return <p>Loading...</p>;
  if (!user) return <p>User not found.</p>;

  return (
    <MainLayout>
      <div className="mx-auto w-[50%]">
        <h1 className="text-xl font-bold mb-4">Edit User</h1>
        <Form
          initialName={user.name}
          initialEmail={user.email}
          gender={user.gender}
          isAdmin={user.isAdmin}
          role={user.role}
          bio={user.bio}
          dob={user.dob}
          image={user.image}
          buttonText="Update User"
          onSubmit={handleUpdate}
        />
      </div>
    </MainLayout>
  );
}

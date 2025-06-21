import { useState, useEffect } from "react";
import {
  getUsers,
  createUser,
  updateUser,
  deleteUser
} from "../services/userApi";

export default function useUsers() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const data = await getUsers();
      setUsers(data);
    } catch (error) {
      console.error("Failed to fetch users:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const addUser = async (data) => {
    await createUser(data);
    fetchUsers();
  };

  const editUser = async (id, data) => {
    await updateUser(id, data);
    fetchUsers();
  };

  const removeUser = async (id) => {
    await deleteUser(id);
    fetchUsers();
  };

  return { users, loading, addUser, editUser, removeUser };
}

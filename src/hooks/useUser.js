import { useState, useEffect } from "react";
import {
  getUsers,
  createUser,
  updateUser,
  deleteUser,
  getUserById
} from "../services/userApi";

export default function useUser() {
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

  const getUserBy_Id = async (id) => {
    return await getUserById(id);
    
  }
  return { users, loading, addUser, editUser, removeUser ,getUserBy_Id};
}

import { dummyUsers } from "../utils/constants";

const BASE_URL = "http://localhost:5000/api/users";

export const getUsers = async () => {
  // const res = await fetch(BASE_URL);
  const res = {
    success: true,
    json: async () => ({ success: true, data: dummyUsers })
  };

  const result = await res.json();
  if (!result.success) throw new Error("Failed to fetch users");
  return result.data;
};

export const getUserById = async (id) => {
  // const res = await fetch(`${BASE_URL}/${id}`);
  const res = {
    success: true,
    json: async () => {
      const user = dummyUsers.find((u) => u.id === parseInt(id));
      return {
        success: !!user,
        data: user || null
      };
    }
  };

  const result = await res.json();
  if (!result.success) throw new Error("User not found");
  return result.data;
};

export const createUser = async ({
  name,
  email,
  password,
  gender,
  isAdmin,
  role,
  bio,
  dob,
  image
}) => {
  // const res = await fetch(BASE_URL, { method: 'POST', ... });
  const res = {
    success: true,
    json: async () => {
      const newUser = {
        id: dummyUsers.length + 1,
        name,
        email,
        password,
        gender,
        isAdmin,
        role,
        bio,
        dob,
        image
      };
      dummyUsers.push(newUser);
      return { success: true, data: newUser };
    }
  };

  const result = await res.json();
  if (!result.success) throw new Error("Failed to create user");
  return result.data;
};

export const updateUser = async (id, updatedUser) => {
  // const res = await fetch(`${BASE_URL}/${id}`, { method: 'PUT', ... });
  const res = {
    success: true,
    json: async () => {
      const index = dummyUsers.findIndex((u) => u.id === parseInt(id));
      if (index === -1) return { success: false };
      dummyUsers[index] = { id: parseInt(id), ...updatedUser };
      return { success: true, data: dummyUsers[index] };
    }
  };

  const result = await res.json();
  if (!result.success) throw new Error("Failed to update user");
  return result.data;
};

export const deleteUser = async (id) => {
  // const res = await fetch(`${BASE_URL}/${id}`, { method: 'DELETE' });
  const res = {
    success: true,
    json: async () => {
      const index = dummyUsers.findIndex((u) => u.id === parseInt(id));
      if (index === -1) return { success: false };
      dummyUsers.splice(index, 1);
      return { success: true };
    }
  };

  const result = await res.json();
  if (!result.success) throw new Error("Failed to delete user");
  return true;
};



// services/userApi.js
// import { apiRequest } from "./api";
// const BASE_URL = "http://localhost:5000/api/users";
// export const getUsers = () => apiRequest(BASE_URL);
// export const getUserById = (id) => apiRequest(`${BASE_URL}/${id}`);
// export const createUser = (data) => apiRequest(BASE_URL, "POST", data);
// export const updateUser = (id, data) => apiRequest(`${BASE_URL}/${id}`, "PUT", data);
// export const deleteUser = (id) => apiRequest(`${BASE_URL}/${id}`, "DELETE");
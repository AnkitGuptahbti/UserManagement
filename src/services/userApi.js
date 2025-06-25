const BASE_URL = "http://localhost:5000/api/users";

// Dummy in-memory user list
// const dummyUsers = [
//   {
//     id: 1,
//     name: "Ankit Gupta",
//     email: "ankit@example.com",
//     gender: "male",
//     isAdmin: true,
//     role: "admin",
//     bio: "Loves coding",
//     dob: "1998-01-01",
//     image: "https://placehold.co/50"
//   },
//   {
//     id: 2,
//     name: "Priya Sharma",
//     email: "priya.sharma@example.com",
//     gender: "female",
//     isAdmin: false,
//     role: "user",
//     bio: "UI/UX designer",
//     dob: "1999-03-15",
//       image: "https://placehold.co/50"
//   },
//   {
//     id: 3,
//     name: "Rahul Verma",
//     email: "rahul.verma@example.com",
//     gender: "male",
//     isAdmin: false,
//     role: "manager",
//     bio: "Handles operations",
//     dob: "1995-06-25",
//       image: "https://placehold.co/50"
//   },
//   {
//     id: 4,
//     name: "Sneha Mehta",
//     email: "sneha.mehta@example.com",
//     gender: "female",
//     isAdmin: true,
//     role: "admin",
//     bio: "Team lead",
//     dob: "1997-09-10",
//        image: "https://placehold.co/50"
//   },
//   {
//     id: 5,
//     name: "Amit Singh",
//     email: "amit.singh@example.com",
//     gender: "male",
//     isAdmin: false,
//     role: "user",
//     bio: "Frontend developer",
//     dob: "2000-11-20",
//        image: "https://placehold.co/50"
//   }
// ];
const dummyUsers = [];

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

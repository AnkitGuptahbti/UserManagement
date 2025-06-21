import { Link } from "react-router-dom";
import { useState } from "react";
import { MoreVertical } from "lucide-react"; 

export default function UserList({ users, onDelete }) {
  const [openDropdownId, setOpenDropdownId] = useState(null);

  const toggleDropdown = (userId) => {
    setOpenDropdownId((prevId) => (prevId === userId ? null : userId));
  };

  return (
    <div className="space-y-1">
      {/* Header */}
      <div className="grid grid-cols-[1.5fr_2fr_1fr_1fr_40px] font-semibold items-center text-gray-700 bg-gray-200 p-2 rounded mb-2 h-[50px]">
        <span>Name</span>
        <span>Email</span>
        <span>Role</span>
        <span>DOB</span>
      </div>

      {users.map((user) => (
        <div
          key={user.id}
          className="grid grid-cols-[1.5fr_2fr_1fr_1fr_40px] items-center bg-white py-[4px] px-2 rounded shadow-sm hover:shadow-md transition relative   "
        >
          {/* Name & Avatar */}
          <div className="flex items-center gap-2">
            <img
              src={user.image || "https://via.placeholder.com/40"}
              alt={user.name}
              className="w-10 h-10 rounded-full object-cover"
            />
            <span className="font-medium">{user.name}</span>
          </div>

          {/* Email */}
          <span>{user.email}</span>

          {/* Role */}
          <span className="capitalize">{user.role}</span>

          {/* DOB */}
          <span>{user.dob}</span>

          {/* Three-dot menu */}
          <div className="flex justify-center relative">
            <button
              onClick={() => toggleDropdown(user.id)}
              className="text-gray-500 hover:text-gray-800"
            >
              <MoreVertical size={18} />
            </button>

            {openDropdownId === user.id && (
              <div className="absolute right-0 top-6 bg-white shadow-lg rounded w-28 z-10">
                <Link
                  to={`/edit/${user.id}`}
                  className="block px-4 py-2 text-sm hover:bg-gray-100"
                >
                  Edit
                </Link>
                <button
                  onClick={() => onDelete(user.id)}
                  className="block w-full text-left px-4 py-2 text-sm hover:bg-gray-100"
                >
                  Delete
                </button>
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}

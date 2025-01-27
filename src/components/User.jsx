import { FaPencilAlt, FaTrash } from "react-icons/fa";

const User = ({ user, onEdit, onDelete }) => {
  return (
    <div className="bg-white shadow-lg rounded-lg p-6 mb-4 hover:shadow-xl transition-all duration-300 ease-in-out transform hover:scale-105">
      <div className="mb-4">
        <p className="text-sm text-gray-500 font-medium">ID: {user.id}</p>
        <h3 className="font-bold text-lg text-gray-800">
          {user.firstName} {user.lastName}
        </h3>
        <p className="text-sm text-gray-600">{user.email}</p>
        <p className="text-sm text-gray-600 font-semibold">
          Department: {user.department}
        </p>
      </div>
      <div className="flex space-x-4">
        <button
          onClick={() => onEdit(user)}
          className="bg-yellow-400 text-white p-2 rounded-full hover:bg-yellow-500 transition-all duration-200"
        >
          <FaPencilAlt size={18} />
        </button>
        <button
          onClick={() => onDelete(user.id)}
          className="bg-red-500 text-white p-2 rounded-full hover:bg-red-600 transition-all duration-200"
        >
          <FaTrash size={18} />
        </button>
      </div>
    </div>
  );
};

export default User;

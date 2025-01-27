import { useState, useEffect } from "react";
import axios from "axios";
import User from "./User";
import { Toaster, toast } from "react-hot-toast";
import { FaPlus } from "react-icons/fa";
import UserForm from "./UserForm";
const API_URL = "https://jsonplaceholder.typicode.com/users";
import { RotatingTriangles } from "react-loader-spinner";
const UserList = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const USERS_PER_PAGE = 3;
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [mode, setMode] = useState("add");
  const [selectedUser, setSelectedUser] = useState(null);

  const fetchUsers = async () => {
    try {
      const response = await axios.get(API_URL);
      const processedUsers = response.data.map((user) => {
        const [firstName, ...lastNameParts] = user.name.split(" "); // Split the name
        return {
          ...user,
          firstName,
          lastName: lastNameParts.join(" ") || "N/A", // Handle cases with only one name
          department: user.department || "General" // Mock department
        };
      });
      setUsers(processedUsers);
      setLoading(false);
    } catch (err) {
      setError("Failed to fetch users");
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleDelete = (id) => {
    setUsers(users.filter((user) => user.id !== id));
    toast.success("User deleted successfully!");
  };

  const handleEdit = (user) => {
    setSelectedUser(user);
    setMode("edit");
    setIsModalOpen(true);
  };

  const handleAdd = () => {
    setMode("add");
    setSelectedUser(null);
    setIsModalOpen(true);
  };

  const startIndex = (page - 1) * USERS_PER_PAGE;
  const paginatedUsers = users.slice(startIndex, startIndex + USERS_PER_PAGE);

  return (
    <div className="max-w-6xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6 text-center text-gray-800">
        User Management Dashboard
      </h1>
      {loading ? (
        <div className="flex items-center justify-center v-screen">
          <RotatingTriangles
            visible={true}
            height="80"
            width="80"
            color="#4fa94d"
            ariaLabel="rotating-triangles-loading"
            wrapperStyle={{}}
            wrapperClass=""
          />
        </div>
      ) : error ? (
        <p className="text-center text-red-600">{error}</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {paginatedUsers.map((user) => (
            <User
              key={user.id}
              user={user}
              onEdit={handleEdit}
              onDelete={handleDelete}
            />
          ))}
        </div>
      )}
      <div className="mt-6 flex justify-center">
        <button
          disabled={page === 1}
          onClick={() => setPage(page - 1)}
          className="bg-gray-300 px-6 py-2 mx-2 disabled:bg-gray-200 rounded hover:bg-gray-400 transition duration-200"
        >
          Previous
        </button>
        <button
          disabled={page * USERS_PER_PAGE >= users.length}
          onClick={() => setPage(page + 1)}
          className="bg-gray-300 px-6 py-2 mx-2 disabled:bg-gray-200 rounded hover:bg-gray-400 transition duration-200"
        >
          Next
        </button>
      </div>
      <button
        onClick={handleAdd}
        className="fixed bottom-4 right-4 bg-blue-600 text-white p-4 rounded-full shadow-lg hover:bg-blue-700 transition duration-200"
      >
        <FaPlus size={20} />
      </button>
      {isModalOpen && (
        <UserForm
          mode={mode}
          user={selectedUser}
          setUsers={setUsers}
          setIsModalOpen={setIsModalOpen}
        />
      )}
      <Toaster />
    </div>
  );
};

export default UserList;

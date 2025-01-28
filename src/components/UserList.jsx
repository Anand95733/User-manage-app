import { useState, useEffect } from "react";
import axios from "axios";
import User from "./User";
import { Toaster, toast } from "react-hot-toast";
import UserForm from "./UserForm";
import { RotatingTriangles } from "react-loader-spinner";

const API_URL = "https://jsonplaceholder.typicode.com/users";

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
        const [firstName, ...lastNameParts] = user.name.split(" ");
        return {
          ...user,
          firstName,
          lastName: lastNameParts.join(" ") || "N/A",
          department: user.department || "General",
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
    <div className="bg-gray-100 min-h-screen">
      <div className="max-w-6xl mx-auto p-6">
        <h1 className="text-3xl font-bold mb-6 text-center text-blue-700 shadow-md p-4 rounded bg-gray-50">
          Employees Management
        </h1>
        {loading ? (
          <div className="flex items-center justify-center v-screen mt-40">
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
      </div>

      {/* Fixed Pagination and Add User Buttons */}
      <div className="fixed bottom-0 left-0 w-full bg-gray-200 shadow-lg py-3 flex justify-center items-center space-x-4">
        <button
          disabled={page === 1}
          onClick={() => setPage(page - 1)}
          className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition duration-200 disabled:bg-gray-300"
        >
          Previous
        </button>
        <button
          onClick={handleAdd}
          className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition duration-200"
        >
          Add Employee
        </button>
        <button
          disabled={page * USERS_PER_PAGE >= users.length}
          onClick={() => setPage(page + 1)}
          className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition duration-200 disabled:bg-gray-300"
        >
          Next
        </button>
      </div>

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

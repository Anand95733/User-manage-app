import { useState, useEffect } from "react";
import axios from "axios";
import User from "./User";
import { Toaster, toast } from "react-hot-toast";
import { RotatingTriangles } from "react-loader-spinner";
import UserForm from "./UserForm";

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
      setError("Failed to fetch Emplyees");
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleDelete = (id) => {
    setUsers(users.filter((user) => user.id !== id));
    toast.success("Employee deleted successfully!");
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
    <div className="bg-gray-100 min-h-screen p-6">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold mb-6 text-center text-blue-700">
          Employees Management
        </h1>

        {loading ? (
          <div className="flex items-center justify-center min-h-[200px]">
            <RotatingTriangles
              visible={true}
              height="80"
              width="80"
              color="#4fa94d"
              ariaLabel="rotating-triangles-loading"
            />
          </div>
        ) : error ? (
          <p className="text-center text-red-600">{error}</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mb-6">
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

        {/* Button Container */}
        <div className="flex justify-center items-center space-x-4 flex-wrap mt-4">
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
            className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition duration-200 disabled:bg-gray-300"
          >
            Next
          </button>
        </div>
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

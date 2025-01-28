import { useState, useEffect } from "react";
import { toast } from "react-hot-toast";
import { FaTimes } from "react-icons/fa"; // Cross icon

const UserForm = ({ mode, user, setUsers, setIsModalOpen }) => {
  const [formData, setFormData] = useState(
    user || {
      firstName: "",
      lastName: "",
      email: "",
      department: "Artificial Intelligence (AI)",
    }
  );
  const [nextId, setNextId] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    if (mode === "add") {
      setUsers((prevUsers) => {
        const maxId = Math.max(...prevUsers.map((u) => u.id), 0);
        setNextId(maxId + 1);
        return prevUsers;
      });
    } else if (mode === "edit" && user) {
      setFormData(user);
    }
  }, [mode, user, setUsers]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });

    if (errorMessage) {
      setErrorMessage("");
    }
  };

  const validateForm = () => {
    if (!formData.firstName.trim()) {
      return "First Name is required.";
    }
    if (!formData.lastName.trim()) {
      return "Last Name is required.";
    }
    if (!formData.email.trim()) {
      return "Email is required.";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      return "Invalid email address.";
    }
    if (!formData.department.trim()) {
      return "Department is required.";
    }
    return "";
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const validationError = validateForm();

    if (validationError) {
      setErrorMessage(validationError);
      return;
    }

    if (mode === "edit") {
      setUsers((prevUsers) =>
        prevUsers.map((u) => (u.id === user.id ? { ...u, ...formData } : u))
      );
      toast.success("User updated successfully!");
    } else if (mode === "add") {
      const newUser = { ...formData, id: nextId };
      setUsers((prevUsers) => [...prevUsers, newUser]);
      toast.success("User added successfully!");
    }

    setIsModalOpen(false);
  };

  return (
    <div className="fixed inset-0 bg-gray-500 bg-opacity-30 flex justify-center items-center z-50">
      <div className="bg-gray-100 p-8 rounded-lg shadow-lg w-full max-w-md relative">
        {/* Close Button */}
        <button
          onClick={() => setIsModalOpen(false)}
          className="absolute top-3 right-3 text-gray-500 hover:text-gray-800"
        >
          <FaTimes size={20} />
        </button>

        <h2 className="text-2xl font-bold mb-6 text-center text-blue-700">
          {mode === "add" ? "Add User" : "Edit User"}
        </h2>

        <form onSubmit={handleSubmit} className="space-y-5">
          {mode === "add" && (
            <div>
              <label className="block font-semibold mb-2 text-gray-700">ID</label>
              <input
                type="text"
                value={nextId}
                readOnly
                className="w-full border px-4 py-2 rounded bg-gray-200 text-gray-600 cursor-not-allowed"
              />
            </div>
          )}

          <div>
            <label className="block font-semibold mb-2 text-gray-700">
              First Name
            </label>
            <input
              type="text"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              className="w-full border px-4 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-600"
            />
          </div>

          <div>
            <label className="block font-semibold mb-2 text-gray-700">
              Last Name
            </label>
            <input
              type="text"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              className="w-full border px-4 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-600"
            />
          </div>

          <div>
            <label className="block font-semibold mb-2 text-gray-700">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full border px-4 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-600"
            />
          </div>

          <div>
            <label className="block font-semibold mb-2 text-gray-700">
              Department
            </label>
            <select
              name="department"
              value={formData.department}
              onChange={handleChange}
              className="w-full border px-4 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-600"
            >
              <option value="Artificial Intelligence (AI)">
                Artificial Intelligence (AI)
              </option>
              <option value="Machine Learning (ML)">
                Machine Learning (ML)
              </option>
              <option value="Cybersecurity">Cybersecurity</option>
              <option value="Software Engineering">Software Engineering</option>
              <option value="Data Science">Data Science</option>
            </select>
          </div>

          {/* General error message at the top */}
          {errorMessage && (
            <p className="text-red-500 text-sm text-center">{errorMessage}</p>
          )}

          <button
            type="submit"
            className="w-full px-4 py-2 text-white rounded bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-600"
          >
            {mode === "add" ? "Add Employee" : "Update Employee"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default UserForm;

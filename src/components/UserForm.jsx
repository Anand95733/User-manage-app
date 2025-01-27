import { useState, useEffect } from "react";
import { toast } from "react-hot-toast";

const UserForm = ({ mode, user, setUsers, setIsModalOpen }) => {
  const [formData, setFormData] = useState(
    user || { firstName: "", lastName: "", email: "", department: "General" }
  );
  const [nextId, setNextId] = useState(null);

  useEffect(() => {
    if (mode === "add") {
      // Calculate next ID based on the current users
      setUsers((prevUsers) => {
        const maxId = Math.max(...prevUsers.map((u) => u.id), 0);
        setNextId(maxId + 1); // Auto-increment the ID
        return prevUsers;
      });
    } else if (mode === "edit" && user) {
      setFormData(user);
    }
  }, [mode, user, setUsers]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.firstName || !formData.lastName || !formData.email || !formData.department) {
      toast.error("Please fill out all fields.");
      return;
    }

    if (mode === "edit") {
      // Update user in the list
      setUsers((prevUsers) =>
        prevUsers.map((u) =>
          u.id === user.id ? { ...u, ...formData } : u
        )
      );
      toast.success("User updated successfully!");
    } else if (mode === "add") {
      // Add new user to the list
      const newUser = { ...formData, id: nextId }; // Assign auto-incremented ID
      setUsers((prevUsers) => [...prevUsers, newUser]);
      toast.success("User added successfully!");
    }

    setIsModalOpen(false); // Close the modal
  };

  return (
    <div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-8 rounded shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold mb-4 text-center text-gray-800">
          {mode === "add" ? "Add User" : "Edit User"}
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          {mode === "add" && (
            <div>
              <label className="block font-bold mb-2 text-gray-700">ID</label>
              <input
                type="text"
                value={nextId}
                readOnly
                className="w-full border px-4 py-2 rounded bg-gray-100 text-gray-500"
              />
            </div>
          )}
          <div>
            <label className="block font-bold mb-2 text-gray-700">First Name</label>
            <input
              type="text"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              required
              className="w-full border px-4 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-600"
            />
          </div>
          <div>
            <label className="block font-bold mb-2 text-gray-700">Last Name</label>
            <input
              type="text"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              required
              className="w-full border px-4 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-600"
            />
          </div>
          <div>
            <label className="block font-bold mb-2 text-gray-700">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full border px-4 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-600"
            />
          </div>
          <div>
            <label className="block font-bold mb-2 text-gray-700">Department</label>
            <select
              name="department"
              value={formData.department}
              onChange={handleChange}
              required
              className="w-full border px-4 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-600"
            >
              <option value="Artificial Intelligence (AI)">Artificial Intelligence (AI)</option>
              <option value="Machine Learning (ML)">Machine Learning (ML)</option>
              <option value="Cybersecurity">Cybersecurity</option>
              <option value="Software Engineering">Software Engineering</option>
              <option value="Data Science">Data Science</option>
            </select>
          </div>
          <button
            type="submit"
            className="w-full px-4 py-2 text-white rounded bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-600"
          >
            {mode === "add" ? "Add User" : "Update User"}
          </button>
        </form>
        <button
          onClick={() => setIsModalOpen(false)}
          className="mt-4 text-red-500 hover:text-red-700"
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default UserForm;

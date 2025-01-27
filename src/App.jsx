import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import UserList from "./components/UserList";
import UserForm from "./components/UserForm";

const App = () => {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<UserList />} />
        <Route path="/add" element={<UserForm mode="add" />} />
        <Route path="/edit/:id" element={<UserForm mode="edit" />} />
      </Routes>
    </Router>
  );
};

export default App;

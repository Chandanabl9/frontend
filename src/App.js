import React, { useState } from "react";
import axios from "axios";
import { BrowserRouter as Router, Routes, Route, useNavigate } from "react-router-dom";
import SearchPage from "./SearchPage";
import "./styles.css"; // Import styles

// 1) Import your config file
import API_URL from "./config";

function UserForm() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    Name: "",
    Department: "",
    UsnEmpId: "",
    VehicleNumber: "",
    MobileNumber: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // 2) Use the imported API_URL here
      const response = await axios.post(`${API_URL}/api/user`, formData);
      alert(response.data.message);
      navigate("/search");
    } catch (error) {
      alert(error.response?.data?.message || "Error saving data");
    }
  };

  return (
    <div className="container">
      <div className="form-container">
        <h2 className="title">User Information Form</h2>

        <form onSubmit={handleSubmit} className="form">
          {Object.keys(formData).map((field) => (
            <div key={field} className="form-group">
              <label className="label">
                {field.replace(/([A-Z])/g, " $1").trim()}:
              </label>
              <input
                type="text"
                name={field}
                value={formData[field]}
                onChange={handleChange}
                placeholder={`Enter ${field}`}
                required
                className="input"
              />
            </div>
          ))}

          <div className="btn-group">
            <button type="button" onClick={() => navigate("/search")} className="btn btn-search">
              Go to Search
            </button>
            <button type="submit" className="btn btn-submit">
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<UserForm />} />
        <Route path="/search" element={<SearchPage />} />
      </Routes>
    </Router>
  );
}

export default App;
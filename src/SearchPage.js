import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import API_URL from './config'; // Import API_URL from config.js
import './App.css';

function SearchPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [userData, setUserData] = useState(null);
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // Handle input change
  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  // Handle form submit
  const handleSearchSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setUserData(null);
    setMessage('');

    try {
      // Use the imported API_URL instead of hardcoded URL
      const response = await axios.get(`${API_URL}/api/search?vehicleNumber=${searchTerm}`);
      console.log("API Response:", response.data); // Debugging response

      if (response.data) {
        setUserData(response.data);
      } else {
        setMessage('No matching vehicle found.');
      }
    } catch (error) {
      setMessage(error.response?.data?.message || 'Error fetching data');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="search-page-container">
      <div className="search-box">
        <h2>Search Vehicle Information</h2>
        <form onSubmit={handleSearchSubmit}>
          <label>Enter last 4 digits of vehicle number:</label>
          <input
            type="text"
            value={searchTerm}
            onChange={handleSearchChange}
            maxLength={4}
            placeholder="e.g., 2321"
            required
          />
          <button type="submit" disabled={loading}>
            {loading ? 'Searching...' : 'Search'}
          </button>
        </form>

        <div className="search-result">
          {message && <p style={{ color: "red" }}>{message}</p>}
          {loading && <p>Loading...</p>}
          {userData && (
            <div className="result-box">
              <p><strong>Name:</strong> {userData.Name || "N/A"}</p>
              <p><strong>USN/Emp ID:</strong> {userData.USN_Emp_No || userData.Emp_ID || "N/A"}</p>
              <p><strong>Department:</strong> {userData.Department || "N/A"}</p>
              <p><strong>Vehicle Number:</strong> {userData.Vehicle_No || "N/A"}</p>
              <p><strong>Mobile Number:</strong> {userData.Mobile_Number || "N/A"}</p>
            </div>
          )}
        </div>

        <button className="back-button" onClick={() => navigate('/')}>
          Go Back to Form
        </button>
      </div>
    </div>
  );
}

export default SearchPage;
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const AdminLoginPage = () => {
 
  const [email, setEmail] = useState('admin1@example.com');
  const [password, setPassword] = useState('password121');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const submitHandler = async (e) => {
    e.preventDefault();
    setError(''); 
    try {
      
      const { data } = await axios.post('http://localhost:5000/api/admin/login', {
        email,
        password,
      });

      
      localStorage.setItem('adminInfo', JSON.stringify(data));

     
      navigate('/admin/dashboard');

    } catch (err) {
      setError(err.response?.data?.message || 'Invalid email or password');
    }
  };

  return (
    
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="max-w-md w-full mx-auto p-8 border rounded-lg shadow-lg bg-white">
        <h1 className="text-3xl font-bold mb-6 text-center text-gray-800">
          AXS Admin Portal
        </h1>

        {error && (
          <div className="bg-red-100 text-red-700 p-3 rounded mb-4">
            {error}
          </div>
        )}

        <form onSubmit={submitHandler}>
          <div className="mb-4">
            <label className="block text-gray-700 font-bold mb-2">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full border p-2 rounded"
              required
            />
          </div>
          <div className="mb-6">
            <label className="block text-gray-700 font-bold mb-2">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full border p-2 rounded"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-gray-800 text-white font-bold py-2 px-4 rounded hover:bg-gray-700"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default AdminLoginPage;

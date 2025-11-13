import React from 'react';
import { Link } from 'react-router-dom';

export const AdminDashboardPage = () => {
  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Admin Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Link to="/admin/products" className="block p-6 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700">
          <h2 className="text-2xl font-bold">Manage Products</h2>
          <p>View, add, edit, and delete products.</p>
        </Link>
        {/* We can add Orders later */}
      </div>
    </div>
  );
};


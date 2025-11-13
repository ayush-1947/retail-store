import React from 'react';
import { NavLink, Outlet, useNavigate } from 'react-router-dom';

export const AdminLayout = () => {
  const navigate = useNavigate();

  const logoutHandler = () => {
    localStorage.removeItem('adminInfo');
    navigate('/admin/login');
  };

  const getNavLinkClass = ({ isActive }) =>
    isActive
      ? 'block py-2 px-4 bg-gray-700 text-white rounded'
      : 'block py-2 px-4 text-gray-300 hover:bg-gray-700 hover:text-white rounded';

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* sidebar */}

      <aside className="w-64 bg-gray-800 text-white flex flex-col">
        <div className="p-4 text-2xl font-bold border-b border-gray-700">
          AXS Admin
        </div>
        <nav className="flex-grow p-4 space-y-2">
          <NavLink to="/admin/dashboard" className={getNavLinkClass}>
            Dashboard
          </NavLink>
          <NavLink to="/admin/products" className={getNavLinkClass}>
            Products
          </NavLink>
        </nav>
        <div className="p-4 border-t border-gray-700">
          <button onClick={logoutHandler} className="w-full bg-red-600 text-white py-2 px-4 rounded hover:bg-red-700">
            Logout
          </button>
        </div>
      </aside>

     
      <main className="flex-grow p-8 overflow-y-auto">
        <Outlet />
      </main>
    </div>
  );
};


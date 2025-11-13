import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from './Header';

const Layout = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow container mx-auto p-4">
        <Outlet /> {/* Child pages (like HomePage) will render here */}
      </main>
      <footer className="bg-gray-200 text-center p-4">
        © {new Date().getFullYear()} AXS Solution. All rights reserved.
      </footer>
    </div>
  );
};

export default Layout;
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams, Link } from 'react-router-dom';

export const AdminProductEditPage = () => {  // Changed from 'export default' to 'export const'
  const { id } = useParams();
  const navigate = useNavigate();
  const isEditMode = !!id;

  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('');
  const [stock, setStock] = useState('');
  const [status, setStatus] = useState('Active');
  const [image, setImage] = useState(null);

  useEffect(() => {
    if (isEditMode) {
      const fetchProduct = async () => {
        const { data } = await axios.get(`http://localhost:5000/api/products/${id}`);
        setName(data.name);
        setPrice(data.price);
        setDescription(data.description);
        setCategory(data.category);
        setStock(data.stock);
        setStatus(data.status);
      };
      fetchProduct();
    }
  }, [id, isEditMode]);

  const submitHandler = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('name', name);
    formData.append('price', price);
    formData.append('description', description);
    formData.append('category', category);
    formData.append('stock', stock);
    formData.append('status', status);
    if (image) formData.append('image', image);

    try {
      const { token } = JSON.parse(localStorage.getItem('adminInfo'));
      const config = { headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'multipart/form-data' } };
      
      if (isEditMode) {
        await axios.put(`http://localhost:5000/api/admin/products/${id}`, formData, config);
      } else {
        await axios.post('http://localhost:5000/api/admin/products', formData, config);
      }
      navigate('/admin/products');
    } catch (err) {
      alert('Error saving product');
    }
  };

  return (
    <div className="max-w-2xl mx-auto bg-white p-8 shadow rounded">
      <h1 className="text-2xl font-bold mb-6">{isEditMode ? 'Edit Product' : 'Create Product'}</h1>
      <form onSubmit={submitHandler} className="space-y-4">
        <input type="text" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} className="w-full border p-2 rounded" required />
        <input type="number" placeholder="Price" value={price} onChange={(e) => setPrice(e.target.value)} className="w-full border p-2 rounded" required />
        <input type="number" placeholder="Stock" value={stock} onChange={(e) => setStock(e.target.value)} className="w-full border p-2 rounded" required />
        <input type="text" placeholder="Category" value={category} onChange={(e) => setCategory(e.target.value)} className="w-full border p-2 rounded" required />
        <textarea placeholder="Description" value={description} onChange={(e) => setDescription(e.target.value)} className="w-full border p-2 rounded h-24" required />
        <select value={status} onChange={(e) => setStatus(e.target.value)} className="w-full border p-2 rounded">
          <option value="Active">Active</option>
          <option value="Inactive">Inactive</option>
        </select>
        <div>
          <label className="block mb-1">Image</label>
          <input type="file" onChange={(e) => setImage(e.target.files[0])} className="w-full border p-2 rounded" accept="image/*" />
        </div>
        <div className="flex justify-between">
          <Link to="/admin/products" className="text-gray-600 pt-2">Cancel</Link>
          <button type="submit" className="bg-blue-600 text-white py-2 px-4 rounded">{isEditMode ? 'Update' : 'Create'}</button>
        </div>
      </form>
    </div>
  );
};
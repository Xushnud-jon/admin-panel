import React, { useState, useEffect } from 'react';
import { ArrowLeft, Upload, X } from 'lucide-react';
import type { Product } from '../../types';

interface AddProductProps {
  onBack: () => void;
  onSave: (product: Omit<Product, 'id' | 'createdAt'>) => void;
  editingProduct?: Product | null;
}

const categories = [
  'Electronics',
  'Clothing',
  'Accessories',
  'Home & Kitchen',
  'Sports & Outdoors',
  'Books',
  'Beauty & Personal Care',
  'Toys & Games'
];

export const AddProduct: React.FC<AddProductProps> = ({ onBack, onSave, editingProduct }) => {
  const [formData, setFormData] = useState({
    name: '',
    price: '',
    category: '',
    description: '',
    image: ''
  });
  const [imagePreview, setImagePreview] = useState<string>('');
  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    if (editingProduct) {
      setFormData({
        name: editingProduct.name,
        price: editingProduct.price.toString(),
        category: editingProduct.category,
        description: editingProduct.description,
        image: editingProduct.image
      });
      setImagePreview(editingProduct.image);
    }
  }, [editingProduct]);

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Product name is required';
    }

    if (!formData.price.trim()) {
      newErrors.price = 'Price is required';
    } else if (isNaN(Number(formData.price)) || Number(formData.price) <= 0) {
      newErrors.price = 'Price must be a valid positive number';
    }

    if (!formData.category) {
      newErrors.category = 'Category is required';
    }

    if (!formData.description.trim()) {
      newErrors.description = 'Description is required';
    }

    if (!formData.image && !imagePreview) {
      newErrors.image = 'Product image is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (validateForm()) {
      onSave({
        name: formData.name.trim(),
        price: Number(formData.price),
        category: formData.category,
        description: formData.description.trim(),
        image: imagePreview || formData.image
      });
    }
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // In a real app, you would upload to a server
      // For demo, we'll use a placeholder
      const reader = new FileReader();
      reader.onload = (e) => {
        setImagePreview(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const removeImage = () => {
    setImagePreview('');
    setFormData({ ...formData, image: '' });
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors({ ...errors, [name]: '' });
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center">
        <button
          onClick={onBack}
          className="p-2 text-gray-500 hover:bg-gray-100 rounded-lg mr-4 transition-colors"
        >
          <ArrowLeft className="w-6 h-6" />
        </button>
        <div>
          <h1 className="text-2xl font-bold text-gray-900">
            {editingProduct ? 'Edit Product' : 'Add New Product'}
          </h1>
          <p className="text-gray-600">
            {editingProduct ? 'Update product information' : 'Fill in the details to add a new product to your store'}
          </p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="max-w-2xl">
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 space-y-6">
          {/* Product Name */}
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
              Product Name *
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 transition-colors ${
                errors.name ? 'border-red-300 focus:ring-red-500' : 'border-gray-300 focus:border-blue-500'
              }`}
              placeholder="Enter product name"
            />
            {errors.name && <p className="text-red-600 text-sm mt-1">{errors.name}</p>}
          </div>

          {/* Price and Category */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="price" className="block text-sm font-medium text-gray-700 mb-2">
                Price (USD) *
              </label>
              <input
                type="number"
                id="price"
                name="price"
                value={formData.price}
                onChange={handleInputChange}
                step="0.01"
                min="0"
                className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 transition-colors ${
                  errors.price ? 'border-red-300 focus:ring-red-500' : 'border-gray-300 focus:border-blue-500'
                }`}
                placeholder="0.00"
              />
              {errors.price && <p className="text-red-600 text-sm mt-1">{errors.price}</p>}
            </div>

            <div>
              <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-2">
                Category *
              </label>
              <select
                id="category"
                name="category"
                value={formData.category}
                onChange={handleInputChange}
                className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 transition-colors ${
                  errors.category ? 'border-red-300 focus:ring-red-500' : 'border-gray-300 focus:border-blue-500'
                }`}
              >
                <option value="">Select a category</option>
                {categories.map(category => (
                  <option key={category} value={category}>{category}</option>
                ))}
              </select>
              {errors.category && <p className="text-red-600 text-sm mt-1">{errors.category}</p>}
            </div>
          </div>

          {/* Image Upload */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Product Image *
            </label>
            
            {!imagePreview ? (
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-blue-400 transition-colors">
                <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-600 mb-2">Click to upload or drag and drop</p>
                <p className="text-sm text-gray-500">PNG, JPG, GIF up to 10MB</p>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                />
              </div>
            ) : (
              <div className="relative inline-block">
                <img
                  src={imagePreview}
                  alt="Product preview"
                  className="w-32 h-32 object-cover rounded-lg border border-gray-200"
                />
                <button
                  type="button"
                  onClick={removeImage}
                  className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600 transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            )}
            {errors.image && <p className="text-red-600 text-sm mt-1">{errors.image}</p>}
          </div>

          {/* Description */}
          <div>
            <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-2">
              Description *
            </label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              rows={4}
              className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 transition-colors resize-none ${
                errors.description ? 'border-red-300 focus:ring-red-500' : 'border-gray-300 focus:border-blue-500'
              }`}
              placeholder="Describe your product in detail..."
            />
            {errors.description && <p className="text-red-600 text-sm mt-1">{errors.description}</p>}
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 pt-6 border-t border-gray-200">
            <button
              type="button"
              onClick={onBack}
              className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
            >
              {editingProduct ? 'Update Product' : 'Add Product'}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};
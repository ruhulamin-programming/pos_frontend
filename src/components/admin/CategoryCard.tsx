"use client";

import React from "react";
import { FaEdit, FaTrash } from "react-icons/fa";

interface Category {
  id: string;
  categoryName: string;
  icon: string;
}

interface CategoryCardProps {
  category: Category;
  onEdit: (category: Category) => void;
  onDelete: (id: string) => void;
  isDeleting: boolean;
}

const CategoryCard: React.FC<CategoryCardProps> = ({
  category,
  onEdit,
  onDelete,
  isDeleting,
}) => {
  return (
    <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100 flex items-center justify-between hover:shadow-md transition">
      <div className="flex items-center gap-4">
        <div className="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center overflow-hidden">
          <img
            src={category?.icon}
            alt={category?.categoryName}
            className="w-8 h-8 object-contain"
            onError={(e) => {
              (e.target as HTMLImageElement).src =
                "https://via.placeholder.com/150?text=Icon";
            }}
          />
        </div>
        <h4 className="font-medium text-gray-800">{category?.categoryName}</h4>
      </div>
      <div className="flex gap-2">
        <button
          onClick={() => onEdit(category)}
          className="p-2 text-blue-600 hover:bg-blue-50 rounded-full transition"
          title="Edit Category"
        >
          <FaEdit size={16} />
        </button>
        <button
          onClick={() => {
            if (
              window.confirm("Are you sure you want to delete this category?")
            ) {
              onDelete(category.id);
            }
          }}
          disabled={isDeleting}
          className="p-2 text-red-600 hover:bg-red-50 rounded-full transition disabled:text-red-300"
          title="Delete Category"
        >
          <FaTrash size={16} />
        </button>
      </div>
    </div>
  );
};

export default CategoryCard;

"use client";

import React from "react";
import { FaEdit, FaTrash } from "react-icons/fa";

interface Product {
  id: string;
  productName: string;
  category: any;
  price: number;
  productImage: string;
  quantity: number;
  description?: string;
}

interface ProductCardProps {
  product: Product;
  onEdit: (product: Product) => void;
  onDelete: (id: string) => void;
  isDeleting: boolean;
}

const ProductCard: React.FC<ProductCardProps> = ({
  product,
  onEdit,
  onDelete,
  isDeleting,
}) => {
  return (
    <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100 flex items-center justify-between hover:shadow-md transition">
      <div className="flex items-center gap-4">
        <div className="w-16 h-16 rounded-md bg-gray-100 flex items-center justify-center overflow-hidden">
          <img
            src={product?.productImage}
            alt={product?.productName}
            className="w-full h-full object-cover"
            onError={(e) => {
              (e.target as HTMLImageElement).src =
                "https://via.placeholder.com/150?text=Product";
            }}
          />
        </div>
        <div>
          <h4 className="font-medium text-gray-800">{product?.productName}</h4>
          <p className="text-sm text-gray-500">
            {typeof product?.category === "object"
              ? product?.category?.categoryName
              : "Uncategorized"}
          </p>
          <div className="flex gap-2 items-center">
            <p className="text-sm font-semibold text-blue-600">
              ${product?.price}
            </p>
            <span className="text-xs text-gray-400">|</span>
            <p className="text-xs text-gray-500">Qty: {product?.quantity}</p>
          </div>
        </div>
      </div>
      <div className="flex gap-2">
        <button
          onClick={() => onEdit(product)}
          className="p-2 text-blue-600 hover:bg-blue-50 rounded-full transition"
          title="Edit Product"
        >
          <FaEdit size={16} />
        </button>
        <button
          onClick={() => {
            if (
              window.confirm("Are you sure you want to delete this product?")
            ) {
              onDelete(product.id);
            }
          }}
          disabled={isDeleting}
          className="p-2 text-red-600 hover:bg-red-50 rounded-full transition disabled:text-red-300"
          title="Delete Product"
        >
          <FaTrash size={16} />
        </button>
      </div>
    </div>
  );
};

export default ProductCard;

"use client";

import React from "react";
import { FaEdit, FaTrash } from "react-icons/fa";
import { MdCategory, MdFastfood } from "react-icons/md";

interface Product {
  id: string;
  productName: string;
  category: any;
  categoryId?: string;
  price: number;
  productImage: string;
  quantity: number;
  description?: string;
}

interface ProductTableProps {
  products: Product[];
  onEdit: (product: Product) => void;
  onDelete: (id: string) => void;
  isDeleting: boolean;
}

const ProductTable: React.FC<ProductTableProps> = ({
  products,
  onEdit,
  onDelete,
  isDeleting,
}) => {
  return (
    <div className="overflow-hidden bg-white rounded-xl border border-gray-200 shadow-sm ring-1 ring-gray-900/5">
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                Product Details
              </th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                Category
              </th>
              <th className="px-6 py-4 text-center text-xs font-semibold text-gray-500 uppercase tracking-wider">
                In Stock
              </th>
              <th className="px-6 py-4 text-center text-xs font-semibold text-gray-500 uppercase tracking-wider">
                Price
              </th>
              <th className="px-6 py-4 text-right text-xs font-semibold text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-100">
            {products.map((product) => (
              <tr
                key={product.id}
                className="hover:bg-gray-50/80 transition-all duration-200 group"
              >
                <td className="px-6 py-4">
                  <div className="flex items-center gap-4">
                    <div className="h-12 w-12 shrink-0 bg-gray-100 rounded-lg overflow-hidden border border-gray-100 group-hover:scale-105 transition-transform duration-200">
                      {product.productImage ? (
                        <img
                          src={product.productImage}
                          alt={product.productName}
                          className="h-full w-full object-cover"
                          onError={(e) => {
                            (e.target as HTMLImageElement).src =
                              "https://via.placeholder.com/150?text=Product";
                          }}
                        />
                      ) : (
                        <div className="h-full w-full flex items-center justify-center text-gray-400">
                          <MdFastfood size={20} />
                        </div>
                      )}
                    </div>
                    <div className="flex flex-col">
                      <span className="text-sm font-bold text-gray-900 group-hover:text-indigo-600 transition-colors">
                        {product.productName}
                      </span>
                      {product.description && (
                        <span className="text-[11px] text-gray-400 mt-0.5 line-clamp-1 max-w-50">
                          {product.description}
                        </span>
                      )}
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-1.5 text-xs font-medium text-gray-700 bg-indigo-50/50 px-2.5 py-1 rounded-full border border-indigo-100/50 w-fit">
                    <MdCategory size={14} className="text-indigo-400" />
                    {typeof product.category === "object"
                      ? product.category?.categoryName
                      : "Uncategorized"}
                  </div>
                </td>
                <td className="px-6 py-4 text-center">
                  <span
                    className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold border ${
                      product.quantity < 5
                        ? "bg-red-50 text-red-700 border-red-100"
                        : product.quantity < 10
                          ? "bg-yellow-50 text-yellow-700 border-yellow-100"
                          : "bg-green-50 text-green-700 border-green-100"
                    }`}
                  >
                    {product.quantity}
                  </span>
                </td>
                <td className="px-6 py-4 text-center whitespace-nowrap">
                  <div className="text-sm font-bold text-gray-900">
                    ${product.price.toFixed(2)}
                  </div>
                </td>
                <td className="px-6 py-4 text-right whitespace-nowrap">
                  <div className="flex justify-end items-center gap-2">
                    <button
                      onClick={() => onEdit(product)}
                      className="p-2 text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors group/edit"
                      title="Edit Product"
                    >
                      <FaEdit
                        size={16}
                        className="group-hover/edit:scale-110 transition-transform"
                      />
                    </button>
                    <button
                      onClick={() => {
                        if (
                          window.confirm(
                            "Are you sure you want to delete this product?",
                          )
                        ) {
                          onDelete(product.id);
                        }
                      }}
                      disabled={isDeleting}
                      className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors disabled:opacity-50 group/del"
                      title="Delete Product"
                    >
                      <FaTrash
                        size={15}
                        className="group-hover/del:scale-110 transition-transform"
                      />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
            {products.length === 0 && (
              <tr>
                <td
                  colSpan={5}
                  className="px-6 py-16 text-center bg-gray-50/50"
                >
                  <div className="flex flex-col items-center justify-center space-y-3">
                    <div className="p-4 bg-white rounded-full shadow-sm">
                      <MdFastfood size={40} className="text-gray-300" />
                    </div>
                    <div className="space-y-1">
                      <h3 className="text-gray-900 font-semibold">
                        No products found
                      </h3>
                      <p className="text-gray-500 text-sm">
                        Your product list is currently empty.
                      </p>
                    </div>
                  </div>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ProductTable;

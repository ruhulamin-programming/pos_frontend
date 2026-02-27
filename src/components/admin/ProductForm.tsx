"use client";

import React from "react";
import { useForm } from "react-hook-form";
import { useGetCategoriesQuery } from "@/lib/services/categoryApi";

export interface ProductFormValues {
  productName: string;
  categoryId: string;
  price: number;
  productImage: string;
  quantity: number;
  description?: string;
}

interface ProductFormProps {
  onSubmit: (data: ProductFormValues) => void;
  initialData?: any;
  isLoading: boolean;
  buttonText: string;
}

const ProductForm: React.FC<ProductFormProps> = ({
  onSubmit,
  initialData,
  isLoading,
  buttonText,
}) => {
  const { data: categories } = useGetCategoriesQuery({});
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ProductFormValues>({
    defaultValues: initialData || {
      productName: "",
      categoryId: "",
      price: 0,
      productImage: "",
      quantity: 0,
      description: "",
    },
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Product Name
          </label>
          <input
            {...register("productName", {
              required: "Product name is required",
            })}
            type="text"
            className={`w-full p-2 border rounded-md focus:outline-none focus:ring-2 ${
              errors.productName ? "border-red-500" : "border-gray-300"
            }`}
          />
          {errors.productName && (
            <p className="text-red-500 text-xs mt-1">
              {errors.productName.message}
            </p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Category
          </label>
          <select
            {...register("categoryId", { required: "Category is required" })}
            className={`w-full p-2 border rounded-md focus:outline-none focus:ring-2 ${
              errors.categoryId ? "border-red-500" : "border-gray-300"
            }`}
          >
            <option value="">Select Category</option>
            {categories?.data?.map((cat: any) => (
              <option key={cat.id || cat._id} value={cat.id || cat._id}>
                {cat.categoryName}
              </option>
            ))}
          </select>
          {errors.categoryId && (
            <p className="text-red-500 text-xs mt-1">
              {errors.categoryId.message}
            </p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Price ($)
          </label>
          <input
            {...register("price", {
              required: "Price is required",
              valueAsNumber: true,
            })}
            type="number"
            step="0.01"
            className={`w-full p-2 border rounded-md focus:outline-none focus:ring-2 ${
              errors.price ? "border-red-500" : "border-gray-300"
            }`}
          />
          {errors.price && (
            <p className="text-red-500 text-xs mt-1">{errors.price.message}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Quantity
          </label>
          <input
            {...register("quantity", {
              required: "Quantity is required",
              valueAsNumber: true,
            })}
            type="number"
            className={`w-full p-2 border rounded-md focus:outline-none focus:ring-2 ${
              errors.quantity ? "border-red-500" : "border-gray-300"
            }`}
          />
          {errors.quantity && (
            <p className="text-red-500 text-xs mt-1">
              {errors.quantity.message}
            </p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Product Image URL
          </label>
          <input
            {...register("productImage", { required: "Image URL is required" })}
            type="text"
            className={`w-full p-2 border rounded-md focus:outline-none focus:ring-2 ${
              errors.productImage ? "border-red-500" : "border-gray-300"
            }`}
          />
          {errors.productImage && (
            <p className="text-red-500 text-xs mt-1">
              {errors.productImage.message}
            </p>
          )}
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Description
        </label>
        <textarea
          {...register("description")}
          rows={3}
          className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2"
        ></textarea>
      </div>

      <button
        type="submit"
        disabled={isLoading}
        className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition disabled:bg-blue-300"
      >
        {isLoading ? "Processing..." : buttonText}
      </button>
    </form>
  );
};

export default ProductForm;

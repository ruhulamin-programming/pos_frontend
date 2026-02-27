"use client";

import React from "react";
import { useForm } from "react-hook-form";

export interface CategoryFormValues {
  categoryName: string;
  icon: string;
}

interface CategoryFormProps {
  onSubmit: (data: CategoryFormValues) => void;
  initialData?: CategoryFormValues;
  isLoading: boolean;
  buttonText: string;
}

const CategoryForm: React.FC<CategoryFormProps> = ({
  onSubmit,
  initialData,
  isLoading,
  buttonText,
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CategoryFormValues>({
    defaultValues: initialData || { categoryName: "", icon: "" },
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Category Name
        </label>
        <input
          {...register("categoryName", {
            required: "Category name is required",
          })}
          type="text"
          placeholder="Enter category name"
          className={`w-full p-2 border rounded-md focus:outline-none focus:ring-2 ${
            errors.categoryName
              ? "border-red-500 focus:ring-red-200"
              : "border-gray-300 focus:ring-blue-200"
          }`}
        />
        {errors.categoryName && (
          <p className="text-red-500 text-xs mt-1">
            {errors.categoryName.message}
          </p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Category Icon URL
        </label>
        <input
          {...register("icon", {
            required: "Category icon URL is required",
          })}
          type="text"
          placeholder="https://example.com/icon.png"
          className={`w-full p-2 border rounded-md focus:outline-none focus:ring-2 ${
            errors.icon
              ? "border-red-500 focus:ring-red-200"
              : "border-gray-300 focus:ring-blue-200"
          }`}
        />
        {errors.icon && (
          <p className="text-red-500 text-xs mt-1">{errors.icon.message}</p>
        )}
      </div>

      <button
        type="submit"
        disabled={isLoading}
        className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition duration-200 disabled:bg-blue-300"
      >
        {isLoading ? "Processing..." : buttonText}
      </button>
    </form>
  );
};

export default CategoryForm;

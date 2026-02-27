"use client";

import React, { useState } from "react";
import {
  useAddCategoryMutation,
  useGetCategoriesQuery,
  useUpdateCategoryMutation,
  useDeleteCategoryMutation,
} from "@/lib/services/categoryApi";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { IoMdAdd } from "react-icons/io";
import {
  MdCategory,
  MdSearch,
  MdKeyboardArrowLeft,
  MdKeyboardArrowRight,
} from "react-icons/md";
import CategoryForm, {
  CategoryFormValues,
} from "@/components/admin/CategoryForm";
import CategoryCard from "@/components/admin/CategoryCard";

const CategoryPages = () => {
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingCategory, setEditingCategory] = useState<any>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [limit, setLimit] = useState(12);

  const {
    data: categoriesResponse,
    isLoading: isFetching,
    isError,
  } = useGetCategoriesQuery({
    page: currentPage,
    limit: limit,
    search: searchTerm,
  });

  const [addCategory, { isLoading: isAdding }] = useAddCategoryMutation();
  const [updateCategory, { isLoading: isUpdating }] =
    useUpdateCategoryMutation();
  const [deleteCategory, { isLoading: isDeleting }] =
    useDeleteCategoryMutation();

  const categories = categoriesResponse?.data || [];
  const meta = categoriesResponse?.meta || {
    totalCount: 0,
    page: 1,
    limit: 12,
    totalPages: 0,
  };

  const totalPages = meta.totalPages || 0;
  const totalCount = meta.totalCount || 0;

  const handleAddSubmit = async (data: CategoryFormValues) => {
    try {
      const res = await addCategory(data).unwrap();
      if (res) {
        toast.success("Category added successfully!");
        setShowAddForm(false);
      }
    } catch (error: any) {
      toast.error(error?.data?.message || "Failed to add category");
    }
  };

  const handleEditSubmit = async (data: CategoryFormValues) => {
    try {
      const res = await updateCategory({
        id: editingCategory.id,
        data,
      }).unwrap();
      if (res) {
        toast.success("Category updated successfully!");
        setEditingCategory(null);
      }
    } catch (error: any) {
      toast.error(error?.data?.message || "Failed to update category");
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await deleteCategory(id).unwrap();
      toast.success("Category deleted successfully!");
    } catch (error: any) {
      toast.error(error?.data?.message || "Failed to delete category");
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 1) setCurrentPage((prev) => prev - 1);
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) setCurrentPage((prev) => prev + 1);
  };

  return (
    <div className="space-y-6">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 text-center md:text-left">
        <h2 className="text-2xl font-bold text-gray-800 flex items-center justify-center md:justify-start gap-2">
          <span className="p-2 bg-indigo-50 text-indigo-600 rounded-lg">
            <MdCategory size={24} />
          </span>
          Category Management
        </h2>
        <button
          onClick={() => setShowAddForm(true)}
          className="flex items-center justify-center gap-2 bg-indigo-600 text-white px-5 py-2.5 rounded-lg hover:bg-indigo-700 transition-all shadow-md hover:shadow-lg font-semibold"
        >
          <IoMdAdd size={20} />
          Add New Category
        </button>
      </div>

      {/* Grid Section */}
      {isFetching ? (
        <div className="flex flex-col justify-center items-center h-64 space-y-4">
          <div className="animate-spin rounded-full h-12 w-12 border-4 border-indigo-200 border-t-indigo-600"></div>
          <p className="text-gray-500 font-medium animate-pulse">
            Fetching categories...
          </p>
        </div>
      ) : isError ? (
        <div className="text-center py-12 px-4 bg-red-50 rounded-xl border border-red-100 max-w-2xl mx-auto">
          <p className="text-red-600 font-medium">
            Failed to load categories. Please try again.
          </p>
        </div>
      ) : (
        <div className="space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {categories?.map((category: any) => (
              <CategoryCard
                key={category?.id}
                category={category}
                onEdit={setEditingCategory}
                onDelete={handleDelete}
                isDeleting={isDeleting}
              />
            ))}
          </div>

          {categories?.length === 0 && (
            <div className="text-center py-20 bg-gray-50 rounded-2xl border-2 border-dashed border-gray-200">
              <div className="flex flex-col items-center justify-center space-y-3">
                <div className="p-4 bg-white rounded-full shadow-sm">
                  <MdCategory size={40} className="text-gray-300" />
                </div>
                <div className="space-y-1">
                  <h3 className="text-gray-900 font-semibold">
                    No categories found
                  </h3>
                  <p className="text-gray-500 text-sm text-center">
                    Your categories list is currently empty.
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Pagination */}
          <div className="flex flex-col sm:flex-row items-center justify-between pt-4 gap-4">
            <div className="text-sm text-gray-600">
              Showing{" "}
              <span className="font-semibold text-gray-900">
                {totalCount > 0 ? (currentPage - 1) * limit + 1 : 0}
              </span>{" "}
              to{" "}
              <span className="font-semibold text-gray-900">
                {Math.min(currentPage * limit, totalCount)}
              </span>{" "}
              of{" "}
              <span className="font-semibold text-gray-900">{totalCount}</span>{" "}
              categories
            </div>

            <div className="flex items-center gap-1.5">
              <button
                onClick={handlePrevPage}
                disabled={currentPage === 1}
                className={`p-2 rounded-lg border transition-all ${
                  currentPage === 1
                    ? "bg-gray-50 text-gray-300 border-gray-200 cursor-not-allowed"
                    : "bg-white text-gray-700 border-gray-300 hover:bg-indigo-50 hover:text-indigo-600 shadow-sm"
                }`}
              >
                <MdKeyboardArrowLeft size={20} />
              </button>

              <div className="flex items-center gap-1">
                {[...Array(totalPages)].map((_, idx) => {
                  const pageNum = idx + 1;
                  if (
                    pageNum === 1 ||
                    pageNum === totalPages ||
                    (pageNum >= currentPage - 1 && pageNum <= currentPage + 1)
                  ) {
                    return (
                      <button
                        key={pageNum}
                        onClick={() => setCurrentPage(pageNum)}
                        className={`w-9 h-9 rounded-lg text-sm font-medium transition-all border ${
                          currentPage === pageNum
                            ? "bg-indigo-600 text-white border-indigo-600 shadow-md"
                            : "bg-white text-gray-600 border-gray-300 hover:bg-gray-50"
                        }`}
                      >
                        {pageNum}
                      </button>
                    );
                  } else if (
                    pageNum === currentPage - 2 ||
                    pageNum === currentPage + 2
                  ) {
                    return (
                      <span key={pageNum} className="text-gray-400">
                        ...
                      </span>
                    );
                  }
                  return null;
                })}
              </div>

              <button
                onClick={handleNextPage}
                disabled={currentPage >= totalPages}
                className={`p-2 rounded-lg border transition-all ${
                  currentPage >= totalPages
                    ? "bg-gray-50 text-gray-300 border-gray-200 cursor-not-allowed"
                    : "bg-white text-gray-700 border-gray-300 hover:bg-indigo-50 hover:text-indigo-600 shadow-sm"
                }`}
              >
                <MdKeyboardArrowRight size={20} />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal Section */}
      {(showAddForm || editingCategory) && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-[2px] transition-all">
          <div className="bg-white w-full max-w-xl rounded-2xl shadow-2xl border border-gray-100 overflow-hidden animate-in fade-in zoom-in duration-200">
            <div className="flex justify-between items-center p-6 border-b bg-gray-50/50">
              <h3 className="text-xl font-bold text-gray-800">
                {editingCategory ? "Edit Category" : "Add New Category"}
              </h3>
              <button
                onClick={() => {
                  setShowAddForm(false);
                  setEditingCategory(null);
                }}
                className="text-gray-400 hover:text-gray-600 transition-colors p-2 hover:bg-gray-200 rounded-full"
              >
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>
            <div className="p-6">
              <CategoryForm
                onSubmit={editingCategory ? handleEditSubmit : handleAddSubmit}
                initialData={
                  editingCategory
                    ? {
                        categoryName: editingCategory.categoryName,
                        icon: editingCategory.icon,
                      }
                    : undefined
                }
                isLoading={editingCategory ? isUpdating : isAdding}
                buttonText={
                  editingCategory ? "Update Category" : "Add Category"
                }
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CategoryPages;

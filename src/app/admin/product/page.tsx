"use client";

import { useState } from "react";
import {
  useAddProductMutation,
  useGetProductsQuery,
  useUpdateProductMutation,
  useDeleteProductMutation,
} from "@/lib/services/productApi";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { IoMdAdd } from "react-icons/io";
import {
  MdSearch,
  MdFastfood,
  MdKeyboardArrowLeft,
  MdKeyboardArrowRight,
} from "react-icons/md";
import ProductForm, { ProductFormValues } from "@/components/admin/ProductForm";
import ProductTable from "@/components/admin/ProductTable";

const ProductPage = () => {
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingProduct, setEditingProduct] = useState<any>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [limit, setLimit] = useState(10);

  const {
    data: productsResponse,
    isLoading: isFetching,
    isError,
  } = useGetProductsQuery({
    page: currentPage,
    limit: limit,
  });

  const [addProduct, { isLoading: isAdding }] = useAddProductMutation();
  const [updateProduct, { isLoading: isUpdating }] = useUpdateProductMutation();
  const [deleteProduct, { isLoading: isDeleting }] = useDeleteProductMutation();

  const products = productsResponse?.data?.data || [];
  const meta = productsResponse?.data?.meta || {
    totalCount: 0,
    page: 1,
    limit: 10,
    totalPages: 0,
  };

  const totalPages = meta.totalPages || 0;
  const totalCount = meta.totalCount || 0;

  const handleAddSubmit = async (data: ProductFormValues) => {
    try {
      const res = await addProduct(data).unwrap();
      if (res) {
        toast.success("Product added successfully!");
        setShowAddForm(false);
      }
    } catch (error: any) {
      toast.error(error?.data?.message || "Failed to add product");
    }
  };

  const handleEditSubmit = async (data: ProductFormValues) => {
    try {
      const res = await updateProduct({
        id: editingProduct.id,
        data,
      }).unwrap();
      if (res) {
        toast.success("Product updated successfully!");
        setEditingProduct(null);
      }
    } catch (error: any) {
      toast.error(error?.data?.message || "Failed to update product");
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await deleteProduct(id).unwrap();
      toast.success("Product deleted successfully!");
    } catch (error: any) {
      toast.error(error?.data?.message || "Failed to delete product");
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
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <h2 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
          <span className="p-2 bg-indigo-50 text-indigo-600 rounded-lg">
            <MdFastfood size={24} />
          </span>
          Product Management
        </h2>
        <button
          onClick={() => setShowAddForm(true)}
          className="flex items-center justify-center gap-2 bg-indigo-600 text-white px-5 py-2.5 rounded-lg hover:bg-indigo-700 transition-all shadow-md hover:shadow-lg font-semibold"
        >
          <IoMdAdd size={20} />
          Add New Product
        </button>
      </div>

      {/* Table Section */}
      {isFetching ? (
        <div className="flex flex-col justify-center items-center h-64 space-y-4">
          <div className="animate-spin rounded-full h-12 w-12 border-4 border-indigo-200 border-t-indigo-600"></div>
          <p className="text-gray-500 font-medium animate-pulse">
            Fetching products...
          </p>
        </div>
      ) : isError ? (
        <div className="text-center py-12 px-4 bg-red-50 rounded-xl border border-red-100 max-w-2xl mx-auto">
          <p className="text-red-600 font-medium">
            Failed to load products. Please try again.
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          <ProductTable
            products={products}
            onEdit={setEditingProduct}
            onDelete={handleDelete}
            isDeleting={isDeleting}
          />

          {/* Pagination */}
          <div className="flex flex-col sm:flex-row items-center justify-between pt-2 gap-4">
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
              products
            </div>

            <div className="flex items-center gap-1.5">
              <button
                onClick={handlePrevPage}
                disabled={currentPage === 1}
                className={`p-2 rounded-lg border transition-all ${
                  currentPage === 1
                    ? "bg-gray-50 text-gray-300 border-gray-200 cursor-not-allowed"
                    : "bg-white text-gray-700 border-gray-300 hover:bg-indigo-50 hover:text-indigo-600"
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
                    : "bg-white text-gray-700 border-gray-300 hover:bg-indigo-50 hover:text-indigo-600"
                }`}
              >
                <MdKeyboardArrowRight size={20} />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal Section */}
      {(showAddForm || editingProduct) && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-[2px] transition-all">
          <div className="bg-white w-full max-w-2xl rounded-2xl shadow-2xl border border-gray-100 overflow-hidden animate-in fade-in zoom-in duration-200">
            <div className="flex justify-between items-center p-6 border-b bg-gray-50/50">
              <h3 className="text-xl font-bold text-gray-800">
                {editingProduct ? "Edit Product" : "Add New Product"}
              </h3>
              <button
                onClick={() => {
                  setShowAddForm(false);
                  setEditingProduct(null);
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
            <div className="p-6 max-h-[80vh] overflow-y-auto">
              <ProductForm
                onSubmit={editingProduct ? handleEditSubmit : handleAddSubmit}
                initialData={editingProduct}
                isLoading={isAdding || isUpdating}
                buttonText={editingProduct ? "Update Product" : "Add Product"}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductPage;

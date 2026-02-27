import { baseApi } from "./baseApi";

const productApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    addProduct: builder.mutation({
      query: (data) => ({
        url: "/product/create",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["products"],
    }),

    getProducts: builder.query({
      query: ({ page, limit, search }) =>
        `/product/all-products?page=${page}&limit=${limit}&search=${search || ""}`,
      providesTags: ["products"],
    }),

    updateProduct: builder.mutation({
      query: ({ id, data }) => ({
        url: `/product/update/${id}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["products"],
    }),

    deleteProduct: builder.mutation({
      query: (id) => ({
        url: `/product/delete/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["products"],
    }),
  }),
});

export const {
  useAddProductMutation,
  useGetProductsQuery,
  useUpdateProductMutation,
  useDeleteProductMutation,
} = productApi;

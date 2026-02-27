import { baseApi } from "./baseApi";

const categoryApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    addCategory: builder.mutation({
      query: (data) => ({
        url: "/categories/create",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["categories"],
    }),

    getCategories: builder.query({
      query: () => "/categories/all",
      providesTags: ["categories"],
    }),

    updateCategory: builder.mutation({
      query: ({ id, data }) => ({
        url: `/categories/update/${id}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["categories"],
    }),

    deleteCategory: builder.mutation({
      query: (id) => ({
        url: `/categories/delete/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["categories"],
    }),
  }),
});

export const {
  useAddCategoryMutation,
  useGetCategoriesQuery,
  useUpdateCategoryMutation,
  useDeleteCategoryMutation,
} = categoryApi;

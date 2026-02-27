import { baseApi } from "./baseApi";

const orderApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getOrders: builder.query({
      query: ({ page, limit, menu }) => ({
        url: `/order/all-orders?page=${page}&limit=${limit}${menu ? `&menu=${menu}` : ""}`,
        method: "GET",
      }),
      providesTags: ["orders"],
    }),
  }),
});

export const { useGetOrdersQuery } = orderApi;

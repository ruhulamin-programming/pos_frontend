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

    latestOrders: builder.query({
      query: () => ({
        url: `/order/latest-orders`,
        method: "GET",
      }),
      providesTags: ["orders"],
    }),

    sellsSummary: builder.query({
      query: () => ({
        url: `/order/sells-summary`,
        method: "GET",
      }),
      providesTags: ["orders"],
    }),
  }),
});

export const { useGetOrdersQuery, useLatestOrdersQuery, useSellsSummaryQuery } =
  orderApi;

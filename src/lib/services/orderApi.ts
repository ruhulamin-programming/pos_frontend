import { baseApi } from "./baseApi";

const orderApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    placeOrder: builder.mutation({
      query: (orderData) => ({
        url: `/order/place-order`,
        method: "POST",
        body: orderData,
      }),
      invalidatesTags: ["orders"],
    }),

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

export const {
  usePlaceOrderMutation,
  useGetOrdersQuery,
  useLatestOrdersQuery,
  useSellsSummaryQuery,
} = orderApi;

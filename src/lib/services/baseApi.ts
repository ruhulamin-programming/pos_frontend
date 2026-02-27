import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import Cookies from "js-cookie";

export const baseApi = createApi({
  reducerPath: "baseApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:3002/api/v1",
    prepareHeaders: (headers) => {
      const accessToken = Cookies?.get("accessToken");
      if (accessToken) {
        headers.set("Authorization", `Bearer ${accessToken}`);
        return;
      }
    },
  }),
  endpoints: () => ({}),
  tagTypes: ["users", "profile", "user", "categories", "products", "orders"],
});

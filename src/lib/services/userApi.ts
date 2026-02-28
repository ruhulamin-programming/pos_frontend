import { baseApi } from "./baseApi";

const userApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    deleteUser: builder.mutation({
      query: (userId) => ({
        url: `/users/delete/${userId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["users"],
    }),

    userLogin: builder.mutation({
      query: (data) => ({
        url: "/user/login",
        method: "POST",
        body: data,
      }),
    }),

    profileUpdate: builder.mutation({
      query: (data) => ({
        url: "/user/my-profile",
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["profile"],
    }),

    otpVerification: builder.mutation({
      query: (data) => ({
        url: "/auth/admin-verification",
        method: "POST",
        body: data,
      }),
    }),

    myProfile: builder.query({
      query: () => "/user/my-profile",
      providesTags: ["profile"],
    }),

    users: builder.query({
      query: ({ page = 1, limit = 15 }) =>
        `/user/all?page=${page}&limit=${limit}`,
      providesTags: ["users"],
    }),

    user: builder.query({
      query: (userId) => `/user/single-user/${userId}`,
    }),

    updateUser: builder.mutation({
      query: ({ data, userId }) => ({
        url: `/user/update/${userId}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["users"],
    }),
  }),
});

export const {
  useDeleteUserMutation,
  useUserLoginMutation,
  useOtpVerificationMutation,
  useMyProfileQuery,
  useProfileUpdateMutation,
  useUsersQuery,
  useUserQuery,
  useUpdateUserMutation,
} = userApi;

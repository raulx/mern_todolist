import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { nanoid } from "@reduxjs/toolkit";
export const USERS_URL = "/api/users";
// FOR DEV ONLY
const pause = (duration) => {
  return new Promise((resolve) => {
    setTimeout(resolve, duration);
  });
};
const userApi = createApi({
  reducerPath: "user",

  baseQuery: fetchBaseQuery({
    baseUrl: "",
    fetchFn: async (...args) => {
      await pause(1000);
      return fetch(...args);
    },
  }),

  endpoints(builder) {
    return {
      deleteItem: builder.mutation({
        invalidatesTags: () => {
          return [{ type: "getusers" }];
        },
        query: (id) => {
          return {
            url: `${USERS_URL}/profile/delete`,
            method: "DELETE",
            body: { id: id },
          };
        },
      }),
      addItem: builder.mutation({
        invalidatesTags: () => {
          return [{ type: "getusers" }];
        },
        query: (data) => {
          return {
            url: `${USERS_URL}/profile/add`,
            method: "POST",
            body: {
              id: nanoid(),
              item: data,
            },
          };
        },
      }),

      getUser: builder.query({
        providesTags: () => {
          return [{ type: "getusers" }];
        },
        query: () => {
          return {
            url: `${USERS_URL}/profile`,
            method: "GET",
          };
        },
      }),
      updateUser: builder.mutation({
        invalidatesTags: () => {
          return [{ type: "getusers" }];
        },
        query: (data) => {
          return {
            url: `${USERS_URL}/profile`,
            method: "PUT",
            body: {
              ...data,
            },
          };
        },
      }),
      registerUser: builder.mutation({
        query: (data) => {
          return {
            url: `${USERS_URL}/register`,
            method: "POST",
            body: {
              name: data.name,
              email: data.email,
              password: data.password,
            },
          };
        },
      }),
      logOut: builder.mutation({
        query: () => {
          return {
            url: `${USERS_URL}/profile/logout`,
            method: "POST",
          };
        },
      }),
      logIn: builder.mutation({
        invalidatesTags: () => {
          return [{ type: "getusers" }];
        },
        query: (data) => {
          return {
            url: `${USERS_URL}/login`,
            method: "POST",
            body: {
              email: data.email,
              password: data.password,
            },
          };
        },
      }),
    };
  },
});

export const {
  useLogInMutation,
  useLogOutMutation,
  useRegisterUserMutation,
  useUpdateUserMutation,
  useGetUserQuery,
  useAddItemMutation,
  useDeleteItemMutation,
} = userApi;
export { userApi, pause };

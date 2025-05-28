/* eslint-disable @typescript-eslint/no-explicit-any */
import { Tags } from "../utils/tags";
import { apiSlice } from "./http";

export const category = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    createCategory: builder.mutation<
      any,
      { name: string; contactInfo: string }
    >({
      query: ({ name, contactInfo }) => ({
        url: `/category`,
        method: "POST",
        body: { name, contactInfo },
      }),
      invalidatesTags: [Tags.CATEGORY],
    }),
    getCategorys: builder.query<any, { search?: any }>({
      query: ({ search }) => ({
        url: `/category`,
        method: "GET",
        params: { ...search },
      }),
      providesTags: [Tags.CATEGORY],
    }),
    updateCategory: builder.mutation<
      any,
      { id: string; name: string; contactInfo: string }
    >({
      query: ({ id, name, contactInfo }) => ({
        url: `/category/${id}`,
        method: "PUT",
        body: { name, contactInfo },
      }),
      invalidatesTags: [Tags.CATEGORY],
    }),
    deleteCategory: builder.mutation<any, { id: string; version: string }>({
      query: ({ id, version }) => ({
        url: `/category/${id}?version=${version}`,
        method: "DELETE",
      }),
      invalidatesTags: [Tags.CATEGORY],
    }),
  }),
});

export const {
  useCreateCategoryMutation,
  useGetCategorysQuery,
  useUpdateCategoryMutation,
  useDeleteCategoryMutation,
} = category;

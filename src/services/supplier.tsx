/* eslint-disable @typescript-eslint/no-explicit-any */
import { Plan } from "../enum/plan";
import { Tags } from "../utils/tags";
import { apiSlice } from "./http";

export const supplier = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    createSupplier: builder.mutation<
      any,
      { name: string; contactInfo: string }
    >({
      query: ({ name, contactInfo }) => ({
        url: `/supplier`,
        method: "POST",
        body: { name, contactInfo },
      }),
      invalidatesTags: [Tags.SUPPLIER],
    }),
    getSuppliers: builder.query<any, { search?: any }>({
      query: ({ search }) => ({
        url: `/supplier`,
        method: "GET",
        params: { ...search },
      }),
      providesTags: [Tags.SUPPLIER],
    }),
    updateSupplier: builder.mutation<
      any,
      { id: string; name: string; contactInfo: string }
    >({
      query: ({ id, name, contactInfo }) => ({
        url: `/supplier/${id}`,
        method: "PUT",
        body: { name, contactInfo },
      }),
      invalidatesTags: [Tags.SUPPLIER],
    }),
    deleteSupplier: builder.mutation<any, { id: string; version: string }>({
      query: ({ id, version }) => ({
        url: `/supplier/${id}?version=${version}`,
        method: "DELETE",
      }),
      invalidatesTags: [Tags.SUPPLIER],
    }),
  }),
});

export const {
  useCreateSupplierMutation,
  useGetSuppliersQuery,
  useUpdateSupplierMutation,
  useDeleteSupplierMutation,
} = supplier;

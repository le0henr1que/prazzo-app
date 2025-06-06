/* eslint-disable @typescript-eslint/no-explicit-any */
import { Tags } from "../utils/tags";
import { apiSlice } from "./http";

export interface CreateBatch {
  unique_price?: string | number;
  category_id?: string;
  product_id?: string;
  quantity?: number;
  batchCode: string;
  expires_at?: string | Date;
  supplier_id?: string;
  version?: number;
  status?: string;
  productName: string;
  productCode: string;
  productPrice?: string;
  productSupplier?: string;
  productBatch?: string;
  productQtdItems?: number;
  productCategory?: string;
  productValidate?: any;
  productPlace?: string;
  productImage?: string;
  imageUrl?: string;
}

export const batch = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    createBatch: builder.mutation<any, CreateBatch>({
      query: (body) => ({
        url: `/batch`,
        method: "POST",
        body,
      }),
      invalidatesTags: [Tags.BATCH, Tags.ORGANIZATION],
    }),
    getBatchs: builder.query<any, { search?: any }>({
      query: ({ search }) => ({
        url: `/batch`,
        method: "GET",
        params: { ...search },
      }),
      providesTags: [Tags.BATCH],
    }),
    updateBatch: builder.mutation<
      any,
      { id: string; name: string; contactInfo: string }
    >({
      query: ({ id, name, contactInfo }) => ({
        url: `/batch/${id}`,
        method: "PUT",
        body: { name, contactInfo },
      }),
      invalidatesTags: [Tags.BATCH],
    }),
    deleteBatch: builder.mutation<any, { id: string; version: string }>({
      query: ({ id, version }) => ({
        url: `/batch/${id}?version=${version}`,
        method: "DELETE",
      }),
      invalidatesTags: [Tags.BATCH],
    }),
  }),
});

export const {
  useCreateBatchMutation,
  useGetBatchsQuery,
  useUpdateBatchMutation,
  useDeleteBatchMutation,
} = batch;

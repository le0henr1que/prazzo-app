/* eslint-disable @typescript-eslint/no-explicit-any */
import { Plan } from "../enum/plan";
import { Tags } from "../utils/tags";
import { apiSlice } from "./http";

export const productInformation = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getProduct: builder.query<any, { barCode: Plan }>({
      query: ({ barCode }) => ({
        url: `/product/bar-code/${barCode}`,
        method: "GET",
      }),
      providesTags: [Tags.PRODUCT],
    }),
    getOneProduct: builder.query<any, { id: string }>({
      query: ({ id }) => ({
        url: `/product/${id}`,
        method: "GET",
      }),
      providesTags: [Tags.PRODUCT],
    }),
  }),
});

export const { useGetProductQuery, useGetOneProductQuery } = productInformation;

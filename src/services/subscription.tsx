/* eslint-disable @typescript-eslint/no-explicit-any */
import { Tags } from "../utils/tags";
import { apiSlice } from "./http";

export const subscriptionInformation = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    subscription: builder.query<any, { sub_id: string }>({
      query: ({ sub_id }) => ({
        url: `/subscription/${sub_id}`,
        method: "GET",
      }),
      providesTags: [Tags.SUBSCRIPTION],
    }),
    createPaymentRequest: builder.mutation<
      any,
      { googlePlanId: string; paymentToken: string }
    >({
      query: ({ googlePlanId, paymentToken }) => ({
        url: `/subscription/verify`,
        method: "POST",
        body: {
          googlePlanId,
          paymentToken,
        },
      }),
      invalidatesTags: Object.values(Tags),
    }),
    cancelPlan: builder.mutation<
      any,
      { googlePlanId: string; paymentToken: string }
    >({
      query: ({ googlePlanId, paymentToken }) => ({
        url: `/subscription/status`,
        method: "POST",
        body: {
          googlePlanId,
          paymentToken,
        },
      }),
      invalidatesTags: Object.values(Tags),
    }),
  }),
});

export const {
  useSubscriptionQuery,
  useCreatePaymentRequestMutation,
  useCancelPlanMutation,
} = subscriptionInformation;

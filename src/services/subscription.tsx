/* eslint-disable @typescript-eslint/no-explicit-any */
import { Tags } from "../utils/tags";
import { apiSlice } from "./http";

export const subscriptionInformation = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    subscription: builder.query<any, { sub_id: string }>({
      query: ({ sub_id }) => ({
        url: `/subscriptions/${sub_id}`,
        method: "GET",
      }),
      providesTags: [Tags.SUBSCRIPTION],
    }),
  }),
});

export const { useSubscriptionQuery } = subscriptionInformation;

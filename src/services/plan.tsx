/* eslint-disable @typescript-eslint/no-explicit-any */
import { Plan } from "../enum/plan";
import { Tags } from "../utils/tags";
import { apiSlice } from "./http";

export const subscriptionInformation = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    choosePlan: builder.mutation<any, { plan: Plan }>({
      query: ({ plan }) => ({
        url: `/plan/choose?plan=${plan}`,
        method: "POST",
      }),
      invalidatesTags: [Tags.PLAN, Tags.USER],
    }),
  }),
});

export const { useChoosePlanMutation } = subscriptionInformation;

/* eslint-disable @typescript-eslint/no-explicit-any */
import { Tags } from "../utils/tags";
import { apiSlice } from "./http";

export const notificationInformation = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    saveFcmToken: builder.mutation<any, any>({
      query: (body) => ({
        url: `/notifications/fcm-token`,
        method: "POST",
        body,
      }),
      invalidatesTags: [Tags.ORGANIZATION],
    }),
  }),
});

export const { useSaveFcmTokenMutation } = notificationInformation;

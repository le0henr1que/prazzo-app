/* eslint-disable @typescript-eslint/no-explicit-any */
import { Tags } from "../utils/tags";
import { apiSlice } from "./http";

export const organizationInformation = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getOrganizations: builder.query<any, any>({
      query: () => ({
        url: `/organization`,
        method: "GET",
      }),
      providesTags: [Tags.ORGANIZATION],
    }),
    getOneOrganization: builder.query<any, { id: string }>({
      query: ({ id }) => ({
        url: `/organization/${id}`,
        method: "GET",
      }),
      providesTags: [Tags.ORGANIZATION],
    }),
    createOrganization: builder.mutation<any, any>({
      query: (body) => ({
        url: `/organization/inside`,
        method: "POST",
        body,
      }),
      invalidatesTags: [Tags.ORGANIZATION],
    }),
    switchOrganization: builder.mutation<any, { id: string }>({
      query: ({ id }) => ({
        url: `/organization/switch/${id}`,
        method: "POST",
      }),
      invalidatesTags: [Tags.ORGANIZATION, Tags.USER, Tags.PRODUCT, Tags.BATCH],
    }),
  }),
});

export const {
  useGetOneOrganizationQuery,
  useGetOrganizationsQuery,
  useCreateOrganizationMutation,
  useSwitchOrganizationMutation,
  useLazyGetOneOrganizationQuery, // adicione esta linha
} = organizationInformation;

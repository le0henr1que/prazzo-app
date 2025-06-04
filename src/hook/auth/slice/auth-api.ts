import { loginSlice } from "../../../services/http";
import { Tags } from "../../../utils/tags";

export const authApi = loginSlice.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (credentials: { email: string; password: string }) => ({
        url: "/auth/login",
        method: "POST",
        body: credentials,
      }),
    }),
    socialLogin: builder.mutation({
      query: (credentials: { accessToken: string; provider: string }) => ({
        url: "/auth/social-login",
        method: "POST",
        body: credentials,
      }),
    }),
    forgotPassword: builder.mutation({
      query: (body: { email: string; userBeingEditedId: string }) => ({
        url: "/auth/forgot/password",
        method: "POST",
        body: body,
      }),
    }),
    recoveryPassword: builder.mutation({
      query: (body: { newPassword: string; accessToken: string }) => ({
        url: "/auth/recovery/password",
        method: "PATCH",
        body: body,
      }),
    }),
    codeCheck: builder.mutation({
      query: (body: { email: string; password: string; name: string }) => ({
        url: "/auth/code-check",
        method: "POST",
        body: body,
      }),
    }),
    verify: builder.mutation({
      query: (body: { email: string; token: string }) => ({
        url: "/auth/verify-code",
        method: "POST",
        body: body,
      }),
    }),
    verifyByPassword: builder.mutation({
      query: (body: { email: string; token: string }) => ({
        url: "/auth/verify-code/password",
        method: "POST",
        body: body,
      }),
    }),
    register: builder.mutation({
      query: (body: {
        access_token: string;
        isNotification: boolean;
        notificationInterval: string;
        organization_name: string;
      }) => ({
        url: "/auth/register",
        method: "POST",
        body: body,
      }),
      invalidatesTags: [Tags.ORGANIZATION, Tags.USER, Tags.PRODUCT, Tags.BATCH],
    }),
    refetchToken: builder.mutation<any, { token: string }>({
      query: ({ token }) => ({
        url: "/auth/refresh",
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }),
    }),
  }),

  overrideExisting: true,
});

export const {
  useLoginMutation,
  useSocialLoginMutation,
  useCodeCheckMutation,
  useForgotPasswordMutation,
  useRecoveryPasswordMutation,
  useVerifyMutation,
  useRegisterMutation,
  useVerifyByPasswordMutation,
  useRefetchTokenMutation,
} = authApi;

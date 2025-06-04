/* eslint-disable @typescript-eslint/no-explicit-any */
import { Tags } from "../utils/tags";
import { IFileCreate } from "./file";
import { apiSlice } from "./http";

interface IUserParams {
  search: string;
  orderBy: string;
  perPage: number;
  meta: {
    page: number;
  };
}

interface IUserUpdateParam {
  id: string;
  name: string;
  whatsapp_number: string;
  phone_number: string;
  version: number;
}

interface ModifyPasswordWithOld {
  oldPassword: string;
  newPassword: string;
}

export const userInformations = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    me: builder.query<any, void>({
      query: () => ({
        url: "/auth/me",
        method: "GET",
      }),
      providesTags: [Tags.USER],
    }),
    updateUser: builder.mutation<any, any>({
      query: (params: IUserUpdateParam) => {
        console.log("Params being sent to API:", params); // Adicione este log para depuração
        return {
          url: `/user/${params?.id}`,
          method: "PUT",
          body: {
            name: params?.name,
            whatsapp_number: params?.whatsapp_number,
            phone_number: params?.phone_number,
            version: params?.version,
          },
        };
      },
      invalidatesTags: [Tags.USER], // Corrigido para fora do query
    }),
    modifyPassword: builder.mutation<any, any>({
      query: (params: ModifyPasswordWithOld) => {
        console.log("Params being sent to API:", params);
        return {
          url: `/auth/modify/password`,
          method: "PUT",
          body: {
            oldPassword: params?.oldPassword,
            newPassword: params?.newPassword,
          },
        };
      },
      invalidatesTags: [Tags.USER],
    }),
    uploadUserFile: builder.mutation<any, any>({
      query: (file: IFileCreate) => {
        const formData = new FormData();
        formData.append("file", file.file);
        return {
          url: `/user/avatar`,
          method: "PUT",
          body: formData,
        };
      },
      invalidatesTags: [Tags.USER],
    }),
  }),
});

export const {
  useMeQuery,
  useUpdateUserMutation,
  useModifyPasswordMutation,
  useUploadUserFileMutation,
  useLazyMeQuery,
} = userInformations;

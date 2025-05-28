/* eslint-disable @typescript-eslint/no-explicit-any */

import { Tags } from "../utils/tags";
import { apiSlice } from "./http";

interface SignedUrlParams {
  id: string;
  ResponseContentDisposition?: string;
  ContentType?: string;
}

export interface IFileCreate {
  entity_name: string;
  entity_id: any;
  file: File;
}

export interface IFile {
  entity_name: string;
  entity_id: number | string;
  file_type: string;
  s3_path: string;
}

export const fileInformations = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    uploadFile: builder.mutation<any, any>({
      query: (file: IFileCreate) => {
        const formData = new FormData();
        formData.append("file", file.file);
        return {
          url: `/file/${file?.entity_name}/upload/${file?.entity_id}`,
          method: "POST",
          body: formData,
        };
      },
      invalidatesTags: [Tags.FILE],
    }),
    getFiles: builder.query<any, { entity_name: string; id: string }>({
      query: (filters: { entity_name: string; id: string }) => {
        const params = new URLSearchParams(
          filters as unknown as Record<string, string>
        );

        return {
          url: `/file/${filters?.entity_name}?${params.toString()}`,
          method: "GET",
        };
      },
      providesTags: [Tags.FILE],
    }),
    signedUrl: builder.mutation<{ url: string }, SignedUrlParams>({
      query: ({ id, ResponseContentDisposition, ContentType }) => {
        return {
          url: `/file/signed/${id}?`,
          method: "POST",
          headers: {
            ...(ResponseContentDisposition && {
              "Content-Disposition": ResponseContentDisposition,
            }),
            ...(ContentType && {
              "Content-Type": ContentType,
            }),
          },
        };
      },
      invalidatesTags: [],
    }),
  }),
  overrideExisting: true,
});

export const { useUploadFileMutation, useGetFilesQuery, useSignedUrlMutation } =
  fileInformations;

export const {
  endpoints: {
    uploadFile: { select: selectUploadFile },
    getFiles: { select: selectGetFiles },
    signedUrl: { select: selectSignedUrl },
  },
} = fileInformations;

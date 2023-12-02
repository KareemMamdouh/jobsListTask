import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
interface Jobs {
  id: number;
  title: string;
}

export const api = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:3003" }),
  tagTypes: ["jobs"],
  endpoints: (builder) => ({
    getJobs: builder.query<Jobs[], {title:string}>({
      query: (params) => ({
        url: `/jobs`,
        method: "GET",
        params
      }),
      providesTags: ["jobs"],
    }),
    deleteJob: builder.mutation<Jobs[], number>({
      query: (id) => ({
        url: `/jobs/${id}`,
        method: "Delete",
      }),
      invalidatesTags: ["jobs"],
    }),
  }),
});

export const { useGetJobsQuery, useDeleteJobMutation } = api;

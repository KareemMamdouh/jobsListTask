import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { JobResponse, Job } from "/pages/api/jobs";
export interface JobRequest {
  title: string;
  countries: string[];
  cities: string[];
  sectors: string[];
  page: string;
  perPage: string;
}
export const api = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({ baseUrl: "/api" }),
  tagTypes: ["jobs"],
  endpoints: (builder) => ({
    getJobs: builder.query<JobResponse, JobRequest>({
      query: (params) => ({
        url: `/jobs`,
        method: "GET",
        params: {
          title: params.title ? params.title : undefined,
          countries:
            params.countries.length > 0
              ? params.countries.join(",")
              : undefined,
          sectors:
            params.sectors.length > 0 ? params.sectors.join(",") : undefined,
          cities:
            params.cities.length > 0 ? params.cities.join(",") : undefined,
          page: params.page,
          perPage: params.perPage,
        },
      }),
      providesTags: ["jobs"],
    }),
    deleteJob: builder.mutation<boolean, string>({
      query: (id) => ({
        url: `/jobs?id=${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["jobs"],
    }),
    postJob: builder.mutation<boolean, Job>({
      query: (body) => ({
        url: `/jobs`,
        method: "POST",
        body: body,
      }),
      invalidatesTags: ["jobs"],
    }),
    putJob: builder.mutation<boolean, Job>({
      query: (body) => ({
        url: `/jobs`,
        method: "PUT",
        body: body,
      }),
      invalidatesTags: ["jobs"],
    }),
  }),
});

export const {
  useGetJobsQuery,
  useDeleteJobMutation,
  usePostJobMutation,
  usePutJobMutation,
} = api;

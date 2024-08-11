import {MATRIMONIAL_URL, UPLOAD_URL} from '../constants';
import { apiSlice } from './apiSlice';

export const matrimonialProfileApiSlice = apiSlice.injectEndpoints({
  endpoints: builder => ({
    getMatrimonialProfile: builder.query({
      query: ({ limit, skip, isMyPanel }) => ({
        url: MATRIMONIAL_URL,
        params: { limit, skip, isMyPanel }
      }),
      providesTags: ['MatrimonialHomePage']
    }),
    getMatrimonialProfileDetails: builder.query({
      query: matrimonialProfileId => ({
        url: `${MATRIMONIAL_URL}/${matrimonialProfileId}`
      }),
      providesTags: ['MatrimonialProfile']
    }),
    createMatrimonialProfile: builder.mutation({
      query: matrimonialProfileData => ({
        url: MATRIMONIAL_URL,
        method: 'POST',
        body: matrimonialProfileData
      }),
      invalidatesTags: ['MatrimonialProfile']
    }),
    updateMatrimonialProfile: builder.mutation({
      query: ({ matrimonialProfileId, ...matrimonialProfileData }) => ({
        url: `${MATRIMONIAL_URL}/${matrimonialProfileId}`,
        method: 'PUT',
        body: { ...matrimonialProfileData }
      }),
      invalidatesTags: ['MatrimonialProfile']
    }),
    deleteMatrimonialProfile: builder.mutation({
      query: matrimonialProfileId => ({
        url: `${MATRIMONIAL_URL}/${matrimonialProfileId}`,
        method: 'DELETE'
      }),
      invalidatesTags: ['MatrimonialProfile']
    }),
    uploadMatrimonialProfileImage: builder.mutation({
      query: data => ({
        url: UPLOAD_URL,
        method: 'POST',
        body: data
      }),
      invalidatesTags: ['MatrimonialProfile']
    }),
  })
});

export const {
  useGetMatrimonialProfileQuery,
  useGetTopMatrimonialProfileQuery,
  useGetMatrimonialProfileDetailsQuery,
  useCreateMatrimonialProfileMutation,
  useUpdateMatrimonialProfileMutation,
  useDeleteMatrimonialProfileMutation,
  useUploadMatrimonialProfileImageMutation
} = matrimonialProfileApiSlice;

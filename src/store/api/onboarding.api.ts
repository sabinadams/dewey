import { createApi } from '@reduxjs/toolkit/query/react';
import { tauriBaseQuery } from './base';

export const onboardingApi = createApi({
  reducerPath: 'onboardingApi',
  baseQuery: tauriBaseQuery,
  tagTypes: ['Onboarding'],
  endpoints: (builder) => ({
    shouldRunOnboarding: builder.query<boolean, void>({
      query: () => ({
        command: 'should_run_onboarding',
      }),
      providesTags: ['Onboarding'],
    }),
    storeOnboarding: builder.mutation<void, boolean>({
      query: (hasCompleted) => ({
        command: 'store_onboarding',
        args: { hasCompleted },
      }),
      invalidatesTags: ['Onboarding'],
    }),
  }),
});

export const { useShouldRunOnboardingQuery, useStoreOnboardingMutation } = onboardingApi;
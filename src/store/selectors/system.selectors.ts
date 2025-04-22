import { RootState } from '../index';
import { createSelector } from '@reduxjs/toolkit';

export const selectSystemState = (state: RootState) => state.system;

export const selectIsMac = createSelector(
    selectSystemState,
    (systemState) => systemState.isMac
);

export const selectSystemLoading = createSelector(
    selectSystemState,
    (systemState) => systemState.isLoading
);

export const selectSystemError = createSelector(
    selectSystemState,
    (systemState) => systemState.error
); 
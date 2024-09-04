/* eslint-disable max-len */

import { AppThunkAction } from '@/store/types';
import Import from '@/store/import/types';
import { ImportActions, initialState } from './slice';

const SESSION_STORAGE_KEY_IMPORT_FILES = 'import_files';

export const updateImportFilesAction =
    (payload: Import.Redux.UpdateFilesPayload): AppThunkAction =>
        (dispatch, getState) => {
            const state = getState().import;
            const processor_files = state.files_map[state.category_id] || {};
            const files = processor_files.files || {};
            const required_file = files[payload.required_file.id] || [];
            const new_files = [...required_file, ...payload.files];

            const files_map = {
                ...state.files_map,
                [state.category_id]: {
                    files: {
                        ...files,
                        [payload.required_file.id]: new_files
                    }
                }
            };

            dispatch(ImportActions.UpdateFiles(files_map));
            sessionStorage.setItem(SESSION_STORAGE_KEY_IMPORT_FILES, JSON.stringify(files_map));
        };

export const deleteImportFileAction =
    (payload: Import.Redux.DeleteFilePayload): AppThunkAction =>
        (dispatch, getState) => {
            const {
                file_path,
                required_file: { id }
            } = payload;

            const state = getState().import;

            const updated_files = { ...state.files_map[state.category_id].files };

            if (updated_files[id]) {
                updated_files[id] = updated_files[id].filter((file) => file.file_path !== file_path);

                if (updated_files[id].length === 0) {
                    delete updated_files[id];
                }
            }

            const files_map = {
                ...state.files_map,
                [state.category_id]: {
                    files: updated_files
                }
            };

            dispatch(ImportActions.UpdateFiles(files_map));

            sessionStorage.setItem(SESSION_STORAGE_KEY_IMPORT_FILES, JSON.stringify(files_map));
        };

export const deleteImportFilesAction = (): AppThunkAction => (dispatch) => {
    dispatch(ImportActions.UpdateFiles(initialState.files_map));
    sessionStorage.removeItem(SESSION_STORAGE_KEY_IMPORT_FILES);
};

export const initialImportFilesState = (): AppThunkAction => (dispatch) => {
    const localStorageFiles = sessionStorage.getItem(SESSION_STORAGE_KEY_IMPORT_FILES);
    if (localStorageFiles) {
        dispatch(ImportActions.UpdateFiles(JSON.parse(localStorageFiles)));
    }
};

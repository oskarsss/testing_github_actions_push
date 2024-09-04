import { FileModel_MimeType } from '@proto/models/model_file';
import { PayloadAction, createSlice } from '@reduxjs/toolkit';

type File = {
    blobUrl: string;
    name: string;
    mimeType: FileModel_MimeType;
};

type InitialState = Record<string, File>;

const initialState: InitialState = {};

const filesSlice = createSlice({
    name    : 'files',
    initialState,
    reducers: {
        setFile(state, action: PayloadAction<{ fileId: string; file: File }>) {
            return {
                ...state,
                [action.payload.fileId]: action.payload.file
            };
        }
    }
});

export const filesReducer = filesSlice.reducer;
export const FilesActions = filesSlice.actions;

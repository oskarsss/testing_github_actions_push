/* eslint-disable max-len */
/* eslint-disable no-param-reassign */
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ListenReply_Notes } from '@proto/events_serv';
import NotesGrpcService, { NotesService } from '@/@grpcServices/services/notes.service';
import { RootState } from '@/pages/_app';
import getDeviceId from '@/utils/getDeviceId';
import Notes from './types';
import { api } from '../api';

type InitialState = {
    notesMap: {
        [key: string]: Notes.NoteType[];
    };
};

export const initialState: InitialState = {
    notesMap: {}
};

export const getNotesThunk = createAsyncThunk(
    'notes/getNotes',
    async (arg: { entityType: string; entityId: string }, api) => {
        const { app } = api.getState() as RootState;
        const meta = {
            Authorization: `Bearer ${app.token}`,
            company_id   : app.company_id
        };
        const localDeviceID = getDeviceId();
        const data = await NotesService.getNotes(
            {
                entityType: arg.entityType,
                entityId  : arg.entityId,
                deviceId  : localDeviceID || ''
            },
            { meta }
        );
        return data.response;
    }
);

const notesSlice = createSlice({
    name    : 'notes',
    initialState,
    reducers: {
        setInitialNotes: (
            state,
            action: PayloadAction<{
                notesList: Notes.NoteType[];
                entity: string;
            }>
        ) => {
            state.notesMap[action.payload.entity] = action.payload.notesList;
        },
        setNotes: (
            state,
            action: PayloadAction<{
                notesList: ListenReply_Notes['notes'];
            }>
        ) => {
            action.payload.notesList.forEach((note) => {
                if (!state.notesMap[note.entity]) return;
                const isExist = state.notesMap[note.entity].findIndex(
                    (n) => n.noteId === note.noteId
                );

                if (isExist === -1) {
                    state.notesMap[note.entity].push(note);
                }

                if (isExist !== -1) {
                    state.notesMap[note.entity][isExist] = note;
                }
            });
        }
    },

    extraReducers: (builder) => {
        builder.addCase(api.util.resetApiState, () => ({ ...initialState }));

        // builder.addMatcher(NotesGrpcService.endpoints.getNotes.matchFulfilled, (state, action) => {
        //     const key = `${action.meta.arg.originalArgs.entityType}_${action.meta.arg.originalArgs.entityId}`;
        //     state.notesMap[key] = action.payload.notes;
        // });

        builder.addCase(getNotesThunk.fulfilled, (state, action) => {
            const key = `${action.meta.arg.entityType}_${action.meta.arg.entityId}`;
            state.notesMap[key] = action.payload.notes;
        });
    }
});

export const NotesReducer = notesSlice.reducer;

export const NotesActions = notesSlice.actions;

import { NotesServiceClient } from '@proto/notes.client';
import {
    CreateNoteReply,
    CreateNoteRequest,
    DeleteNoteReply,
    DeleteNoteRequest,
    GetNotesReply,
    GetNotesRequest,
    UpdateNoteReply,
    UpdateNoteRequest
} from '@proto/notes';
import { handleRequest } from '@/store/api';
import { NotesActions } from '@/store/notes/slice';
import grpcTransport from '../grpcTransport';
import grpcAPI from '../api';
import { createPrivateQueryFn } from '../createQueryFn';

export const NotesService = new NotesServiceClient(grpcTransport);

const NotesGrpcService = grpcAPI.injectEndpoints({
    endpoints: ({
        query,
        mutation
    }) => ({
        createNote: mutation<CreateNoteReply, CreateNoteRequest>({
            queryFn: createPrivateQueryFn(NotesService, 'createNote')
        }),
        updateNote: mutation<UpdateNoteReply, UpdateNoteRequest>({
            queryFn: createPrivateQueryFn(NotesService, 'updateNote')
        }),
        deleteNote: mutation<DeleteNoteReply, DeleteNoteRequest>({
            queryFn: createPrivateQueryFn(NotesService, 'deleteNote'),
            onQueryStarted(arg, { queryFulfilled }) {
                handleRequest({
                    queryFulfilled,
                    loading: 'Deleting note',
                    success: 'Note was deleted'
                });
            }
        })
    }),
    overrideExisting: true
});

export default NotesGrpcService;

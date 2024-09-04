import React, { useContext } from 'react';
import Notes from '@/store/notes/types';
import { UsersMap } from '@/@core/components/notes/types';

export type NotesContextDefaultValue = {
    notes: Notes.NoteType[];
    usersMap: UsersMap;
    handleFileUpload: (files: File[] | FileList) => void;
    render_files: (Notes.File | File)[];
    files: Notes.File[];
    removeFile: (fileUrl: string) => void;
    isFileUploading: boolean;
    editedNote: Notes.NoteType | null;
    setEditedNote: (note: Notes.NoteType | null) => void;
    setFiles: React.Dispatch<React.SetStateAction<Notes.File[]>>;
    tabValue: Notes.Tabs;
    entityType: string;
    wheelPropagation?: boolean;
};

export const NotesContext = React.createContext<NotesContextDefaultValue>({
    notes           : [],
    usersMap        : {} as UsersMap,
    handleFileUpload: () => {},
    render_files    : [],
    files           : [],
    removeFile      : () => {},
    isFileUploading : false,
    editedNote      : null,
    setEditedNote   : () => {},
    setFiles        : () => {},
    tabValue        : 'general',
    entityType      : '',
    wheelPropagation: false
});

export function useNotesContext() {
    return useContext(NotesContext);
}

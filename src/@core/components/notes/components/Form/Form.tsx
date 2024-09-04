import React, { useEffect, useRef } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { Divider, FormControl } from '@mui/material';
import Notes from '@/store/notes/types';
import {
    FileInput,
    FormWrapper,
    TextFiled
} from '@/@core/components/notes/components/Form/Form.styled';
import { applyTestId } from '@/configs/tests';
import { ACCEPT_FILES_CONFIG } from '@/@core/components/notes/accept_files_config';
import NotesGrpcService from '@/@grpcServices/services/notes.service';
import type { IntlMessageKey } from '@/@types/next-intl';
import { useAppTranslation } from '@/hooks/useAppTranslation';
import { NOTE_ENTITY_TYPE } from '@/models/notes/note-entity-type';
import { useNotesContext } from '../../NotesContext';
import FormComponents from './FormComponents';

const acceptFileTypes = Object.keys(ACCEPT_FILES_CONFIG).join(', ');

const schema = yup.object().shape({
    note: yup.string().min(0).max(5000)
        .defined()
});

type DefaultValues = {
    note: string;
};

type Props = {
    entity_id: string;
    placeholder: IntlMessageKey;
    onClose?: () => void;
    messageTestId: string;
    messageBoxTestId: string;
    leaveNoteTestId: string;
};

export const getEntityType = (
    entity_type: Notes.API.Note.Create.Request['entity_type'],
    isDriverTab: boolean
) => {
    switch (entity_type) {
    case NOTE_ENTITY_TYPE.LOAD:
        if (isDriverTab) {
            return NOTE_ENTITY_TYPE.LOAD_DRIVER;
        }
        return entity_type;
    case NOTE_ENTITY_TYPE.MANIFEST: {
        if (isDriverTab) {
            return NOTE_ENTITY_TYPE.MANIFEST_DRIVER;
        }
        return entity_type;
    }
    default:
        return entity_type;
    }
};

export default function Form({
    entity_id,
    placeholder,
    onClose,
    messageTestId,
    messageBoxTestId,
    leaveNoteTestId
}: Props) {
    const f_upload = useRef<HTMLInputElement | null>(null);
    const {
        files,
        setFiles,
        render_files,
        handleFileUpload,
        removeFile,
        editedNote,
        setEditedNote,
        isFileUploading,
        entityType
    } = useNotesContext();

    const [createNote, { isLoading: isSendingNote }] = NotesGrpcService.useCreateNoteMutation();
    const [updateNote, { isLoading: isUpdating }] = NotesGrpcService.useUpdateNoteMutation();
    const { t } = useAppTranslation();

    const {
        control,
        reset,
        handleSubmit,
        formState: { isDirty }
    } = useForm<DefaultValues>({
        defaultValues: { note: '' },
        resolver     : yupResolver<DefaultValues>(schema)
    });

    useEffect(() => {
        reset();
    }, [entity_id]);

    useEffect(() => {
        if (editedNote) {
            reset({
                note: editedNote.body
            });

            setFiles(editedNote.files as React.SetStateAction<Notes.File[]>);
        }
    }, [editedNote]);

    const resetForm = () => {
        reset({
            note: ''
        });
        setFiles([]);
    };

    const onSubmit = async (data: DefaultValues) => {
        if (!data.note.trim() && !files.length) return;
        if (editedNote) {
            await updateNote({
                body  : data.note,
                noteId: editedNote.noteId,
                files
            });
            setEditedNote(null);
        } else {
            await createNote({
                body    : data.note,
                entityId: entity_id,
                entityType,
                files
            });
        }
        resetForm();

        if (onClose) {
            onClose();
        }
    };
    const onClickAttachFile = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        f_upload.current?.click();
        event.stopPropagation();
    };

    const handleKeyDown = (event: React.KeyboardEvent) => {
        event.stopPropagation();

        if (event.code === 'Enter' && event.shiftKey) {
            return;
        }

        if (event.code === 'Enter') {
            event.preventDefault();
            handleSubmit(onSubmit)();
            resetForm();
        }
    };

    const onUploadFile = (event: React.ChangeEvent<HTMLInputElement>) => {
        event.stopPropagation();
        if (!event.target.files) return;
        handleFileUpload(event.target.files);
    };

    const disabledBSubmitButton =
        isSendingNote || isUpdating || (!isDirty && !files.length) || isFileUploading;

    const renderActions = () => (
        <FormComponents.ActionsWrapper size="small">
            <FormComponents.SendButton
                onClick={handleSubmit(onSubmit)}
                disabled={disabledBSubmitButton}
                editedNote={editedNote}
                size="small"
                testID={leaveNoteTestId}
            />
            {editedNote && (
                <FormComponents.CancelButton
                    onCancel={() => {
                        setEditedNote(null);
                        resetForm();
                    }}
                    size="small"
                />
            )}
        </FormComponents.ActionsWrapper>
    );

    return (
        <FormControl
            fullWidth
            sx={{
                padding: '10px'
            }}
        >
            <FileInput
                type="file"
                name="file"
                multiple
                value=""
                accept={acceptFileTypes}
                ref={(fileUpload) => {
                    f_upload.current = fileUpload;
                }}
                onChange={onUploadFile}
                {...applyTestId(messageTestId)}
            />
            <FormWrapper
                size="small"
                onKeyDown={handleKeyDown}
            >
                {(files.length > 0 || render_files.length > 0) && (
                    <FormComponents.FilesWrapper>
                        {render_files.map((file) => (
                            <FormComponents.FileItem
                                title={file.name}
                                size="small"
                                key={file.name}
                                loading={'lastModified' in file}
                                style={{ minHeight: '30px' }}
                                onDelete={'url' in file ? () => removeFile(file.url) : undefined}
                            />
                        ))}
                        <Divider />
                    </FormComponents.FilesWrapper>
                )}
                <Controller
                    name="note"
                    control={control}
                    render={({ field: {
                        value,
                        onChange
                    } }) => (
                        <TextFiled
                            maxRows={3}
                            onChange={onChange}
                            fullWidth
                            multiline
                            value={value}
                            autoComplete="off"
                            notesSize="small"
                            size="small"
                            placeholder={t(placeholder)}
                            onKeyDown={handleKeyDown}
                            InputProps={{
                                ...applyTestId(messageBoxTestId),
                                sx: {
                                    padding   : '0',
                                    gap       : '4px',
                                    fontSize  : '14px',
                                    lineHeight: '24px'
                                },
                                endAdornment  : renderActions(),
                                startAdornment: (
                                    <FormComponents.AttachFileButton onClick={onClickAttachFile} />
                                )
                            }}
                        />
                    )}
                />
            </FormWrapper>
        </FormControl>
    );
}

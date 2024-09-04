import NoteBodyContent from '@/@core/components/notes/components/AllNotes/components/NoteBodyContent';
import File from '@/@core/components/notes/components/AllNotes/components/File';
import {
    NoteHiddenTime,
    NoteVisibleTime
} from '@/@core/components/notes/components/AllNotes/AllNotes.styled';
import { formatDate } from '@/@core/components/notes/components/AllNotes/utils';
import CheckSharpIcon from '@mui/icons-material/CheckSharp';
import VectorIcons from '@/@core/icons/vector_icons';
import Stack from '@mui/material/Stack';
import ImageContent from '@/@core/ui-kits/basic/image-content/ImageContent';
import PDFContent from '@/@core/ui-kits/basic/pdf-content/PDFContent';
import { useAccountCompanies } from '@/store/app/hooks';
import { useLazyRetrieveFileStream } from '@/@grpcServices/services/app-sevices/storage-service/store-service-hooks';
import { FileModel_MimeType } from '@proto/models/model_file';
import Preloader from '@/@core/ui-kits/basic/preloader/Preloader';
import React, { useEffect, useMemo, useRef } from 'react';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { FilesActions } from '@/store/files/slice';
import { useTheme } from '@mui/material/styles';
import isImage from '@/utils/is-image';
import { useAppTranslation } from '@/hooks/useAppTranslation';
import { NoteModel_Note_File } from '@proto/models/model_note';

type Props = {
    file: NoteModel_Note_File;
    createdAt: string;
    read: boolean;
    delivered: boolean;
    size: 'small' | 'normal';
    isEditableNote: boolean;
    fullRounded: boolean;
    onContextMenu?: (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
};

export default function FileWrapper({
    file,
    createdAt,
    read,
    delivered,
    size,
    isEditableNote,
    fullRounded,
    onContextMenu
}: Props) {
    const { timezone } = useAccountCompanies();
    const dispatch = useAppDispatch();
    const { palette } = useTheme();
    const { t } = useAppTranslation();
    const storeFiles = useAppSelector((state) => state.files);

    const data = useMemo(
        () => (file.url in storeFiles ? storeFiles[file.url] : undefined),
        [storeFiles, file.url]
    );

    const hasFile = !!data;

    const { retrieveFileStream } = useLazyRetrieveFileStream();
    const noteRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                if (entries[0].isIntersecting) {
                    if (hasFile) return;
                    retrieveFileStream(file.url).then((response) => {
                        dispatch(FilesActions.setFile({ fileId: file.url, file: response }));
                    });
                }
            },
            { threshold: 0.1 }
        );
        if (noteRef.current) {
            observer.observe(noteRef.current);
        }

        return () => {
            if (noteRef.current) {
                observer.unobserve(noteRef.current);
            }
        };
    }, [dispatch, file.url, retrieveFileStream, hasFile]);

    const noteTimeContent = (
        <>
            {formatDate(createdAt, timezone, t)}
            {delivered && !read && (
                <CheckSharpIcon
                    sx={{
                        fontSize: '14px',
                        color   : '#FFFFFF'
                    }}
                />
            )}
            {delivered && read && (
                <VectorIcons.DoubleCheck fill={isEditableNote ? '#FFFFFF' : '#555E6A'} />
            )}
        </>
    );

    return (
        <NoteBodyContent
            fullRounded={fullRounded}
            isEditableNote={isEditableNote}
            onContextMenu={onContextMenu}
            symmetricalPadding
            ref={noteRef}
        >
            {!data ? (
                <Stack
                    minWidth={150}
                    height={150}
                    flexGrow={1}
                    overflow="hidden"
                >
                    <Preloader
                        sx={{
                            '.MuiCircularProgress-root': {
                                color: isEditableNote
                                    ? palette.semantic.foreground.white.primary
                                    : undefined
                            }
                        }}
                    />
                </Stack>
            ) : (
                <>
                    {isImage(data.mimeType) && (
                        <Stack
                            direction="column"
                            flexGrow={1}
                            overflow="hidden"
                        >
                            <ImageContent
                                fullHeight
                                fullWidth
                                fit="contain"
                                fileName={file.name}
                                blobUrl={data.blobUrl}
                                isLoading={false}
                            />
                        </Stack>
                    )}

                    {data.mimeType === FileModel_MimeType.PDF && (
                        <Stack
                            direction="column"
                            flexGrow={1}
                            overflow="hidden"
                        >
                            <PDFContent
                                fileName={file.name}
                                blobUrl={data.blobUrl}
                                setUpScroll={size === 'small'}
                            />
                        </Stack>
                    )}
                </>
            )}

            <File
                size={size === 'small' ? 'small' : 'medium'}
                file={file}
                is_it_me={isEditableNote}
            />

            <NoteHiddenTime
                size={size}
                is_it_me={isEditableNote}
            >
                {noteTimeContent}
                <NoteVisibleTime>{noteTimeContent}</NoteVisibleTime>
            </NoteHiddenTime>
        </NoteBodyContent>
    );
}

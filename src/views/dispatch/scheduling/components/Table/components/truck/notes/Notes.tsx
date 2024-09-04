import { memo, MouseEvent, useEffect, useMemo, useRef } from 'react';
import StickyNote2 from '@mui/icons-material/StickyNote2';
import { formatTime, replaceFromString } from '@/@core/components/notes/components/AllNotes/utils';
import { Box } from '@mui/material';
import { useAccountCompanies } from '@/store/app/hooks';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { useAppTranslation } from '@/hooks/useAppTranslation';
import { useNotePopover } from '@/views/dispatch/scheduling/menus/NotePopover/NotePopover';
import {
    Button,
    NotesBody,
    NotesLength
} from '@/views/dispatch/scheduling/components/Table/components/truck/notes/styled';
import { getNotesThunk } from '@/store/notes/slice';

type Props = {
    truckId: string;
};

function Notes({ truckId }: Props) {
    const { t } = useAppTranslation();
    const dispatch = useAppDispatch();
    const noteRef = useRef<HTMLButtonElement | null>(null);

    const storeNotes = useAppSelector((state) => state.notes.notesMap[`truckdispatch_${truckId}`]);
    const isNotesNotLoaded = !storeNotes;

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                if (entries[0].isIntersecting) {
                    if (!isNotesNotLoaded) return;
                    dispatch(
                        getNotesThunk({
                            entityId  : truckId,
                            entityType: 'truckdispatch'
                        })
                    );
                }
            },
            { threshold: 0.1 }
        );

        if (noteRef.current && isNotesNotLoaded) {
            observer.observe(noteRef.current);
        }

        return () => {
            if (noteRef.current && isNotesNotLoaded) {
                observer.unobserve(noteRef.current);
            }
        };
    }, [truckId, dispatch, isNotesNotLoaded]);

    const notePopover = useNotePopover();
    const { timezone } = useAccountCompanies();

    const notes = useMemo(() => {
        if (!storeNotes) return [];
        return storeNotes
            .filter((note) => !note.deleted)
            .sort((a, b) => new Date(b.createdAt).valueOf() - new Date(a.createdAt).valueOf());
    }, [storeNotes]);

    const onClickNotesHandler = (event: MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
        event.stopPropagation();
        notePopover.open({
            truck_id: truckId || ''
        })(event);
    };

    return (
        <Button
            type="button"
            ref={noteRef}
            onClick={onClickNotesHandler}
        >
            {/* ---------------- ICON ---------------- */}
            <StickyNote2 />

            <NotesBody>
                {notes?.length !== 0 ? (
                    <>
                        {/* ---------------- DATE ---------------- */}
                        <span>{formatTime(notes[0]?.createdAt, timezone)}</span>

                        {/* ---------------- BODY ---------------- */}
                        {/* <div>{notesList[0].body}</div> */}
                        <Box
                            sx={{
                                overflow    : 'hidden',
                                textOverflow: 'ellipsis',
                                width       : '100%',
                                height      : '20px',
                                display     : 'flex',
                                alignItems  : 'center',
                                svg         : {
                                    marginRight: 0,
                                    width      : '15px',
                                    height     : '15px'
                                },
                                div: {
                                    height: '100%'
                                }
                            }}
                            dangerouslySetInnerHTML={{
                                __html: replaceFromString(notes[0].body)
                            }}
                        />

                        {/* ---------------- ADDED BY ---------------- */}
                        {/* TODO: add added_by field to notes */}
                        {/* <span>{notesList[0].added_by}</span> */}
                    </>
                ) : (
                    t('common:empty.no_message')
                )}
            </NotesBody>

            {/* ---------------- LENGTH NOTES ---------------- */}
            <NotesLength>{notes ? notes.length : 0}</NotesLength>
        </Button>
    );
}

export default memo(Notes);

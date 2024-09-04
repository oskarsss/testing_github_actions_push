import React, { Fragment, useEffect, useMemo, useRef } from 'react';
import Fade from '@mui/material/Fade';
import { usePermissions } from '@/store/app/hooks';
import {
    Container,
    PerfectScrollbar
} from '@/@core/components/notes/components/AllNotes/AllNotes.styled';
import { usePrevious } from '@/hooks/usePrevious';
import { useNotesContext } from '@/@core/components/notes/NotesContext';
import moment from 'moment-timezone';
import { Divider } from '@mui/material';
import { PERMISSIONS } from '@/models/permissions/permissions';
import { useAppTranslation } from '@/hooks/useAppTranslation';
import NoNotes from '../NoNotes/NoNotes';
import Note from './components/Note';
import TodayItem from './components/TodayItem';

type Props = {
    text_field_bottom?: boolean;
    size: 'small' | 'normal';
    EmptyNotes?: React.FC;
};

export default function AllNotes({
    text_field_bottom,
    size,
    EmptyNotes
}: Props) {
    const containerRef = useRef<HTMLElement | undefined>();
    const { hasPermission } = usePermissions();
    const hasDeletePermission = hasPermission(PERMISSIONS.DELETE_NOTES);
    const hasEditPermission = hasPermission(PERMISSIONS.EDIT_NOTES);
    const { t } = useAppTranslation();
    const {
        notes,
        wheelPropagation
    } = useNotesContext();

    const prevNotes = usePrevious({ notes });

    const goToLastMessage = () => {
        if (containerRef?.current) {
            if (text_field_bottom) {
                containerRef.current.scrollTop = containerRef.current.scrollHeight;
            } else {
                containerRef.current.scrollTop = 0;
            }
        }
    };
    useEffect(() => {
        if (notes && containerRef?.current) {
            if (prevNotes?.notes) {
                if (notes.length > prevNotes.notes.length) {
                    goToLastMessage();
                }
            } else {
                goToLastMessage();
            }
        }
    }, [notes.length]);

    const first_note_today = useMemo(() => {
        const notes_today = notes.filter((note) => {
            const today = moment().format('YYYY-MM-DD');
            const note_date = moment(note.createdAt).format('YYYY-MM-DD');
            return today === note_date;
        });

        if (!text_field_bottom) {
            return notes_today.at(-1);
        }
        return notes_today[0];
    }, [notes.length]);

    if (notes.length === 0) {
        if (EmptyNotes) {
            return <EmptyNotes />;
        }
        return <NoNotes />;
    }

    return (
        <Fade in>
            <Container>
                <PerfectScrollbar
                    containerRef={(ref) => {
                        containerRef.current = ref;
                    }}
                    style={{ paddingBottom: '8px' }}
                    options={{
                        wheelSpeed      : 1,
                        wheelPropagation: wheelPropagation || false,
                        suppressScrollX : true
                    }}
                >
                    {notes.map((item, i, arr) => {
                        const showNewLine =
                            moment().diff(item.createdAt, 'minutes') < 5 &&
                            moment().diff(arr[i - 1]?.createdAt, 'minutes') >= 5;
                        return (
                            <Fragment key={item.noteId}>
                                {showNewLine ? (
                                    <Divider
                                        orientation="horizontal"
                                        sx={{
                                            paddingTop         : '12px',
                                            color              : 'rgba(217, 45, 32, 1)',
                                            margin             : '0 12px 0 12px',
                                            fontWeight         : 600,
                                            '&:before, &:after': {
                                                backgroundColor: 'rgba(217, 45, 32, 1)',
                                                height         : '1.5px'
                                            }
                                        }}
                                        variant="middle"
                                    >
                                        {t('common:new')}
                                    </Divider>
                                ) : null}
                                {first_note_today?.noteId === item.noteId && text_field_bottom && (
                                    <TodayItem
                                        size={size}
                                        styles={{
                                            marginBottom: '6px !important',
                                            marginTop   : '9px !important'
                                        }}
                                    />
                                )}

                                <Note
                                    key={item.noteId}
                                    hasDeletePermission={hasDeletePermission}
                                    hasEditPermission={hasEditPermission}
                                    note={item}
                                    size={size}
                                    showAvatar={
                                        i === 0 ||
                                        arr[i - 1].userId !== item.userId ||
                                        arr[i - 1].driverId !== item.driverId
                                    }
                                />

                                {first_note_today?.noteId === item.noteId && !text_field_bottom && (
                                    <TodayItem
                                        size={size}
                                        styles={{ marginTop: '7px !important' }}
                                    />
                                )}
                            </Fragment>
                        );
                    })}
                </PerfectScrollbar>
            </Container>
        </Fade>
    );
}

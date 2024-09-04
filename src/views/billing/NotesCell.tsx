/* eslint-disable react/no-danger */
import { useNotesMenu } from '@/@core/components/notes/Notes';
import { replaceFromString } from '@/@core/components/notes/components/AllNotes/utils';
import { PAGE_ROW_HEIGHT_CONFIG } from '@/@core/components/table/TableEditor/components/TableView/components/PageRowHight/PageRowHeight';
import { Stack } from '@mui/material';
import React from 'react';
import { useAppTranslation } from '@/hooks/useAppTranslation';
import { NoteModel_EntityNote } from '@proto/models/model_note';
import { NOTE_ENTITY_TYPE } from '@/models/notes/note-entity-type';

type Props = {
    notes: NoteModel_EntityNote[];
    load_id: string;
    rowHeight: number;
    manifests: {
        manifestId: string;
        friendlyId: string | number;
        driverIds: string[];
    }[];
};

export default function NotesCell({
    notes,
    load_id,
    rowHeight,
    manifests
}: Props) {
    const notesMenu = useNotesMenu();
    const { t } = useAppTranslation('billing');

    const onClickCell = (e: any) =>
        notesMenu.open({
            entity_id  : load_id,
            entity_type: 'load',
            size       : 'small',
            variant    : 'menu',
            slots      : {
                tabs: {
                    props: {
                        sx: {
                            paddingX: '12px'
                        }
                    }
                }
            },
            chatsWithDrivers: manifests.map(
                (manifest) =>
                    ({
                        label: t('common:manifests.friendlyId', {
                            friendlyId: manifest.friendlyId
                        }),
                        entity_id  : manifest.manifestId,
                        entity_type: NOTE_ENTITY_TYPE.MANIFEST_DRIVER,
                        driverIds  : manifest.driverIds
                    } as const)
            )
        })(e);

    return (
        <Stack
            onClick={onClickCell}
            direction={rowHeight !== PAGE_ROW_HEIGHT_CONFIG.large ? 'row' : 'column'}
            padding={2}
            alignItems={rowHeight !== PAGE_ROW_HEIGHT_CONFIG.large ? 'center' : 'flex-start'}
        >
            {rowHeight === PAGE_ROW_HEIGHT_CONFIG.large && notes[0] && (
                <div
                    dangerouslySetInnerHTML={{
                        __html: replaceFromString(notes[0].body)
                    }}
                />
            )}

            <span
                style={{
                    fontWeight: 600,
                    marginLeft: rowHeight !== PAGE_ROW_HEIGHT_CONFIG.large ? '5px' : 0
                }}
            >
                {rowHeight === PAGE_ROW_HEIGHT_CONFIG.large
                    ? t('cell.notes.large', { count: notes.length })
                    : t('cell.notes.other', { count: notes.length })}
            </span>
        </Stack>
    );
}

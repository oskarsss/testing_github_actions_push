import Notes from '@/@core/components/notes/Notes';
import React, { useMemo } from 'react';
import { useAppTranslation } from '@/hooks/useAppTranslation';
import { NOTE_ENTITY_TYPE } from '@/models/notes/note-entity-type';

type Props = {
    loadId: string;
    manifests: {
        manifestId: string;
        friendlyId: string | number;
        driverIds: string[];
    }[];
};

const LoadNotes = ({
    loadId,
    manifests
}: Props) => {
    const { t } = useAppTranslation();
    const chatsWithDrivers = useMemo(
        () =>
            manifests.map(
                (manifest) =>
                    ({
                        label: t('common:manifests.friendlyId', {
                            friendlyId: manifest.friendlyId
                        }),
                        entity_id  : manifest.manifestId,
                        entity_type: NOTE_ENTITY_TYPE.MANIFEST_DRIVER,
                        driverIds  : manifest.driverIds
                    } as const)
            ),
        [manifests, t]
    );

    if (loadId === '') return null;
    return (
        <Notes
            entity_id={loadId}
            entity_type="load"
            chatsWithDrivers={chatsWithDrivers}
            placeholder="fields:note.placeholder_2"
            size="small"
            variant="filled"
            textFieldBottom
            isHideHeader
            slots={{
                container: {
                    props: {
                        sx: {
                            borderRadius : '8px',
                            background   : (theme) => theme.palette.semantic.background.white,
                            flex         : '1 1 0',
                            minWidth     : '360px',
                            paddingBottom: '10px'
                        }
                    }
                }
            }}
        />
    );
};

export default React.memo(LoadNotes);

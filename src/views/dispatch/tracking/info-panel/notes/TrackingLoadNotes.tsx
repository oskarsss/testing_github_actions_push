import { trackingSelectedOrderSelector } from '@/store/dispatch/tracking/selectors';
import { useAppSelector } from '@/store/hooks';
import React, { useMemo } from 'react';
import Notes from '@/@core/components/notes/Notes';
import { useAppTranslation } from '@/hooks/useAppTranslation';
import { NOTE_ENTITY_TYPE } from '@/models/notes/note-entity-type';

function TrackingLoadNotes() {
    const order = useAppSelector(trackingSelectedOrderSelector);
    const { t } = useAppTranslation();
    const chatsWithDrivers = useMemo(
        () =>
            order?.manifests.map(
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
        [order?.manifests, t]
    );

    if (!order?.loadId) return null;

    return (
        <Notes
            chatsWithDrivers={chatsWithDrivers}
            entity_id={order.loadId}
            entity_type="load"
            placeholder="fields:note.placeholder_2"
            size="small"
            variant="filled"
            textFieldBottom
            isHideHeader
            wheelPropagation
            slots={{
                container: {
                    props: {
                        sx: {
                            flex: 1.3,

                            overflow       : 'hidden',
                            backgroundColor: (theme) => theme.palette.semantic.background.white,
                            minHeight      : '700px',
                            maxHeight      : '700px',
                            height         : '100%',
                            paddingX       : '16px'
                        }
                    }
                }
            }}
        />
    );
}

export default React.memo(TrackingLoadNotes);

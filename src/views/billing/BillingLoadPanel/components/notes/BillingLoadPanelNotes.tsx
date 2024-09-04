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

function BillingLoadPanelNotes({
    loadId,
    manifests
}: Props) {
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

    return (
        <Notes
            entity_type="load"
            entity_id={loadId}
            chatsWithDrivers={chatsWithDrivers}
            size="small"
            variant="filled"
            textFieldBottom
            slots={{
                header: {
                    props: {
                        sxContainer: {
                            border        : 'none',
                            justifyContent: 'flex-start',
                            paddingLeft   : 0
                        }
                    }
                },
                container: {
                    props: {
                        sx: {
                            padding        : '6px 12px 6px 12px',
                            minHeight      : '700px',
                            maxHeight      : '700px',
                            flexGrow       : 2,
                            borderRadius   : '8px',
                            backgroundColor: (theme) => theme.palette.semantic.background.white
                        }
                    }
                }
            }}
        />
    );
}

export default React.memo(BillingLoadPanelNotes);

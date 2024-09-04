import Notes from '@/@core/components/notes/Notes';
import { memo, ReactElement, useMemo } from 'react';
import { useAppTranslation } from '@/hooks/useAppTranslation';
import { NOTE_ENTITY_TYPE } from '@/models/notes/note-entity-type';

type Props = {
    loadId: string;
    notes_title: ReactElement;
    manifests: {
        manifestId: string;
        friendlyId: string | number;
        driverIds: string[];
    }[];
};

function EditLoadNotes({
    loadId,
    notes_title,
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
            variant="filled"
            size="normal"
            slots={{
                header: {
                    props: {
                        title      : notes_title,
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
                            minHeight: '520px'
                        }
                    }
                }
            }}
        />
    );
}

export default memo(EditLoadNotes);

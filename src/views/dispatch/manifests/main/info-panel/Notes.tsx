import CoreNotes from '@/@core/components/notes/Notes';
import { selectSelectedManifestId } from '@/store/dispatch/manifests/selectors';
import { useAppSelector } from '@/store/hooks';
import React from 'react';

function ManifestNotes() {
    const manifestId = useAppSelector(selectSelectedManifestId);

    if (!manifestId) return null;

    return (
        <CoreNotes
            entity_id={manifestId}
            entity_type="manifest"
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

                            overflow  : 'hidden',
                            minHeight : '700px',
                            maxHeight : '700px',
                            height    : '100%',
                            background: (theme) => theme.palette.semantic.background.white
                        }
                    }
                }
            }}
        />
    );
}

export default React.memo(ManifestNotes);

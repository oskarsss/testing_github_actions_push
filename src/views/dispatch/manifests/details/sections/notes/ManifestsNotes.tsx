import React from 'react';
import CoreNotes from '@/@core/components/notes/Notes';

type Props = {
    manifestId: string;
};

export default function ManifestsNotes({ manifestId }: Props) {
    return (
        <CoreNotes
            isHideHeader
            entity_id={manifestId}
            textFieldBottom
            entity_type="manifest"
            slots={{
                container: {
                    props: {
                        sx: {
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
}

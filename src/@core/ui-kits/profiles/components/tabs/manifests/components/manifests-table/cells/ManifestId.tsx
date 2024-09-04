import { Stack } from '@mui/material';
import React from 'react';

type Props = {
    title: string;
    friendlyId: number;
};
function ManifestId({
    friendlyId,
    title
}: Props) {
    if (!title) return friendlyId;
    return (
        <Stack direction="column">
            <Stack direction="row">{friendlyId}</Stack>

            <Stack direction="row">{title}</Stack>
        </Stack>
    );
}

export default React.memo(ManifestId);

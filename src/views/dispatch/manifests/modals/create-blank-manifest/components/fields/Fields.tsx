import React, { memo } from 'react';
import { Stack } from '@mui/material';
import CreateBlankManifestStops from '@/views/dispatch/manifests/modals/create-blank-manifest/components/fields/stops/CreateBlankManifestStops';
import CreateBlankManifestGeneral from '@/views/dispatch/manifests/modals/create-blank-manifest/components/fields/general/CreateBlankManifestGeneral';

function Fields() {
    return (
        <Stack
            direction="column"
            gap={4}
            padding="10px"
        >
            <CreateBlankManifestGeneral />
            <CreateBlankManifestStops />
        </Stack>
    );
}

export default memo(Fields);

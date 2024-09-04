import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { Avatar, Stack } from '@mui/material';
import React from 'react';
import ManifestNoDriverInfo from './ManifestNoDriverInfo';

type Props = {
    manifestId: string;
};

function ManifestNoDriver({ manifestId }: Props) {
    return (
        <Stack
            direction="row"
            alignItems="center"
            justifyContent="center"
            gap="8px"
            overflow="hidden"
            flex="1"
        >
            <Avatar
                alt="Driver Avatar"
                sx={{
                    width : '40px',
                    height: '40px'
                }}
            >
                <AccountCircleIcon style={{ width: '24px', height: '24px' }} />
            </Avatar>

            <ManifestNoDriverInfo manifestId={manifestId} />
        </Stack>
    );
}

export default React.memo(ManifestNoDriver);

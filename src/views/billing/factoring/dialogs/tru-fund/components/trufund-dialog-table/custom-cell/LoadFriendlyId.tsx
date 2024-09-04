import { Typography, Stack } from '@mui/material';
import Tooltip, { tooltipClasses } from '@mui/material/Tooltip';
import React from 'react';
import VectorIcons from '@/@core/icons/vector_icons';

function ErrorsTitle({ errors }: { errors: string[] }) {
    return (
        <Stack>
            {errors.map((error) => (
                <div key={error}>{error}</div>
            ))}
        </Stack>
    );
}

type Props = {
    loadFriendlyId: string;
    hasErrors: boolean;
    errors: string[];
};

export default function LoadFriendlyId({
    loadFriendlyId,
    hasErrors,
    errors
}: Props) {
    return (
        <Tooltip
            disableInteractive
            disableHoverListener={!hasErrors}
            PopperProps={{
                sx: {
                    [`& .${tooltipClasses.tooltip}`]: {
                        maxWidth: 'none'
                    }
                }
            }}
            title={<ErrorsTitle errors={errors} />}
        >
            <Stack
                flexDirection="row"
                alignItems="center"
                gap="4px"
            >
                {hasErrors && <VectorIcons.WarningIcon sx={{ fontSize: '16px' }} />}
                <Typography
                    noWrap
                    fontWeight={500}
                    fontSize="14px"
                    color={hasErrors ? 'semantic.text.warning' : 'semantic.text.secondary'}
                    lineHeight="18px"
                >
                    {loadFriendlyId || '-'}
                </Typography>
            </Stack>
        </Tooltip>
    );
}

import { Stack, Typography } from '@mui/material';
import Badge from '@/@core/ui-kits/basic/badge/Badge';
import VectorIcons from '@/@core/icons/vector_icons';
import { formatMinutes } from '@/utils/formatting';
import React from 'react';
import { useAppTranslation } from '@/hooks/useAppTranslation';

type Props = {
    loadsCount: number;
    totalDistance?: string;
    estimatedTotal?: string;
};

export default function LoadInfoControllerStopsHeader({
    loadsCount,
    totalDistance,
    estimatedTotal
}: Props) {
    const { t } = useAppTranslation();

    return (
        <Stack
            flexDirection="row"
            alignItems="center"
            justifyContent="space-between"
            gap="8px"
        >
            <Typography
                variant="body1"
                fontSize="16px"
                fontWeight={600}
                lineHeight={1.4}
            >
                {t('entity:stops')}
            </Typography>
            <Stack
                flexDirection="row"
                alignItems="center"
                gap="4px"
            >
                {loadsCount && (
                    <Badge
                        variant="outlined"
                        icon={<VectorIcons.CubeIcon />}
                    >
                        {t('entity:loads')}:
                        <Typography
                            fontSize="inherit"
                            fontWeight="inherit"
                            lineHeight="inherit"
                            component="span"
                            color={(theme) => theme.palette.semantic.text.primary}
                        >
                            {loadsCount}
                        </Typography>
                    </Badge>
                )}

                {totalDistance && (
                    <Badge
                        variant="outlined"
                        icon={<VectorIcons.RouteIcon />}
                        textColor={(theme) => theme.palette.semantic.text.primary}
                        text={totalDistance}
                    />
                )}

                {!!estimatedTotal && (
                    <Badge
                        variant="outlined"
                        icon={<VectorIcons.ClockIcon />}
                        textColor={(theme) => theme.palette.semantic.text.primary}
                        text={estimatedTotal}
                    />
                )}
            </Stack>
        </Stack>
    );
}

import { Stack, Typography } from '@mui/material';
import VectorIcons from '@/@core/icons/vector_icons';
import Badge from '@/@core/ui-kits/basic/badge/Badge';
import { useAppTranslation } from '@/hooks/useAppTranslation';
import { formatMinutes } from '@/utils/formatting';
import { memo } from 'react';
import LoadsTooltip from '@/@core/components/loads-tooltip/LoadsTooltip';
import { ManifestModel_Load } from '@proto/models/model_manifest';

type Props = {
    loadsCount: number;
    totalDistance: string;
    estimatedTotalDurationSeconds?: number;
    loads: {
        loadId: string;
        friendlyId: string;
    }[];
};

function StopsOverview({
    loadsCount,
    totalDistance,
    estimatedTotalDurationSeconds,
    loads
}: Props) {
    const { t } = useAppTranslation();
    return (
        <Stack
            direction="row"
            gap="inherit"
            justifyContent="space-between"
            alignItems="center"
        >
            {loadsCount !== 0 && (
                <LoadsTooltip loads={loads}>
                    <span>
                        <Badge
                            variant="outlined"
                            icon={<VectorIcons.CubeIcon />}
                            sx={{ cursor: loads.length ? 'pointer' : 'default' }}
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
                    </span>
                </LoadsTooltip>
            )}

            <Stack
                direction="row"
                alignItems="center"
                gap="4px"
            >
                <Badge
                    variant="outlined"
                    icon={<VectorIcons.RouteIcon />}
                    textColor={(theme) => theme.palette.semantic.text.primary}
                    text={totalDistance}
                />

                {!!estimatedTotalDurationSeconds && (
                    <Badge
                        variant="outlined"
                        icon={<VectorIcons.ClockIcon />}
                        textColor={(theme) => theme.palette.semantic.text.primary}
                        text={formatMinutes(estimatedTotalDurationSeconds, t)}
                    />
                )}
            </Stack>
        </Stack>
    );
}

export default memo(StopsOverview);

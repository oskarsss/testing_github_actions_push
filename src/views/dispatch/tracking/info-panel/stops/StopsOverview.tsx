import { Stack, Typography } from '@mui/material';
import { memo } from 'react';
import VectorIcons from '@/@core/icons/vector_icons';
import Badge from '@/@core/ui-kits/basic/badge/Badge';
import { useAppTranslation } from '@/hooks/useAppTranslation';
import { formatMinutes } from '@/utils/formatting';
import LoadsTooltip from '@/@core/components/loads-tooltip/LoadsTooltip';
import { ManifestModel_Load } from '@proto/models/model_manifest';

type Props = {
    relatedLoads: ManifestModel_Load[];
    totalDistance: string | number;
    estimatedTotalDurationSeconds?: number;
};

function TrackingLoadStopsOverview({
    relatedLoads,
    totalDistance,
    estimatedTotalDurationSeconds
}: Props) {
    const { t } = useAppTranslation();

    return (
        <Stack
            direction="row"
            gap="inherit"
            justifyContent="space-between"
            alignItems="center"
        >
            {relatedLoads.length !== 0 && (
                <LoadsTooltip loads={relatedLoads}>
                    <span>
                        <Badge
                            variant="outlined"
                            icon={<VectorIcons.CubeIcon />}
                            sx={{ cursor: relatedLoads.length ? 'pointer' : 'default' }}
                        >
                            {t('entity:loads')}:
                            <Typography
                                fontSize="inherit"
                                fontWeight="inherit"
                                lineHeight="inherit"
                                component="span"
                                color={(theme) => theme.palette.semantic.text.primary}
                            >
                                {relatedLoads.length}
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
                    text={`${totalDistance} ${t('common:mi')}`}
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

export default memo(TrackingLoadStopsOverview);

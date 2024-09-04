import { type SyntheticEvent, useMemo } from 'react';
import { useServiceLogs } from '@/store/maitenance/service-logs/hooks';
import PageTab from '@/@core/ui-kits/basic/page-tabs/PageTab';
import { Box, Stack, Typography } from '@mui/material';
import CountBadge from '@/@core/ui-kits/basic/count-badge/CountBadge';
import PageTabsStyled from '@/@core/ui-kits/basic/page-tabs/PageTabs.styled';
import { ServiceLogModel_ServiceLogType } from '@proto/models/model_service_log';
import { MAINTENANCE_TYPE_COLORS } from '@/@core/theme/entities/maintenance/type';
import ChipDotIcon from '@/@core/fields/chip-select/components/ChipDotIcon';
import { useAppTranslation } from '@/hooks/useAppTranslation';
import { FilterModel_FilterID } from '@proto/models/model_filter_type';
import { useUpdateFilters } from '@/hooks/useAdvancedUpdateFilters';

export default function ServiceLogTypes() {
    const { t } = useAppTranslation();
    const {
        filter_id,
        selected_filters,
        initialFilters
    } = useServiceLogs();
    const updateFilters = useUpdateFilters({ filter_id });

    const selectedTypeFilter = selected_filters.service_log_type;
    const typeFilterCounts = useMemo(
        () =>
            initialFilters.find(
                (filter) => filter.filterId === FilterModel_FilterID.FILTER_SERVICE_LOG_TYPE
            ),
        [initialFilters]
    )?.counts;

    const typeOptions = useMemo(
        () => [
            {
                id   : ServiceLogModel_ServiceLogType.UNSPECIFIED,
                title: t('common:all')
            },
            {
                id   : ServiceLogModel_ServiceLogType.PLANNED,
                title: t('state_info:maintenance.type.planned'),
                count: typeFilterCounts?.SERVICE_LOG_TYPE_PLANNED
            },
            {
                id   : ServiceLogModel_ServiceLogType.UNPLANNED,
                title: t('state_info:maintenance.type.unplanned'),
                count: typeFilterCounts?.SERVICE_LOG_TYPE_UNPLANNED
            },
            {
                id   : ServiceLogModel_ServiceLogType.EMERGENCY,
                title: t('state_info:maintenance.type.emergency'),
                count: typeFilterCounts?.SERVICE_LOG_TYPE_EMERGENCY
            }
        ],
        [t, typeFilterCounts]
    );

    const handleChange = (event: SyntheticEvent, type: ServiceLogModel_ServiceLogType) => {
        if (type !== selectedTypeFilter[0]) {
            updateFilters({
                ...selected_filters,
                service_log_type: type === ServiceLogModel_ServiceLogType.UNSPECIFIED ? [] : [type]
            });
        }
    };

    return (
        <PageTabsStyled.Tabs
            value={!selectedTypeFilter.length ? 0 : selectedTypeFilter[0]}
            onChange={handleChange}
        >
            {typeOptions.map((option) => (
                <PageTab
                    key={option.id}
                    aria-label={`service-log-type-${option.id}`}
                    label={(
                        <Stack
                            direction="row"
                            gap={2}
                            alignItems="center"
                        >
                            <Box
                                component="span"
                                alignItems="center"
                                fontWeight={600}
                                gap={1}
                            >
                                {option.id !== 0 && (
                                    <ChipDotIcon
                                        sx={{
                                            color: (theme) =>
                                                theme?.palette.utility.foreground[
                                                    MAINTENANCE_TYPE_COLORS[option.id]
                                                ]?.primary
                                        }}
                                    />
                                )}

                                <Typography
                                    fontSize="inherit"
                                    fontWeight="inherit"
                                    color="inherit"
                                >
                                    {option.title}
                                </Typography>
                            </Box>

                            {option.count && (
                                <CountBadge
                                    count={option.count}
                                    isSelected={selectedTypeFilter[0] === option.id}
                                />
                            )}
                        </Stack>
                    )}
                    value={option.id}
                />
            ))}
        </PageTabsStyled.Tabs>
    );
}

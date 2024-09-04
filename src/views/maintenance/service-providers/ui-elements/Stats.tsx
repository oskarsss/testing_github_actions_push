import { memo, useMemo } from 'react';
import ServiceLogsGrpcService from '@/@grpcServices/services/maitenance-service/service-logs.service';
import { Stack, type SxProps, Typography } from '@mui/material';
import ArrowUpwardSharpIcon from '@mui/icons-material/ArrowUpwardSharp';
import { useAppTranslation } from '@/hooks/useAppTranslation';

type Props = {
    providerId?: string;
    sx?: SxProps;
};

function Stats({
    providerId,
    sx
}: Props) {
    const { t } = useAppTranslation();
    const { data } = ServiceLogsGrpcService.useRetrieveServiceLogStatsQuery({
        ...(providerId && { providerId })
    });

    const stats = useMemo(() => {
        if (!data) {
            return [];
        }

        return [
            {
                title       : 'maintenance:service_providers.header.stats.total_services',
                monthPercent: data?.deltaMonthCountPercent,
                totalCount  : data?.servicesTotalCount,
                monthCount  : data?.deltaMonthCount
            },
            {
                title       : 'maintenance:service_providers.header.stats.total_cost',
                monthPercent: data?.deltaMonthAmountPercent,
                totalCount  : data?.servicesTotalAmount,
                monthCount  : data?.deltaMonthAmount
            }
        ];
    }, [data]);

    return (
        <Stack
            direction="row"
            gap="12px"
            sx={sx}
        >
            {stats.length > 0 &&
                stats.map((stat) => (
                    <Stack
                        key={stat.title}
                        padding="8px 12px"
                        borderRadius="8px"
                        border="1px solid"
                        bgcolor="semantic.foreground.white.tertiary"
                        borderColor="semantic.border.secondary"
                        boxShadow="0px 1px 2px 0px #1018280D"
                    >
                        <Stack
                            direction="row"
                            alignItems="center"
                            justifyContent="space-between"
                            gap="12px"
                        >
                            <Typography
                                variant="body1"
                                fontSize="12px"
                                fontWeight={500}
                                color="semantic.text.secondary"
                            >
                                {t(stat.title)}
                            </Typography>

                            <Stack
                                direction="row"
                                gap="2px"
                                alignItems="center"
                                bgcolor={({ palette }) =>
                                    stat.monthPercent < 0
                                        ? palette.utility.foreground.error.secondary
                                        : palette.utility.foreground.success.secondary}
                                borderRadius="6px"
                                padding="1px 5px"
                            >
                                <ArrowUpwardSharpIcon
                                    sx={{
                                        fontSize: '16px',
                                        color   : ({ palette }) =>
                                            stat.monthPercent < 0
                                                ? palette.utility.foreground.error.primary
                                                : palette.utility.foreground.success.primary,
                                        transform: `rotate(${
                                            stat.monthPercent < 0 ? '180deg' : '0deg'
                                        })`
                                    }}
                                />

                                <Typography
                                    variant="body1"
                                    fontSize="12px"
                                    fontWeight={500}
                                    color={({ palette }) =>
                                        stat.monthPercent >= 0
                                            ? palette.utility.text.success
                                            : palette.utility.text.error}
                                >
                                    {stat.monthPercent}%
                                </Typography>
                            </Stack>
                        </Stack>

                        <Stack
                            direction="row"
                            gap="4px"
                            alignItems="baseline"
                        >
                            <Typography
                                variant="body1"
                                fontSize="16px"
                                fontWeight={600}
                            >
                                {stat.totalCount}
                            </Typography>

                            <Typography
                                variant="body1"
                                fontSize="12px"
                                fontWeight={500}
                                color={({ palette }) =>
                                    palette.utility.text[
                                        stat.monthCount && stat.monthCount > 0 ? 'success' : 'error'
                                    ]}
                            >
                                {stat.monthCount && stat.monthCount > 0 ? '+' : ''}
                                {stat.monthCount}
                            </Typography>

                            <Typography
                                variant="body1"
                                fontSize="12px"
                                fontWeight={500}
                                color="semantic.text.disabled"
                            >
                                {t('maintenance:service_providers.header.stats.last_month')}
                            </Typography>
                        </Stack>
                    </Stack>
                ))}
        </Stack>
    );
}

export default memo(Stats);

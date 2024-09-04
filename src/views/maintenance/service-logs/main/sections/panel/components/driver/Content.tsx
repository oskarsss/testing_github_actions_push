import { memo, useMemo } from 'react';
import { Stack, Typography } from '@mui/material';
import { useAppTranslation } from '@/hooks/useAppTranslation';
import { useSettlementPeriodId } from '@/store/accounting/settlements/hooks/settlements';

import { DriverModel_Driver } from '@proto/models/model_driver';
import SettlementsGrpcService from '@/@grpcServices/services/settlements-service/settlements.service';
import { useStableArray } from '@/hooks/useStable';
import Driver from './Driver';

type Props = {
    driver?: DriverModel_Driver;
};

function Content({ driver }: Props) {
    const { t } = useAppTranslation();
    const periodId = useSettlementPeriodId();
    const { data } = SettlementsGrpcService.useGetSettlementsQuery(
        { driverId: driver?.driverId || '', periodId, cycleId: driver?.settlementCycleId },
        { skip: !driver }
    );
    const settlements = useStableArray(data?.settlements);
    const settlement = useMemo(() => settlements[0], [settlements]);

    return (
        <Stack
            padding="16px"
            gap="12px"
            bgcolor="semantic.foreground.white.tertiary"
            borderRadius="8px"
            alignItems="center"
        >
            {driver ? (
                <>
                    <Driver
                        selfieThumbUrl={driver.selfieThumbUrl}
                        firstName={driver.firstName}
                        lastName={driver.lastName}
                        settlement={settlement}
                        cycleId={driver.settlementCycleId}
                        periodId={periodId}
                    />

                    {/* <ServiceLogPanelServiceDriverTable */}
                    {/*     recurringTransactions={data.driver.recurringTransactions} */}
                    {/* /> */}
                </>
            ) : (
                <Typography
                    variant="h6"
                    fontWeight={500}
                >
                    {t('maintenance:service_logs.panel.sections.driver.no_driver')}
                </Typography>
            )}
        </Stack>
    );
}

export default memo(Content);

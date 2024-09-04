import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import { useEditCycleDialog } from '@/views/settings/tabs/Settlements/Cycles/dialogs/EditCycleDialog';
import StatusChip from '@/views/settings/tabs/Settlements/components/StatusChip/StatusChip';
import SettlementsTypes from '@/store/accounting/settlements/types';
import PageHeadersKit from '@/@core/ui-kits/page-headers';
import { useUpdateSettlementsRequestData } from '@/store/accounting/settlements/hooks/settlements';
import { useRouter } from 'next/router';
import { Settlements_Cycle_Period_Status } from '@proto/models/model_settlement';
import { useAppTranslation } from '@/hooks/useAppTranslation';
import { useCreatePeriodDialog } from '@/views/accounting/settlements/dialogs/Periods/CreatePeriod';
import moment from 'moment-timezone';
import SettlementCyclesGrpcService from '@/@grpcServices/services/settlements-service/settlement-cycles.service';

type CycleProps = {
    cycle: SettlementsTypes.Cycles.Cycle;
    periods: SettlementsTypes.Cycles.Periods.Period[];
};

export default function CycleHeader({
    cycle,
    periods
}: CycleProps) {
    const updateFilters = useUpdateSettlementsRequestData();
    const router = useRouter();
    const { t } = useAppTranslation();

    const isDeactivated = cycle.deleted;
    const dialog = useEditCycleDialog();
    const createPeriodDialog = useCreatePeriodDialog();
    const [deactivateCycle, {
        isLoading: isDeactivateLoading,
        isSuccess: isDeactivateSuccess
    }] =
        SettlementCyclesGrpcService.useDeactivateCycleMutation();
    const [activateCycle, {
        isLoading: isActivateLoading,
        isSuccess: isActivateSuccess
    }] =
        SettlementCyclesGrpcService.useActivateCycleMutation();

    const editCycle = () => {
        dialog.open({ cycle });
    };

    const onClickActivate = () => {
        if (isDeactivated) {
            return activateCycle({ cycleId: cycle.cycleId });
        }
        return deactivateCycle({ cycleId: cycle.cycleId });
    };

    const createOrViewLatestPeriod = () => {
        if (isDeactivated) return;

        if (!periods.length) {
            const startWeek = moment().startOf('week');
            createPeriodDialog.open({
                cycleId      : cycle.cycleId,
                defaultValues: {
                    startDatetime: startWeek.clone().format('YYYY-MM-DD HH:mm:ss'),
                    endDatetime  : startWeek
                        .clone()
                        .add(cycle.periodWeeks, 'weeks')
                        .endOf('day')
                        .format('YYYY-MM-DD HH:mm:ss')
                }
            });
            return;
        }

        const lastClosedPeriod = periods.find(
            (period) => period.status === Settlements_Cycle_Period_Status.CLOSED
        );

        updateFilters({
            cycle_id : cycle.cycleId,
            period_id: lastClosedPeriod?.periodId || periods[0]?.periodId || ''
        });
        router.push('/settlements');
    };

    return (
        <PageHeadersKit.Header
            topLeft={(
                <Stack
                    width="100%"
                    direction="row"
                    alignItems="center"
                    justifyContent="space-between"
                    spacing={3}
                >
                    <Stack
                        justifyContent="space-between"
                        alignItems="center"
                        direction="row"
                        spacing={3}
                    >
                        <Typography
                            maxWidth="250px"
                            fontSize="24px"
                            fontWeight={600}
                            variant="h6"
                        >
                            {cycle.name}
                        </Typography>
                        <StatusChip
                            label={`settings:settlements.cycles.status.${
                                cycle.default ? 'default' : 'not_default'
                            }`}
                            color={cycle.default ? 'green' : 'blue'}
                        />
                    </Stack>
                    <Stack
                        spacing={2}
                        direction="row"
                    >
                        <Button
                            sx={{ width: 'max-content' }}
                            variant="outlined"
                            color="secondary"
                            size="medium"
                            onClick={editCycle}
                        >
                            {t('common:button.edit')}
                        </Button>
                        <Button
                            sx={{ width: 'max-content' }}
                            variant="outlined"
                            color={isDeactivated ? 'success' : 'error'}
                            size="medium"
                            disabled={
                                isDeactivateLoading ||
                                isActivateLoading ||
                                isActivateSuccess ||
                                isDeactivateSuccess
                            }
                            onClick={onClickActivate}
                        >
                            {t(
                                `settings:settlements.cycles.buttons.${
                                    isDeactivated ? 'activate' : 'deactivate'
                                }`
                            )}
                        </Button>
                        <Button
                            sx={{ width: 'max-content' }}
                            variant="contained"
                            color="primary"
                            size="medium"
                            disabled={isDeactivated}
                            onClick={createOrViewLatestPeriod}
                        >
                            {t(
                                periods.length
                                    ? 'settings:settlements.cycles.buttons.view_latest_period'
                                    : 'settings:settlements.cycles.buttons.create_new_period'
                            )}
                        </Button>
                    </Stack>
                </Stack>
            )}
            style={{
                padding: 0
            }}
        />
    );
}

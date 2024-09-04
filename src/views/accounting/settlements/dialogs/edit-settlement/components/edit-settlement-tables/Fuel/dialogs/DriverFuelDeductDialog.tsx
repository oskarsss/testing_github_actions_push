import DialogComponents from '@/@core/ui-kits/common-dialog';
import SettlementsGrpcService from '@/@grpcServices/services/settlements-service/settlements.service';
import { hookFabric } from '@/utils/dialog-hook-fabric';
import { LoadingButton } from '@mui/lab';
import React from 'react';
import { useAppTranslation } from '@/hooks/useAppTranslation';

type Props = {
    checked: boolean;
    refetch: () => void;
    cycleId: string;
    periodId: string;
    settlementId: string;
};

export const useDriverFuelDeductDialog = hookFabric(DriverFuelDeductDialog);

function DriverFuelDeductDialog({
    checked,
    refetch,
    cycleId,
    periodId,
    settlementId
}: Props) {
    const { t } = useAppTranslation('modals');
    const [trigger, { isLoading }] = SettlementsGrpcService.useUpdateDriverPayDeductFuelMutation();
    const dialog = useDriverFuelDeductDialog(true);
    const infoText = t(
        !checked ? 'settlements.edit_settlement.turn.off' : 'settlements.edit_settlement.turn.on'
    );

    const onSubmit = async () => {
        try {
            await trigger({
                cycleId,
                periodId,
                settlementId,
                driverPayDeductFuel: checked
            }).unwrap();
            refetch();
            dialog.close();
        } catch (error) {
            dialog.close();
        }
    };
    return (
        <>
            <DialogComponents.Header
                title="modals:settlements.edit_settlement.tabs.fuel.dialogs.titles.driver_fuel_deduct"
                translationOptions={{ infoText }}
            />
            <DialogComponents.ActionsWrapper>
                <DialogComponents.CancelButton onCancel={dialog.close} />
                <LoadingButton
                    size="large"
                    onClick={onSubmit}
                    variant="contained"
                    style={{ fontWeight: '600', minWidth: '120px', textTransform: 'uppercase' }}
                    loading={isLoading}
                    disabled={isLoading}
                >
                    {infoText}
                </LoadingButton>
            </DialogComponents.ActionsWrapper>
        </>
    );
}

export default DriverFuelDeductDialog;

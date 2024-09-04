import DialogComponents from '@/@core/ui-kits/common-dialog';
import SettlementsGrpcService from '@/@grpcServices/services/settlements-service/settlements.service';
import { hookFabric } from '@/utils/dialog-hook-fabric';
import { LoadingButton } from '@mui/lab';
import { useAppTranslation } from '@/hooks/useAppTranslation';

export const useFuelDiscountsDialog = hookFabric(FuelDiscountsDialog);

type Props = {
    checked: boolean;
    settlementId: string;
    cycleId: string;
    periodId: string;
    refetch: () => void;
};

export default function FuelDiscountsDialog({
    checked,
    refetch,
    settlementId,
    cycleId,
    periodId
}: Props) {
    const { t } = useAppTranslation('modals');
    const fuelDiscountsDialog = useFuelDiscountsDialog(true);
    const [updateDiscount, { isLoading }] =
        SettlementsGrpcService.useUpdateFuelDiscountsEnabledMutation();
    const infoText = t(
        !checked ? 'settlements.edit_settlement.turn.off' : 'settlements.edit_settlement.turn.on'
    );

    const onSubmit = async () => {
        try {
            await updateDiscount({
                cycleId,
                fuelDiscountsEnabled: checked,
                periodId,
                settlementId
            }).unwrap();
            refetch();
            fuelDiscountsDialog.close();
        } catch (error) {
            fuelDiscountsDialog.close();
        }
    };

    return (
        <>
            <DialogComponents.Header
                title="modals:settlements.edit_settlement.tabs.fuel.dialogs.titles.fuel_discount"
                translationOptions={{ infoText }}
            />
            <DialogComponents.ActionsWrapper>
                <DialogComponents.CancelButton onCancel={fuelDiscountsDialog.close} />
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

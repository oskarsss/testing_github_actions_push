import { hookFabric } from '@/utils/dialog-hook-fabric';
import DialogComponents from '@/@core/ui-kits/common-dialog';
import { Stack } from '@mui/material';
import { useForm } from 'react-hook-form';
import { useSettlementCycleId } from '@/store/accounting/settlements/hooks/settlements';
import SettlementCyclePeriodsGrpcService from '@/@grpcServices/services/settlements-service/settlement-cycle-periods';
import { yupResolver } from '@hookform/resolvers/yup';
import PeriodDialogFields from './Fields';
import FORM_CONFIG, { type DefaultValues } from './form-config';

export const useEditSettlementPeriodDialog = hookFabric(EditSettlementPeriod, (props) => (
    <DialogComponents.DialogWrapper
        maxWidth="480px"
        turnOffCloseButton
        {...props}
    />
));

type Props = {
    periodId: string;
    startDatetime: string;
    endDatetime: string;
};

function EditSettlementPeriod({
    periodId,
    startDatetime,
    endDatetime
}: Props) {
    const editSettlementPeriodDialog = useEditSettlementPeriodDialog(true);
    const [updatePeriod, { isLoading: isUpdating }] =
        SettlementCyclePeriodsGrpcService.endpoints.updatePeriod.useMutation();
    const [deletePeriod, { isLoading: isDeleting }] =
        SettlementCyclePeriodsGrpcService.endpoints.deletePeriod.useMutation();
    const cycleId = useSettlementCycleId();

    const methods = useForm<DefaultValues>({
        defaultValues: {
            endDatetime,
            startDatetime
        },
        resolver: yupResolver(FORM_CONFIG.schema)
    });

    const onSubmit = async (payload: DefaultValues) => {
        try {
            await updatePeriod({
                cycleId,
                periodId,
                ...payload
            }).unwrap();
            editSettlementPeriodDialog.close();
        } catch (e) {
            editSettlementPeriodDialog.close();
        }
    };

    const onDelete = async () => {
        try {
            await deletePeriod({
                cycleId,
                periodId
            }).unwrap();
            editSettlementPeriodDialog.close();
        } catch (e) {
            editSettlementPeriodDialog.close();
        }
    };

    return (
        <PeriodDialogFields
            formTitle="modals:settlements.periods.titles.edit"
            methods={methods}
            onSubmit={onSubmit}
        >
            <Stack
                direction="row"
                justifyContent="space-between"
                mt="20px"
            >
                <DialogComponents.DeleteButton
                    loading={isUpdating || isDeleting}
                    onClick={onDelete}
                />
                <Stack
                    direction="row"
                    spacing={1}
                >
                    <DialogComponents.CancelButton onCancel={editSettlementPeriodDialog.close} />
                    <DialogComponents.SubmitButton
                        text="common:button.update"
                        loading={isUpdating || isDeleting}
                        disabled={!methods.formState.isDirty}
                    />
                </Stack>
            </Stack>
        </PeriodDialogFields>
    );
}

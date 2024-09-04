import DialogComponents from '@/@core/ui-kits/common-dialog';
import { hookFabric } from '@/utils/dialog-hook-fabric';
import { useForm } from 'react-hook-form';
import { useSettlementCycleId } from '@/store/accounting/settlements/hooks/settlements';
import SettlementCyclePeriodsGrpcService from '@/@grpcServices/services/settlements-service/settlement-cycle-periods';
import { yupResolver } from '@hookform/resolvers/yup';
import PeriodDialogFields from './Fields';
import FORM_CONFIG, { type DefaultValues } from './form-config';

export const useCreatePeriodDialog = hookFabric(CreateSettlementPeriod, (props) => (
    <DialogComponents.DialogWrapper
        maxWidth="480px"
        turnOffCloseButton
        {...props}
    />
));

type Props = {
    cycleId?: string;
    defaultValues?: Partial<DefaultValues>;
};

function CreateSettlementPeriod({
    cycleId,
    defaultValues
}: Props) {
    const cycle_id = useSettlementCycleId();
    const [createPeriod, { isLoading }] =
        SettlementCyclePeriodsGrpcService.endpoints.createPeriod.useMutation();

    const createSettlementDialog = useCreatePeriodDialog(true);

    const methods = useForm<DefaultValues>({
        defaultValues: {
            ...FORM_CONFIG.defaultValues,
            ...(defaultValues || {})
        },
        resolver: yupResolver(FORM_CONFIG.schema)
    });

    const onSubmit = async (payload: DefaultValues) => {
        try {
            await createPeriod({
                cycleId: cycleId || cycle_id,
                ...payload
            }).unwrap();
            createSettlementDialog.close();
        } catch (e) {
            createSettlementDialog.close();
        }
    };

    return (
        <PeriodDialogFields
            formTitle="modals:settlements.periods.titles.add"
            methods={methods}
            onSubmit={onSubmit}
        >
            <DialogComponents.ActionsWrapper>
                <DialogComponents.CancelButton onCancel={createSettlementDialog.close} />
                <DialogComponents.SubmitButton
                    text="common:button.create"
                    loading={isLoading}
                    disabled={!methods.formState.isDirty}
                />
            </DialogComponents.ActionsWrapper>
        </PeriodDialogFields>
    );
}

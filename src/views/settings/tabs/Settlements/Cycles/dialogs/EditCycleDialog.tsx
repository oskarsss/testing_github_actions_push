import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { hookFabric } from '@/utils/dialog-hook-fabric';
import SettlementsTypes from '@/store/accounting/settlements/types';
import DialogComponents from '@/@core/ui-kits/common-dialog';
import { useMemo } from 'react';
import SettlementCyclesGrpcService from '@/@grpcServices/services/settlements-service/settlement-cycles.service';
import { DefaultValues, schema } from './helpers';
import CycleDialogForm from './CycleDialogForm';

type Props = {
    cycle: SettlementsTypes.Cycles.Cycle;
};

export const useEditCycleDialog = hookFabric(EditCycleDialog, (props) => (
    <DialogComponents.DialogWrapper
        {...props}
        maxWidth="700px"
    />
));

export default function EditCycleDialog({ cycle }: Props) {
    const dialog = useEditCycleDialog(true);

    const [updateCycle, { isLoading }] = SettlementCyclesGrpcService.useUpdateCycleMutation();

    const values: DefaultValues = useMemo(
        () => ({
            name                       : cycle.name,
            description                : cycle.description,
            periodWeeks                : cycle.periodWeeks,
            closingDay                 : cycle.closingDay,
            closingTime                : cycle.closingTime,
            default                    : cycle.default,
            payDateDaysAfterClosing    : cycle.payDateDaysAfterClosing,
            autoCreatePeriodSettlements: cycle.autoCreatePeriodSettlements,
            autoCreatePeriods          : cycle.autoCreatePeriods
        }),
        [cycle]
    );

    const methods = useForm<DefaultValues>({
        values,
        resolver: yupResolver<DefaultValues>(schema),
        mode    : 'onChange'
    });

    const submit = (body: DefaultValues) => {
        updateCycle({
            cycleId: cycle.cycleId,
            ...body
        })
            .unwrap()
            .then(dialog.close);
    };

    return (
        <CycleDialogForm
            methods={methods}
            submit={submit}
            title="modals:settings.settlements.cycles.edit.title"
            cycleName={cycle.name}
        >
            <DialogComponents.DefaultActions
                onCancel={dialog.close}
                submitLoading={isLoading}
                type="update"
                submitDisabled={!methods.formState.isDirty}
            />
        </CycleDialogForm>
    );
}

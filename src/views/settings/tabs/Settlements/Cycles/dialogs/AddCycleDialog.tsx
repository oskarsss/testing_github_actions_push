import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { hookFabric } from '@/utils/dialog-hook-fabric';
import DialogComponents from '@/@core/ui-kits/common-dialog';
import SettlementCyclesGrpcService from '@/@grpcServices/services/settlements-service/settlement-cycles.service';
import { DefaultValues, default_values, schema } from './helpers';
import CycleDialogForm from './CycleDialogForm';

export const useAddCycleDialog = hookFabric(AddCycleDialog, (props) => (
    <DialogComponents.DialogWrapper
        {...props}
        maxWidth="700px"
    />
));

type Props = {
    onSuccessfulCreate?: (cycleId: string) => void;
    defaultValues?: Partial<DefaultValues>;
};

function AddCycleDialog({
    onSuccessfulCreate,
    defaultValues
}: Props) {
    const dialog = useAddCycleDialog(true);

    const [createCycle, { isLoading }] = SettlementCyclesGrpcService.useCreateCycleMutation();

    const methods = useForm<DefaultValues>({
        defaultValues: { ...default_values, ...defaultValues },
        resolver     : yupResolver<DefaultValues>(schema),
        mode         : 'onChange'
    });

    const submit = (body: DefaultValues) => {
        createCycle({ ...body })
            .unwrap()
            .then((response) => {
                onSuccessfulCreate?.(response.cycleId);
                dialog.close();
            });
    };

    return (
        <CycleDialogForm
            methods={methods}
            submit={submit}
            title="modals:settings.settlements.cycles.add.title"
        >
            <DialogComponents.DefaultActions
                onCancel={dialog.close}
                submitLoading={isLoading}
                type="create"
                submitDisabled={!methods.formState.isDirty}
            />
        </CycleDialogForm>
    );
}

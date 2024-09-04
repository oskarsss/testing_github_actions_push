import LoadTypeForm from '@/views/settings/tabs/Loads/LoadTypes/dialogs/components/LoadTypeForm';
import DialogComponents from '@/@core/ui-kits/common-dialog';
import { hookFabric } from '@/utils/dialog-hook-fabric';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import LoadTypesGrpcService from '@/@grpcServices/services/loads-service/load-types.service';
import LoadTypeConfig, {
    LoadTypeDefaultValue
} from '@/views/settings/tabs/Loads/LoadTypes/dialogs/components/load-type-config';

export const useAddLoadTypeDialog = hookFabric(AddLoadTypeDialog);
export function AddLoadTypeDialog() {
    const dialog = useAddLoadTypeDialog(true);
    const [addType, { isLoading }] = LoadTypesGrpcService.useCreateLoadTypeMutation();

    const method = useForm<LoadTypeDefaultValue>({
        defaultValues: LoadTypeConfig.defaultValues,
        resolver     : yupResolver(LoadTypeConfig.schema)
    });

    const submit = (values: LoadTypeDefaultValue) => {
        addType({
            code: values.code,
            name: values.name,
            icon: values.icon
        })
            .unwrap()
            .then(dialog.close);
    };

    return (
        <LoadTypeForm
            method={method}
            submit={submit}
            title="modals:settings.loads.load_types.add.title"
        >
            <DialogComponents.CancelButton onCancel={dialog.close} />
            <DialogComponents.SubmitButton
                loading={isLoading}
                type="create"
                disabled={!method.formState.isDirty}
            />
        </LoadTypeForm>
    );
}

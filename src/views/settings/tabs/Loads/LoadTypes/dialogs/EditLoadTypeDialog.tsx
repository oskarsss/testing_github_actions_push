import LoadTypeForm from '@/views/settings/tabs/Loads/LoadTypes/dialogs/components/LoadTypeForm';
import DialogComponents from '@/@core/ui-kits/common-dialog';
import { hookFabric } from '@/utils/dialog-hook-fabric';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import LoadsTypes from '@/store/dispatch/loads/types';
import LoadTypesGrpcService from '@/@grpcServices/services/loads-service/load-types.service';
import LoadTypeConfig, {
    LoadTypeDefaultValue
} from '@/views/settings/tabs/Loads/LoadTypes/dialogs/components/load-type-config';

export const useEditLoadTypeDialog = hookFabric(EditLoadTypeDialog);

type Props = {
    type: LoadsTypes.LoadType;
};

export function EditLoadTypeDialog({ type }: Props) {
    const dialog = useEditLoadTypeDialog(true);
    const [UpdateType, { isLoading }] = LoadTypesGrpcService.useUpdateLoadTypeMutation();

    const method = useForm<LoadTypeDefaultValue>({
        defaultValues: LoadTypeConfig.defaultValues,
        values       : { code: type.code, name: type.name, icon: type.icon },
        resolver     : yupResolver(LoadTypeConfig.schema)
    });

    const submit = (values: LoadTypeDefaultValue) => {
        UpdateType({
            loadTypeId: type.loadTypeId,
            code      : values.code,
            name      : values.name,
            icon      : values.icon
        })
            .unwrap()
            .then(dialog.close);
    };

    return (
        <LoadTypeForm
            method={method}
            submit={submit}
            title="modals:settings.loads.load_types.edit.title"
        >
            <DialogComponents.CancelButton onCancel={dialog.close} />
            <DialogComponents.SubmitButton
                loading={isLoading}
                type="update"
                disabled={!method.formState.isDirty}
            />
        </LoadTypeForm>
    );
}

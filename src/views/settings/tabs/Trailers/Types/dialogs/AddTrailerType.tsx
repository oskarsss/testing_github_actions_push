import { hookFabric } from '@/utils/dialog-hook-fabric';
import { useForm } from 'react-hook-form';
import schema from '@/views/settings/tabs/Trailers/Types/dialogs/components/schema';
import { TrailerTypesCreateRequest } from '@proto/trailer.types';
import { yupResolver } from '@hookform/resolvers/yup';
import TrailerTypesGrpcService from '@/@grpcServices/services/settings-service/trailer-types.service';
import TrailerTypes from '@/views/settings/tabs/Trailers/Types/dialogs/components/TrailerTypeForm';
import DialogComponents from '@/@core/ui-kits/common-dialog';
import defaultValues from '@/views/settings/tabs/Trailers/Types/dialogs/components/defaultValues';

export const useAddTrailerTypeDialog = hookFabric(AddTrailerType);

function AddTrailerType() {
    const dialog = useAddTrailerTypeDialog(true);
    const [addType, { isLoading }] =
        TrailerTypesGrpcService.endpoints.createTrailerType.useMutation();

    const method = useForm<TrailerTypesCreateRequest>({
        defaultValues,
        resolver: yupResolver(schema)
    });

    const submit = (values: TrailerTypesCreateRequest) => {
        addType(values).unwrap().then(dialog.close);
    };

    return (
        <TrailerTypes
            method={method}
            submit={submit}
            title="modals:settings.trailer_types.add.header.title"
        >
            <DialogComponents.CancelButton onCancel={dialog.close} />
            <DialogComponents.SubmitButton
                loading={isLoading}
                type="create"
                disabled={!method.formState.isDirty}
            />
        </TrailerTypes>
    );
}

import { hookFabric } from '@/utils/dialog-hook-fabric';
import TrailerTypesGrpcService from '@/@grpcServices/services/settings-service/trailer-types.service';
import { TrailerTypesCreateRequest, TrailerTypesGetReply_TrailerType } from '@proto/trailer.types';
import { useForm } from 'react-hook-form';
import defaultValues from '@/views/settings/tabs/Trailers/Types/dialogs/components/defaultValues';
import { yupResolver } from '@hookform/resolvers/yup';
import schema from '@/views/settings/tabs/Trailers/Types/dialogs/components/schema';
import DialogComponents from '@/@core/ui-kits/common-dialog';
import TrailerTypes from '@/views/settings/tabs/Trailers/Types/dialogs/components/TrailerTypeForm';

export const useEditTrailerTypeDialog = hookFabric(EditTrailerType);

type Props = {
    type: TrailerTypesGetReply_TrailerType;
};

function EditTrailerType({ type }: Props) {
    const dialog = useEditTrailerTypeDialog(true);
    const [updateType, { isLoading }] =
        TrailerTypesGrpcService.endpoints.updateTrailerType.useMutation();

    const values = {
        code: type.code,
        name: type.name,
        icon: type.icon
    };

    const method = useForm<TrailerTypesCreateRequest>({
        defaultValues,
        values,
        resolver: yupResolver(schema)
    });

    const submit = (values: TrailerTypesCreateRequest) => {
        updateType({
            trailerTypeId: type.trailerTypeId,
            ...values
        })
            .unwrap()
            .then(dialog.close);
    };

    return (
        <TrailerTypes
            method={method}
            submit={submit}
            title="modals:settings.trailer_types.edit.header.title"
        >
            <DialogComponents.CancelButton onCancel={dialog.close} />
            <DialogComponents.SubmitButton
                loading={isLoading}
                type="update"
                disabled={!method.formState.isDirty}
            />
        </TrailerTypes>
    );
}

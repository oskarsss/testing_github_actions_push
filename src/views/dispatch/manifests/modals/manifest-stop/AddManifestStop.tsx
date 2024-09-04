import DialogComponents from '@/@core/ui-kits/common-dialog';
import ManifestStopsGrpcService from '@/@grpcServices/services/manifests-service/manifest-stops.service';
import { hookFabric } from '@/utils/dialog-hook-fabric';
import { useForm } from 'react-hook-form';
import { ManifestStopTypeToGRPC } from '@/models/manifests/manifest-stop';
import { checkEndAt } from '@/views/dispatch/manifests/modals/load-stop/helpers';
import {
    defaultValues,
    DefaultValues
} from '@/views/dispatch/manifests/modals/manifest-stop/manifestStopHelpers';
import ManifestsTypes from '@/store/dispatch/manifests/types';
import Fields from './Fields';

type Props = {
    manifestId: string;
    sequence?: number;
    lastStopAppointmentStartAt?: string;
};

export const useAddManifestStopDialog = hookFabric(AddManifestStop, (props) => (
    <DialogComponents.DialogWrapper
        maxWidth="500px"
        paperStyle={{ overflow: 'hidden', paddingRight: 0 }}
        {...props}
    />
));

function AddManifestStop({
    manifestId,
    lastStopAppointmentStartAt = '',
    sequence
}: Props) {
    const [trigger, { isLoading }] = ManifestStopsGrpcService.useAddStopToManifestMutation();

    const methods = useForm<DefaultValues>({
        defaultValues: {
            ...defaultValues,
            appointmentStartAt: lastStopAppointmentStartAt,
            sequence          : sequence ?? 1
        }
    });

    const dialog = useAddManifestStopDialog(true);

    const submit = (data: DefaultValues) => {
        trigger({
            ...data,
            appointmentEndAt: checkEndAt(data),
            type            : ManifestStopTypeToGRPC[data.type],
            manifestId
        })
            .unwrap()
            .then(dialog.close);
    };

    return (
        <Fields
            methods={methods}
            submit={submit}
            originType={ManifestsTypes.OriginType.MANIFEST}
        >
            <DialogComponents.ActionsWrapper>
                <DialogComponents.CancelButton onCancel={dialog.close} />
                <DialogComponents.SubmitButton
                    disabled={!methods.formState.isDirty}
                    text="common:button.add"
                    loading={isLoading}
                />
            </DialogComponents.ActionsWrapper>
        </Fields>
    );
}

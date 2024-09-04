import { hookFabric } from '@/utils/dialog-hook-fabric';
import ManifestsGrpcService from '@/@grpcServices/services/manifests-service/manifests.service';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import NumericInput from '@/@core/fields/inputs/NumericInput';
import { Distance } from '@proto/models/distance';
import DialogComponents from '@/@core/ui-kits/common-dialog';
import Form from './components/Form';

type DefaultValues = {
    miles: number;
};

const schema: yup.ObjectSchema<DefaultValues> = yup.object().shape({
    miles: yup.number().required('common:validation.required')
});

export const useOverrideEditLoadedMilesDialog = hookFabric(OverrideEditLoadedMiles, (props) => (
    <DialogComponents.DialogWrapper
        maxWidth="530px"
        {...props}
    />
));

type Props = {
    manifestId: string;
    distance?: Distance;
};

function OverrideEditLoadedMiles({
    manifestId,
    distance
}: Props) {
    const dialog = useOverrideEditLoadedMilesDialog(true);
    const [updateLoadedDistance, { isLoading }] =
        ManifestsGrpcService.useUpdateLoadedDistanceMutation();

    const {
        control,
        handleSubmit,
        formState: { isDirty }
    } = useForm({
        defaultValues: {
            miles: 0
        },
        values: {
            miles: distance?.miles ?? 0
        },
        resolver: yupResolver(schema)
    });

    const submit = (payload: DefaultValues) => {
        updateLoadedDistance({
            manifestId,
            miles: payload.miles.toString()
        })
            .unwrap()
            .then(dialog.close);
    };

    return (
        <Form
            title="modals:manifests.edit.loaded_miles.header.title"
            amount={distance?.milesFormatted}
            description="modals:manifests.edit.loaded_miles.header.description"
            onSubmit={handleSubmit(submit)}
            isDirty={isDirty}
            isLoading={isLoading}
            onClose={dialog.close}
        >
            <NumericInput
                required
                control={control}
                name="miles"
                label="modals:manifests.edit.loaded_miles.fields.gross.label"
                placeholder="modals:manifests.edit.loaded_miles.fields.gross.placeholder"
                allowNegative={false}
            />
        </Form>
    );
}

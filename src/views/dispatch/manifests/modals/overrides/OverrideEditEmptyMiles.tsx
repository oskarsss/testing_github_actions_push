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

export const useOverrideEditEmptyMilesDialog = hookFabric(OverrideEditEmptyMiles, (props) => (
    <DialogComponents.DialogWrapper
        maxWidth="530px"
        {...props}
    />
));

type Props = {
    manifestId: string;
    distance?: Distance;
};

function OverrideEditEmptyMiles({
    manifestId,
    distance
}: Props) {
    const dialog = useOverrideEditEmptyMilesDialog(true);
    const [updateEmptyDistance, { isLoading }] =
        ManifestsGrpcService.useUpdateEmptyDistanceMutation();

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
        updateEmptyDistance({
            manifestId,
            miles: payload.miles.toString()

            // distance: {
            //     oneofKind: 'miles',
            //     miles    : payload.miles.toString()
            // }
        })
            .unwrap()
            .then(dialog.close);
    };

    return (
        <Form
            title="modals:manifests.edit.empty_miles.header.title"
            amount={distance?.milesFormatted}
            description="modals:manifests.edit.empty_miles.header.description"
            onSubmit={handleSubmit(submit)}
            isDirty={isDirty}
            isLoading={isLoading}
            onClose={dialog.close}
        >
            <NumericInput
                required
                control={control}
                name="miles"
                label="modals:manifests.edit.empty_miles.fields.gross.label"
                placeholder="modals:manifests.edit.empty_miles.fields.gross.placeholder"
                allowNegative={false}
            />
        </Form>
    );
}

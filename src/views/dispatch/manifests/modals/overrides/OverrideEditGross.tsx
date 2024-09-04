import { hookFabric } from '@/utils/dialog-hook-fabric';
import ManifestsGrpcService from '@/@grpcServices/services/manifests-service/manifests.service';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { Amount } from '@proto/models/amount';
import { CurrencyCode } from '@proto/models/currency_code';
import NumericInput from '@/@core/fields/inputs/NumericInput';
import { CURRENCY_SIGN } from '@/models/currency/currency';
import Form from './components/Form';

type DefaultValues = {
    grossAmount: number;
};

const schema: yup.ObjectSchema<DefaultValues> = yup.object().shape({
    grossAmount: yup.number().required('common:validation.required')
});

export const useOverrideEditGrossDialog = hookFabric(OverrideEditGross);

type Props = {
    manifestId: string;
    gross?: Amount;
};

function OverrideEditGross({
    manifestId,
    gross
}: Props) {
    const dialog = useOverrideEditGrossDialog(true);
    const [updateGross, { isLoading }] = ManifestsGrpcService.useUpdateGrossMutation();

    const {
        control,
        handleSubmit,
        formState: { isDirty }
    } = useForm({
        defaultValues: {
            grossAmount: 0
        },
        values: {
            grossAmount: gross?.amount ?? 0
        },
        resolver: yupResolver(schema)
    });

    const submit = (payload: DefaultValues) => {
        updateGross({
            manifestId,
            grossCurrency: gross?.currency ?? CurrencyCode.USD,
            grossAmount  : payload.grossAmount.toString()
        })
            .unwrap()
            .then(dialog.close);
    };

    return (
        <Form
            title="modals:manifests.edit.gross.header.title"
            amount={gross?.amountFormatted}
            description="modals:manifests.edit.gross.header.description"
            onSubmit={handleSubmit(submit)}
            isDirty={isDirty}
            isLoading={isLoading}
            onClose={dialog.close}
        >
            <NumericInput
                required
                control={control}
                name="grossAmount"
                label="modals:manifests.edit.gross.fields.gross.label"
                placeholder="modals:manifests.edit.gross.fields.gross.placeholder"
                allowNegative={false}
                startAdornment={CURRENCY_SIGN[gross?.currency || CurrencyCode.USD]}
            />
        </Form>
    );
}

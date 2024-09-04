import FullDialog from '@/@core/ui-kits/full-dialog';
import TruckSelect from '@/@core/fields/select/truck-select/TruckSelect';
import TrailersSelect from '@/@core/fields/select/trailer-select/TrailersSelect';
import TextInput from '@/@core/fields/inputs/TextInput';
import AmountInput from '@/@core/fields/inputs/AmountInput';
import DateInput from '@/@core/fields/inputs/DateInput';
import { Control, FieldErrors } from 'react-hook-form';
import { DefaultValues } from '@/views/accounting/tolls/dialogs/EditTollTransaction/helpers';
import { DocumentModel_DocumentEntityType } from '@proto/models/model_document';

type Props = {
    control: Control<DefaultValues>;
    errors: FieldErrors<DefaultValues>;
    selectedEntity:
        | DocumentModel_DocumentEntityType.TRUCK
        | DocumentModel_DocumentEntityType.TRAILER;
};

export default function EditTollTransactionFields({
    control,
    errors,
    selectedEntity
}: Props) {
    return (
        <FullDialog.Fields>
            <FullDialog.Field xs={12}>
                {selectedEntity === DocumentModel_DocumentEntityType.TRUCK ? (
                    <TruckSelect
                        control={control}
                        name="truck_id"
                    />
                ) : (
                    <TrailersSelect
                        control={control}
                        name="trailer_id"
                    />
                )}
            </FullDialog.Field>
            <FullDialog.Field xs={12}>
                <TextInput
                    width="100%"
                    control={control}
                    errors={errors}
                    label="fields:entry_plaza.label"
                    name="entry_plaza"
                    placeholder="fields:entry_plaza.placeholder"
                />
            </FullDialog.Field>
            <FullDialog.Field xs={13}>
                <TextInput
                    width="100%"
                    control={control}
                    errors={errors}
                    label="fields:exit_plaza.label"
                    name="exit_plaza"
                    placeholder="fields:exit_plaza.placeholder"
                />
            </FullDialog.Field>
            <FullDialog.Field xs={12}>
                <TextInput
                    width="100%"
                    control={control}
                    errors={errors}
                    label="fields:transponder_number.label"
                    name="transponder_number"
                    placeholder="fields:transponder_number.placeholder"
                />
            </FullDialog.Field>
            <FullDialog.Field xs={12}>
                <TextInput
                    width="100%"
                    control={control}
                    errors={errors}
                    label="fields:reference_id.label"
                    name="reference_id"
                    placeholder="fields:reference_id.placeholder"
                />
            </FullDialog.Field>
            <FullDialog.Field xs={12}>
                <AmountInput
                    width="100%"
                    control={control}
                    errors={errors}
                    label="fields:amount.label"
                    name="amount"
                    placeholder="fields:amount.placeholder"
                />
            </FullDialog.Field>

            <FullDialog.Field xs={6}>
                <DateInput
                    width="100%"
                    control={control}
                    errors={errors}
                    label="fields:entry_datetime.label"
                    name="entry_datetime"
                    type="datetime"
                />
            </FullDialog.Field>

            <FullDialog.Field xs={6}>
                <DateInput
                    width="100%"
                    control={control}
                    errors={errors}
                    label="fields:exit_datetime.label"
                    name="exit_datetime"
                    type="datetime"
                />
            </FullDialog.Field>

            <FullDialog.Field xs={12}>
                <DateInput
                    width="100%"
                    control={control}
                    errors={errors}
                    label="fields:posting_date.label"
                    name="posting_date"
                    type="date"
                />
            </FullDialog.Field>

            <FullDialog.Field xs={12}>
                <TextInput
                    width="100%"
                    control={control}
                    errors={errors}
                    label="fields:source.label"
                    name="source"
                    placeholder="fields:source.placeholder"
                />
            </FullDialog.Field>
            <FullDialog.Field xs={12}>
                <TextInput
                    width="100%"
                    control={control}
                    errors={errors}
                    label="fields:toll_agency.label"
                    name="toll_agency"
                    placeholder="fields:toll_agency.placeholder"
                />
            </FullDialog.Field>
        </FullDialog.Fields>
    );
}

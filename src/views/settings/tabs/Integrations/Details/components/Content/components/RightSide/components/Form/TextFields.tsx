import IntegrationDetailsComponents from '@/views/settings/tabs/Integrations/Details/components/IntegrationDetailsComponents';
import TextInput from '@/@core/fields/inputs/TextInput';
import { IntegrationProvider_Field } from '@proto/integrations';
import { Control, FieldErrors } from 'react-hook-form';
import type { IntlMessageKey } from '@/@types/next-intl';

type Props = {
    isEdit: boolean;
    textFields: IntegrationProvider_Field[];
    control: Control<{ [p: string]: string }>;
    errors: FieldErrors<{ [p: string]: string }>;
};

export default function TextFields({
    isEdit,
    textFields,
    control,
    errors
}: Props) {
    return (
        <IntegrationDetailsComponents.ColumnContent mb="8px">
            {textFields.map((field) => (
                <IntegrationDetailsComponents.Right.FieldWrap
                    isEdit={isEdit}
                    key={field.fieldId}
                >
                    <TextInput
                        control={control}
                        errors={errors}
                        label=""
                        labelWithoutTranslate={field.label}
                        name={field.fieldId}
                        placeholder=""
                        placeholderWithoutTranslate={field.description}
                        width="100%"
                        inputProps={{
                            readOnly    : !isEdit,
                            disabled    : !isEdit,
                            required    : field.required,
                            autoComplete: 'off'
                        }}
                    />
                </IntegrationDetailsComponents.Right.FieldWrap>
            ))}
        </IntegrationDetailsComponents.ColumnContent>
    );
}

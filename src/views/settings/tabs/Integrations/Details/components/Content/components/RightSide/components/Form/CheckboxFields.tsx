import FormControlLabel from '@mui/material/FormControlLabel';
import IntegrationDetailsComponents from '@/views/settings/tabs/Integrations/Details/components/IntegrationDetailsComponents';
import IntegrationProviderGrpcService from '@/@grpcServices/services/intergrations.service';
import { IntegrationProvider_Field } from '@proto/integrations';
import Checkbox from '@/@core/ui-kits/basic/checkbox/Checkbox';

type Props = {
    providerId: string;
    isEdit: boolean;
    checkboxFields: IntegrationProvider_Field[];
};

export default function CheckboxFields({
    providerId,
    isEdit,
    checkboxFields
}: Props) {
    const [updateFieldTrigger] =
        IntegrationProviderGrpcService.useUpdateIntegrationProviderFieldValueMutation();

    const updateFields = ({
        fieldId,
        fieldValue
    }: { fieldId: string; fieldValue: boolean }) => {
        updateFieldTrigger({
            fields               : [{ fieldId, value: fieldValue.toString() }],
            integrationProviderId: providerId
        });
    };

    return (
        <IntegrationDetailsComponents.RowContent
            flexWrap="wrap"
            gap={0}
            mb="8px"
        >
            {checkboxFields.map((field) => (
                <FormControlLabel
                    key={field.fieldId}
                    disabled={!isEdit}
                    checked={field.value === 'true'}
                    onChange={(event, value) => {
                        updateFields({
                            fieldId   : field.fieldId,
                            fieldValue: value
                        });
                    }}
                    control={<Checkbox />}
                    label={field.label}
                    sx={{
                        width    : '45%',
                        minHeight: '40px',
                        ml       : 0,
                        gap      : '6px'
                    }}
                />
            ))}
        </IntegrationDetailsComponents.RowContent>
    );
}

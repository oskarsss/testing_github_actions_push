import IntegrationDetailsComponents from '@/views/settings/tabs/Integrations/Details/components/IntegrationDetailsComponents';
import TextFields from '@/views/settings/tabs/Integrations/Details/components/Content/components/RightSide/components/Form/TextFields';
import CheckboxFields from '@/views/settings/tabs/Integrations/Details/components/Content/components/RightSide/components/Form/CheckboxFields';
import { useMemo, useState } from 'react';
import IntegrationProviderGrpcService from '@/@grpcServices/services/intergrations.service';
import { useForm } from 'react-hook-form';
import { IntegrationProvider } from '@proto/integrations';
import ButtonConnect from '@/views/settings/tabs/Integrations/Details/components/Content/components/RightSide/components/ButtonConnect';
import FormControls from '@/views/settings/tabs/Integrations/Details/components/Content/components/RightSide/components/Form/FormControls';
import { useAppTranslation } from '@/hooks/useAppTranslation';

type Props = {
    provider: IntegrationProvider;
};

export default function Form({ provider }: Props) {
    const { t } = useAppTranslation();
    const [isEdit, setIsEdit] = useState(false);

    const [updateFieldTrigger] =
        IntegrationProviderGrpcService.useUpdateIntegrationProviderFieldValueMutation();

    const defaultValues = useMemo(() => {
        const objDefaultValues: { [key: string]: string } = {};

        provider.fields.forEach((el) => {
            objDefaultValues[el.fieldId] = el.value;
        });

        return objDefaultValues;
    }, [provider]);

    const {
        control,
        handleSubmit,
        reset,
        formState: {
            errors,
            isDirty
        }
    } = useForm({
        defaultValues,
        values: defaultValues
    });

    const handleDisable = () => {
        setIsEdit((prev) => !prev);
        if (isDirty) reset();
    };

    const onSubmit = (data: { [key: string]: string }) => {
        updateFieldTrigger({
            fields: Object.entries(data).map(([key, value]) => ({
                fieldId: key,
                value
            })),
            integrationProviderId: provider.id
        })
            .unwrap()
            .then(() => {
                setIsEdit((prev) => !prev);
            });
    };

    const {
        textFields,
        checkboxFields
    } = useMemo(
        () => ({
            textFields    : provider.fields.filter((field) => field.type === 'text'),
            checkboxFields: provider.fields.filter((field) => field.type === 'checkbox')
        }),
        [provider.fields]
    );

    const hasFieldsTypeText = textFields.length > 0;

    const isEmptyForm =
        textFields.length === 0 &&
        checkboxFields.length === 0 &&
        !provider.drivers?.supported &&
        !provider.vehicles?.supported;

    const isConnected = provider.oauthRequired ? provider.oauthConnected : provider.connected;

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <IntegrationDetailsComponents.Right.Header>
                <IntegrationDetailsComponents.Right.Title>
                    {t('settings:integrations.details.right_side.form.buttons.finish_changing')}
                </IntegrationDetailsComponents.Right.Title>

                <IntegrationDetailsComponents.RowContent>
                    {isConnected && (
                        <FormControls
                            isEmptyForm={isEmptyForm}
                            isEdit={isEdit}
                            isDirty={isDirty}
                            hasFieldsTypeText={hasFieldsTypeText}
                            handleDisable={handleDisable}
                        />
                    )}

                    <ButtonConnect provider={provider} />
                </IntegrationDetailsComponents.RowContent>
            </IntegrationDetailsComponents.Right.Header>

            {textFields.length > 0 && (
                <TextFields
                    textFields={textFields}
                    control={control}
                    errors={errors}
                    isEdit={isEdit}
                />
            )}

            {checkboxFields.length > 0 && (
                <CheckboxFields
                    providerId={provider.id}
                    isEdit={isEdit}
                    checkboxFields={checkboxFields}
                />
            )}
        </form>
    );
}

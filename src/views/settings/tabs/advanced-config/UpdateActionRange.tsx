import ControlledCheckboxInput from '@/@core/fields/checkbox/ControlledCheckbox';
import NumericInput from '@/@core/fields/inputs/NumericInput';
import DialogComponents from '@/@core/ui-kits/common-dialog';
import CompaniesGrpcService from '@/@grpcServices/services/companies.service';
import { hookFabric } from '@/utils/dialog-hook-fabric';
import { ConfigKeyGetReply_ConfigKey } from '@proto/companies';
import { ConfigModel_ValueType } from '@proto/models/model_config';
import React, { useMemo } from 'react';
import { useForm } from 'react-hook-form';

type Props = {
    config: ConfigKeyGetReply_ConfigKey;
};

export const useUpdateActionRange = hookFabric(UpdateActionRange, (props) => (
    <DialogComponents.DialogWrapper
        {...props}
        maxWidth="490px"
    />
));

const prepareValue = (value: string, valueType: ConfigModel_ValueType) => {
    switch (valueType) {
    case ConfigModel_ValueType.CONFIG_VALUE_BOOL:
        return value === 'true';
    case ConfigModel_ValueType.CONFIG_VALUE_INT:
        return parseInt(value, 10);
    case ConfigModel_ValueType.CONFIG_VALUE_FLOAT:
        return parseFloat(value);
    default:
        return value;
    }
};

type FormValues = {
    value: number | boolean | string;
};

export default function UpdateActionRange({ config }: Props) {
    const [trigger, { isLoading }] = CompaniesGrpcService.useUpdateCompaniesConfigMutation();
    const dialog = useUpdateActionRange(true);
    const type = useMemo(() => {
        switch (config.valueType) {
        case ConfigModel_ValueType.CONFIG_VALUE_BOOL:
            return 'boolean';
        case ConfigModel_ValueType.CONFIG_VALUE_INT:
            return 'number';
        case ConfigModel_ValueType.CONFIG_VALUE_FLOAT:
            return 'number';
        default:
            return 'string';
        }
    }, [config.valueType]);

    const methods = useForm<FormValues>({
        defaultValues: {
            value: prepareValue(config.value, config.valueType)
        }
    });

    const submit = async (data: FormValues) => {
        await trigger({
            key  : config.key,
            value: data.value.toString()
        }).unwrap();
        dialog.close();
    };

    return (
        <DialogComponents.Form onSubmit={methods.handleSubmit(submit)}>
            <DialogComponents.Header
                translationOptions={{ actionName: config.name }}
                title="settings:advanced_config.dialog.edit.header.title"
            />
            <DialogComponents.Fields>
                <DialogComponents.Field xs={12}>
                    {type === 'boolean' ? (
                        <ControlledCheckboxInput
                            control={methods.control}
                            label="settings:advanced_config.dialog.edit.fields.enabled_range.label"
                            name="value"
                        />
                    ) : (
                        <NumericInput
                            control={methods.control}
                            label="settings:advanced_config.dialog.edit.fields.range.label"
                            name="value"
                            placeholder="settings:advanced_config.dialog.edit.fields.range.placeholder"
                        />
                    )}
                </DialogComponents.Field>
            </DialogComponents.Fields>
            <DialogComponents.ActionsWrapper>
                <DialogComponents.CancelButton onCancel={dialog.close} />

                <DialogComponents.SubmitButton
                    disabled={isLoading || !methods.formState.isDirty}
                    loading={isLoading}
                    type="update"
                />
            </DialogComponents.ActionsWrapper>
        </DialogComponents.Form>
    );
}

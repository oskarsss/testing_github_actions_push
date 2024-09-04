import DialogComponents from '@/@core/ui-kits/common-dialog';
import TextInput from '@/@core/fields/inputs/TextInput';
import React, { useMemo } from 'react';
import { UseFormReturn } from 'react-hook-form';
import type { IntlMessageKey } from '@/@types/next-intl';
import type { LoadTypeDefaultValue } from '@/views/settings/tabs/Loads/LoadTypes/dialogs/components/load-type-config';
import SelectInput from '@/@core/fields/inputs/SelectInput';
import { useAppTranslation } from '@/hooks/useAppTranslation';
import getLoadTypeIconsOptions from '@/views/settings/tabs/Loads/LoadTypes/dialogs/components/getLoadTypeIconsOptions';

type Props = {
    title: IntlMessageKey;
    method: UseFormReturn<LoadTypeDefaultValue>;
    children: React.ReactNode;
    submit: (body: LoadTypeDefaultValue) => void;
};

export default function LoadTypeForm({
    title,
    method,
    submit,
    children
}: Props) {
    const { t } = useAppTranslation();
    const {
        control,
        handleSubmit,
        formState: { errors }
    } = method;

    const loadTypeIconsOptions = useMemo(() => getLoadTypeIconsOptions(t), [t]);

    return (
        <DialogComponents.Form onSubmit={handleSubmit(submit)}>
            <DialogComponents.Header title={title} />
            <DialogComponents.Fields>
                <DialogComponents.Field xs={12}>
                    <TextInput
                        control={control}
                        errors={errors}
                        label="modals:settings.loads.load_types.fields.code.label"
                        name="code"
                        placeholder="modals:settings.loads.load_types.fields.code.placeholder"
                        type="text"
                        width="100%"
                        required
                    />
                </DialogComponents.Field>
                <DialogComponents.Field xs={12}>
                    <TextInput
                        control={control}
                        errors={errors}
                        label="modals:settings.loads.load_types.fields.name.label"
                        name="name"
                        placeholder="modals:settings.loads.load_types.fields.name.placeholder"
                        type="text"
                        width="100%"
                        required
                    />
                </DialogComponents.Field>
                <DialogComponents.Field xs={12}>
                    <SelectInput
                        control={control}
                        errors={errors}
                        label="modals:settings.loads.load_types.fields.icon.label"
                        name="icon"
                        width="100%"
                        options={loadTypeIconsOptions}
                        required
                    />
                </DialogComponents.Field>
            </DialogComponents.Fields>
            <DialogComponents.ActionsWrapper>{children}</DialogComponents.ActionsWrapper>
        </DialogComponents.Form>
    );
}

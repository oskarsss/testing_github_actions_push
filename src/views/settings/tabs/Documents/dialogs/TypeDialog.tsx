import { UseFormReturn } from 'react-hook-form';
import TextInput from '@/@core/fields/inputs/TextInput';
import SelectInput from '@/@core/fields/inputs/SelectInput';
import StateSelect from '@/@core/fields/select/StateSelect';
import CheckboxInput from '@/@core/fields/checkbox/CheckboxInput';
import { DefaultValues } from '@/views/settings/tabs/Documents/dialogs/helpers';
import DialogComponents from '@/@core/ui-kits/common-dialog';
import { getViewsEntity } from '@/views/settings/tabs/Documents/config';
import type { IntlMessageKey } from '@/@types/next-intl';
import { useAppTranslation } from '@/hooks/useAppTranslation';

type Props = {
    title: IntlMessageKey | string;
    method: UseFormReturn<DefaultValues>;
    children: React.ReactNode;
    submit: (body: DefaultValues) => void;
    isEdit?: boolean;
};

export default function TypeDialog({
    title,
    method,
    submit,
    children,
    isEdit
}: Props) {
    const { t } = useAppTranslation();
    const VIEWS_ENTITY = getViewsEntity(t);

    const {
        watch,
        control,
        handleSubmit,
        formState: { errors }
    } = method;

    const stateSupported = watch('state_supported');

    return (
        <DialogComponents.Form
            onSubmit={(e) => {
                e.preventDefault();
                e.stopPropagation();

                handleSubmit(submit)();
            }}
        >
            <DialogComponents.Header
                textVariant="h6"
                title={title}
            />
            <DialogComponents.Fields>
                <DialogComponents.Field xs={12}>
                    <TextInput
                        required
                        name="title"
                        label="settings:document_types.dialog.add_update_fields.title.label"
                        control={control}
                        errors={errors}
                        type="text"
                        placeholder="settings:document_types.dialog.add_update_fields.title.label"
                        width="100%"
                        autoFocus={!isEdit}
                    />
                </DialogComponents.Field>
                <DialogComponents.Field xs={12}>
                    <SelectInput
                        required
                        name="entity_type"
                        label="settings:document_types.dialog.add_update_fields.entity_type.label"
                        control={control}
                        errors={errors}
                        options={VIEWS_ENTITY.filter((i) => i.value)}
                        width="100%"
                    />
                </DialogComponents.Field>
                {Boolean(stateSupported) && (
                    <DialogComponents.Field xs={12}>
                        <StateSelect
                            name="state"
                            label="settings:document_types.dialog.add_update_fields.state.label"
                            control={control}
                            errors={errors}
                            width="100%"
                        />
                    </DialogComponents.Field>
                )}
                <DialogComponents.Field xs={12}>
                    <CheckboxInput
                        name="expirable"
                        label="settings:document_types.dialog.add_update_fields.expirable.label"
                        control={control}
                        errors={errors}
                    />
                </DialogComponents.Field>
                <DialogComponents.Field xs={12}>
                    <CheckboxInput
                        name="number_supported"
                        label="settings:document_types.dialog.add_update_fields.number_supported.label"
                        control={control}
                        errors={errors}
                    />
                </DialogComponents.Field>
                <DialogComponents.Field xs={12}>
                    <CheckboxInput
                        name="state_supported"
                        label="fields:state.label"
                        control={control}
                        errors={errors}
                    />
                </DialogComponents.Field>
                <DialogComponents.Field xs={12}>
                    <CheckboxInput
                        name="required"
                        label="fields:required.label"
                        control={control}
                        errors={errors}
                    />
                </DialogComponents.Field>
                <DialogComponents.Field xs={12}>
                    <CheckboxInput
                        name="status_supported"
                        label="fields:status.label"
                        control={control}
                        errors={errors}
                    />
                </DialogComponents.Field>
                <DialogComponents.Field xs={12}>
                    <CheckboxInput
                        name="can_driver_view"
                        label="settings:document_types.dialog.add_update_fields.can_driver_view.label"
                        control={control}
                        errors={errors}
                    />
                </DialogComponents.Field>
                <DialogComponents.Field xs={12}>
                    <CheckboxInput
                        name="can_driver_update"
                        label="settings:document_types.dialog.add_update_fields.can_driver_update.label"
                        control={control}
                        errors={errors}
                    />
                </DialogComponents.Field>
            </DialogComponents.Fields>
            {children}
        </DialogComponents.Form>
    );
}

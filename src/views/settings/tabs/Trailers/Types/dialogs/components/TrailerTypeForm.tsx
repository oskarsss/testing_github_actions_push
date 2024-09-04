import DialogComponents from '@/@core/ui-kits/common-dialog';
import TextInput from '@/@core/fields/inputs/TextInput';
import { UseFormReturn } from 'react-hook-form';
import { ReactNode } from 'react';
import SelectInput, { OptionsType } from '@/@core/fields/inputs/SelectInput';
import { TrailerTypesCreateRequest } from '@proto/trailer.types';
import { Stack } from '@mui/material';
import { getTrailerTypeIcon } from '@/@core/theme/entities/trailer/type';
import { TrailerModel_Type_Icon } from '@proto/models/model_trailer';
import type { IntlMessageKey } from '@/@types/next-intl';
import { useAppTranslation } from '@/hooks/useAppTranslation';
import { TRAILER_TYPE_TITLE_LIST } from './options';

type Props = {
    title: IntlMessageKey;
    method: UseFormReturn<TrailerTypesCreateRequest>;
    children: ReactNode;
    submit: (body: TrailerTypesCreateRequest) => void;
};

const Label = ({ icon }: { icon: TrailerModel_Type_Icon }) => {
    const { t } = useAppTranslation();
    return (
        <Stack
            direction="row"
            spacing={2}
        >
            {getTrailerTypeIcon(icon)}
            <span style={{ marginLeft: '7px' }}>
                {t(
                    `modals:settings.trailer_types.add_edit.fields.icon.icons_titles.${TRAILER_TYPE_TITLE_LIST[icon]}`
                )}
            </span>
        </Stack>
    );
};

const iconsOptions: OptionsType[] = [
    {
        value: TrailerModel_Type_Icon.DEFAULT,
        label: () => <Label icon={TrailerModel_Type_Icon.DEFAULT} />
    },
    {
        value: TrailerModel_Type_Icon.DRY_VAN,
        label: () => <Label icon={TrailerModel_Type_Icon.DRY_VAN} />
    },
    {
        value: TrailerModel_Type_Icon.REEFER,
        label: () => <Label icon={TrailerModel_Type_Icon.REEFER} />
    },
    {
        value: TrailerModel_Type_Icon.FLATBED,
        label: () => <Label icon={TrailerModel_Type_Icon.FLATBED} />
    },
    {
        value: TrailerModel_Type_Icon.STEP_DECK,
        label: () => <Label icon={TrailerModel_Type_Icon.STEP_DECK} />
    },
    {
        value: TrailerModel_Type_Icon.TANKER,
        label: () => <Label icon={TrailerModel_Type_Icon.TANKER} />
    },
    {
        value: TrailerModel_Type_Icon.RGN_LOW_BOY,
        label: () => <Label icon={TrailerModel_Type_Icon.RGN_LOW_BOY} />
    }
];

export default function TrailerTypes({
    title,
    method,
    submit,
    children
}: Props) {
    const {
        control,
        handleSubmit,
        formState: { errors }
    } = method;

    return (
        <DialogComponents.Form onSubmit={handleSubmit(submit)}>
            <DialogComponents.Header title={title} />
            <DialogComponents.Fields>
                <DialogComponents.Field xs={12}>
                    <TextInput
                        control={control}
                        errors={errors}
                        label="modals:settings.trailer_types.add_edit.fields.code.label"
                        name="code"
                        placeholder="modals:settings.trailer_types.add_edit.fields.code.placeholder"
                        type="text"
                        width="100%"
                        required
                    />
                </DialogComponents.Field>

                <DialogComponents.Field xs={12}>
                    <TextInput
                        control={control}
                        errors={errors}
                        label="modals:settings.trailer_types.add_edit.fields.name.label"
                        name="name"
                        placeholder="modals:settings.trailer_types.add_edit.fields.name.placeholder"
                        type="text"
                        width="100%"
                        required
                    />
                </DialogComponents.Field>

                <DialogComponents.Field xs={12}>
                    <SelectInput
                        control={control}
                        errors={errors}
                        label="modals:settings.trailer_types.add_edit.fields.icon.label"
                        name="icon"
                        width="100%"
                        required
                        options={iconsOptions}
                    />
                </DialogComponents.Field>
            </DialogComponents.Fields>
            <DialogComponents.ActionsWrapper>{children}</DialogComponents.ActionsWrapper>
        </DialogComponents.Form>
    );
}

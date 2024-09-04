import TextInput from '@/@core/fields/inputs/TextInput';
import DialogComponents from '@/@core/ui-kits/common-dialog';
import React, { PropsWithChildren } from 'react';
import { UseFormReturn } from 'react-hook-form';
import * as yup from 'yup';
import { Stack, Typography, createSvgIcon } from '@mui/material';
import type { IntlMessageKey, IntlOptions } from '@/@types/next-intl';
import { useAppTranslation } from '@/hooks/useAppTranslation';
import UploadLogo from './UploadLogo/UploadLogo';

export type TeamDefaultValues = {
    name: string;
    description: string;
    logoUrl: string;
};

export const schema: yup.ObjectSchema<TeamDefaultValues> = yup.object().shape({
    name       : yup.string().trim().required('Name is required'),
    description: yup.string().max(256).defined(),
    logoUrl    : yup.string().defined()
});

type Props = PropsWithChildren<{
    methods: UseFormReturn<TeamDefaultValues>;
    title: IntlMessageKey;
    translationOptions?: IntlOptions;
    submit: (body: TeamDefaultValues) => void;
}>;

const DetailsIcon = createSvgIcon(
    <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
    >
        <path
            d="M12 12.75C13.63 12.75 15.07 13.14 16.24 13.65C17.32 14.13 18 15.21 18 16.38V18H6V16.39C6 15.21 6.68 14.13 7.76 13.66C8.93 13.14 10.37 12.75 12 12.75ZM4 13C5.1 13 6 12.1 6 11C6 9.9 5.1 9 4 9C2.9 9 2 9.9 2 11C2 12.1 2.9 13 4 13ZM5.13 14.1C4.76 14.04 4.39 14 4 14C3.01 14 2.07 14.21 1.22 14.58C0.48 14.9 0 15.62 0 16.43V18H4.5V16.39C4.5 15.56 4.73 14.78 5.13 14.1ZM20 13C21.1 13 22 12.1 22 11C22 9.9 21.1 9 20 9C18.9 9 18 9.9 18 11C18 12.1 18.9 13 20 13ZM24 16.43C24 15.62 23.52 14.9 22.78 14.58C21.93 14.21 20.99 14 20 14C19.61 14 19.24 14.04 18.87 14.1C19.27 14.78 19.5 15.56 19.5 16.39V18H24V16.43ZM12 6C13.66 6 15 7.34 15 9C15 10.66 13.66 12 12 12C10.34 12 9 10.66 9 9C9 7.34 10.34 6 12 6Z"
            fill="currentColor"
        />
    </svg>,
    'DetailsIcon'
);

export default function TeamFields({
    methods,
    title,
    translationOptions,
    children,
    submit
}: Props) {
    const { t } = useAppTranslation();
    const {
        control,
        handleSubmit,
        formState: { errors }
    } = methods;

    return (
        <DialogComponents.Form onSubmit={handleSubmit(submit)}>
            <DialogComponents.Header
                title={title}
                translationOptions={translationOptions}
            />
            <DialogComponents.Fields>
                <DialogComponents.Field xs={12}>
                    <Stack
                        alignItems="center"
                        direction="row"
                        gap={2}
                    >
                        <DetailsIcon color="primary" />
                        <Typography
                            fontSize="16px"
                            fontWeight={600}
                            variant="body1"
                            sx={{
                                color: ({ palette }) => palette.semantic.text.primary
                            }}
                        >
                            {t('settings:teams.dialog.block_titles.details')}
                        </Typography>
                    </Stack>
                </DialogComponents.Field>
                <DialogComponents.Field xs={12}>
                    <TextInput
                        control={control}
                        errors={errors}
                        label="settings:teams.dialog.fields.name.label"
                        name="name"
                        placeholder="settings:teams.dialog.fields.name.placeholder"
                        type="text"
                        width="100%"
                        required
                    />
                </DialogComponents.Field>

                <DialogComponents.Field xs={12}>
                    <TextInput
                        control={control}
                        errors={errors}
                        label="settings:teams.dialog.fields.description.label"
                        name="description"
                        multiline
                        inputProps={{
                            maxRows: 4
                        }}
                        placeholder="settings:teams.dialog.fields.description.placeholder"
                        type="text"
                        width="100%"
                    />
                </DialogComponents.Field>
                <DialogComponents.Field xs={12}>
                    <UploadLogo
                        uploadType="image"
                        title="settings:teams.dialog.fields.logo_url.label"
                        isPrivate={false}
                        name="logoUrl"
                        control={control}
                    />
                </DialogComponents.Field>
            </DialogComponents.Fields>
            <DialogComponents.ActionsWrapper>{children}</DialogComponents.ActionsWrapper>
        </DialogComponents.Form>
    );
}

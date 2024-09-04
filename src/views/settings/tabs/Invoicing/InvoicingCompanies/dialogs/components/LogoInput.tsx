import { useUploadPublicFile } from '@/@grpcServices/services/app-sevices/storage-service/store-service-hooks';
import { Control, FieldErrors, useController } from 'react-hook-form';
import React, { ChangeEvent } from 'react';
import { InvoicingCompanyDefaultValue } from '@/views/settings/tabs/Invoicing/InvoicingCompanies/dialogs/config';
import { Button, Stack, Typography } from '@mui/material';
import { getPublicURL } from '@/configs/storage';
import { EmptyUrlLogoIcon } from '@/views/settings/tabs/Invoicing/FactoringCompanies/dialogs/FactoringCompanyForm/Sections/Details/components/UploadLogo/Logo';
import { useAppTranslation } from '@/hooks/useAppTranslation';
import type { IntlMessageKey } from '@/@types/next-intl';

type UploadButtonProps = {
    text: IntlMessageKey;
    uploadFile: (e: ChangeEvent<HTMLInputElement>) => void;
};

function UploadButton({
    text,
    uploadFile
}: UploadButtonProps) {
    const { t } = useAppTranslation();

    return (
        <div>
            <input
                accept="image/*"
                style={{ display: 'none' }}
                onChange={uploadFile}
                name="logoUrl"
                value=""
                id="logoUrl-button-file"
                type="file"
            />
            <label htmlFor="logoUrl-button-file">
                <Button
                    variant="outlined"
                    component="span"
                    sx={{ padding: '0px 8px' }}
                >
                    {t(text)}
                </Button>
            </label>
        </div>
    );
}

type Props = {
    control: Control<InvoicingCompanyDefaultValue>;
    errors: FieldErrors<InvoicingCompanyDefaultValue>;
};

export default function LogoInput({
    control,
    errors
}: Props) {
    const { t } = useAppTranslation();

    const { uploadPublicFile } = useUploadPublicFile();
    const {
        field: {
            value,
            onChange
        },
        fieldState: { error }
    } = useController({ name: 'logoUrl', control });
    const uploadFile = (e: ChangeEvent<HTMLInputElement>) => {
        const { files } = e.target;

        uploadPublicFile(files).then(({ filePath }) => {
            onChange(filePath);
        });
    };

    // const handleDeleteFile = () => {
    //     onChange('');
    // };

    const src = getPublicURL(value || '');

    return (
        <Stack
            direction="row"
            gap="12px"
        >
            <Stack
                alignItems="center"
                justifyContent="center"
                width={60}
                height={60}
                borderRadius="8px"
                border={(theme) => `1px solid ${theme.palette.semantic.border.secondary}`}
            >
                {value ? (
                    <img
                        src={src}
                        alt="logoUrl"
                        style={{
                            maxWidth    : '58px',
                            width       : '58px',
                            objectFit   : 'contain',
                            borderRadius: '6px',
                            height      : '58px'
                        }}
                    />
                ) : (
                    <EmptyUrlLogoIcon />
                )}
            </Stack>

            <Stack gap="8px">
                <Typography
                    fontSize="16px"
                    fontWeight={600}
                >
                    {t('modals:settings.invoicing.invoicing_companies.fields.labels.logo')}
                </Typography>
                <Stack
                    direction="row"
                    gap="8px"
                    justifyContent="space-between"
                >
                    <UploadButton
                        text={value ? 'common:button.change' : 'common:button.upload'}
                        uploadFile={uploadFile}
                    />

                    {/* {value && ( */}
                    {/*     <Button */}
                    {/*         variant="outlined" */}
                    {/*         color="error" */}
                    {/*         onClick={handleDeleteFile} */}
                    {/*         sx={{ padding: '0px 8px' }} */}
                    {/*     > */}
                    {/*         {t('common:button.clear')} */}
                    {/*     </Button> */}
                    {/* )} */}
                </Stack>
                {error && (
                    <Typography
                        fontSize="12px"
                        color={(theme) => theme.palette.semantic.text.error}
                    >
                        {t('common:validation.required')}
                    </Typography>
                )}
            </Stack>
        </Stack>
    );
}

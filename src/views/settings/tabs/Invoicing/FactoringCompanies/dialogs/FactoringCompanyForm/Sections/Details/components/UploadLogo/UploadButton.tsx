import { Button } from '@mui/material';
import type { ChangeEvent } from 'react';
import { useAppTranslation } from '@/hooks/useAppTranslation';
import FormHelperText from '@mui/material/FormHelperText';
import { useFactoringCompanyFormContext } from '@/views/settings/tabs/Invoicing/FactoringCompanies/dialogs/FactoringCompanyForm/FactoringCompanyForm';
import type { IntlMessageKey } from '@/@types/next-intl';

export enum ButtonName {
    LOGO_FILE_ID = 'logoFileId',
    NOA_FILE_ID = 'noaFileId'
}

export type UploadType = 'image' | 'noa';

const acceptedUploadType: Record<UploadType, string> = {
    image: 'image/*',
    noa  : 'application/pdf,image/*'
};

type Props = {
    name: ButtonName;
    text: IntlMessageKey;
    uploadType: UploadType;
    uploadFile: ({ target: { files } }: ChangeEvent<HTMLInputElement>) => void;
};

export default function UploadButton({
    name,
    text,
    uploadType,
    uploadFile
}: Props) {
    const { t } = useAppTranslation();
    const {
        formState: { errors }
    } = useFactoringCompanyFormContext();

    return (
        <>
            <div>
                <input
                    accept={acceptedUploadType[uploadType]}
                    style={{ display: 'none' }}
                    onChange={uploadFile}
                    name={name}
                    value=""
                    id={`${name}-button-file`}
                    type="file"
                />
                <label htmlFor={`${name}-button-file`}>
                    <Button
                        variant="outlined"
                        component="span"
                        sx={{ padding: '0px 8px' }}
                    >
                        {t(text)}
                    </Button>
                </label>
            </div>
            {errors[name] && (
                <FormHelperText
                    error={Boolean(errors[name])}
                    id={`stepper-linear-${name}`}
                >
                    <span>{errors[name]?.message}</span>
                </FormHelperText>
            )}
        </>
    );
}

import { Button } from '@mui/material';
import type { ChangeEvent } from 'react';
import FormHelperText from '@mui/material/FormHelperText';
import { useController } from 'react-hook-form';
import { useAppTranslation } from '@/hooks/useAppTranslation';

export enum ButtonText {
    UPLOAD = 'common:button.upload',
    CHANGE = 'common:button.change'
}

export type UploadType = 'image' | 'noa';

const acceptedUploadType: Record<UploadType, string> = {
    image: 'image/*',
    noa  : 'application/pdf,image/*'
};

type Props = {
    name: string;
    control: any;
    text: ButtonText;
    uploadType: UploadType;
    uploadFile: ({ target: { files } }: ChangeEvent<HTMLInputElement>) => void;
};

export default function UploadButton({
    name,
    text,
    uploadType,
    uploadFile,
    control
}: Props) {
    const { t } = useAppTranslation();
    const {
        field: { value },
        fieldState: { error }
    } = useController({ name, control });

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
            {error && (
                <FormHelperText
                    error={Boolean(error)}
                    id={`stepper-linear-${name}`}
                >
                    <span>{error?.message}</span>
                </FormHelperText>
            )}
        </>
    );
}

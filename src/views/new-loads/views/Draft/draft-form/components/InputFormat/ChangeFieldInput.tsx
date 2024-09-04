import React, { memo } from 'react';
import { Path, useController } from 'react-hook-form';
import { TextField } from '@mui/material';
import DraftsTypes from '@/store/drafts/types';
import { applyTestId } from '@/configs/tests';
import { IntlMessageKey } from '@/@types/next-intl';
import { useAppTranslation } from '@/hooks/useAppTranslation';
import MilesFormat from './MilesFormat';
import { useDraftFormContext } from '../../../Draft';

type Props = {
    name: Path<DraftsTypes.Fields>;

    // value: number;
    label: IntlMessageKey;
    testID?: string;
    required?: boolean;
};

const ChangeFieldInput = ({
    name,
    label,
    required = false,
    testID = ''
}: Props) => {
    const { control } = useDraftFormContext();
    const { t } = useAppTranslation();

    const {
        field: {
            ref,
            ...textFieldProps
        },
        fieldState: { error }
    } = useController({ name, control });

    return (
        <TextField
            style={{ width: '100%' }}
            label={t(label)}
            error={!!error?.message}
            helperText={error?.message}
            variant="standard"
            required={required}
            InputProps={{
                inputProps: {
                    autoComplete: 'off',
                    ...applyTestId(testID)
                },

                inputComponent: MilesFormat as never
            }}
            InputLabelProps={{
                shrink: true
            }}
            {...textFieldProps}
            inputRef={ref}
        />
    );
};

export default memo(ChangeFieldInput);

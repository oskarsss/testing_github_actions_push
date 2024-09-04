import { FormControl, FormHelperText, TextField, styled } from '@mui/material';
import { OutlinedInputProps } from '@mui/material/OutlinedInput';
import { applyTestId } from '@/configs/tests';
import { Control, Path, useController } from 'react-hook-form';
import { LoadDraftFields } from '@proto/load_drafts';
import { ChangeEvent } from 'react';
import { useAppTranslation } from '@/hooks/useAppTranslation';
import { formatAmountFormattingToNumber } from '@/utils/formatting';
import { IntlMessageKey } from '@/@types/next-intl';

export const EditTableInput = styled(TextField)(({ theme }) => ({
    '& input::-webkit-clear-button, & input::-webkit-outer-spin-button, & input::-webkit-inner-spin-button':
        {
            display: 'none'
        },
    '& .MuiInputBase-input': {
        textAlign   : 'right',
        paddingRight: '8px'
    },
    '& .MuiInputBase-root': {
        height                  : '24px',
        fontSize                : 'inherit',
        fontWeight              : '500',
        gap                     : '5px',
        boxShadow               : '0px 1px 2px 0px #1018280D',
        background              : theme.palette.semantic.foreground.white.tertiary,
        '&.Mui-focused fieldset': {
            borderColor: theme.palette.semantic.border.secondary
        }
    }
}));

type Props = {
    name: Path<LoadDraftFields>;
    control: Control<LoadDraftFields>;
    inputProps?: Partial<OutlinedInputProps>;
    placeholder: IntlMessageKey;
    testID?: string;
};

export default function TableInput({
    inputProps,
    placeholder,
    testID = '',
    control,
    name
}: Props) {
    const { t } = useAppTranslation();
    const {
        field: {
            onChange,
            value
        },
        fieldState: { error }
    } = useController({
        name,
        control
    });

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value ? formatAmountFormattingToNumber(e.target.value) : 0;
        onChange(value);
    };

    return (
        <FormControl>
            <EditTableInput
                id="standard-basic"
                value={value ? value.toString() : null}
                variant="outlined"
                size="small"
                placeholder={t(placeholder)}
                onChange={onChangeHandler}
                InputProps={{
                    ...inputProps,
                    disableUnderline: true,
                    inputProps      : {
                        step        : '1',
                        autoComplete: 'off',
                        ...applyTestId(testID)
                    }
                }}
            />
            {error && (
                <FormHelperText
                    error
                    sx={{ margin: '0px' }}
                    id={`stepper-linear-${name}`}
                >
                    <span>{error?.message}</span>
                </FormHelperText>
            )}
        </FormControl>
    );
}

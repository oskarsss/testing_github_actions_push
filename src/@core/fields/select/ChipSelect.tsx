/* eslint-disable react/jsx-props-no-multi-spaces */
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import { Control, Controller, FieldValues, FieldPath, FieldErrors } from 'react-hook-form';
import Select from '@mui/material/Select';
import OutlinedInput from '@mui/material/OutlinedInput';
import Box from '@mui/material/Box';
import { Chip, FilledInput } from '@mui/material';
import MenuItem from '@mui/material/MenuItem';
import * as React from 'react';
import FormHelperText from '@mui/material/FormHelperText';
import type { IntlMessageKey } from '@/@types/next-intl';
import { useAppTranslation } from '@/hooks/useAppTranslation';

type OptionType = {
    id: string;
    title: string;
};

interface ChipSelectProps<TFieldValues extends FieldValues = FieldValues> {
    control?: Control<TFieldValues>;
    errors?: FieldErrors<TFieldValues>;
    width: React.CSSProperties['width'];
    name: FieldPath<TFieldValues>;
    options: OptionType[];
    label: IntlMessageKey;
    readOnly?: boolean;
    readOnlyValue?: string[] | number[];
    disabled?: boolean;
    required?: boolean;
    variant?: 'outlined' | 'filled' | 'standard';
}

export default function ChipSelect<TFieldValues extends FieldValues = FieldValues>({
    control,
    errors,
    width = '50%',
    readOnly = false,
    name,
    label,
    options,
    readOnlyValue,
    disabled = false,
    required = false,
    variant = 'filled'
}: ChipSelectProps<TFieldValues>) {
    const { t } = useAppTranslation();
    if (readOnly) {
        return (
            <FormControl style={{ width }}>
                <InputLabel
                    required={required}
                    id={`select-chip-input-${name}`}
                    htmlFor={`select-chip-input-${name}`}
                >
                    {t(label)}
                </InputLabel>
                <Select
                    readOnly={readOnly}
                    variant="filled"

                    // @ts-ignore
                    value={readOnlyValue}
                    label={t(label)}
                    labelId={`select-chip-input-${name}`}
                    aria-describedby={`select-chip-input-${name}`}
                    multiple
                    sx={{
                        '.MuiSvgIcon-root': {
                            visibility: 'hidden'
                        },
                        '&.MuiInputBase-readOnly': {
                            pointerEvents: 'none'
                        }
                    }}
                    input={(
                        <OutlinedInput
                            size="small"
                            id={`select-chip-input-${name}`}
                            label={t(label)}
                            style={{ minHeight: '56px' }}
                        />
                    )}
                    renderValue={(selected) => (
                        <Box
                            sx={{
                                display : 'flex',
                                flexWrap: 'wrap',
                                gap     : 0.5
                            }}
                        >
                            {selected.map((val) => {
                                // @ts-ignore
                                const selected_doc = options.find((el) => el.id === val);
                                return (
                                    <Chip
                                        key={val}
                                        label={selected_doc?.title}
                                    />
                                );
                            })}
                        </Box>
                    )}
                    MenuProps={{
                        PaperProps: {
                            style: {
                                maxHeight: 48 * 4.5 + 8,
                                width    : 250
                            }
                        }
                    }}
                >
                    {options.map((tag) => (
                        <MenuItem
                            key={tag.id}
                            value={tag.id}
                        >
                            {tag.title}
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>
        );
    }
    if (errors && control) {
        return (
            <FormControl style={{ width }}>
                <InputLabel
                    required={required}
                    id={`select-chip-input-${name}`}
                    error={Boolean(errors[name])}
                    htmlFor={`select-chip-input-${name}`}
                >
                    {t(label)}
                </InputLabel>
                <Controller
                    name={name}
                    control={control}
                    render={({ field: {
                        value,
                        onChange
                    } }) => (
                        <Select
                            readOnly={readOnly}
                            variant={variant}
                            value={value}
                            onChange={onChange}
                            label={t(label)}
                            disabled={disabled}
                            error={Boolean(errors.chip)}
                            labelId={`select-chip-input-${name}`}
                            aria-describedby={`select-chip-input-${name}`}
                            multiple
                            sx={{
                                '&.MuiInputBase-readOnly': {
                                    pointerEvents: 'none'
                                }
                            }}
                            input={(
                                <FilledInput
                                    id={`select-chip-input-${name}`}
                                    style={{ minHeight: '56px' }}
                                />
                            )}
                            renderValue={(selected) => (
                                <Box
                                    sx={{
                                        display : 'flex',
                                        flexWrap: 'wrap',
                                        gap     : 0.5
                                    }}
                                >
                                    {selected.map((val: string) => {
                                        const selected_doc = options.find((el) => el.id === val);
                                        return (
                                            <Chip
                                                key={val}
                                                label={selected_doc?.title}
                                            />
                                        );
                                    })}
                                </Box>
                            )}
                            MenuProps={{
                                PaperProps: {
                                    style: {
                                        maxHeight: 48 * 4.5 + 8,
                                        width    : 250
                                    }
                                }
                            }}
                        >
                            {options.map((tag) => (
                                <MenuItem
                                    key={tag.id}
                                    value={tag.id}
                                >
                                    {tag.title}
                                </MenuItem>
                            ))}
                        </Select>
                    )}
                />
                {errors[name] && (
                    <FormHelperText
                        error
                        id={`select-chip-input-${name}`}
                    >
                        <span>{errors[name]?.message as string}</span>
                    </FormHelperText>
                )}
            </FormControl>
        );
    }
    // eslint-disable-next-line react/jsx-no-useless-fragment
    return <></>;
}

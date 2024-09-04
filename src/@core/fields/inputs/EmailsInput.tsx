/* eslint-disable no-nested-ternary */

import React, { CSSProperties, useState } from 'react';
import { Control, ErrorOption, Path, useController } from 'react-hook-form';
import { MuiChipsInput } from 'mui-chips-input';
import FormControl from '@mui/material/FormControl';
import FormHelperText from '@mui/material/FormHelperText';
import Tooltip from '@mui/material/Tooltip';
// eslint-disable-next-line import/no-unresolved
import { FieldValues } from 'react-hook-form/dist/types/fields';
import { InputProps } from '@mui/material/Input/Input';
import { emailRegex } from '@/@core/fields/emailRegex';
import useCopyToClipboard from '@/utils/copy-to-clipboard';
import type { IntlMessageKey } from '@/@types/next-intl';
import { useAppTranslation } from '@/hooks/useAppTranslation';

interface Props<TFieldValues extends FieldValues = FieldValues> {
    control: Control<TFieldValues>;
    errors: { [P in keyof TFieldValues]?: ErrorOption };
    name: Path<TFieldValues>;
    label: IntlMessageKey;
    placeholder: IntlMessageKey;
    width?: CSSProperties['width'];
    inputProps?: InputProps;
    variant?: 'filled' | 'outlined' | 'standard';
    size?: 'small' | 'medium';
    disabled?: boolean;
    disableEdition?: boolean;
    hideClearAll?: boolean;
    required?: boolean;
    autoFocus?: boolean;
    isEdit?: boolean;
}

export default function EmailsInput<TFieldValues extends FieldValues = FieldValues>({
    control,
    errors,
    label,
    name,
    placeholder,
    width = '50%',
    inputProps = {},
    variant = 'filled',
    size = 'small',
    disabled = false,
    disableEdition = false,
    hideClearAll = false,
    required = false,
    autoFocus = false,
    isEdit = false
}: Props<TFieldValues>) {
    const { t } = useAppTranslation();
    const [isClick, setIsClick] = useState(false);
    const [timeoutIndicator, setTimeoutIndicator] = useState<NodeJS.Timeout | undefined>();
    const copy = useCopyToClipboard();
    const {
        field: {
            value,
            onChange
        }
    } = useController({
        name,
        control
    });

    const validate = (value: string) => {
        let textError = '';
        const chips = value
            .split(',')
            .map((chip) => chip.trim())
            .filter((chipTrim) => chipTrim.length > 0);

        chips.forEach((chip) => {
            if (chip.length >= 254) {
                textError = t('common:validation.least_characters_long', {
                    name  : t('common:email').toLowerCase(),
                    length: 254
                });
            }
            if (!emailRegex.test(chip)) {
                textError = t('common:validation.invalid_email');
            }
        });

        return {
            isError: Boolean(textError),
            textError
        };
    };

    const handleMouseLeave = () => {
        setTimeout(() => {
            setIsClick(false);
        }, 500);
    };

    const formatValue =
        typeof value === 'string' ? value.split(',').filter(Boolean) : value.filter(Boolean);
    const handleChange = (value: string[]) => {
        onChange(value.filter(Boolean));
    };

    return (
        <FormControl
            style={{ width }}
            sx={{
                '& .MuiInputBase-root': {
                    paddingLeft  : variant === 'standard' ? '0 !important' : '10px',
                    paddingTop   : variant === 'filled' ? '24px !important' : '0 !important',
                    paddingBottom: '0 !important'
                },
                input: {
                    padding: size === 'small' ? '1px 0 5px !important' : '4px 0 5px !important'
                }
            }}
        >
            <MuiChipsInput
                variant={variant}
                required={required}
                disabled={disabled}
                disableEdition={disableEdition}
                hideClearAll={hideClearAll}
                label={t(label)}
                placeholder={isEdit ? t(placeholder) : value?.length ? '' : '-'}
                size={size}
                error={Boolean(errors[name])}
                InputProps={{
                    ...inputProps,
                    autoFocus,
                    sx: {
                        ...inputProps.sx,
                        input: {
                            display: disableEdition && value ? 'none' : 'block'
                        }
                    }
                }}
                InputLabelProps={{
                    shrink: true
                }}
                value={formatValue}
                onChange={handleChange}
                addOnBlur
                onKeyDown={(e) => e.stopPropagation()}
                validate={validate}
                renderChip={(Component, key, props) => (
                    <Tooltip
                        key={key}
                        title={isClick ? t('common:copy.copied') : t('common:copy.tooltip')}
                        placement="top"
                    >
                        <span>
                            <Component
                                {...props}
                                onMouseLeave={handleMouseLeave}
                                onClick={() => {
                                    clearTimeout(timeoutIndicator);
                                    const indicator = setTimeout(() => {
                                        copy(props.label);
                                        setIsClick(true);
                                    }, 250);
                                    setTimeoutIndicator(indicator);
                                }}
                                onDoubleClick={() => {
                                    clearTimeout(timeoutIndicator);
                                    if (!disableEdition) props.onEdit(props.index);
                                }}
                            />
                        </span>
                    </Tooltip>
                )}
            />
            {errors[name] && (
                <FormHelperText
                    error
                    id={`stepper-linear-${name}`}
                >
                    <span>{errors[name]?.message}</span>
                </FormHelperText>
            )}
        </FormControl>
    );
}

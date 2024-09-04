/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */

import TextField, { TextFieldProps } from '@mui/material/TextField';
import Tooltip from '@mui/material/Tooltip';
import { Control, FieldValues, Path, useController } from 'react-hook-form';
import FormControl from '@mui/material/FormControl';
import FormHelperText from '@mui/material/FormHelperText';
import React, { useEffect, useMemo, useState } from 'react';
import FuelGrpcService from '@/@grpcServices/services/fuel.service';
import { useEditFuelTransactionDialog } from '@/views/accounting/fuel/Table/dialogs/EditFuelTransaction/EditFuelTransaction';
import debounce from 'lodash/debounce';
import { useAppTranslation } from '@/hooks/useAppTranslation';
import { IntlMessageKey } from '@/@types/next-intl';

type Props<TFieldValues extends FieldValues = FieldValues> = {
    control: Control<TFieldValues>;
    name: Path<TFieldValues>;
    size?: TextFieldProps['size'];
    variant?: TextFieldProps['variant'];
    label?: IntlMessageKey;
    placeholder?: string;
    fuelTransactionId?: string;
};

export default function FuelReferenceIDField<TFieldValues extends FieldValues = FieldValues>({
    control,
    name,
    size = 'small',
    variant = 'filled',
    label = 'modals:fuels.fields.reference_id.label',
    placeholder = '1224',
    fuelTransactionId = ''
}: Props<TFieldValues>) {
    const editFuelDialog = useEditFuelTransactionDialog();
    const { t } = useAppTranslation();
    const [fuelTransactionIdDuplicate, setFuelTransactionId] = useState('');

    const [checkDuplicate, { originalArgs }] = FuelGrpcService.useCheckDuplicateMutation();

    const {
        field: {
            value,
            ref: inputRef,
            onBlur,
            onChange
        },
        fieldState
    } = useController({ control, name });

    const getDuplicate = useMemo(
        () =>
            debounce((referenceId: string) => {
                if (!referenceId) {
                    setFuelTransactionId('');
                    return;
                }

                checkDuplicate({
                    referenceId
                })
                    .unwrap()
                    .then((res) => {
                        if (res.fuelTransactionId === fuelTransactionId) {
                            setFuelTransactionId('');
                            return;
                        }
                        setFuelTransactionId(res.fuelTransactionId);
                    })
                    .catch(() => {
                        setFuelTransactionId('');
                    });
            }, 1000),
        [checkDuplicate, fuelTransactionId]
    );

    useEffect(() => {
        getDuplicate(value?.trim());
    }, [value, getDuplicate]);

    const onEditFuel = () => {
        editFuelDialog.open({
            fuelTransactionId: fuelTransactionIdDuplicate
        });
    };

    return (
        <FormControl style={{ width: '100%' }}>
            <TextField
                type="text"
                variant={variant}
                label={t(label)}
                placeholder={placeholder}
                name={name}
                value={value}
                InputProps={{
                    ref: inputRef
                }}
                InputLabelProps={{
                    shrink: true
                }}
                onChange={onChange}
                onBlur={onBlur}
                size={size}
                error={Boolean(fieldState.error || fuelTransactionIdDuplicate)}
                onKeyDown={(e) => e.stopPropagation()}
            />
            {(!!fieldState.error || fuelTransactionIdDuplicate) && (
                <FormHelperText
                    error
                    id="stepper-linear-reference_id"
                >
                    {fuelTransactionIdDuplicate ? (
                        <span>
                            {`${t('modals:fuels.fields.reference_id.duplicate.error')} `}
                            <Tooltip
                                placement="top"
                                title={t('modals:fuels.fields.reference_id.duplicate.tooltip')}
                            >
                                <span
                                    onClick={onEditFuel}
                                    style={{
                                        color         : 'inherit',
                                        fontWeight    : 'bold',
                                        textDecoration: 'underline',
                                        cursor        : 'pointer'
                                    }}
                                >
                                    {fuelTransactionIdDuplicate
                                        ? originalArgs?.referenceId
                                        : fieldState.error?.message}
                                </span>
                            </Tooltip>
                        </span>
                    ) : (
                        fieldState.error?.message
                    )}
                </FormHelperText>
            )}
        </FormControl>
    );
}

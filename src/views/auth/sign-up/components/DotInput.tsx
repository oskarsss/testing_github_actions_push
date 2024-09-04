import { FormControl, TextField, useMediaQuery } from '@mui/material';
import {
    Control,
    UseFormClearErrors,
    UseFormSetError,
    UseFormSetValue,
    useController
} from 'react-hook-form';
import { renderError } from '@/utils/render-error';
import { useAppDispatch } from '@/store/hooks';
import { debounce } from 'lodash';
import RegisterGrpcService from '@/@grpcServices/services/register.service';
import { useEffect } from 'react';
import { useAppTranslation } from '@/hooks/useAppTranslation';
import { SignUpDefaultValues } from './schema';
import SingUpStyled from '../SignUp.styled';

type Props = {
    control: Control<SignUpDefaultValues, any>;
    setValue: UseFormSetValue<SignUpDefaultValues>;
    setError: UseFormSetError<SignUpDefaultValues>;
    clearErrors: UseFormClearErrors<SignUpDefaultValues>;
};

function DotInput({
    control,
    setValue,
    setError,
    clearErrors
}: Props) {
    const { t } = useAppTranslation();
    const tabMediaQuery = useMediaQuery('(min-width:768px)');
    const dispatch = useAppDispatch();
    const {
        field: {
            value,
            ref: inputRef,
            onBlur
        },
        fieldState
    } = useController({ control, name: 'dot' });

    const [getDot, {
        data,
        error,
        isSuccess,
        isError,
        isLoading
    }] =
        RegisterGrpcService.useGetByDotMutation();

    const resetLocationValues = () => {
        setValue('company_name', '');
        setValue('location_id_line2', '');
        setValue('location_id_city', '');
        setValue('location_id_line1', '');
        setValue('location_id_postal_code', '');
        setValue('location_id_state', '');
    };

    const fetchGetDot = (value: number) => {
        getDot({
            dot: value
        })
            .unwrap()
            .then((data) => {
                setValue('dot', data.dot);
                setValue('company_name', data.name);
                setValue('location_id_city', data.addressCity);
                setValue('location_id_line1', data.addressLine1);
                setValue('location_id_postal_code', data.addressPostalCode);
                setValue('location_id_state', data.addressState);
                clearErrors('dot');
                clearErrors('location_id_state');
                clearErrors('location_id_postal_code');
                clearErrors('location_id_line1');
                clearErrors('location_id_city');
                clearErrors('location_id_line2');
                clearErrors('company_name');
            })
            .catch((error) => {
                setValue('dot', value);
                setError('dot', {
                    type   : 'manual',
                    message: 'Carrier not found'
                });
                resetLocationValues();
            });
    };

    const changeDot = debounce((value: number) => {
        if (!value) {
            dispatch(RegisterGrpcService.util.resetApiState());
            resetLocationValues();
            clearErrors('dot');
            setValue('dot', 0);
            return;
        }
        fetchGetDot(value);
    }, 1000);

    useEffect(() => {
        if (value) {
            fetchGetDot(value);
        }
    }, []);

    console.debug('dot error', error, isError);

    return (
        <>
            <FormControl style={{ width: tabMediaQuery ? '244px' : '35%' }}>
                <TextField
                    type="number"
                    variant="filled"
                    placeholder={t('fields:dot.placeholder')}
                    label={t('fields:dot.label')}
                    defaultValue={value || null}
                    InputProps={{
                        sx: {
                            '& input[type=number]': {
                                '-moz-appearance': 'textfield'
                            },
                            '& input[type=number]::-webkit-outer-spin-button': {
                                '-webkit-appearance': 'none',
                                margin              : 0
                            },
                            '& input[type=number]::-webkit-inner-spin-button': {
                                '-webkit-appearance': 'none',
                                margin              : 0
                            }
                        },
                        ref: inputRef
                    }}
                    InputLabelProps={{
                        shrink: true
                    }}
                    onChange={(e) => changeDot((e.target.value && Number(e.target.value)) || 0)}
                    onBlur={onBlur}
                    size="medium"
                    error={Boolean(fieldState.error)}
                    aria-describedby="stepper-linear-dot"
                    onKeyDown={(e) => e.stopPropagation()}
                />
            </FormControl>
            <SingUpStyled.DotInfo>
                {!isLoading && !!value && (
                    <span style={{ color: 'red' }}>{error ? renderError(error) : ''}</span>
                )}
                {isLoading && <span>{`${t('common:loading')}...`}</span>}
                {isSuccess && !isLoading && !!value && (
                    <>
                        <span style={{ fontWeight: 700 }}>
                            {data?.name || ''}
                            <br />
                        </span>
                        <span>
                            {data?.addressLine1 || ''}
                            <br />
                            {`${data?.addressCity || ''}, ${data?.addressState || ''} ${
                                data?.addressPostalCode || ''
                            }`}
                        </span>
                    </>
                )}
            </SingUpStyled.DotInfo>
        </>
    );
}

export default DotInput;

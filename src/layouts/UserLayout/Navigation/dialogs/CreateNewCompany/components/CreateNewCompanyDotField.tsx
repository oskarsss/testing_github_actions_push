import { UseFormReturn, useWatch } from 'react-hook-form';
import { CreateNewCompanyDefaultValues } from '@/layouts/UserLayout/Navigation/dialogs/CreateNewCompany/helpers';
import RegisterGrpcService from '@/@grpcServices/services/register.service';
import { useEffect, useMemo } from 'react';
import { renderError } from '@/utils/render-error';
import { debounce } from 'lodash';
import NumericInput from '@/@core/fields/inputs/NumericInput';
import CircularProgress from '@mui/material/CircularProgress';

type Props = {
    methods: UseFormReturn<CreateNewCompanyDefaultValues>;
};

export default function CreateNewCompanyDotField({ methods }: Props) {
    const {
        control,
        setValue,
        setError,
        clearErrors
    } = methods;

    const [getDot, {
        error,
        isLoading
    }] = RegisterGrpcService.useGetByDotMutation();

    const changeDot = useMemo(
        () =>
            debounce((value: number) => {
                const resetLocationValues = () => {
                    setValue('company_name', '');
                    setValue('location_id_line2', '');
                    setValue('location_id_city', '');
                    setValue('location_id_line1', '');
                    setValue('location_id_postal_code', '');
                    setValue('location_id_state', '');
                };

                if (!value) {
                    resetLocationValues();
                    clearErrors('dot');
                    return;
                }
                getDot({ dot: value })
                    .unwrap()
                    .then((data) => {
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
                    .catch(resetLocationValues);
            }, 1000),
        [clearErrors, getDot, setValue]
    );

    useEffect(() => {
        if (error) {
            setError('dot', {
                type   : 'manual',
                message: renderError(error)
            });
        }
    }, [error, setError]);

    const dot = useWatch({ name: 'dot', control });

    useEffect(() => {
        changeDot(dot);
    }, [changeDot, dot]);

    return (
        <NumericInput
            control={control}
            name="dot"
            label="fields:dot.label"
            placeholder="fields:dot.placeholder"
            allowNegative={false}
            decimalScale={0}
            endAdornment={isLoading ? <CircularProgress size="20px" /> : undefined}
        />
    );
}

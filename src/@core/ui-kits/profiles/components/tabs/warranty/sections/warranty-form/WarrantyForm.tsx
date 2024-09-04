import { Stack } from '@mui/material';
import { memo, useCallback, useEffect, useMemo, useRef } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import {
    DefaultWarrantyValues,
    kindOfWarrantyPeriod,
    warrantySchema
} from '@/@core/ui-kits/profiles/components/tabs/warranty/utils';
import VehicleWarrantyGrpcService from '@/@grpcServices/services/vehicle-warranty.service';
import { VehicleWarrantyModel_VehicleWarranty } from '@proto/models/model_vehicle_warranty';
import { debounce, isEqual } from 'lodash';
import WarrantyFields from '@/@core/ui-kits/profiles/components/tabs/warranty/reusable/WarrantyFields';
import toast from 'react-hot-toast';
import { renderError } from '@/utils/render-error';
import WarrantyUpdatingProcess from '@/@core/ui-kits/profiles/components/tabs/warranty/sections/warranty-form/WarrantyUpdatingProcess';

const debounceDelay = 1000;

type Props = {
    vehicleWarranty: VehicleWarrantyModel_VehicleWarranty;
};

function WarrantyForm({ vehicleWarranty }: Props) {
    const [warrantyUpdate, warrantyUpdateState] =
        VehicleWarrantyGrpcService.useWarrantyUpdateMutation();

    const values: DefaultWarrantyValues = useMemo(
        () => ({
            startedAt    : vehicleWarranty.startedAt,
            distanceMiles: vehicleWarranty.distanceMiles,
            period       : vehicleWarranty.period,
            periodUnits  : vehicleWarranty.periodUnits
        }),
        [vehicleWarranty]
    );

    const {
        control,
        watch,
        setValue,
        formState: { errors },
        handleSubmit
    } = useForm<DefaultWarrantyValues>({
        defaultValues: {
            startedAt    : '',
            distanceMiles: 0,
            period       : 0,
            periodUnits  : kindOfWarrantyPeriod.WARRANTY_PERIOD_UNITS_UNSPECIFIED
        },
        values,
        resolver: yupResolver(warrantySchema)
    });

    useEffect(() => {
        if (warrantyUpdateState.isError && warrantyUpdateState.error) {
            toast.error(renderError(warrantyUpdateState.error), {
                position: 'top-right',
                duration: 2500
            });
        }
    }, [warrantyUpdateState.error, warrantyUpdateState.isError]);

    const submit = useCallback(
        (data: DefaultWarrantyValues) => {
            warrantyUpdate({
                vehicleWarrantyId: vehicleWarranty.vehicleWarrantyId,
                ...(data.periodUnits && {
                    periodUnits: data.periodUnits
                }),
                ...(data.startedAt && {
                    startedAt: data.startedAt
                }),
                ...(data.distanceMiles && {
                    distanceMiles: data.distanceMiles
                }),
                ...(data.period && {
                    period: data.period
                })
            }).unwrap();
        },
        [vehicleWarranty.vehicleWarrantyId, warrantyUpdate]
    );

    const previousFormValues = useRef<DefaultWarrantyValues>();

    useEffect(() => {
        const debouncedSave = debounce(submit, debounceDelay);
        const subscription = watch((value) => {
            if (!value.period && value.periodUnits) {
                setValue('periodUnits', kindOfWarrantyPeriod.WARRANTY_PERIOD_UNITS_UNSPECIFIED);
            }

            if (!isEqual(previousFormValues?.current, value)) {
                previousFormValues.current = value;
                handleSubmit(debouncedSave)();
            }
        });

        return () => {
            subscription.unsubscribe();
            debouncedSave.cancel();
        };
    }, [submit, watch, handleSubmit, setValue]);

    return (
        <Stack
            flex={1}
            minWidth="250px"
            position="relative"
        >
            <WarrantyFields
                control={control}
                errors={errors}
            />

            <WarrantyUpdatingProcess isUpdating={warrantyUpdateState.isLoading} />
        </Stack>
    );
}

export default memo(WarrantyForm);

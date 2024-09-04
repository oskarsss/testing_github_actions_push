import DialogComponents from '@/@core/ui-kits/common-dialog';
import TextInput from '@/@core/fields/inputs/TextInput';
import { TestIDs } from '@/configs/tests';
import DriverTypesSelect from '@/@core/fields/select/DriverTypesSelect';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useAppTranslation } from '@/hooks/useAppTranslation';
import { useDriversTypes } from '@/store/fleet/drivers/hooks';
import { useEffect } from 'react';
import { hookFabric } from '@/utils/dialog-hook-fabric';
import DriversGrpcService from '@/@grpcServices/services/drivers.service';
import { useAppDispatch } from '@/store/hooks';
import { DriversDataActions } from '@/store/storage/drivers/slice';

type DefaultValues = {
    first_name: string;
    last_name: string;
    driver_type_id: string;
};

const new_type_schema: yup.ObjectSchema<DefaultValues> = yup.object().shape({
    first_name    : yup.string().trim().required(),
    last_name     : yup.string().trim().defined(),
    driver_type_id: yup.string().defined()
});

export const useCreateDriverDialog = hookFabric(CreateDriver);

type Props = {
    onSuccessfulCreate?: (driverId: string) => void;
};

function CreateDriver({ onSuccessfulCreate }: Props) {
    const { t } = useAppTranslation();
    const dialog = useCreateDriverDialog(true);
    const [createDriver, { isLoading }] = DriversGrpcService.useCreateDriverMutation();
    const { driverTypes } = useDriversTypes();
    const dispatch = useAppDispatch();

    const {
        control,
        setValue,
        handleSubmit,
        formState: {
            errors,
            isDirty
        }
    } = useForm({
        defaultValues: {
            first_name    : '',
            last_name     : '',
            driver_type_id: ''
        },
        resolver: yupResolver(new_type_schema)
    });

    useEffect(() => {
        if (driverTypes?.length) {
            const default_type = driverTypes.find((type) => type.isDefault);
            if (default_type) {
                setValue('driver_type_id', default_type.driverTypeId);
            }
        }
    }, [driverTypes?.length]);

    const submit = (data: DefaultValues) => {
        createDriver({
            firstName   : data.first_name,
            lastName    : data.last_name,
            driverTypeId: data.driver_type_id
        })
            .unwrap()
            .then((response) => {
                dialog.close().then(() => {
                    const { driver } = response;
                    if (onSuccessfulCreate) {
                        if (driver) {
                            dispatch(
                                DriversDataActions.UpdateDriver({
                                    driver,
                                    isCacheUpdate: false
                                })
                            );
                            onSuccessfulCreate(driver.driverId);
                        }
                    }
                });
            });
    };

    return (
        <DialogComponents.Form onSubmit={handleSubmit(submit)}>
            <DialogComponents.Header title="common:actions.add_driver" />
            <DialogComponents.Fields>
                <DialogComponents.Field xs={12}>
                    <TextInput
                        control={control}
                        errors={errors}
                        testID={TestIDs.pages.fleetDrivers.fields.driversFirstName}
                        label="fields:first_name.label"
                        name="first_name"
                        placeholder="fields:first_name.placeholder"
                        width="100%"
                        autoFocus
                        required
                    />
                </DialogComponents.Field>

                <DialogComponents.Field xs={12}>
                    <TextInput
                        control={control}
                        errors={errors}
                        testID={TestIDs.pages.fleetDrivers.fields.driversLastName}
                        label="fields:last_name.label"
                        name="last_name"
                        placeholder="fields:last_name.placeholder"
                        width="100%"
                    />
                </DialogComponents.Field>

                <DialogComponents.Field xs={12}>
                    <DriverTypesSelect
                        control={control}
                        name="driver_type_id"
                        required
                        optionTestId={TestIDs.components.select.driverType.optionPrefix}
                        testID={TestIDs.pages.fleetDrivers.fields.driversType}
                        size="small"
                    />
                </DialogComponents.Field>
            </DialogComponents.Fields>

            <DialogComponents.ActionsWrapper>
                <DialogComponents.CancelButton
                    onCancel={dialog.close}
                    testID={TestIDs.pages.fleetDrivers.buttons.cancelAddingDriver}
                />
                <DialogComponents.SubmitButton
                    loading={isLoading}
                    type="create"
                    testID={TestIDs.pages.fleetDrivers.buttons.confirmAddingDriver}
                    disabled={!isDirty}
                />
            </DialogComponents.ActionsWrapper>
        </DialogComponents.Form>
    );
}

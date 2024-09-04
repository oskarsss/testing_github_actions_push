import { ReactNode, SyntheticEvent, useCallback, useEffect, useMemo, useState } from 'react';
import { useForm, useFormContext } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import DriversTypes from '@/store/fleet/drivers/types';
import FullDialog from '@/@core/ui-kits/full-dialog';
import DriversGrpcService from '@/@grpcServices/services/drivers.service';
import { DriverUpdateRequest } from '@proto/drivers';
import type { IntlMessageKey } from '@/@types/next-intl';
import { useUpdateFormTags } from '@/store/tags/hooks';
import { DriverModel_Driver } from '@proto/models/model_driver';
import { useVendorsMap } from '@/store/hash_maps/hooks';
import moment from 'moment-timezone';
import EditDriverHeader from './components/EditDriverHeader';
import { useEditDriverDialog } from './EditDriver';
import { edit_driver_schema } from './schema';
import EditDriverBasic from './tabs/EditDriverBasic';
import EditTruckFinancial from './tabs/EditDriverFinancial';

export type EditDriverChangeTab = (event: SyntheticEvent<Element>, newValue: number) => void;

export type EditDriverDefaultValues = Omit<DriverUpdateRequest, 'driverId' | 'addressCountry'> & {
    tags: string[];
};

export const useEditDriverForm = () => useFormContext<EditDriverDefaultValues>();

type Props = {
    driver: DriverModel_Driver;
    document_id: string;
    refetch: () => void;
};

const defaultValues: EditDriverDefaultValues = {
    firstName              : '',
    middleName             : '',
    lastName               : '',
    phoneNumber            : '',
    email                  : '',
    friendlyName           : '',
    addressLine1           : '',
    addressLine2           : '',
    addressCity            : '',
    addressState           : '',
    addressPostalCode      : '',
    dobDate                : '',
    hireDate               : '',
    settlementRevenueTypeId: '',
    settlementCycleId      : '',
    payoutReceiver         : 0,
    driverTypeId           : '',
    vendorId               : '',
    fuelCardNumber         : '',
    tags                   : []
};

type EditDriverTab = {
    label: IntlMessageKey;
    value: number;
    Component: ({
        driver,
        document_id,
        refetch
    }: Props) => ReactNode;
};

export const EDIT_DRIVERS_TABS: EditDriverTab[] = [
    {
        label    : 'modals:drivers.edit.header.tabs.basic',
        value    : 0,
        Component: EditDriverBasic
    },
    {
        label    : 'modals:drivers.edit.header.tabs.financial',
        value    : 1,
        Component: EditTruckFinancial
    }
];

export default function EditDriverForm({
    driver,
    document_id,
    refetch
}: Props) {
    const [tabValue, setTabValue] = useState(0);
    const vendor = useVendorsMap(driver.vendorId);

    const editDriverDialog = useEditDriverDialog(true);

    const [updateDriver] = DriversGrpcService.useUpdateDriverMutation();
    const {
        tagIds,
        updateFormTags
    } = useUpdateFormTags('DRIVER', driver.driverId);

    const dataValues: EditDriverDefaultValues = useMemo(
        () => ({
            firstName              : driver.firstName,
            middleName             : driver.middleName,
            lastName               : driver.lastName,
            phoneNumber            : driver.phoneNumber,
            email                  : driver.email,
            friendlyName           : driver.friendlyName,
            addressLine1           : driver.addressLine1,
            addressLine2           : driver.addressLine2,
            addressCity            : driver.addressCity,
            addressState           : driver.addressState,
            addressPostalCode      : driver.addressPostalCode,
            dobDate                : moment(driver.dobDate).isValid() ? driver.dobDate : '',
            hireDate               : moment(driver.hireDate).isValid() ? driver.hireDate : '',
            settlementRevenueTypeId: driver.settlementRevenueTypeId,
            settlementCycleId      : driver.settlementCycleId,
            payoutReceiver         : driver.payoutReceiver,
            driverTypeId           : driver.driverTypeId,
            tags                   : tagIds,
            vendorId               : driver.vendorId,
            fuelCardNumber         : ''
        }),
        [
            driver.addressCity,
            driver.addressLine1,
            driver.addressLine2,
            driver.addressPostalCode,
            driver.addressState,
            driver.dobDate,
            driver.driverTypeId,
            driver.email,
            driver.friendlyName,
            driver.firstName,
            driver.hireDate,
            driver.lastName,
            driver.middleName,
            driver.phoneNumber,
            driver.payoutReceiver,
            driver.settlementCycleId,
            driver.settlementRevenueTypeId,
            tagIds,
            driver.vendorId
        ]
    );

    const methods = useForm<EditDriverDefaultValues>({
        defaultValues,
        values  : dataValues,
        resolver: yupResolver<EditDriverDefaultValues>(edit_driver_schema)
    });

    const {
        handleSubmit,
        formState: { isDirty }
    } = methods;

    const save = useCallback(
        (data: EditDriverDefaultValues) => {
            updateFormTags(data.tags);

            return updateDriver({
                driverId: driver.driverId,
                ...data
            }).unwrap();
        },
        [updateFormTags, driver.driverId, updateDriver]
    );

    useEffect(() => {
        editDriverDialog.confirmDialog.setDirty(isDirty, {
            confirm_text    : 'common:button.save_and_close',
            delete_text     : 'common:button.close',
            max_width_dialog: '500px',
            onConfirm       : handleSubmit(save),
            onDelete        : () => {}
        });
    }, [isDirty, save]);

    const onChangeTab = (_: SyntheticEvent<Element>, newValue: number) => {
        setTabValue(newValue);
    };

    return (
        <FullDialog.Form
            save={save}
            methods={methods}
        >
            <EditDriverHeader
                isUpdating={false}
                tabValue={tabValue}
                onChangeTab={onChangeTab}
                driver={driver}
                onClose={editDriverDialog.close}
            />

            {EDIT_DRIVERS_TABS.map(
                ({
                    Component,
                    value
                }) =>
                    value === tabValue && (
                        <Component
                            driver={driver}
                            document_id={document_id}
                            refetch={refetch}
                        />
                    )
            )}
        </FullDialog.Form>
    );
}

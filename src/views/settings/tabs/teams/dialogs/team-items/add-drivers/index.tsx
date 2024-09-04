import DialogComponents from '@/@core/ui-kits/common-dialog';
import TeamsGrpcService from '@/@grpcServices/services/teams.service';
import { hookFabric } from '@/utils/dialog-hook-fabric';
import { yupResolver } from '@hookform/resolvers/yup';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { useStableArray } from '@/hooks/useStable';
import { DriverModel_Status } from '@proto/models/model_driver';
import { useDriversMap } from '@/store/storage/drivers/hooks/common';
import ChipAutocomplete, { FilterOptions } from '../ChipAutocomplete';
import DriverOption from './Option';
import DriverLabel from './Label';
import BrandCheckbox from '../../../../../../../@core/ui-kits/basic/brand-checkbox/BrandCheckbox';

type Props = { teamId: string; existDrivers: string[] };

export const useAddDriverToTeamDialog = hookFabric(AddDriver, (props) => (
    <DialogComponents.DialogWrapper
        {...props}
        turnOffCloseButton
        maxWidth="500px"
    />
));

type DefaultValues = {
    driverIds: string[];
};
const schema: yup.ObjectSchema<DefaultValues> = yup.object().shape({
    driverIds: yup.array().of(yup.string().required()).required('Select at least one driver')
        .min(1)
});

export default function AddDriver({
    teamId,
    existDrivers
}: Props) {
    const [showDeleted, setShowDeleted] = useState(false);
    const [trigger] = TeamsGrpcService.useCreateTeamDriverMutation();
    const driversMap = useDriversMap();

    const driversList = useStableArray(
        Object.values(driversMap)
            .filter((driver) => showDeleted || driver.status !== DriverModel_Status.DELETED)
            .map((driver) => driver.driverId)
            .filter((driverId) => !existDrivers.includes(driverId))
    );

    const dialog = useAddDriverToTeamDialog(true);
    const methods = useForm<DefaultValues>({
        defaultValues: {
            driverIds: []
        },
        resolver: yupResolver(schema)
    });

    const submit = async (data: DefaultValues) => {
        await trigger({
            driversId: data.driverIds,
            teamId
        });
        dialog.close();
    };

    const filterOptions: FilterOptions = (options, state) => {
        const inputValue = state.inputValue.toLowerCase();
        return options.reduce((acc, option) => {
            const driver = driversMap[option];
            const searched = `${`${driver.firstName}${driver.lastName}`}${driver.phoneNumber}${
                driver.status
            }`
                .toLowerCase()
                .includes(inputValue);
            if (searched) acc.push(option);
            return acc;
        }, [] as string[]);
    };

    return (
        <DialogComponents.Form onSubmit={methods.handleSubmit(submit)}>
            <DialogComponents.Header title="settings:teams.team_items.dialog.create.drivers.header.title">
                <BrandCheckbox
                    label="settings:teams.team_items.dialog.create.drivers.fields.show_deleted_drivers.label"
                    checked={showDeleted}
                    setCheck={setShowDeleted}
                    sx={{ width: 'auto' }}
                />
            </DialogComponents.Header>
            <DialogComponents.Fields>
                <DialogComponents.Field xs={12}>
                    <ChipAutocomplete
                        filterOptions={filterOptions}
                        OptionComponent={DriverOption}
                        label="settings:teams.team_items.dialog.create.drivers.fields.driver_ids.label"
                        control={methods.control}
                        name="driverIds"
                        dataMap={driversMap}
                        listIds={driversList}
                        maxTags={10}
                        LabelComponent={DriverLabel}
                    />
                </DialogComponents.Field>
            </DialogComponents.Fields>
            <DialogComponents.ActionsWrapper>
                <DialogComponents.CancelButton onCancel={dialog.close} />
                <DialogComponents.SubmitButton
                    loading={false}
                    text="common:button.add"
                    disabled={!methods.formState.isDirty}
                />
            </DialogComponents.ActionsWrapper>
        </DialogComponents.Form>
    );
}

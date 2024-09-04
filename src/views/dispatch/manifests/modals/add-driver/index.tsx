/* eslint-disable array-callback-return */
/* eslint-disable max-len */
import DialogComponents from '@/@core/ui-kits/common-dialog';
import { hookFabric } from '@/utils/dialog-hook-fabric';
import { IconButton, List, ListItem, Stack, TextField } from '@mui/material';
import { FormEvent, useMemo, useState } from 'react';
import CloseIcon from '@mui/icons-material/Close';
import { useAppTranslation } from '@/hooks/useAppTranslation';
import ManifestsGrpcService from '@/@grpcServices/services/manifests-service/manifests.service';
import DriversGrpcService from '@/@grpcServices/services/drivers.service';
import { DriverModel_Driver, DriverModel_Status } from '@proto/models/model_driver';
import { styled } from '@mui/material/styles';
import { useAppSelector } from '@/store/hooks';
import { DriversDataSelectors } from '@/store/storage/drivers/slice';
import DriverItem from './DriverItem';

const ListOptions = styled(List, {
    shouldForwardProp: (prop) => prop !== 'visibility'
})<{ visibility: boolean }>(({
    theme,
    visibility
}) => ({
    cursor   : 'pointer',
    overflow : 'auto',
    maxHeight: '300px',
    display  : visibility ? 'block' : 'none',
    li       : {
        padding     : '8px',
        borderBottom: `1px solid ${theme.palette.semantic.border.secondary}`
    }
}));

export const useAssignDriverToManifestDialog = hookFabric(AddDriverToManifest, (props) => (
    <DialogComponents.DialogWrapper
        maxWidth="480px"
        {...props}
    />
));

type Props = {
    manifestId: string;
    existDrivers: string[];
};

function AddDriverToManifest({
    manifestId,
    existDrivers
}: Props) {
    // const { data } = DriversGrpcService.endpoints.getDrivers.useQueryState({});
    const drivers = useAppSelector(DriversDataSelectors.getRows);
    const dialog = useAssignDriverToManifestDialog(true);
    const [search, setSearch] = useState('');
    const [selectedDriver, setSelectedDriver] = useState<null | DriverModel_Driver>(null);
    const [createDriverPay, { isLoading }] =
        ManifestsGrpcService.useAssignDriverToManifestMutation();
    const { t } = useAppTranslation();

    const createSettlement = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!selectedDriver) return;
        createDriverPay({
            driverId: selectedDriver.driverId,
            manifestId
        })
            .unwrap()
            .then(dialog.close);
    };

    const drivers_options = useMemo(
        () =>
            drivers.filter(
                (driver) =>
                    `${driver.firstName} ${driver.lastName}`
                        .toLowerCase()
                        .includes(search.toLowerCase()) &&
                    !existDrivers.some((existId) => existId === driver.driverId) &&
                    driver.status !== DriverModel_Status.DELETED
            ),
        [drivers, existDrivers, search]
    );

    const onSelect = (option: DriverModel_Driver) => {
        setSelectedDriver((prev) => {
            if (prev?.driverId === option.driverId) {
                setSearch('');
                return null;
            }
            setSearch(`${option.firstName} ${option.lastName}`);
            return option;
        });
    };

    const clearSelected = () => {
        setSearch('');
        setSelectedDriver(null);
    };

    const onChangeSearch = (e: FormEvent<HTMLInputElement>) => {
        const { value } = e.target as HTMLInputElement;
        setSearch(value);
        if (value === '') {
            clearSelected();
        }
    };

    return (
        <DialogComponents.Form onSubmit={createSettlement}>
            <Stack
                display="flex"
                flexDirection="column"
                justifyContent="space-between"
                minHeight="500px"
            >
                <div>
                    <DialogComponents.Header title="common:actions.add_driver" />
                    <TextField
                        fullWidth
                        autoComplete="off"
                        sx={{ position: 'sticky' }}
                        label={t('entity:driver')}
                        variant="filled"
                        value={search}
                        autoFocus
                        InputProps={{
                            endAdornment: search && (
                                <IconButton onClick={clearSelected}>
                                    <CloseIcon />
                                </IconButton>
                            )
                        }}
                        onInput={onChangeSearch}
                    />
                    <ListOptions visibility>
                        {drivers_options?.length > 0 ? (
                            drivers_options.map((option) => (
                                <DriverItem
                                    selected_id={selectedDriver?.driverId}
                                    key={option.driverId}
                                    onClick={() => onSelect(option)}
                                    item={option}
                                />
                            ))
                        ) : (
                            <ListItem>
                                {t(
                                    'modals:loads.edit_load.driver_pay_items.dialogs.create_driver_pay.no_drivers'
                                )}
                            </ListItem>
                        )}
                    </ListOptions>
                </div>

                <DialogComponents.ActionsWrapper>
                    <DialogComponents.CancelButton onCancel={dialog.close} />
                    <DialogComponents.SubmitButton
                        loading={isLoading}
                        disabled={!selectedDriver}
                        text="common:button.add"
                    />
                </DialogComponents.ActionsWrapper>
            </Stack>
        </DialogComponents.Form>
    );
}

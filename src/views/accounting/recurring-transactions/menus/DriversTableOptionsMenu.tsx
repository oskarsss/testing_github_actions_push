import MenuComponents from '@/@core/ui-kits/menus';
import SettlementsTypes from '@/store/accounting/settlements/types';
import React from 'react';
import EditIcon from '@mui/icons-material/Edit';
import AddBoxIcon from '@mui/icons-material/AddBox';
import { menuHookFabric } from '@/utils/menu-hook-fabric';
import { useEditDriverDialog } from '@/views/fleet/drivers/dialogs/EditDriver/EditDriver';
import { useEditTrailerDialog } from '@/views/fleet/trailers/dialogs/EditTrailer/EditTrailer';
import { useEditTruckDialog } from '@/views/fleet/trucks/dialogs/EditTruck/EditTruck';
import { useCreateRecurringTransactionDialog } from './RecurringTransactionsMenu/Add/CreateRecurringTrasaction';

type Props = {
    row: SettlementsTypes.RecurringTransactions.ConvertedDriverTransactionRow;
};

export const useDriversRecurringTransactionsOptionsMenu = menuHookFabric(DriversTableOptionsMenu);

function DriversTableOptionsMenu({ row }: Props) {
    const createTransactionDialog = useCreateRecurringTransactionDialog();
    const editDriverDialog = useEditDriverDialog();
    const editTrailerDialog = useEditTrailerDialog();
    const editTruckDialog = useEditTruckDialog();

    const optionsMenu = useDriversRecurringTransactionsOptionsMenu(true);

    const onClickAddTransaction = () => {
        createTransactionDialog.open({
            category_type  : 'debit',
            setDialogStyled: true,
            category_id    : '',
            driver         : {
                id  : row.driverId,
                name: `${row.firstName} ${row.lastName}`
            }
        });
        optionsMenu.close();
    };

    const onClickEditDriver = () => {
        editDriverDialog.open({
            driver_id: row.driverId
        });
        optionsMenu.close();
    };

    const onClickEditTrailer = () => {
        editTrailerDialog.open({
            trailer_id: row.trailerId
        });
        optionsMenu.close();
    };

    const onClickEditTruck = () => {
        editTruckDialog.open({
            truck_id: row.truckId
        });
        optionsMenu.close();
    };

    return (
        <MenuComponents.List>
            <MenuComponents.Item
                text="recurring_transactions:tables.driver.options_menu.add_transactions"
                Icon={<AddBoxIcon />}
                onClick={onClickAddTransaction}
            />
            <MenuComponents.Item
                Icon={<EditIcon />}
                text="recurring_transactions:tables.driver.options_menu.edit_driver"
                onClick={onClickEditDriver}
            />
            <MenuComponents.Item
                disabled={!row.truckId}
                text="recurring_transactions:tables.driver.options_menu.edit_truck"
                Icon={<EditIcon />}
                onClick={onClickEditTruck}
            />
            <MenuComponents.Item
                disabled={!row.trailerId}
                Icon={<EditIcon />}
                text="recurring_transactions:tables.driver.options_menu.edit_trailer"
                onClick={onClickEditTrailer}
            />
        </MenuComponents.List>
    );
}

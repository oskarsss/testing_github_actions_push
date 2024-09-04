import TableContainer from '@mui/material/TableContainer';
import SettlementsTypes from '@/store/accounting/settlements/types';
import { useAddItemDialog } from '@/views/settings/tabs/Settlements/RevenueTypes/dialogs/ItemDialog/AddItemDialog';
import { useEditItemDialog } from '@/views/settings/tabs/Settlements/RevenueTypes/dialogs/ItemDialog/EditItemDialog';
import { TableWrapper } from '@/views/settings/components/styled';
import MiniTable from '@/@core/ui-kits/basic/mini-table/MiniTable';
import AddItemButton from '@/@core/ui-kits/loads/add-item-button/AddItemButton';
import TotalsRow from '@/@core/ui-kits/basic/mini-table/components/TotalsRow';
import { MiniTableExecuteActionType } from '@/@core/ui-kits/basic/mini-table/MiniTable.types';
import { useConfirm } from '@/@core/components/confirm-dialog';
import { useAppTranslation } from '@/hooks/useAppTranslation';
import RevenueTypesGrpcService from '@/@grpcServices/services/settlements-service/revenue-types.service';
import CONSTS from '@/views/settings/tabs/Settlements/constants';
import columns from './columns';

type Props = {
    items: SettlementsTypes.RevenueTypes.Item[];
    query_id: string;
};

export default function TypeTable({
    items,
    query_id
}: Props) {
    const { t } = useAppTranslation();
    const confirm = useConfirm();
    const [deleteItem] = RevenueTypesGrpcService.useDeleteRevenueTypeItemMutation();

    const addItemDialog = useAddItemDialog();
    const editItemDialog = useEditItemDialog();

    const add = () => {
        addItemDialog.open({ query_id });
    };

    const executeAction: MiniTableExecuteActionType<SettlementsTypes.RevenueTypes.Item> = (
        name: string,
        props
    ) => {
        switch (name) {
        case 'edit':
            editItemDialog.open({
                query_id,
                item: props.row
            });
            break;
        case 'delete':
            confirm({
                title             : 'settings:settlements.revenue_types.item.dialog.delete.title',
                body              : 'settings:settlements.revenue_types.item.dialog.delete.body',
                confirm_text      : 'common:button.delete',
                max_width_dialog  : '500px',
                translationOptions: {
                    title: {
                        type: t(
                            `settings:settlements.revenue_types.item.types.${
                                CONSTS.TYPE_ITEMS_GRPC[props.row.type]
                            }`
                        )
                    }
                },
                onConfirm: () =>
                    deleteItem({
                        itemId       : props.row.itemId,
                        revenueTypeId: query_id
                    })
            });
            break;
        default:
            break;
        }
    };

    return (
        <TableWrapper>
            <TableContainer
                sx={{
                    maxHeight  : 440,
                    paddingLeft: '18px'
                }}
            >
                <MiniTable
                    columns={columns}
                    rows={items}
                    elementKey="itemId"
                    executeAction={executeAction}
                    turnOffBorder
                    ComponentAfterContent={(
                        <TotalsRow
                            fontSize="large"
                            without_border
                            columns={columns}
                            info_config={{
                                pay_item_name: <AddItemButton onClick={add} />
                            }}
                        />
                    )}
                />
            </TableContainer>
        </TableWrapper>
    );
}

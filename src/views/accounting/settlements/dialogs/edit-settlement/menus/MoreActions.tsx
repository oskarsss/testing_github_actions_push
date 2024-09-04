/* eslint-disable max-len */
import MenuComponents from '@/@core/ui-kits/menus';
import { menuHookFabric } from '@/utils/menu-hook-fabric';
import DeleteForeverRoundedIcon from '@mui/icons-material/DeleteForeverRounded';
import { MenuItem, Stack, Typography } from '@mui/material';
import { useConfirm } from '@/@core/components/confirm-dialog';
import SettlementsTypes from '@/store/accounting/settlements/types';
import SettlementsGrpcService from '@/@grpcServices/services/settlements-service/settlements.service';
import { useAppTranslation } from '@/hooks/useAppTranslation';

export const useMoreActionsMenu = menuHookFabric(MoreActions);

type Props = {
    settlementId: SettlementsTypes.CycleSettlementDetails.Settlement['settlementId'];
    cycleId: string;
    periodId: string;
    onCloseDialog: () => void;
};

function MoreActions({
    settlementId,
    onCloseDialog,
    cycleId,
    periodId
}: Props) {
    const confirm = useConfirm();
    const moreActionsMenu = useMoreActionsMenu();
    const { t } = useAppTranslation('modals');

    const [deleteSettlement, { isLoading: isDeleting }] =
        SettlementsGrpcService.useDeleteSettlementMutation();

    const onClickDelete = () => {
        confirm({
            title       : 'modals:settlements.edit_settlement.menus.more_actions.delete_settlement.confirm.title',
            body        : 'modals:settlements.edit_settlement.menus.more_actions.delete_settlement.confirm.body',
            confirm_text: 'common:button.delete',
            cancel_text : 'common:button.cancel',
            onConfirm   : () => {
                deleteSettlement({
                    settlementId,
                    cycleId,
                    periodId
                })
                    .unwrap()
                    .then(onCloseDialog);
            }
        });
        moreActionsMenu.close();
    };

    return (
        <MenuComponents.List>
            <MenuItem
                onClick={onClickDelete}
                disabled={isDeleting}
            >
                <Stack
                    direction="row"
                    spacing={2}
                >
                    <DeleteForeverRoundedIcon color="error" />
                    <Typography
                        color="error.main"
                        fontSize="16px"
                        fontWeight={500}
                    >
                        {t(
                            'settlements.edit_settlement.menus.more_actions.delete_settlement.title'
                        )}
                    </Typography>
                </Stack>
            </MenuItem>
        </MenuComponents.List>
    );
}

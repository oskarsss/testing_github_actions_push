import { Stack, Typography, Tooltip } from '@mui/material';
import SettlementsGrpcService from '@/@grpcServices/services/settlements-service/settlements.service';
import React from 'react';
import { useEditSettlementContext } from '@/views/accounting/settlements/dialogs/edit-settlement/EditSettlement';
import VectorIcons from '@/@core/icons/vector_icons';
import CloseIcon from '@mui/icons-material/Close';
import { useConfirm } from '@/@core/components/confirm-dialog';
import { useAppTranslation } from '@/hooks/useAppTranslation';
import EditSettlement from '@/views/accounting/settlements/dialogs/edit-settlement/styled';
import { useAssignVendorToSettlementDialog } from '@/views/accounting/settlements/dialogs/assign-vendor-to-settlement/AssignVendorToSettlementDialog';

export default function VendorField() {
    const [unassignVendor] = SettlementsGrpcService.useUnassignVendorFromSettlementMutation();
    const assignVendorToSettlementDialog = useAssignVendorToSettlementDialog();
    const confirm = useConfirm();
    const { t } = useAppTranslation();

    const {
        settlement,
        selectedSettlementParams,
        vendor,
        isDisabledEdit
    } =
        useEditSettlementContext();

    const assign = () => {
        assignVendorToSettlementDialog.open({
            cycleId             : selectedSettlementParams.cycle_id,
            periodId            : selectedSettlementParams.period_id,
            settlementId        : settlement.settlementId,
            settlementFriendlyId: settlement.settlementFriendlyId
        });
    };

    const unassign = () => {
        confirm({
            title       : 'modals:settlements.edit_settlement.fields.confirm_dialogs.unassign_vendor.title',
            body        : 'modals:settlements.edit_settlement.fields.confirm_dialogs.unassign_vendor.body',
            confirm_text: 'common:button.unassign',
            onConfirm   : () => {
                unassignVendor({
                    cycleId     : selectedSettlementParams.cycle_id,
                    periodId    : selectedSettlementParams.period_id,
                    settlementId: settlement.settlementId
                });
            }
        });
    };

    return (
        <Stack
            direction="row"
            spacing={2}
            alignItems="center"
            position="relative"
            overflow="hidden"
            sx={{
                padding        : '12px',
                borderRadius   : '4px',
                maxHeight      : '54px',
                height         : '100%',
                backgroundColor: (theme) => theme.palette.semantic.foreground.secondary,
                '&:hover'      : {
                    '[data-button="vendor-unassign"]': {
                        opacity: 1
                    }
                }
            }}
        >
            <Stack
                direction="column"
                justifyContent="space-between"
            >
                <Typography
                    variant="body2"
                    fontSize="12px"
                    fontWeight={500}
                >
                    {t('entity:vendor')}
                </Typography>

                <Stack
                    flexDirection="row"
                    alignItems="center"
                >
                    {vendor && (
                        <>
                            <Typography
                                variant="body1"
                                fontSize="14px"
                                fontWeight={500}
                                width="max-content"
                            >
                                {vendor.name}
                            </Typography>
                            {!vendor.email && (
                                <Tooltip
                                    title={t('common:empty.no_email')}
                                    disableInteractive
                                >
                                    <VectorIcons.MailExclamationIcon
                                        sx={{ fontSize: '16px', ml: '2px' }}
                                    />
                                </Tooltip>
                            )}
                        </>
                    )}
                    {!vendor && (
                        <Typography
                            noWrap
                            variant="body1"
                            fontSize="14px"
                            fontWeight={500}
                            color={
                                isDisabledEdit
                                    ? 'semantic.text.disabled'
                                    : 'semantic.text.brand.primary'
                            }
                            onClick={assign}
                            sx={{
                                cursor: isDisabledEdit ? 'default' : 'pointer'
                            }}
                        >
                            {isDisabledEdit
                                ? t('common:empty.no_vendor')
                                : t('common:actions.assign_vendor')}
                        </Typography>
                    )}
                </Stack>
            </Stack>
            {vendor && (
                <Tooltip
                    title={t('common:button.unassign')}
                    disableInteractive
                >
                    <EditSettlement.IconButtonDelete
                        data-button="vendor-unassign"
                        onClick={unassign}
                    >
                        <CloseIcon color="error" />
                    </EditSettlement.IconButtonDelete>
                </Tooltip>
            )}
        </Stack>
    );
}

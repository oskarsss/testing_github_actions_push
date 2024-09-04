/* eslint-disable max-len */

import { Stack, Typography } from '@mui/material';
import React from 'react';
import moment from 'moment-timezone';
import { useEditSettlementContext } from '@/views/accounting/settlements/dialogs/edit-settlement/EditSettlement';
import { useAppTranslation } from '@/hooks/useAppTranslation';
import { useEditSettlementPayDateDialog } from '@/views/accounting/settlements/dialogs/edit-settlement-pay-date/EditSettlementPayDateDialog';
import InsertInvitationIcon from '@mui/icons-material/InsertInvitation';

function checkDate(date: string) {
    if (!date) return false;
    return moment(date).isValid();
}

export default function DateInput() {
    const { t } = useAppTranslation();
    const editSettlementPayDateDialog = useEditSettlementPayDateDialog();

    const {
        settlement,
        selectedSettlementParams
    } = useEditSettlementContext();

    const onOpenDialog = () => {
        editSettlementPayDateDialog.open({
            cycleId     : selectedSettlementParams.cycle_id,
            periodId    : selectedSettlementParams.period_id,
            settlementId: selectedSettlementParams.settlement_id,
            payDate     : checkDate(settlement.payDate) ? settlement.payDate : ''
        });
    };

    return (
        <Stack
            onClick={onOpenDialog}
            direction="row"
            alignItems="center"
            spacing={2}
            padding="12px"
            borderRadius="4px"
            maxHeight="54px"
            height="100%"
            overflow="hidden"
            width="160px"
            sx={{
                backgroundColor: (theme) => theme.palette.semantic.foreground.secondary,
                cursor         : 'pointer',
                transition     : 'opacity 0.3s',
                '&:hover'      : {
                    opacity: 0.8
                }
            }}
        >
            <InsertInvitationIcon
                sx={{
                    color: (theme) => theme.palette.semantic.foreground.primary
                }}
            />
            <Stack
                direction="column"
                justifyContent="space-between"
            >
                <Typography
                    variant="body2"
                    fontSize="12px"
                    fontWeight={500}
                >
                    {`${t('modals:settlements.edit_pay_date.label')}*`}
                </Typography>
                <Typography
                    variant="body1"
                    fontSize="14px"
                    fontWeight={500}
                    width="max-content"
                >
                    {checkDate(settlement.payDate)
                        ? moment(settlement.payDate).format('MM/DD/YYYY')
                        : 'MM/DD/YYYY'}
                </Typography>
            </Stack>
        </Stack>
    );
}

import { memo } from 'react';
import { Typography, Stack, useTheme, Tooltip, createSvgIcon } from '@mui/material';
import { Settlements_Cycle_Period_Settlement_Status } from '@proto/models/model_settlement';
import { useAppTranslation } from '@/hooks/useAppTranslation';
import { SETTLEMENT_STATUS_GRPC_ENUM } from '@/models/settlements/settlements-mappings';

const LockIcon = createSvgIcon(
    <svg
        xmlns="http://www.w3.org/2000/svg"
        width="20"
        height="20"
        viewBox="0 0 20 20"
        fill="none"
    >
        <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M10 1.66669C7.23858 1.66669 5 3.90526 5 6.66669V7.62529C4.76449 7.6769 4.53845 7.75204 4.32003 7.86333C3.69283 8.18291 3.18289 8.69284 2.86331 9.32005C2.65724 9.7245 2.5751 10.1551 2.53683 10.6235C2.49998 11.0745 2.49999 11.6281 2.5 12.2989V13.5344C2.49999 14.2052 2.49998 14.7589 2.53683 15.2099C2.5751 15.6783 2.65724 16.1089 2.86331 16.5133C3.18289 17.1405 3.69283 17.6505 4.32003 17.97C4.72448 18.1761 5.15506 18.2583 5.62348 18.2965C6.07447 18.3334 6.6281 18.3334 7.2989 18.3334H12.7011C13.3719 18.3334 13.9255 18.3334 14.3765 18.2965C14.8449 18.2583 15.2755 18.1761 15.68 17.97C16.3072 17.6505 16.8171 17.1405 17.1367 16.5133C17.3428 16.1089 17.4249 15.6783 17.4632 15.2099C17.5 14.7589 17.5 14.2053 17.5 13.5345V12.2989C17.5 11.6281 17.5 11.0745 17.4632 10.6235C17.4249 10.1551 17.3428 9.7245 17.1367 9.32005C16.8171 8.69284 16.3072 8.18291 15.68 7.86333C15.4616 7.75204 15.2355 7.6769 15 7.62529V6.66669C15 3.90526 12.7614 1.66669 10 1.66669ZM7.29892 7.50002C7.07533 7.50002 6.86476 7.50001 6.66667 7.50138V6.66669C6.66667 4.82574 8.15905 3.33335 10 3.33335C11.8409 3.33335 13.3333 4.82574 13.3333 6.66669V7.50138C13.1352 7.50001 12.9247 7.50002 12.7011 7.50002H7.29892ZM10.8333 12.0834C10.8333 11.6231 10.4602 11.25 10 11.25C9.53976 11.25 9.16667 11.6231 9.16667 12.0834V13.75C9.16667 14.2103 9.53976 14.5834 10 14.5834C10.4602 14.5834 10.8333 14.2103 10.8333 13.75V12.0834Z"
        />
    </svg>,
    'LockIcon'
);

type Props = {
    friendlyId: number;
    status: Settlements_Cycle_Period_Settlement_Status;
};

function TransactionSettlement({
    friendlyId,
    status
}: Props) {
    const { palette } = useTheme();
    const { t } = useAppTranslation('common');

    const openedToChangeSettlementStatus = [
        Settlements_Cycle_Period_Settlement_Status.SETTLEMENT_STATUS_OPEN,
        Settlements_Cycle_Period_Settlement_Status.SETTLEMENT_STATUS_IN_REVIEW
    ];

    const canChangeSettlement = openedToChangeSettlementStatus.includes(status);

    return (
        <Stack
            direction="row"
            alignItems="center"
            gap="4px"
        >
            <Typography
                variant="body1"
                fontSize="12px"
                fontWeight={600}
                sx={{
                    textDecoration: 'underline',
                    cursor        : 'pointer'
                }}
                color="semantic.text.brand.primary"
            >
                {friendlyId}
            </Typography>

            {!canChangeSettlement && (
                <Tooltip
                    disableInteractive
                    placement="top"
                    title={t('profile.center.transactions_history.table.tooltip', {
                        status: SETTLEMENT_STATUS_GRPC_ENUM[status]
                    })}
                    aria-label="Read only"
                >
                    <LockIcon
                        sx={{
                            fill    : palette.semantic.foreground.primary,
                            fontSize: '16px'
                        }}
                        aria-label="Lock icon"
                    />
                </Tooltip>
            )}
        </Stack>
    );
}

export default memo(TransactionSettlement);

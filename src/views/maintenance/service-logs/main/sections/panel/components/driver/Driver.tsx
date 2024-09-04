import Avatar from '@mui/material/Avatar';
import { Stack, Typography } from '@mui/material';
import { memo } from 'react';
import usePrivateFileUrl from '@/hooks/usePrivatFileUrl';
import { useAppTranslation } from '@/hooks/useAppTranslation';
import { SETTLEMENT_STATUS_GRPC_ENUM } from '@/models/settlements/settlements-mappings';
import { custom_colors } from '@/@core/fields/chip-select/SettlementStatusChipSelect';
import { useEditSettlementDialog } from '@/views/accounting/settlements/dialogs/edit-settlement/EditSettlement';
import { isEqual } from 'lodash';
import { SettlementGetReply_Settlement } from '@proto/settlements';

type Props = {
    selfieThumbUrl: string;
    firstName: string;
    lastName: string;
    settlement?: SettlementGetReply_Settlement;
    periodId: string;
    cycleId: string;
};

function Driver({
    selfieThumbUrl,
    firstName,
    lastName,
    settlement,
    periodId,
    cycleId
}: Props) {
    const editSettlementDialog = useEditSettlementDialog();
    const { t } = useAppTranslation();
    const { url } = usePrivateFileUrl(selfieThumbUrl);

    const openEditSettlementDialog = () => {
        if (!settlement) return;
        editSettlementDialog.open({
            settlement_id: settlement.settlementId,
            cycle_id     : cycleId,
            period_id    : periodId
        });
    };

    return (
        <Stack
            direction="row"
            alignItems="center"
            justifyContent="space-between"
            width="100%"
        >
            <Stack
                direction="row"
                alignItems="center"
            >
                <Avatar
                    alt={firstName}
                    src={url}
                    sx={{ width: 24, height: 24, marginRight: '10px', fontSize: '12px' }}
                >
                    {firstName?.charAt(0).toUpperCase()}
                    {lastName?.charAt(0).toUpperCase()}
                </Avatar>

                <Typography
                    variant="body1"
                    fontWeight={500}
                >
                    {`${firstName} ${lastName}`}
                </Typography>
            </Stack>

            <Stack
                direction="row"
                alignItems="center"
                gap="4px"
                padding="0 10px"
                border="1px solid"
                borderColor="semantic.border.secondary"
                boxShadow="0px 1px 2px 0px #1018280D"
                borderRadius="4px"
            >
                <Typography
                    variant="body1"
                    fontWeight={600}
                    fontSize="12px"
                    color="semantic.text.secondary"
                >
                    {t('entity:settlement')}:
                </Typography>

                {settlement && (
                    <>
                        <Typography
                            variant="body1"
                            fontWeight={600}
                            fontSize="12px"
                            color="semantic.text.brand.primary"
                            onClick={openEditSettlementDialog}
                            sx={{ cursor: 'pointer' }}
                        >
                            {settlement.settlementFriendlyId}
                        </Typography>

                        <Typography
                            variant="body1"
                            fontWeight={600}
                            fontSize="12px"
                        >
                            l
                        </Typography>

                        <Typography
                            variant="body1"
                            fontWeight={600}
                            fontSize="12px"
                            color={({ palette }) =>
                                custom_colors[palette.mode][
                                    SETTLEMENT_STATUS_GRPC_ENUM[settlement.status]
                                ].color}
                        >
                            {t(
                                `state_info:settlements.status.${
                                    SETTLEMENT_STATUS_GRPC_ENUM[settlement.status]
                                }`
                            )}
                        </Typography>
                    </>
                )}
            </Stack>
        </Stack>
    );
}

export default memo(Driver, isEqual);

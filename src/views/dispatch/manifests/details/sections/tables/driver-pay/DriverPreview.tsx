import { Box, Button, Stack, Typography, useTheme } from '@mui/material';
import { useRevenueTypesMap } from '@/store/hash_maps/hooks';
import VectorIcons from '@/@core/icons/vector_icons';
import ManifestsGrpcService from '@/@grpcServices/services/manifests-service/manifests.service';
import { useConfirm } from '@/@core/components/confirm-dialog';
import { useAppTranslation } from '@/hooks/useAppTranslation';
import { useEditSettlementDialog } from '@/views/accounting/settlements/dialogs/edit-settlement/EditSettlement';
import { useTruckByDriverId, useTrucksMap } from '@/store/storage/trucks/hooks/common';
import { useDriversMap } from '@/store/storage/drivers/hooks/common';
import { TRUCK_TYPE_ICONS } from '@/@core/theme/entities/truck/type';
import {
    TRUCK_TYPE_TO_GRPC_ENUM,
    TRUCK_TYPE_TO_GRPC_REVERSE_ENUM
} from '@/models/fleet/trucks/trucks-mappings';
import DriverAvatar from './DriverAvatar';

type Props = {
    driverId: string;
    settlementId: string;
    settlementFriendlyId: number;
    settlementCycleId: string;
    settlementPeriodId: string;
    manifestId: string;
};

export default function DriverPreview({
    driverId,
    settlementFriendlyId,
    settlementId,
    settlementCycleId,
    settlementPeriodId,
    manifestId
}: Props) {
    const driversMap = useDriversMap();
    const revenueTypesMap = useRevenueTypesMap();
    const { palette } = useTheme();
    const { t } = useAppTranslation();
    const editSettlementDialog = useEditSettlementDialog();

    const [unassign] = ManifestsGrpcService.useUnassignDriverFromManifestMutation();

    const confirm = useConfirm();
    const driver = driversMap[driverId];
    const revenueType = revenueTypesMap[driver?.settlementRevenueTypeId];

    const handleRemoveDriverPay = () => {
        confirm({
            title             : 'modals:manifests.details.confirm.driver_pay.delete.title',
            body              : 'modals:manifests.details.confirm.driver_pay.delete.body',
            confirm_text      : 'common:button.confirm',
            translationOptions: {
                body: { fullName: `${driver.firstName} ${driver.lastName}` }
            },
            onConfirm: async () => {
                await unassign({
                    driverId,
                    manifestId
                });
            }
        });
    };

    const truck = useTruckByDriverId(driverId);

    const openEditSettlementDialog = () => {
        if (!settlementId || !settlementCycleId || !settlementPeriodId) return;
        editSettlementDialog.open({
            settlement_id: settlementId,
            cycle_id     : settlementCycleId,
            period_id    : settlementPeriodId
        });
    };

    return (
        <Stack
            justifyContent="space-between"
            direction="row"
        >
            <Stack
                direction="row"
                alignItems="center"
                gap="12px"
            >
                <DriverAvatar driver={driver} />

                <Stack direction="column">
                    <Stack
                        direction="row"
                        gap="5px"
                        alignItems="center"
                    >
                        <Typography
                            variant="body1"
                            fontSize="14px"
                            fontWeight={500}
                        >
                            {driver?.firstName} {driver?.lastName}
                        </Typography>

                        <Typography
                            variant="body1"
                            fontSize="10px"
                            fontWeight={500}
                            color="semantic.text.secondary"
                        >
                            |
                        </Typography>

                        <Typography
                            variant="body1"
                            fontSize="14px"
                            fontWeight={500}
                            color="semantic.text.secondary"
                        >
                            {revenueType?.name ?? t('common:empty.no_revenue_type')}
                        </Typography>
                    </Stack>

                    <Stack
                        direction="row"
                        alignItems="center"
                    >
                        <Box
                            sx={{
                                display   : 'flex',
                                alignItems: 'center',
                                svg       : {
                                    width : '20px',
                                    height: '20px'
                                }
                            }}
                        >
                            {TRUCK_TYPE_ICONS[TRUCK_TYPE_TO_GRPC_REVERSE_ENUM[truck?.type || 0]]}
                        </Box>

                        <Typography
                            fontSize="12px"
                            fontWeight={500}
                            color="text.secondary"
                        >
                            #{truck?.referenceId || t('common:not_provided')}
                        </Typography>
                    </Stack>
                </Stack>
            </Stack>
            <Stack
                direction="row"
                gap="12px"
                alignItems="center"
            >
                <Stack>
                    <Stack
                        direction="row"
                        height="24px"
                        alignItems="center"
                        gap="2px"
                        paddingX={2}
                        borderRadius={1}
                        sx={{
                            border: `1px solid ${palette.semantic.border.secondary}`
                        }}
                    >
                        <Typography
                            fontSize="12px"
                            fontWeight={600}
                            sx={{
                                color: palette.semantic.text.primary
                            }}
                        >
                            {t('entity:settlement')}:
                        </Typography>
                        <Stack
                            flexDirection="row"
                            alignItems="center"
                            sx={{ cursor: settlementId ? 'pointer' : 'default' }}
                            onClick={openEditSettlementDialog}
                        >
                            <Typography
                                variant="body1"
                                fontSize="12px"
                                fontWeight={600}
                                sx={{
                                    textDecoration: settlementId ? 'underline' : 'none',
                                    color         : palette.semantic.text.brand.primary
                                }}
                            >
                                {settlementFriendlyId || t('common:not_provided')}
                            </Typography>
                        </Stack>
                    </Stack>
                </Stack>

                <Stack>
                    <Button
                        size="small"
                        variant="outlined"
                        sx={{
                            fontSize     : '12px',
                            height       : '24px',
                            fontWeight   : 600,
                            color        : palette.semantic.text.secondary,
                            textTransform: 'capitalize',
                            border       : `1px solid ${palette.semantic.border.secondary}`
                        }}
                        onClick={handleRemoveDriverPay}
                        startIcon={(
                            <VectorIcons.Garbage
                                fill="#667085"
                                size={16}
                            />
                        )}

                        // onClick={handleRemoveDriverPay}
                        // disabled={isLoading}
                    >
                        {t('common:button.delete')}
                    </Button>
                </Stack>
            </Stack>
        </Stack>
    );
}

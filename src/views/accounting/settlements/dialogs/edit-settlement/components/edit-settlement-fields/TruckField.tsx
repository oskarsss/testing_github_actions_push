import React from 'react';
import DangerousOutlinedIcon from '@mui/icons-material/DangerousOutlined';
import { IconButton, Stack, Tooltip, Typography } from '@mui/material';
import openNewWindow from '@/utils/open-new-window';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { ENTITY_CHIP_ICONS } from '@/@core/theme/entities';
import { useAppTranslation } from '@/hooks/useAppTranslation';
import { TRUCK_TYPE_TO_GRPC_REVERSE_ENUM } from '@/models/fleet/trucks/trucks-mappings';
import { useAssignTruckToSettlementMenu } from '@/@core/components/assign/modals/AssignTruckToSettlement';
import { useEditSettlementContext } from '../../EditSettlement';

export default function TruckField() {
    const assignTruckToSettlementMenu = useAssignTruckToSettlementMenu();
    const { selectedSettlementParams } = useEditSettlementContext();
    const { t } = useAppTranslation();

    const {
        settlement,
        truck,
        isDisabledEdit
    } = useEditSettlementContext();

    const assign = (event: React.MouseEvent<HTMLSpanElement>) => {
        if (isDisabledEdit) return;
        assignTruckToSettlementMenu.open({
            cycleId             : selectedSettlementParams.cycle_id,
            periodId            : selectedSettlementParams.period_id,
            settlementId        : settlement.settlementId,
            settlementFriendlyId: `${settlement.settlementFriendlyId || ''}`
        })(event);
    };

    const onClickArrowForward = () => {
        if (!truck) return;
        openNewWindow(`/trucks/${truck.truckId}`);
    };

    return (
        <Stack
            direction="row"
            spacing={2}
            alignItems="center"
            sx={{
                padding        : '12px',
                borderRadius   : '4px',
                maxHeight      : '54px',
                height         : '100%',
                backgroundColor: (theme) => theme.palette.semantic.foreground.secondary
            }}
        >
            <Tooltip
                title={
                    truck
                        ? t(`state_info:trucks.type.${TRUCK_TYPE_TO_GRPC_REVERSE_ENUM[truck.type]}`)
                        : t('common:empty.no_truck')
                }
            >
                {truck && truck.type ? (
                    <span
                        style={{
                            display   : 'flex',
                            alignItems: 'center'
                        }}
                    >
                        {ENTITY_CHIP_ICONS[TRUCK_TYPE_TO_GRPC_REVERSE_ENUM[truck.type]]}
                    </span>
                ) : (
                    <DangerousOutlinedIcon
                        fontSize="medium"
                        color="disabled"
                    />
                )}
            </Tooltip>
            <Stack
                direction="column"
                justifyContent="space-between"
            >
                <Typography
                    variant="body2"
                    fontSize="12px"
                    fontWeight={500}
                >
                    {t('entity:truck')}
                </Typography>
                {truck && (
                    <Typography
                        variant="body1"
                        fontSize="14px"
                        fontWeight={500}
                        width="max-content"
                    >
                        {truck.referenceId}
                    </Typography>
                )}
                {!truck && (
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
                            ? t('common:empty.no_truck')
                            : t('common:actions.assign_truck')}
                    </Typography>
                )}
            </Stack>
            {truck && (
                <Tooltip
                    title={t('common:tooltips.see_entity_details', {
                        entity: t('entity:truck').toLowerCase()
                    })}
                >
                    <IconButton onClick={onClickArrowForward}>
                        <ArrowForwardIcon />
                    </IconButton>
                </Tooltip>
            )}
        </Stack>
    );
}

import { Button, Typography } from '@mui/material';
import Stack from '@mui/material/Stack';
import StatusChip from '@/views/settings/tabs/Settlements/components/StatusChip/StatusChip';
import { useEditRevenueTypeDialog } from '@/views/settings/tabs/Settlements/RevenueTypes/dialogs/RevenueTypeDialog/EditRevenueTypeDialog';
import SettlementsTypes from '@/store/accounting/settlements/types';
import PageHeadersKit from '@/@core/ui-kits/page-headers';
import RevenueTypesGrpcService from '@/@grpcServices/services/settlements-service/revenue-types.service';
import { useAppTranslation } from '@/hooks/useAppTranslation';

type Props = {
    type: SettlementsTypes.RevenueTypes.RevenueType;
};

export default function TypeHeader({ type }: Props) {
    const { t } = useAppTranslation();
    const isDeactivated = !type.active;
    const dialog = useEditRevenueTypeDialog();

    const [deactivateType, { isLoading: isDeactivateLoading }] =
        RevenueTypesGrpcService.useDeactivateRevenueTypeMutation();
    const [activateType, { isLoading: isActivateLoading }] =
        RevenueTypesGrpcService.useActivateRevenueTypeMutation();

    const edit = () => {
        dialog.open({ type });
    };

    const onClickActivate = () => {
        if (isDeactivated) {
            return activateType({
                revenueTypeId: type.revenueTypeId
            });
        }
        return deactivateType({
            revenueTypeId: type.revenueTypeId
        });
    };

    return (
        <PageHeadersKit.Header
            topLeft={(
                <Stack
                    width="100%"
                    direction="row"
                    alignItems="center"
                    justifyContent="space-between"
                    spacing={3}
                >
                    <Stack
                        justifyContent="space-between"
                        alignItems="center"
                        direction="row"
                        spacing={3}
                    >
                        <Typography
                            maxWidth="250px"
                            fontSize="24px"
                            fontWeight={600}
                            variant="h6"
                        >
                            {type.name}
                        </Typography>
                        <StatusChip
                            label={
                                type.default
                                    ? 'settings:settlements.revenue_types.type.header.status.default'
                                    : 'settings:settlements.revenue_types.type.header.status.not_default'
                            }
                            color={type.default ? 'green' : 'blue'}
                        />
                    </Stack>
                    <Stack
                        spacing={2}
                        direction="row"
                    >
                        <Button
                            sx={{ width: 'max-content' }}
                            variant="outlined"
                            color="secondary"
                            size="medium"
                            onClick={edit}
                        >
                            {t('common:button.edit')}
                        </Button>
                        <Button
                            sx={{ width: 'max-content' }}
                            variant="outlined"
                            color={isDeactivated ? 'success' : 'error'}
                            size="medium"
                            disabled={isDeactivateLoading || isActivateLoading}
                            onClick={onClickActivate}
                        >
                            {t(
                                isDeactivated
                                    ? 'settings:settlements.revenue_types.type.header.buttons.activate'
                                    : 'settings:settlements.revenue_types.type.header.buttons.deactivate'
                            )}
                        </Button>
                    </Stack>
                </Stack>
            )}
            style={{
                padding: 0
            }}
        />
    );
}

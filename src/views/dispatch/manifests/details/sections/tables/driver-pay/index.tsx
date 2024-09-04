import { Stack, Typography, Button } from '@mui/material';
import { useAssignDriverToManifestDialog } from '@/views/dispatch/manifests/modals/add-driver';
import { useAppTranslation } from '@/hooks/useAppTranslation';
import NoDrivers from '@/views/dispatch/manifests/details/sections/tables/driver-pay/NoDrivers';
import ManifestsGrpcService from '@/@grpcServices/services/manifests-service/manifests.service';
import { useStableArray } from '@/hooks/useStable';
import Preloader from '@/@core/ui-kits/basic/preloader/Preloader';
import ManifestDetailsIcons from '../../../icons';
import { ManifestDetailsStyled } from '../styled';
import ManifestDriverPayItemsTable from './Table';

type Props = {
    manifestId: string;
    truckId: string;
};

export default function ManifestDetailsDriverPayTable({
    manifestId,
    truckId
}: Props) {
    const assignDriverDialog = useAssignDriverToManifestDialog();
    const { t } = useAppTranslation();

    const {
        data,
        isLoading
    } = ManifestsGrpcService.useGetManifestsDriversQuery({
        manifestId
    });

    const drivers = useStableArray(data?.drivers);

    const handleAddDriver = () => {
        assignDriverDialog.open({
            manifestId,
            existDrivers: drivers.map((driver) => driver.driverId)
        });
    };

    if (isLoading) {
        return <Preloader />;
    }

    return (
        <Stack
            padding="16px"
            overflow="hidden"
            maxHeight="100%"
        >
            <ManifestDetailsStyled.TableHeader justifyContent="space-between">
                <Stack
                    direction="row"
                    alignItems="center"
                    gap={1}
                >
                    <ManifestDetailsIcons.DriverPay color="primary" />
                    <Typography
                        fontSize="18px"
                        fontWeight={600}
                    >
                        {t('modals:manifests.details.tabs.titles.driver_pay')}
                    </Typography>
                </Stack>

                <Stack
                    direction="row"
                    gap={2}
                >
                    <Button
                        variant="text"
                        size="small"
                        color="primary"
                        onClick={handleAddDriver}
                    >
                        {t('common:actions.add_driver')}
                    </Button>
                </Stack>
            </ManifestDetailsStyled.TableHeader>

            <Stack
                direction="column"
                overflow="auto"
                flex="1 1 100%"
                paddingTop="12px"
                gap={5}
            >
                {drivers.length ? (
                    drivers.map((driver) => (
                        <ManifestDriverPayItemsTable
                            key={driver.driverId}
                            manifestId={manifestId}
                            settlementFriendlyId={driver.settlementFriendlyId}
                            settlementId={driver.settlementId}
                            settlementCycleId={driver.cycleId}
                            settlementPeriodId={driver.periodId}
                            driverId={driver.driverId}
                            driverNet={driver.driverNet?.amountFormatted || ''}
                            payItems={driver.payItems}
                            truckId={truckId}
                        />
                    ))
                ) : (
                    <NoDrivers />
                )}
            </Stack>
        </Stack>
    );
}

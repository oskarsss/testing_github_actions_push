import { memo, useMemo } from 'react';
import VectorIcons from '@/@core/icons/vector_icons';
import { Button, Typography } from '@mui/material';
import { useAppTranslation } from '@/hooks/useAppTranslation';
import VehicleWarrantyGrpcService from '@/@grpcServices/services/vehicle-warranty.service';
import { VehicleMaintenanceModel_VehicleType } from '@proto/models/model_vehicle_maintenance';
import VehicleWarrantyCoverageItemGrpcService from '@/@grpcServices/services/vehicle-warranty-coverage-items.service';

type Props = {
    vehicleId?: string;
    vehicleType: VehicleMaintenanceModel_VehicleType;
};

function WarrantyItemsButton({
    vehicleId,
    vehicleType
}: Props) {
    const { t } = useAppTranslation();

    const {
        data: warrantyData,
        isError: isWarrantyDataError
    } =
        VehicleWarrantyGrpcService.useWarrantyRetrieveQuery(
            {
                vehicleId: vehicleId || '',
                vehicleType
            },
            {
                refetchOnMountOrArgChange: true
            }
        );

    const {
        data: warrantyItemsData,
        isError: isWarrantyItemsDataError
    } =
        VehicleWarrantyCoverageItemGrpcService.useGetWarrantyItemsQuery({
            vehicleWarrantyId: warrantyData?.warranty?.vehicleWarrantyId || ''
        });

    const truckWarrantyCoverageItemsAmount = useMemo(
        () => warrantyItemsData?.items.length || 0,
        [warrantyItemsData?.items.length]
    );

    if (!truckWarrantyCoverageItemsAmount || isWarrantyDataError || isWarrantyItemsDataError) {
        return;
    }

    return (
        <Button
            disabled={!truckWarrantyCoverageItemsAmount}
            startIcon={(
                <VectorIcons.Maintenance.ShieldDollar
                    sx={{
                        fontSize: '16px',

                        fill: ({ palette }) => palette.semantic.foreground.white.secondary
                    }}
                />
            )}
            variant="contained"
            sx={{
                padding      : '0px 8px',
                textTransform: 'none'
            }}
        >
            <Typography
                variant="body1"
                fontSize="11px"
                fontWeight={600}
                color="semantic.text.white"
            >
                {t('maintenance:service_logs.panel.sections.equipment.warranty_items', {
                    amount: truckWarrantyCoverageItemsAmount
                })}
            </Typography>
        </Button>
    );
}

export default memo(WarrantyItemsButton);

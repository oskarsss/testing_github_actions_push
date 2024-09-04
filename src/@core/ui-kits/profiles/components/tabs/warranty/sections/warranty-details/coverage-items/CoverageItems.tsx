import React, { memo } from 'react';
import { Stack } from '@mui/material';
import VehicleWarrantyCoverageItemGrpcService from '@/@grpcServices/services/vehicle-warranty-coverage-items.service';
import Preloader from '@/@core/ui-kits/basic/preloader/Preloader';
import FallbackContent from '@/@core/ui-kits/basic/fallback-content/FallbackContent';
import VectorIcons from '@/@core/icons/vector_icons';
import CoverageItemsTable from './coverage-items-table/CoverageItemsTable';
import CoverageItemsHeader from './CoverageItemsHeader';

type Props = {
    vehicleWarrantyId: string;
};

function CoverageItems({ vehicleWarrantyId }: Props) {
    const {
        data,
        isLoading,
        isError,
        refetch
    } =
        VehicleWarrantyCoverageItemGrpcService.useGetWarrantyItemsQuery({ vehicleWarrantyId });

    if (isLoading) {
        return <Preloader />;
    }

    if (isError) {
        return (
            <FallbackContent
                icon={<VectorIcons.Cone />}
                onClick={refetch}
                buttonText="common:button.reload"
                firstText="loads:table.error"
            />
        );
    }

    return (
        <Stack gap="12px">
            <CoverageItemsHeader
                vehicleWarrantyId={vehicleWarrantyId}
                count={data?.items.length ?? 0}
            />

            <CoverageItemsTable warrantyItems={data?.items} />
        </Stack>
    );
}

export default memo(CoverageItems);

import openNewWindow from '@/utils/open-new-window';
import { useAppTranslation } from '@/hooks/useAppTranslation';
import { TRUCK_TYPE_ICONS } from '@/@core/theme/entities/truck/type';
import CopyText from '@/@core/components/copy-text/CopyText';
import WrapIcon from '@/views/dispatch/orders/Details/sections/load-overview/ui-elements/WrapIcon';
import { TRUCK_TYPE_TO_GRPC_REVERSE_ENUM } from '@/models/fleet/trucks/trucks-mappings';
import { useTruckById } from '@/store/storage/trucks/hooks/common';
import OverviewSkeletonFleet from '@/views/dispatch/orders/Details/sections/load-overview/ui-elements/OverviewSkeletonFleet';
import React from 'react';
import ArrowButton from '../../ui-elements/ArrowButton';
import LoadOverviewStyled from '../../LoadOverview.styled';
import { sliceName } from '../utils';

type Props = {
    truckId: string;
};

function LoadOverviewTruck({ truckId }: Props) {
    const { t } = useAppTranslation();
    const truck = useTruckById(truckId);

    if (!truck) {
        return <OverviewSkeletonFleet />;
    }
    const openTruck = () => openNewWindow(`trucks/${truck.truckId}`, true);

    return (
        <LoadOverviewStyled.Item.Container
            sx={{
                gap: '8px'
            }}
        >
            <LoadOverviewStyled.Item.Container style={{ gap: 0 }}>
                <WrapIcon
                    title={t(
                        `state_info:trucks.type.${TRUCK_TYPE_TO_GRPC_REVERSE_ENUM[truck.type]}`
                    )}
                >
                    {TRUCK_TYPE_ICONS[TRUCK_TYPE_TO_GRPC_REVERSE_ENUM[truck.type]]}
                </WrapIcon>

                <LoadOverviewStyled.Item.InfoWrapper sx={{ paddingLeft: '3px' }}>
                    <CopyText text={truck?.referenceId}>
                        <LoadOverviewStyled.Item.Title>
                            {`${truck.referenceId}`}
                        </LoadOverviewStyled.Item.Title>
                    </CopyText>

                    <LoadOverviewStyled.Item.Description>
                        {`${truck.year || '-'} ${sliceName(truck.make)}`}
                    </LoadOverviewStyled.Item.Description>
                </LoadOverviewStyled.Item.InfoWrapper>
            </LoadOverviewStyled.Item.Container>

            <ArrowButton onClick={openTruck} />
        </LoadOverviewStyled.Item.Container>
    );
}

export default React.memo(LoadOverviewTruck);

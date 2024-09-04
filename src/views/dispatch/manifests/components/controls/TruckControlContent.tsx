import { useTrucksMap } from '@/store/storage/trucks/hooks/common';
import { Stack } from '@mui/material';
import { memo, PropsWithChildren } from 'react';
import { TRUCK_TYPE_ICONS } from '@/@core/theme/entities/truck/type';
import SkeletonControl from '@/views/dispatch/manifests/components/controls/SkeletonControl';
import { TRUCK_TYPE_TO_GRPC_REVERSE_ENUM } from '@/models/fleet/trucks/trucks-mappings';
import ControlsStyled from '@/views/dispatch/manifests/components/controls/styled';
import ManifestStyled from '../styled';

type Props = PropsWithChildren<{
    truckId: string;
}>;

function TruckControlContent({
    truckId,
    children
}: Props) {
    const trucksMap = useTrucksMap();

    const truck = trucksMap[truckId];

    if (!Object.keys(trucksMap).length) {
        return (
            <ControlsStyled.Container>
                <SkeletonControl />
                <Stack
                    direction="row"
                    gap="5px"
                >
                    {children}
                </Stack>
            </ControlsStyled.Container>
        );
    }

    if (!truck) {
        return null;
    }

    return (
        <ControlsStyled.Container>
            <Stack
                direction="row"
                gap="8px"
            >
                <ManifestStyled.IconWrapper>
                    {TRUCK_TYPE_ICONS[TRUCK_TYPE_TO_GRPC_REVERSE_ENUM[truck.type]]}
                </ManifestStyled.IconWrapper>
                <Stack>
                    <ManifestStyled.Title>#{truck.referenceId}</ManifestStyled.Title>
                    <ManifestStyled.Subtitle>
                        {truck.year || '-'} {truck.make}
                    </ManifestStyled.Subtitle>
                </Stack>
            </Stack>

            <Stack
                direction="row"
                gap="5px"
            >
                {children}
            </Stack>
        </ControlsStyled.Container>
    );
}

export default memo(TruckControlContent);

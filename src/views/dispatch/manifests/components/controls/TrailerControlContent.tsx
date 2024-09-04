import { getTrailerTypeIcon } from '@/@core/theme/entities/trailer/type';
import NoTrailer from '@/@core/ui-kits/loads/no-trailer/NoTrailer';
import { useTrailersTypesMap } from '@/store/hash_maps/hooks';
import { Stack } from '@mui/material';
import React, { PropsWithChildren, memo } from 'react';
import SkeletonControl from '@/views/dispatch/manifests/components/controls/SkeletonControl';
import ControlsStyled from '@/views/dispatch/manifests/components/controls/styled';
import TrailerTypesGrpcService from '@/@grpcServices/services/settings-service/trailer-types.service';
import { useTrailersMap } from '@/store/storage/trailers/hooks/common';
import { useAppSelector } from '@/store/hooks';
import { TrailerDataSelectors } from '@/store/storage/trailers/slice';
import ManifestStyled from '../styled';

type Props = PropsWithChildren<{
    trailerId: string;
}>;

function TrailerControlContent({
    trailerId,
    children
}: Props) {
    const trailersMap = useTrailersMap();
    const trailerTypesMap = useTrailersTypesMap();
    const isLoading = useAppSelector(TrailerDataSelectors.getIsLoading);

    const trailer = trailersMap[trailerId];
    const trailerType = trailerTypesMap[trailer?.trailerTypeId || ''];

    const trailerTypesState = TrailerTypesGrpcService.useGetTrailerTypesQuery({});

    if (isLoading || trailerTypesState.isLoading) {
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

    if (!trailer) {
        return (
            <ControlsStyled.Container>
                <NoTrailer />
                <Stack
                    direction="row"
                    gap="5px"
                >
                    {children}
                </Stack>
            </ControlsStyled.Container>
        );
    }

    return (
        <ControlsStyled.Container>
            <Stack
                direction="row"
                gap="8px"
            >
                <ManifestStyled.IconWrapper>
                    {getTrailerTypeIcon(trailerType?.icon || 0)}
                </ManifestStyled.IconWrapper>

                <Stack direction="column">
                    <ManifestStyled.Title>{trailer.referenceId}</ManifestStyled.Title>
                    <ManifestStyled.Subtitle>
                        {trailer.year || '-'} {trailerType?.name || ''}
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

export default memo(TrailerControlContent);

import { getTrailerTypeIcon } from '@/@core/theme/entities/trailer/type';
import CopyText from '@/@core/components/copy-text/CopyText';
import openNewWindow from '@/utils/open-new-window';
import WrapIcon from '@/views/dispatch/orders/Details/sections/load-overview/ui-elements/WrapIcon';
import { useTrailersTypesMap } from '@/store/hash_maps/hooks';
import { useAppTranslation } from '@/hooks/useAppTranslation';
import OverviewSkeletonFleet from '@/views/dispatch/orders/Details/sections/load-overview/ui-elements/OverviewSkeletonFleet';
import React from 'react';
import { useTrailerById } from '@/store/storage/trailers/hooks/common';
import LoadOverviewStyled from '../../LoadOverview.styled';
import { sliceName } from '../utils';
import ArrowButton from '../../ui-elements/ArrowButton';

type Props = {
    trailerId: string;
};

function LoadOverviewTrailer({ trailerId }: Props) {
    const { t } = useAppTranslation('loads');
    const trailer = useTrailerById(trailerId);
    const trailerType = useTrailersTypesMap(trailer?.trailerTypeId || '');

    if (!trailerId) {
        return (
            <LoadOverviewStyled.Item.Container
                style={{
                    justifyContent: 'flex-start'
                }}
            >
                <WrapIcon title={t('details.overview.empty_state.power_only')}>
                    {getTrailerTypeIcon(0)}
                </WrapIcon>
                <LoadOverviewStyled.Item.InfoWrapper>
                    <LoadOverviewStyled.Item.Title
                        sx={{
                            color: 'text.secondary'
                        }}
                    >
                        {t('details.overview.empty_state.power_only')}
                    </LoadOverviewStyled.Item.Title>
                </LoadOverviewStyled.Item.InfoWrapper>
            </LoadOverviewStyled.Item.Container>
        );
    }

    if (!trailer) {
        return <OverviewSkeletonFleet />;
    }

    const openTrailer = () => openNewWindow(`trailers/${trailer.trailerId}`, true);
    return (
        <LoadOverviewStyled.Item.Container>
            <LoadOverviewStyled.Item.Container
                style={{
                    gap: 0
                }}
            >
                <WrapIcon title={trailerType?.name || ''}>
                    {getTrailerTypeIcon(trailerType?.icon)}
                </WrapIcon>

                <LoadOverviewStyled.Item.InfoWrapper sx={{ paddingLeft: '3px' }}>
                    <CopyText text={trailer.referenceId}>
                        <LoadOverviewStyled.Item.Title>
                            {`#${trailer.referenceId}`}
                        </LoadOverviewStyled.Item.Title>
                    </CopyText>

                    <LoadOverviewStyled.Item.Description>
                        {`${trailer.year} ${sliceName(trailer.make)}`}
                    </LoadOverviewStyled.Item.Description>
                </LoadOverviewStyled.Item.InfoWrapper>
            </LoadOverviewStyled.Item.Container>

            <ArrowButton onClick={openTrailer} />
        </LoadOverviewStyled.Item.Container>
    );
}

export default React.memo(LoadOverviewTrailer);

import Tooltip from '@mui/material/Tooltip';
import openNewWindow from '@/utils/open-new-window';
import { TRUCK_TYPE_ICONS } from '@/@core/theme/entities/truck/type';
import { getTrailerTypeIcon } from '@/@core/theme/entities/trailer/type';
import { ButtonStyled } from '@/views/dispatch/scheduling/components/Table/components/truck/location/styled';
import { TruckType } from '@/models/fleet/trucks/truck-type';
import { useTrailersTypesMap } from '@/store/hash_maps/hooks';
import { useAppTranslation } from '@/hooks/useAppTranslation';
import { useTrailersMap } from '@/store/storage/trailers/hooks/common';
import { DataAndEditProps, EditType } from '../../../types';
import Amount from './Amount';
import { Column, StatusChip, PrimaryText } from './styled';

const TopTruckAndTrailer = ({ truck }: DataAndEditProps) => {
    const { t } = useAppTranslation();
    const trailersTypes = useTrailersTypesMap();
    const trailersMap = useTrailersMap();
    const trailerType = trailersTypes[truck.trailerTypeId || ''];

    const edit = (type: EditType) => {
        switch (type) {
        case 'truck':
            openNewWindow(`trucks/${truck.truckId}`, true);
            break;
        case 'trailer':
            openNewWindow(`trailers/${truck.trailerId}`, true);
            break;
        default:
        }
    };

    return (
        <div
            style={{
                display       : 'flex',
                alignItems    : 'center',
                gap           : '4px',
                width         : '100%',
                justifyContent: 'space-between',
                paddingLeft   : '8px',
                paddingRight  : '10px'
            }}
        >
            {/* ---------------- TRUCK ---------------- */}
            <Tooltip title={t('common:tooltips.open_in_new_tab')}>
                <ButtonStyled
                    onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();

                        edit('truck');
                    }}
                >
                    {TRUCK_TYPE_ICONS[truck.type as TruckType]}
                    <Column>
                        <PrimaryText>{truck.referenceId}</PrimaryText>
                        <div>{truck.truckTitle}</div>
                    </Column>
                </ButtonStyled>
            </Tooltip>

            {/* ---------------- TRAILER ---------------- */}
            {truck.trailerId ? (
                <Tooltip
                    title={t('common:tooltips.open_in_new_tab')}
                    disableInteractive
                >
                    <ButtonStyled
                        onClick={(e) => {
                            e.preventDefault();
                            e.stopPropagation();

                            edit('trailer');
                        }}
                    >
                        {getTrailerTypeIcon(trailerType?.icon || 0)}
                        <Column>
                            <PrimaryText>
                                {trailersMap[truck.trailerId]?.referenceId || '-'}
                            </PrimaryText>
                            <div>{trailerType?.name || '-'}</div>
                        </Column>
                    </ButtonStyled>
                </Tooltip>
            ) : (
                <Tooltip
                    disableInteractive
                    title={t('schedule:table.trailer_type.tooltips.power_only')}
                >
                    <span>{getTrailerTypeIcon(0)}</span>
                </Tooltip>
            )}

            {/* ---------------- AMOUNT ---------------- */}
            <Amount truck={truck} />

            {/* ---------------- CHIP STATUS ---------------- */}
            <StatusChip isTransit={truck.inTransit}>
                <span style={{ fontWeight: 600 }}>
                    {truck.inTransit
                        ? t('schedule:table.truck_status.in_transit')
                        : t('schedule:table.truck_status.no_manifests')}
                </span>
            </StatusChip>
        </div>
    );
};

export default TopTruckAndTrailer;

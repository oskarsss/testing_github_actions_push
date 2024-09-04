import { StatusChipStyled } from '@/@core/theme/chip';
import LocationDisabledIcon from '@mui/icons-material/LocationDisabled';
import Tooltip from '@mui/material/Tooltip';
import getTimeAgo from '@/utils/get-time-ago';
import { IntlMessageKey } from '@/@types/next-intl';
import { useAppTranslation } from '@/hooks/useAppTranslation';
import {
    Address,
    ButtonLocation,
    ContainerNoLoc,
    GpsIcon,
    LocationUpdated,
    LocationWrap,
    NoLocationChip
} from './styled';

type Props = {
    lat?: number;
    lon?: number;
    address?: string | null;
    locButtonTooltipTitle?: IntlMessageKey;
    noLocButtonTooltipTitle?: IntlMessageKey;
    onLocationClick?: () => void;
    timestamp?: number;
};

export const isGpsCurrent = (timestamp: number) => {
    const now = Date.now();
    return now - timestamp <= 120000;
};

const LocationComponent = ({
    lat,
    lon,
    address,
    onLocationClick = () => {},
    timestamp,
    locButtonTooltipTitle = 'common:tooltips.show_in_google_maps',
    noLocButtonTooltipTitle = 'common:tooltips.install_driver_app'
}: Props) => {
    const { t } = useAppTranslation();
    const isCurrent = timestamp ? isGpsCurrent(timestamp) : false;
    const locationAge = getTimeAgo(timestamp, t);

    return (
        <LocationWrap>
            {lat && lon ? (
                <Tooltip
                    title={t(locButtonTooltipTitle)}
                    disableInteractive
                >
                    <ButtonLocation onClick={onLocationClick}>
                        <StatusChipStyled
                            color={isCurrent ? 'success' : 'gray'}
                            style={{ padding: '0 4px' }}
                        >
                            <GpsIcon isOnline={isCurrent} />
                        </StatusChipStyled>

                        <Address>{address}</Address>
                    </ButtonLocation>
                </Tooltip>
            ) : (
                <ContainerNoLoc>
                    <Tooltip
                        title={t(noLocButtonTooltipTitle)}
                        disableInteractive
                    >
                        <NoLocationChip>
                            <LocationDisabledIcon />
                            {t('common:empty.no_location')}
                        </NoLocationChip>
                    </Tooltip>
                </ContainerNoLoc>
            )}

            {locationAge && !isCurrent && <LocationUpdated>{`(${locationAge})`}</LocationUpdated>}
        </LocationWrap>
    );
};

export default LocationComponent;

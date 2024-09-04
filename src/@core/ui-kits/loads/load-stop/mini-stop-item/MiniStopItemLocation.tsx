import StopsComponents from '@/@core/ui-kits/loads/load-stop/StopsComponents';
import GoogleMapsButton from '@/@core/ui-kits/basic/google-maps-button/GoogleMapsButton';
import CopyText from '@/@core/components/copy-text/CopyText';
import Tooltip from '@mui/material/Tooltip';
import { useAppTranslation } from '@/hooks/useAppTranslation';
import React from 'react';
import OrderFriendlyId from '@/@core/ui-kits/loads/load-stop/OrderFriendlyId';

type Props = {
    locationName?: string;
    locationAddress?: string;
    locationLat?: number;
    locationLon?: number;
    selectStop: () => void;
    loadId?: string;
    loadFriendlyId: string;
    otherStop: boolean;
    isManifestPage: boolean;
};

function MiniStopItemLocation({
    locationName,
    locationAddress,
    locationLat,
    locationLon,
    selectStop,
    loadId,
    loadFriendlyId,
    otherStop,
    isManifestPage
}: Props) {
    const { t } = useAppTranslation();
    if (!locationName && !locationAddress) return null;
    return (
        <StopsComponents.StopItemWrapper
            sx={{
                borderLeft  : (theme) => `1px solid ${theme.palette.semantic.border.primary}`,
                borderBottom: (theme) => `1px solid ${theme.palette.semantic.border.primary}`,
                borderRight : (theme) => `1px solid ${theme.palette.semantic.border.primary}`,
                borderRadius: '0px 0px 4px 4px'
            }}
        >
            <StopsComponents.StopItemRowWrapper>
                <CopyText text={locationName}>
                    <StopsComponents.Text
                        textColor="primary"
                        fontWeight={600}
                    >
                        {locationName || '-'}
                    </StopsComponents.Text>
                </CopyText>
                <GoogleMapsButton
                    lat={locationLat}
                    lon={locationLon}
                    padding={0}
                />
                {loadId && (
                    <OrderFriendlyId
                        loadId={loadId}
                        loadFriendlyId={loadFriendlyId}
                        otherStop={otherStop}
                        isManifestPage={isManifestPage}
                    />
                )}
            </StopsComponents.StopItemRowWrapper>
            <Tooltip
                title={t('common:tooltips.show_on_the_map')}
                disableHoverListener={!locationAddress}
                disableInteractive
            >
                <StopsComponents.Text
                    onClick={selectStop}
                    sx={{
                        cursor: locationAddress ? 'pointer' : 'default'
                    }}
                >
                    {locationAddress || '-'}
                </StopsComponents.Text>
            </Tooltip>
        </StopsComponents.StopItemWrapper>
    );
}

export default React.memo(MiniStopItemLocation);

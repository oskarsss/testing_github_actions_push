import ManifestsTypes from '@/store/dispatch/manifests/types';
import StopsComponents from '@/@core/ui-kits/loads/load-stop/StopsComponents';
import GoogleMapsButton from '@/@core/ui-kits/basic/google-maps-button/GoogleMapsButton';
import { useAppTranslation } from '@/hooks/useAppTranslation';
import { Divider } from '@mui/material';
import CopyText from '@/@core/components/copy-text/CopyText';
import { COMMODITY_PACKAGE_UNIT } from '@/@core/ui-kits/loads/commodities-table/config';
import OrderFriendlyId from '@/@core/ui-kits/loads/load-stop/OrderFriendlyId';

type Props = {
    mainLoadId?: string;
    stop: ManifestsTypes.AnyPreparedStop;
    isManifestPage: boolean;
};

export default function FullStopItemInfo({
    mainLoadId,
    stop,
    isManifestPage
}: Props) {
    const { t } = useAppTranslation();
    const otherStop = mainLoadId && stop.loadId ? stop.loadId !== mainLoadId : false;
    return (
        <StopsComponents.StopItemWrapper
            sx={{
                borderLeft: (theme) => `1px solid ${theme.palette.semantic.border.primary}`
            }}
        >
            <StopsComponents.StopItemRowWrapper>
                <CopyText text={stop.location?.name}>
                    <StopsComponents.Text
                        fontWeight={600}
                        textColor="primary"
                    >
                        {stop.location?.name || '-'}
                    </StopsComponents.Text>
                </CopyText>
                {stop.location && (
                    <GoogleMapsButton
                        lat={stop.location.lat}
                        lon={stop.location.lon}
                    />
                )}
                {stop.loadId && (
                    <OrderFriendlyId
                        loadId={stop.loadId}
                        loadFriendlyId={stop.loadFriendlyId}
                        otherStop={otherStop}
                        isManifestPage={isManifestPage}
                    />
                )}
            </StopsComponents.StopItemRowWrapper>

            <CopyText text={stop.location?.address}>
                <StopsComponents.Text textColor="secondary">
                    {stop.location?.address || '-'}
                </StopsComponents.Text>
            </CopyText>

            <StopsComponents.StopItemRowWrapper>
                <StopsComponents.StopItemRowWrapper sx={{ gap: '2px' }}>
                    <StopsComponents.Text textColor="primary">
                        {`${t('common:ref')} #`}
                    </StopsComponents.Text>

                    <CopyText text={stop.referenceId}>
                        <StopsComponents.Text textColor="secondary">
                            {stop.referenceId || '-'}
                        </StopsComponents.Text>
                    </CopyText>
                </StopsComponents.StopItemRowWrapper>

                {stop.commodities.length > 0 && (
                    <>
                        <Divider
                            orientation="vertical"
                            sx={{
                                margin: 0,
                                height: '12px'
                            }}
                        />
                        <StopsComponents.StopItemRowWrapper sx={{ overflow: 'hidden' }}>
                            {stop.commodities.map((commodity, index) => (
                                <StopsComponents.StopItemRowWrapper key={commodity.commodityId}>
                                    <StopsComponents.Text textColor="primary">
                                        {`${commodity.quantity} ${t(
                                            COMMODITY_PACKAGE_UNIT[commodity.packagingUnit]
                                        )},`}
                                    </StopsComponents.Text>
                                    <StopsComponents.Text>
                                        {commodity.weightFormatted}
                                    </StopsComponents.Text>
                                    {stop.commodities.length - 1 !== index && (
                                        <Divider
                                            orientation="vertical"
                                            sx={{
                                                margin: 0,
                                                height: '12px'
                                            }}
                                        />
                                    )}
                                </StopsComponents.StopItemRowWrapper>
                            ))}
                        </StopsComponents.StopItemRowWrapper>
                    </>
                )}
            </StopsComponents.StopItemRowWrapper>
        </StopsComponents.StopItemWrapper>
    );
}

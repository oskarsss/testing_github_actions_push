import { useStableArray } from '@/hooks/useStable';
import ManifestsGrpcService from '@/@grpcServices/services/manifests-service/manifests.service';
import APP_ROUTES_CONFIG from '@/configs/app-routes-config';
import ManifestHeaderStyled from '@/@core/ui-kits/loads/load-stop/manifest-header/ManifestHeaderStyled';
import {
    LOAD_GRPC_MODEL_STATUS_COLORS,
    loads_icons_with_width,
    LoadStatusEnumMap
} from '@/@core/theme/entities/load/status';
import ManifestHeaderStatusAndFriendlyId from '@/@core/ui-kits/loads/load-stop/manifest-header/ManifestHeaderStatusAndFriendlyId';
import { useAppTranslation } from '@/hooks/useAppTranslation';
import GrossBadgeWithCopy from '@/@core/ui-kits/loads/load-stop/manifest-header/GrossBadgeWithCopy';
import RpmBadgeWithCopy from '@/@core/ui-kits/loads/load-stop/manifest-header/RpmBadgeWithCopy';
import Badge from '@/@core/ui-kits/basic/badge/Badge';
import { ManifestModel_Load } from '@proto/models/model_manifest';

type Props = {
    manifestId: string;
    openNewTab: boolean;
};

export default function RelatedLoads({
    manifestId,
    openNewTab
}: Props) {
    const { t } = useAppTranslation();
    const { data } = ManifestsGrpcService.useGetManifestLoadsQuery({ manifestId });

    const loads = useStableArray(data?.loads);
    const icons = loads_icons_with_width(16);
    const getOriginAndDestination = (load: ManifestModel_Load) => {
        const {
            origin,
            destination
        } = load;
        if (!origin && !destination) return '';
        const originPoint = origin ? `${origin.city} ${origin.state}` : '';
        const destinationPoint = destination ? `${destination.city} ${destination.state}` : '';
        if (originPoint && destinationPoint) return `${originPoint} - ${destinationPoint}`;
        return originPoint || destinationPoint;
    };

    return loads.map((load) => (
        <ManifestHeaderStyled.Container key={load.loadId}>
            <ManifestHeaderStyled.TopWrapper
                sx={{ height: '26px' }}
                statusColor={LOAD_GRPC_MODEL_STATUS_COLORS[load.status]}
            >
                <ManifestHeaderStatusAndFriendlyId
                    statusIcon={icons[LoadStatusEnumMap[load.status]]}
                    statusText={t(`state_info:loads.status.${LoadStatusEnumMap[load.status]}`)}
                    statusColor={LOAD_GRPC_MODEL_STATUS_COLORS[load.status]}
                    friendlyId={t('common:loads.friendlyId', { friendlyId: load.friendlyId })}
                    link={APP_ROUTES_CONFIG.dispatch.orders.details(load.loadId)}
                    openInNewTab={openNewTab}
                />
                {load.gross && (
                    <GrossBadgeWithCopy
                        grossAmountFormatted={load.gross.amountFormatted}
                        statusColor={LOAD_GRPC_MODEL_STATUS_COLORS[load.status]}
                        size="medium"
                    />
                )}
                {load.ratePerMileFormatted && (
                    <RpmBadgeWithCopy
                        rpmAmountFormatted={load.ratePerMileFormatted}
                        statusColor={LOAD_GRPC_MODEL_STATUS_COLORS[load.status]}
                        size="medium"
                    />
                )}
            </ManifestHeaderStyled.TopWrapper>
            <ManifestHeaderStyled.BottomWrapper sx={{ height: '22px' }}>
                <Badge
                    variant="outlined"
                    size="small"
                    sx={{
                        border   : 'none',
                        boxShadow: 'none',
                        padding  : 0
                    }}
                    text={getOriginAndDestination(load)}
                />
            </ManifestHeaderStyled.BottomWrapper>
        </ManifestHeaderStyled.Container>
    ));
}

import { ManifestModel_Load } from '@proto/models/model_manifest';
import ManifestDetailsLoadComponents from '@/views/dispatch/manifests/details/sections/tables/loads/components/ManifestDetailsLoadComponents';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import VectorIcons from '@/@core/icons/vector_icons';
import openNewWindow from '@/utils/open-new-window';
import { useAppTranslation } from '@/hooks/useAppTranslation';
import Tooltip from '@mui/material/Tooltip';
import { useGetDocumentsByEntityType } from '@/utils/transform-grpc-document';
import { DocumentModel_DocumentEntityType } from '@proto/models/model_document';
import { getColor } from '@/views/dispatch/manifests/details/sections/tables/loads/color-config';
import Badge from '@/@core/ui-kits/basic/badge/Badge';
import APP_ROUTES_CONFIG from '@/configs/app-routes-config';

type Props = {
    load: ManifestModel_Load;
    toggleExpanded: () => void;
    expanded: boolean;
    index: number;
};

export default function ManifestDetailsLoadHeader({
    load,
    toggleExpanded,
    expanded,
    index
}: Props) {
    const { t } = useAppTranslation();
    const onClickFriendlyId = () =>
        openNewWindow(APP_ROUTES_CONFIG.dispatch.orders.details(load.loadId));

    const {
        documents,
        isSuccess
    } = useGetDocumentsByEntityType({
        entityId  : load.loadId,
        entityType: DocumentModel_DocumentEntityType.LOAD
    });

    const documentsUploaded = documents.filter((doc) => doc.fileId).length;

    return (
        <ManifestDetailsLoadComponents.Header.Container>
            <ManifestDetailsLoadComponents.Header.LeftSide>
                <ManifestDetailsLoadComponents.Header.LeftSideWrap color={getColor(index)}>
                    <VectorIcons.CubeIcon />
                    <Tooltip title={t('common:tooltips.open_in_new_tab')}>
                        <ManifestDetailsLoadComponents.Header.LeftSideLink
                            onClick={onClickFriendlyId}
                        >
                            {`O-${load.friendlyId}`}
                        </ManifestDetailsLoadComponents.Header.LeftSideLink>
                    </Tooltip>
                </ManifestDetailsLoadComponents.Header.LeftSideWrap>

                <ManifestDetailsLoadComponents.Header.LeftSideWrap>
                    <ManifestDetailsLoadComponents.Header.Location>
                        {load.origin ? `${load.origin.city} ${load.origin.state}` : '-'}
                    </ManifestDetailsLoadComponents.Header.Location>
                    <ManifestDetailsLoadComponents.Header.Location>
                        -
                    </ManifestDetailsLoadComponents.Header.Location>
                    <ManifestDetailsLoadComponents.Header.Location>
                        {load.destination
                            ? `${load.destination.city} ${load.destination.state}`
                            : '-'}
                    </ManifestDetailsLoadComponents.Header.Location>
                </ManifestDetailsLoadComponents.Header.LeftSideWrap>

                <ManifestDetailsLoadComponents.Header.LeftSideWrap>
                    <Badge
                        variant="outlined"
                        size="medium"
                        icon={<VectorIcons.FileIcon />}
                        text={isSuccess ? `${documentsUploaded}/${documents.length}` : '-'}
                    />
                    <Badge
                        variant="filled"
                        size="medium"
                        text={load.gross?.amountFormatted}
                    />
                    <Badge
                        variant="filled"
                        size="medium"
                        text={load.ratePerMileFormatted}
                    />
                </ManifestDetailsLoadComponents.Header.LeftSideWrap>
            </ManifestDetailsLoadComponents.Header.LeftSide>

            <ManifestDetailsLoadComponents.Header.ExpandButton
                onClick={toggleExpanded}
                expanded={expanded}
                endIcon={<KeyboardArrowDownIcon />}
            >
                {t(expanded ? 'common:collapse' : 'common:expand')}
            </ManifestDetailsLoadComponents.Header.ExpandButton>
        </ManifestDetailsLoadComponents.Header.Container>
    );
}

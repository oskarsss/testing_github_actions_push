import { useConfirm } from '@/@core/components/confirm-dialog';
import DangerousIcon from '@mui/icons-material/Dangerous';
import type { MouseEvent } from 'react';
import { latestActivity } from '@/@core/ui-kits/page-headers/components/AvatarGroup/utils';
import DriverDocumentsStyled from '@/views/fleet/drivers/Details/components/Left/components/DriverProfileInfo/DriverDocuments/styled';
import StatusIcon from '@/@core/components/documents/components/document-tabs/StatusIcon';
import { DocumentsActions } from '@/store/documents/slice';
import { useAppDispatch } from '@/store/hooks';
import Fade from '@mui/material/Fade';
import { useOptionsMenu } from '@/views/fleet/drivers/Details/menus/Options/Options';
import UserMarkup from '@/views/fleet/drivers/Details/components/Right/components/User/UserMarkup';
import navigateToPage from '@/utils/navigateToPage';
import { useLastDriverPing } from '@/store/streams/events/hooks';
import DriversTypes from '@/store/fleet/drivers/types';
import { useGetDocumentsByEntityType } from '@/utils/transform-grpc-document';
import usePrivateFileUrl from '@/hooks/usePrivatFileUrl';
import {
    DocumentModel_DocumentEntityType,
    DocumentModel_Status
} from '@proto/models/model_document';
import clsx from 'clsx';
import { DETAILS_TABS_IDS } from '@/models/fleet/details-tabs-ids';
import { useAppTranslation } from '@/hooks/useAppTranslation';
import TrucksGrpcService from '@/@grpcServices/services/trucks.service';
import { useDriverById } from '@/store/storage/drivers/hooks/common';

type Props = {
    id: string;
    partner_id: DriversTypes.DriverRow['driverId'];
    onRemove: (config: { truckId: string; driverId: string }) => Promise<unknown>;
    removeBtnTestId?: string;
    is_primary?: boolean;
};

export default function DriverPartner({
    id,
    partner_id,
    onRemove,
    removeBtnTestId,
    is_primary = false
}: Props) {
    const optionsMenu = useOptionsMenu();
    const dispatch = useAppDispatch();
    const [setPrimaryDriver] = TrucksGrpcService.useSetPrimaryDriverMutation();
    const driver = useDriverById(partner_id);
    const last_ping = useLastDriverPing(partner_id);
    const confirm = useConfirm();
    const { url } = usePrivateFileUrl(driver?.selfieUrl);
    const { t } = useAppTranslation();

    const { documents } = useGetDocumentsByEntityType({
        entityId  : partner_id,
        entityType: DocumentModel_DocumentEntityType.DRIVER
    });

    if (!driver) {
        return null;
    }

    const changePrimaryDriver = () => {
        setPrimaryDriver({
            truckId : id,
            driverId: partner_id
        }).unwrap();
        optionsMenu.close();
    };

    const remove = () => {
        confirm({
            icon              : <DangerousIcon color="secondary" />,
            title             : 'trucks:profile.right.drivers.dialog.unassign.title',
            body              : 'trucks:profile.right.drivers.dialog.unassign.body',
            confirm_text      : 'common:button.unassign',
            translationOptions: {
                title: {
                    driverName: driver.firstName
                }
            },
            onConfirm: () =>
                onRemove({
                    truckId : id,
                    driverId: driver.driverId
                })
        });
    };

    const openOptionsMenu = (e: MouseEvent<HTMLButtonElement>) => {
        e.stopPropagation();
        optionsMenu.open({
            copy_text            : 'common:phone',
            copy_value           : driver.phoneNumber,
            entity_type          : 'drivers',
            entity_id            : driver.driverId,
            onChangePrimaryDriver: !is_primary ? changePrimaryDriver : undefined,
            onRemove             : remove,
            test_id              : removeBtnTestId
        })(e);
    };

    const moveToDocumentDriverDetails = (e: MouseEvent, document_id?: string) => {
        navigateToPage(`/drivers/${driver.driverId}`, e, {
            tab_id: DETAILS_TABS_IDS.DOCUMENTS
        }).then(() => {
            dispatch(DocumentsActions.selectDocumentDriver(document_id));
        });
    };

    const moveToDriverDetails = (e: MouseEvent) => {
        navigateToPage(`/drivers/${driver.driverId}`, e);
    };

    const last_seen = last_ping
        ? latestActivity(last_ping.timestamp, t)
        : t('common:last_seen_not_available');

    return (
        <Fade in>
            <div>
                <UserMarkup
                    full_name={`${driver.firstName} ${driver.lastName}`}
                    src={url}
                    last_seen={last_seen}
                    onOpenOptionsMenu={openOptionsMenu}
                    onClick={(e) => moveToDriverDetails(e as MouseEvent)}
                />

                {documents.map(({
                    documentTypeId,
                    status,
                    expiresAt,
                    documentType
                }) => (
                    <DriverDocumentsStyled.Tab
                        key={documentTypeId}
                        value={documentTypeId}
                        label={`${documentType?.title || ''}`}
                        className={clsx({
                            valid  : status === DocumentModel_Status.DOCUMENT_STATUS_VALID,
                            pending: status === DocumentModel_Status.DOCUMENT_STATUS_PENDING,
                            invalid: status === DocumentModel_Status.DOCUMENT_STATUS_INVALID
                        })}
                        onClick={(e) => moveToDocumentDriverDetails(e, documentTypeId)}
                        icon={(
                            <StatusIcon
                                expires_at={expiresAt}
                                status={status}
                                doc_type_expirable={documentType?.expirable || false}
                            />
                        )}
                    />
                ))}
            </div>
        </Fade>
    );
}

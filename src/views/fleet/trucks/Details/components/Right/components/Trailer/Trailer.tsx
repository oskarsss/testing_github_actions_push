import { type MouseEvent, memo } from 'react';
import { Box, Button, Fade } from '@mui/material';
import Typography from '@mui/material/Typography';
import AddIcon from '@mui/icons-material/Add';
import RightStyled from '@/views/fleet/drivers/Details/components/Right/styled';
import { useAppTranslation } from '@/hooks/useAppTranslation';
import { applyTestId, TestIDs } from '@/configs/tests';
import DangerousIcon from '@mui/icons-material/Dangerous';
import { useConfirm } from '@/@core/components/confirm-dialog';
import DriverDocumentsStyled from '@/views/fleet/drivers/Details/components/Left/components/DriverProfileInfo/DriverDocuments/styled';
import StatusIcon from '@/@core/components/documents/components/document-tabs/StatusIcon';
import { DocumentsActions } from '@/store/documents/slice';
import { useAppDispatch } from '@/store/hooks';
import navigateToPage from '@/utils/navigateToPage';
import { useGetDocumentsByEntityType } from '@/utils/transform-grpc-document';
import {
    DocumentModel_DocumentEntityType,
    DocumentModel_Status
} from '@proto/models/model_document';
import clsx from 'clsx';
import { DETAILS_TABS_IDS } from '@/models/fleet/details-tabs-ids';
import { useTrucksMap } from '@/store/storage/trucks/hooks/common';
import { useAssignTrailerToTruckDialog } from '@/@core/components/assign/modals/AssignTrailerToTruck';
import TrucksGrpcService from '@/@grpcServices/services/trucks.service';
import { TruckModel_Truck } from '@proto/models/model_truck';
import { useTrailerById } from '@/store/storage/trailers/hooks/common';
import TrailerInfo from './TrailerInfo';

type Props = {
    truck: TruckModel_Truck;
};

const Trailer = ({ truck }: Props) => {
    const trucks = useTrucksMap();
    const hashedTruck = trucks[truck.truckId];
    const { t } = useAppTranslation();
    const assignTrailerToTruckDialog = useAssignTrailerToTruckDialog();
    const confirm = useConfirm();
    const trailer = useTrailerById(truck.trailerId);
    const dispatch = useAppDispatch();

    const [removeTrailer] = TrucksGrpcService.useRemoveTrailerFromTruckMutation();

    const selectTrailer = () => {
        assignTrailerToTruckDialog.open({
            truckId                : hashedTruck.truckId,
            titleTranslationOptions: {
                referenceId: hashedTruck.referenceId
            },
            isDialog: true
        });
    };

    const { documents } = useGetDocumentsByEntityType({
        entityId  : trailer?.trailerId || '',
        entityType: DocumentModel_DocumentEntityType.TRAILER
    });

    const removeTrailerFromTruck = () => {
        confirm({
            icon              : <DangerousIcon color="secondary" />,
            title             : 'modals:trucks.unassign.title',
            body              : 'modals:trucks.unassign.body',
            confirm_text      : 'common:button.unassign',
            translationOptions: {
                title: {
                    referenceId: `"${trailer?.referenceId || ''}"`
                }
            },
            onConfirm: () =>
                removeTrailer({
                    truckId  : truck.truckId,
                    trailerId: truck.trailerId
                }).unwrap()
        });
    };

    const moveToTruckDetails = (document_id: string, e: MouseEvent) => {
        navigateToPage(`/trailers/${trailer?.trailerId}`, e, {
            tab_id: DETAILS_TABS_IDS.DOCUMENTS
        }).then(() => {
            dispatch(DocumentsActions.selectDocumentTrailer(document_id));
        });
    };

    return (
        <RightStyled.IconBlock>
            <Box>
                <Typography>{t('entity:trailer')}</Typography>

                {!trailer?.trailerId && (
                    <Button
                        onClick={selectTrailer}
                        startIcon={<AddIcon />}
                        {...applyTestId(TestIDs.pages.truckProfile.buttons.assignTrailer)}
                    >
                        {t('common:button.assign')}
                    </Button>
                )}
            </Box>
            {trailer ? (
                <Fade in>
                    <div>
                        <TrailerInfo
                            trailer={trailer}
                            removeTrailer={removeTrailerFromTruck}
                        />

                        {trailer &&
                            documents.map(({
                                documentType,
                                documentTypeId,
                                expiresAt,
                                status
                            }) => (
                                <DriverDocumentsStyled.Tab
                                    key={documentTypeId}
                                    value={documentTypeId}
                                    label={`${documentType?.title || ''}`}
                                    className={clsx({
                                        valid:
                                            status === DocumentModel_Status.DOCUMENT_STATUS_VALID,
                                        pending:
                                            status === DocumentModel_Status.DOCUMENT_STATUS_PENDING,
                                        invalid:
                                            status === DocumentModel_Status.DOCUMENT_STATUS_INVALID
                                    })}
                                    onClick={(e) => moveToTruckDetails(documentTypeId, e)}
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
            ) : (
                <RightStyled.EmptyElement variant="body2">
                    {t('common:empty.no_trailer')}
                </RightStyled.EmptyElement>
            )}
        </RightStyled.IconBlock>
    );
};

export default memo(Trailer);

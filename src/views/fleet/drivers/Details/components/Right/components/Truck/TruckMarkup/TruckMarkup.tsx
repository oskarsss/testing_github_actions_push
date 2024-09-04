import RightStyled from '@/views/fleet/drivers/Details/components/Right/styled';
import { Box, Button, Fade } from '@mui/material';
import Typography from '@mui/material/Typography';
import AddIcon from '@mui/icons-material/Add';
import { applyTestId } from '@/configs/tests';
import TruckInfo from '@/views/fleet/drivers/Details/components/Right/components/Truck/TruckInfo';
import DriverDocumentsStyled from '@/views/fleet/drivers/Details/components/Left/components/DriverProfileInfo/DriverDocuments/styled';
import StatusIcon from '@/@core/components/documents/components/document-tabs/StatusIcon';
import { useAppTranslation } from '@/hooks/useAppTranslation';
import { DocumentsActions } from '@/store/documents/slice';
import { useAppDispatch } from '@/store/hooks';
import TrucksTypes from '@/store/fleet/trucks/types';
import CircularProgress from '@mui/material/CircularProgress';
import navigateToPage from '@/utils/navigateToPage';
import { useGetDocumentsByEntityType } from '@/utils/transform-grpc-document';
import clsx from 'clsx';
import {
    DocumentModel_DocumentEntityType,
    DocumentModel_Status
} from '@proto/models/model_document';
import type { MouseEvent } from 'react';
import { TruckModel_Truck } from '@proto/models/model_truck';

type Props = {
    truck_id: string;
    onSelect: () => void;
    truck?: TruckModel_Truck | null;
    isLoading: boolean;
    removeTruck: () => void;
    disabledAssign?: boolean;
    testOptions?: {
        assignTestId: string;
        removeTestId: string;
    };
};

export default function TruckMarkup({
    truck_id,
    onSelect,
    truck,
    isLoading,
    removeTruck,
    testOptions,
    disabledAssign
}: Props) {
    const { t } = useAppTranslation();
    const dispatch = useAppDispatch();

    const moveToTruckDetails = (document_id: string, e: MouseEvent) => {
        navigateToPage(`/trucks/${truck_id}`, e, { tab_id: 'documents' }).then(() => {
            dispatch(DocumentsActions.selectDocumentTruck(document_id));
        });
    };
    const { documents } = useGetDocumentsByEntityType({
        entityId  : truck_id,
        entityType: DocumentModel_DocumentEntityType.TRUCK
    });
    return (
        <RightStyled.IconBlock>
            <Box>
                <Typography>{t('entity:truck')}</Typography>

                {!truck_id && (
                    <Button
                        onClick={onSelect}
                        disabled={disabledAssign}
                        startIcon={<AddIcon color={disabledAssign ? 'disabled' : 'primary'} />}
                        {...applyTestId(testOptions?.assignTestId)}
                    >
                        {t('common:button.assign')}
                    </Button>
                )}
            </Box>

            {truck_id && truck && !isLoading && (
                <Fade in>
                    <div>
                        <TruckInfo
                            truck={truck}
                            removeTruck={removeTruck}
                            test_id={testOptions?.removeTestId}
                        />

                        {documents.map(({
                            documentTypeId,
                            status,
                            documentType,
                            expiresAt
                        }) => (
                            <DriverDocumentsStyled.Tab
                                key={documentTypeId}
                                value={documentTypeId}
                                label={`${documentType?.title || ''}`}
                                className={clsx({
                                    valid: status === DocumentModel_Status.DOCUMENT_STATUS_VALID,
                                    pending:
                                        status === DocumentModel_Status.DOCUMENT_STATUS_PENDING,
                                    invalid: status === DocumentModel_Status.DOCUMENT_STATUS_INVALID
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
            )}

            {isLoading && (
                <RightStyled.Loader>
                    <CircularProgress size={30} />
                </RightStyled.Loader>
            )}

            {!truck_id && !isLoading && (
                <RightStyled.EmptyElement variant="body2">
                    {t('common:empty.no_truck_assigned')}
                </RightStyled.EmptyElement>
            )}
        </RightStyled.IconBlock>
    );
}

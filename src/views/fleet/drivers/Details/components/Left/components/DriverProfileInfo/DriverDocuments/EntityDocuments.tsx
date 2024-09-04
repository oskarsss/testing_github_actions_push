import Typography from '@mui/material/Typography';
import type Documents from '@/store/documents/types';
import { useEffect, useMemo } from 'react';
import { Button } from '@mui/material';
import { useChooseDocumentTypeDialog } from '@/@core/components/documents/menus/ChooseDocumentType';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import AddIcon from '@mui/icons-material/Add';
import { DocumentsActions } from '@/store/documents/slice';
import { DriverActions } from '@/store/fleet/drivers/slice';
import { trailersActions } from '@/store/fleet/trailers/slice';
import { trucksActions } from '@/store/fleet/trucks/slice';
import type { DocumentCreateRequest } from '@proto/documents';
import { DETAILS_TABS_IDS } from '@/models/fleet/details-tabs-ids';
import { DocumentModel_DocumentEntityType } from '@proto/models/model_document';
import { useAppTranslation } from '@/hooks/useAppTranslation';
import { brokersActions } from '@/store/dispatch/brokers/slice';
import { customersActions } from '@/store/dispatch/customers/slice';
import DriverDocumentsStyled from './styled';
import EntityDocumentsList from './EntityDocumentsList';

type Props = {
    entity_id: string;
    tab_id: string;
    documents: Documents.ConvertedDocument[];
    refresh: () => void;
    disabledAddNewDocument?: boolean;
    entity_type:
        | DocumentModel_DocumentEntityType.DRIVER
        | DocumentModel_DocumentEntityType.TRUCK
        | DocumentModel_DocumentEntityType.TRAILER
        | DocumentModel_DocumentEntityType.BROKER
        | DocumentModel_DocumentEntityType.CUSTOMER;
};

export default function EntityDocuments({
    entity_id,
    tab_id,
    documents,
    refresh,
    entity_type,
    disabledAddNewDocument
}: Props) {
    const { t } = useAppTranslation();
    const dispatch = useAppDispatch();
    const chooseDocumentTypeDialog = useChooseDocumentTypeDialog();
    const driverDocumentId = useAppSelector((state) => state.documents.driver);
    const truckDocumentId = useAppSelector((state) => state.documents.truck);
    const trailerDocumentId = useAppSelector((state) => state.documents.trailer);
    const brokerDocumentId = useAppSelector((state) => state.documents.broker);
    const customerDocumentId = useAppSelector((state) => state.documents.customer);

    const documentId = useMemo(() => {
        switch (entity_type) {
        case DocumentModel_DocumentEntityType.DRIVER:
            return driverDocumentId;
        case DocumentModel_DocumentEntityType.TRUCK:
            return truckDocumentId;
        case DocumentModel_DocumentEntityType.TRAILER:
            return trailerDocumentId;
        case DocumentModel_DocumentEntityType.BROKER:
            return brokerDocumentId;
        case DocumentModel_DocumentEntityType.CUSTOMER:
            return customerDocumentId;
        default:
            return '';
        }
    }, [
        entity_type,
        driverDocumentId,
        truckDocumentId,
        trailerDocumentId,
        brokerDocumentId,
        customerDocumentId
    ]);

    const selectDocument = (documentId: string) => {
        if (entity_type === DocumentModel_DocumentEntityType.DRIVER) {
            dispatch(DocumentsActions.selectDocumentDriver(documentId));
        }
        if (entity_type === DocumentModel_DocumentEntityType.TRUCK) {
            dispatch(DocumentsActions.selectDocumentTruck(documentId));
        }
        if (entity_type === DocumentModel_DocumentEntityType.TRAILER) {
            dispatch(DocumentsActions.selectDocumentTrailer(documentId));
        }
        if (entity_type === DocumentModel_DocumentEntityType.BROKER) {
            dispatch(DocumentsActions.selectDocumentBroker(documentId));
        }
        if (entity_type === DocumentModel_DocumentEntityType.CUSTOMER) {
            dispatch(DocumentsActions.selectDocumentCustomer(documentId));
        }
    };

    useEffect(() => {
        if (tab_id !== DETAILS_TABS_IDS.DOCUMENTS) {
            selectDocument('');
        }
    }, [tab_id]);

    const chooseTab = () => {
        switch (entity_type) {
        case DocumentModel_DocumentEntityType.DRIVER:
            dispatch(DriverActions.selectTab(DETAILS_TABS_IDS.DOCUMENTS));
            break;
        case DocumentModel_DocumentEntityType.TRAILER:
            dispatch(trailersActions.selectTab(DETAILS_TABS_IDS.DOCUMENTS));
            break;
        case DocumentModel_DocumentEntityType.TRUCK:
            dispatch(trucksActions.selectTab(DETAILS_TABS_IDS.DOCUMENTS));
            break;
        case DocumentModel_DocumentEntityType.BROKER:
            dispatch(brokersActions.selectTab(DETAILS_TABS_IDS.DOCUMENTS));
            break;
        case DocumentModel_DocumentEntityType.CUSTOMER:
            dispatch(customersActions.selectTab(DETAILS_TABS_IDS.DOCUMENTS));
            break;
        default:
            break;
        }
    };

    const onAdded = (document: DocumentCreateRequest) => {
        refresh();

        if (tab_id !== DETAILS_TABS_IDS.DOCUMENTS) {
            chooseTab();
        }

        selectDocument(document.documentTypeId);
        if (entity_type === DocumentModel_DocumentEntityType.DRIVER) {
            dispatch(DocumentsActions.selectDocumentDriver(document.documentTypeId));
        }
        if (entity_type === DocumentModel_DocumentEntityType.TRUCK) {
            dispatch(DocumentsActions.selectDocumentTruck(document.documentTypeId));
        }
        if (entity_type === DocumentModel_DocumentEntityType.TRAILER) {
            dispatch(DocumentsActions.selectDocumentTrailer(document.documentTypeId));
        }

        if (entity_type === DocumentModel_DocumentEntityType.BROKER) {
            dispatch(DocumentsActions.selectDocumentBroker(document.documentTypeId));
        }

        if (entity_type === DocumentModel_DocumentEntityType.CUSTOMER) {
            dispatch(DocumentsActions.selectDocumentCustomer(document.documentTypeId));
        }
    };

    const exclude_document_types = useMemo(
        () => documents.map((doc) => doc.documentTypeId),
        [documents]
    );

    const addDocument = () => {
        chooseDocumentTypeDialog.open({
            entity_id,
            entity_type,
            exclude_document_types,
            onAdded,
            isDialog: true
        });
    };

    return (
        <DriverDocumentsStyled.Wrapper>
            <DriverDocumentsStyled.Header>
                <Typography
                    variant="h5"
                    fontWeight={600}
                >
                    {t('core:documents.title')}
                </Typography>

                <Button
                    onClick={addDocument}
                    startIcon={<AddIcon />}
                    disabled={disabledAddNewDocument}
                >
                    {t('common:button.add_new')}
                </Button>
            </DriverDocumentsStyled.Header>
            <EntityDocumentsList
                chooseTab={chooseTab}
                documents={documents}
                selected_document_id={documentId}
                selectedDocument={selectDocument}
            />
        </DriverDocumentsStyled.Wrapper>
    );
}

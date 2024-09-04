import FullDialog from '@/@core/ui-kits/full-dialog';
import Documents from '@/@core/components/documents/Documents';
import DriversTypes from '@/store/fleet/drivers/types';
import Notes from '@/@core/components/notes/Notes';
import { TestIDs } from '@/configs/tests';
import { DocumentModel_DocumentEntityType } from '@proto/models/model_document';
import EditDriverFields from '../components/EditDriverFields';

type Props = {
    driver: DriversTypes.Driver;
    document_id: string;
    refetch: () => void;
};

export default function EditDriverBasic({
    driver,
    document_id,
    refetch
}: Props) {
    // const { converter } = useTransformGrpcDocument();

    // const documents = useMemo(() => driver.documents.map(converter) || [], [driver, converter]);

    return (
        <FullDialog.RowContent>
            <FullDialog.ScrollColumnContent maxWidth="550px">
                <EditDriverFields driver={driver} />
                <Notes
                    entity_type="driver"
                    entity_id={driver.driverId}
                    variant="outlined"
                    size="normal"
                    testOptions={{
                        messageTestId   : TestIDs.pages.editDriver.fields.message,
                        messageBoxTestId: TestIDs.pages.editDriver.areas.messageBox,
                        leaveNoteTestId : TestIDs.pages.editDriver.buttons.sendMessage
                    }}
                />
            </FullDialog.ScrollColumnContent>

            <Documents
                title={`${driver.firstName} ${driver.lastName}`}
                entityType={DocumentModel_DocumentEntityType.DRIVER}
                entityId={driver.driverId}
                styles={{ paddingLeft: 0 }}
                documentId={document_id}

                // testOptions={{
                //     documentDropzoneTestId : TestIDs.pages.editDriver.fields.documentDrop,
                //     addDocumentTestId      : TestIDs.pages.editDriver.buttons.addDocument,
                //     addDocumentCenterTestId: TestIDs.pages.editDriver.buttons.addDocumentCenter,
                //     deleteDocumentTestId   : TestIDs.pages.editDriver.buttons.deleteDocumentIcon,
                //     confirmDeleteDocumentTestId:
                //         TestIDs.pages.editDriver.buttons.confirmDeleteDocument
                // }}
            />
        </FullDialog.RowContent>
    );
}
